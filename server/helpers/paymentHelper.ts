import { AddInvoiceResponse } from '@radar/lnrpc';
import lndClient from '../config/lnd';
import bitcoin from '../bitcoinqueries';
import { addressType } from '../interfaces/Address';
import { DB } from '../interfaces/Db';
import knex from '../db/knex';
import { emitSocketEvent } from '../config/socket';

export const createInvoice = async (
    amount: number = 0,
    expiry: string | undefined
): Promise<AddInvoiceResponse> => {
    const rpc = await lndClient;

    const invoice = await rpc.addInvoice({
        value: amount.toString(),
        expiry,
    });

    return invoice;
};

export const createAddress = async (): Promise<string> => {
    const { data } = await bitcoin.addresses.getNewAddress(
        'paymentaddress',
        addressType.bech32,
        'torawallet'
    );
    const address = data.result;
    return address;
};

export const subscribeCrowdPayment = async (invoice: AddInvoiceResponse) => {
    const rpc = await lndClient;

     // Subscribe to invoice
     const subscribe = await rpc.subscribeInvoices({
        addIndex: invoice.addIndex,
    });

    subscribe.on('data', async (response) => {
        const paymentValue = Number(response.value);
        if (response.settled) {
            
        }
    });
}

export const subscribeToInvoice = async (invoice: AddInvoiceResponse) => {
    const rpc = await lndClient;

    // Get the lightning invoice;
    const orderPayment: DB.OrderPayment[] = await knex<DB.OrderPayment>(
        'OrderPayments'
    ).where({ invoice: invoice.paymentRequest });

    if (orderPayment.length === 1) {
        // Subscribe to invoice
        const subscribe = await rpc.subscribeInvoices({
            addIndex: invoice.addIndex,
        });

        const orderId = orderPayment[0].orderId;

        // Get the order
        const order: DB.Order[] = await knex<DB.Order>('Order').where({
            orderId,
        });
        const storeId: number = order[0].storeId;

        // Get the store
        const store: DB.Store[] = await knex<DB.Store>('Stores').where({
            storeId,
        });
        const userId: number = store[0].userId;

        // Get order
        const transaction: DB.OrderPayment[] = await knex<DB.OrderPayment>(
            'OrderPayments'
        ).where({ invoice: invoice.paymentRequest });

        subscribe.on('data', async (response) => {
            const paymentValue = Number(response.value);

            // Convert satoshis to BTC
            const btcValue = paymentValue / 100000000;

            if (response.settled) {
                // Check if transaction has been settled
                if (transaction[0].status !== 'settled') {
                    // Add Lightning payment to user's transaction logs
                    insertTransaction(btcValue, invoice.paymentRequest, 1, 'receive', userId);

                    updateBalanceAndTransaction(userId, btcValue, invoice.paymentRequest, 'settled');
                }
            } else {
                // Add Lightning payment to user's transaction logs
                insertTransaction(btcValue, invoice.paymentRequest, 0, 'receive', userId);

                updateBalanceAndTransaction(userId, orderPayment[0].totalAmount, invoice.paymentRequest, 'failed');
            }
        });
    }
};

const insertTransaction = async (
    btcamount: number,
    lninvoice: string,
    status: number,
    type: string,
    userId: number
) => {
    await knex<DB.TransactionLogs>('Transactions').insert({
        btcamount,
        lninvoice,
        status,
        type,
        userId
    });
};

const updateBalanceAndTransaction = async (
    userId: number,
    amount: number,
    invoice: string,
    status: string,
) => {
    try {
        // Update the OrderPayments
        await knex<DB.OrderPayment>('OrderPayments').where({ invoice }).update({ status });

        // Update the User's Balance with the transaction amount if the invoice is settled
        if (status === 'settled') {
            await knex<DB.UserWallet>('UserWallet')
                .update({ btcbalance: knex.raw(`btcbalance + ${amount}`) })
                .where({ userId: userId });

            // Send payment success event
            emitSocketEvent.emit('paymentsuccess', amount);
        } else {
            // Send payment failure event
            emitSocketEvent.emit('paymentfailure', amount);
        }
    } catch (err) {
        // Log Error
        console.log('Update Balance Error ===', (err as Error).message);
    }
};

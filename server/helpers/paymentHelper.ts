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

export const subscribeCrowdPayment = async (invoice: AddInvoiceResponse, params: [string[]] ) => {
    const rpc = await lndClient;
    const paymentId: string = params[0][3];

     // Subscribe to invoice
     const subscribe = await rpc.subscribeInvoices({
        addIndex: invoice.addIndex,
    });

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
                insertCrowdTransaction(paymentId, btcValue, invoice.paymentRequest, 1);

                updateCrowdBalance(paymentId, btcValue, 'settled');
            }
        } else {
            // Add Lightning payment to user's transaction logs
            insertCrowdTransaction(paymentId, btcValue, invoice.paymentRequest, 0);

            updateCrowdBalance(paymentId, btcValue, 'failed');
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
                    // Add Lightning payment to crowd payment logs
                    insertTransaction(btcValue, invoice.paymentRequest, 1, 'receive', userId);

                    updateBalance(userId, btcValue, invoice.paymentRequest, 'settled');
                }
            } else {
                // Add Lightning payment to crowd payment logs
                insertTransaction(btcValue, invoice.paymentRequest, 0, 'receive', userId);

                updateBalance(userId, orderPayment[0].totalAmount, invoice.paymentRequest, 'failed');
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

const insertCrowdTransaction = async (
    paymentId: string,
    amount: number,
    invoice: string,
    status: number,
) => {
    await knex<DB.CrowdTransactions>('CrowdTransactions').insert({
        paymentId,
        amount,
        invoice,
        status,
    });
};

const updateBalance = async (
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

const updateCrowdBalance = async (
    paymentId: string,
    amount: number,
    status: string,
) => {
    try {
        // Update the crowd payment balance with the transaction amount if the invoice is settled
        if (status === 'settled') {
            await knex<DB.CrowdPayments>('PaymentsCrowd')
                .update({ amountinbtc: knex.raw(`amountinbtc + ${amount}`) })
                .where({ paymentId });

            // Send payment success event
            emitSocketEvent.emit('crowdpaymentsuccess', amount);
        } else {
            // Send payment failure event
            emitSocketEvent.emit('crowdpaymentfailure', amount);
        }
    } catch (err) {
        // Log Error
        console.log('Update Balance Error ===', (err as Error).message);
    }
};

import { AddInvoiceResponse } from '@radar/lnrpc';
import lndClient from '../config/lnd';
import bitcoin from '../bitcoinqueries';
import { addressType } from '../interfaces/Address';
import { DB } from '../interfaces/Db';
import knex from '../db/knex';

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

export const subscribeToInvoice = async (invoice: AddInvoiceResponse) => {
    const rpc = await lndClient;

    // Get the lightning invoice;
    const orderPayment: DB.OrderPayment[] = await knex<DB.OrderPayment>(
        'OrderPayments'
    ).where({ invoice: invoice.paymentRequest });

    if (orderPayment.length === 1) {
        const orderId = orderPayment[0].orderId;

        const subscribe = await rpc.subscribeInvoices({
            addIndex: invoice.addIndex,
        });

        subscribe.on('data', async (response) => {
            if (response.settled) {
                // get the order
                const order: DB.Order[] = await knex<DB.Order>('Order').where({
                    orderId,
                });
                const storeId: number = order[0].storeId;

                // Get the store
                const store: DB.Store[] = await knex<DB.Store>('Stores').where({
                    storeId,
                });
                const userId: number = store[0].userId;

                // check if transaction has been settled
                const transaction: DB.OrderPayment[] = await knex<DB.OrderPayment>(
                    'OrderPayments'
                ).where({ invoice: invoice.paymentRequest });

                if (transaction[0].status !== 'settled') { 
                    // Add Lightning payment to user's transaction logs
                    await knex<DB.TransactionLogs>('Transactions').insert({
                        amount: transaction[0].totalAmount,
                        lninvoice: invoice.paymentRequest,
                        status: 1,
                        type: 'receive',
                        userId: userId
                    });

                    updateBalanceAndTransaction(userId, orderPayment[0].totalAmount, invoice.paymentRequest);
                }
            }
        });
    }
};

const updateBalanceAndTransaction = async (
    userId: number,
    amount: number,
    invoice: string,
) => {
    try {
        // Update the User's Balance with the transaction amount
        await knex<DB.UserWallet>('UserWallet')
            .update({ balance: knex.raw(`balance + ${amount}`) })
            .where({ userId: userId });

        // Update the OrderPayments
        await knex<DB.OrderPayment>('OrderPayments').where({ invoice }).update({ status: 'settled' });
    } catch (err) {
        // Log Error
        console.log('Update Balance Error ===', (err as Error).message);
    }
};

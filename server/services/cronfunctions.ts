import bitrpc from '../bitcoinqueries';
import { TransactionResult } from '../interfaces/Transaction';
import 'dotenv/config';
import knex from '../db/knex';
import { DB } from '../interfaces/Db';

const noOfCon = Number(process.env.NO_OF_CONFIRMATIONS);

// Update Balance and Transaction logs
const updateBAndT = async (userId: number | undefined, txid: string, amount: number) => {
    try {
        // Update the User's Balance with the transaction amount
        await knex<DB.UserBalance>('UserWallet').update({ amount: knex.raw(`balance + ${amount}`) }).where({ userId: userId });

        // Update the transaction status in transaction log
        await knex<DB.TransactionLogs>('Transactions').update({ status: 1 }).where({ txid: txid });
    } catch (err) {
        // Log Error
        console.log('Update Balance Error ===', (err as Error).message);
    }
}

export const getReceived = async () => {
    try {
        const transactions: TransactionResult[] = await (await bitrpc.getTransactions('torawallet')).data.result;

        transactions.forEach(async trans => {
            // Set the order address
            const orderAddress: string = trans.address;

            // Get the payment address;
            const orderPayment: DB.OrderPayment[] = await knex<DB.OrderPayment>('OrderPayments').where({ address: orderAddress });

            if (orderPayment.length === 1) {
                const orderId = orderPayment[0].orderId;

                // Get the order
                const order: DB.Order[] = await knex<DB.Order>('Order').where({ orderId });
                const storeId: number = order[0].storeId;

                // Get the store
                const store: DB.Store[] = await knex<DB.Store>('Stores').where({ storeId });
                const userId: number | undefined = store[0].userId;

                // Check if the transaction has been added to the database log, if not add it
                const alltrans: DB.TransactionLogs[] = await knex<DB.TransactionLogs>('Transactions').where({ txid: trans.txid });

                // If the transaction is a receive category
                if (trans.category === 'receive') {
                    if (alltrans.length === 0) {
                        await knex<DB.TransactionLogs>('Transactions').insert({
                            amount: trans.amount,
                            txid: trans.txid,
                            status: 0,
                            type: trans.category,
                            userid: userId
                        });
                    }
                }

                // If the transaction meets the confirmation target
                if (trans.confirmations === noOfCon && Number(alltrans[0].status) === 0) {
                    // Update transaction logs and balance
                    await updateBAndT(userId, trans.txid, orderPayment[0].totalAmount);

                } else if (trans.confirmations > noOfCon) {
                    // If the confirmation is greater than no of confirmation and it is not existent in our users transaction logs
                    if (alltrans.length === 1 && Number(alltrans[0].status) === 0) {
                        // Update transaction logs and balance
                        await updateBAndT(userId, trans.txid, orderPayment[0].totalAmount);
                    }
                }
            }
        });
    } catch (err) {
        // Log Error
        console.log('Wallet Receive Error ===', (err as Error).message);
    }
}

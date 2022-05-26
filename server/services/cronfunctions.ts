import bitrpc from '../bitcoinqueries';
import { TransactionResult } from '../interfaces/Transaction';
import 'dotenv/config';
import knex from '../db/knex';
import { DB } from '../interfaces/Db';
import { emitSocketEvent } from '../config/socket';

const noOfCon = Number(process.env.NO_OF_CONFIRMATIONS);

// Update Balance and Transaction logs
export const updateBalanceAndTransaction = async (userId: number, address: string, txid: string, amount: number) => {
    try {
        // Update the User's Balance with the transaction amount
        await knex<DB.UserWallet>('UserWallet').update({ btcbalance: knex.raw(`btcbalance + ${Number(amount)}`) }).where({ userId: userId });

        // Update the OrderPayments
        await knex<DB.OrderPayment>('OrderPayments').where({ address }).update({ status: 'settled' });

        // Update the transaction status in transaction log
        await knex<DB.TransactionLogs>('Transactions').update({ status: 1 }).where({ txid: txid });

        // Send payment success event
        emitSocketEvent.emit('paymentsuccess', null);
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
                            btcamount: trans.amount,
                            txid: trans.txid,
                            status: 0,
                            type: trans.category,
                            userId: userId
                        });
                    }
                }

                // If the transaction meets the confirmation target
                if (trans.confirmations === noOfCon && Number(alltrans[0].status) === 0) {
                    // Update transaction logs and balance
                    await updateBalanceAndTransaction(userId, orderAddress, trans.txid, trans.amount);

                } else if (trans.confirmations > noOfCon) {
                    // If the confirmation is greater than no of confirmation and it is not existent in our users transaction logs
                    if (alltrans.length === 1 && Number(alltrans[0].status) === 0) {
                        // Update transaction logs and balance
                        await updateBalanceAndTransaction(userId, orderAddress, trans.txid, trans.amount);
                    }
                }
            }
        });
    } catch (err) {
        // Log Error
        console.log('Wallet Receive Error ===', (err as Error).message);
    }
}

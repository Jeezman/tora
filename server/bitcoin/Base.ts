import Addresses from './Address';
import Auth from './Auth';
import Transactions from './Transaction';
import { AxiosResponse } from 'axios';
import { addressType } from '../interfaces/Address';

export default class QueryBase extends Auth {
    addresses: Addresses;
    transactions: Transactions;
    address: Addresses;

    constructor(user: string | undefined, pass: string | undefined, rpcurl: string | undefined, port: number | undefined) {
        super(user, pass, rpcurl, port);
        this.addresses = new Addresses(this.user, this.pass, this.rpcurl, this.port);
        this.transactions = new Transactions(this.user, this.pass, this.rpcurl, this.port);
        this.address = new Addresses(this.user, this.pass, this.rpcurl, this.port);
    }

    /** Address Queries */
    getNewAddress(label: string, type: addressType, wallet: string): Promise<AxiosResponse> {
        return this.address.getNewAddress(label, type, wallet);
    }
    /** End Of Address Queries */

    /** Transaction Queries */
    getTransaction(txId: string, wallet: string): Promise<AxiosResponse> {
        return this.transactions.getTransaction(txId, wallet);
    }
    decodeRawTransaction(transactionHex: symbol): Promise<AxiosResponse> {
        return this.transactions.decodeRawTransaction(transactionHex);
    }
    createTransaction(wallet: string, address: string, amount: number, feerate: number = 1): Promise<AxiosResponse> {
        return this.transactions.createTransaction(wallet, address, Number(amount.toFixed(8)), feerate);
    }
    getFeeEstimate(target: number): Promise<AxiosResponse> {
        return this.transactions.getFeeEstimate(target);
    }
    setTransactionFee(wallet: string, txfee: number): Promise<AxiosResponse> {
        return this.transactions.setTransactionFee(wallet, txfee);
    }
    /** End Of Transaction Queries */
}
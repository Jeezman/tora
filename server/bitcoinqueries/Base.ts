

import Addresses from './Address';
import Auth from './Auth';
import Transactions from './Transaction';
import { AxiosResponse } from 'axios';
import { addressType } from '../interfaces/Address';
import Wallet from './Wallet';

export default class QueryBase extends Auth {
    addresses: Addresses;
    transactions: Transactions;
    wallet: Wallet;

    constructor(user: string | undefined, pass: string | undefined, rpcurl: string | undefined, port: number | undefined) {
        super(user, pass, rpcurl, port);
        this.addresses = new Addresses(this.user, this.pass, this.rpcurl, this.port);
        this.transactions = new Transactions(this.user, this.pass, this.rpcurl, this.port);
        this.wallet = new Wallet(this.user, this.pass, this.rpcurl, this.port);
    }

    /** Address Queries */
    getNewAddress(label: string, type: addressType, wallet: string): Promise<AxiosResponse> {
        return this.addresses.getNewAddress(label, type, wallet);
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

    /** Wallet Queries */
    createWallet(name: string): Promise<AxiosResponse> {
        return this.wallet.createWallet(name);
    }
    listWallets(): Promise<AxiosResponse> {
        return this.wallet.listWallets();
    }
    getWalletBalance(name: string): Promise<AxiosResponse> {
        return this.wallet.getWalletBalance(name);
    }
    getTransactions(name: string): Promise<AxiosResponse> {
        return this.wallet.getTransactions(name);
    }
    /** End Of Wallet Queries */
}

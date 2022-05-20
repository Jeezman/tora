import { AddInvoiceResponse } from '@radar/lnrpc';
import lndClient from '../config/lnd';
import bitcoin from '../bitcoinqueries';
import { addressType } from '../interfaces/Address';

export const createInvoice = async (amount: number = 0, expiry: string | undefined): Promise<AddInvoiceResponse> => {
    const rpc = await lndClient;

    const invoice = await rpc.addInvoice({
        value: JSON.stringify(amount),
        expiry
    });

    return invoice;
};

export const createAddress = async (): Promise<string> => {
    const { data }  = await bitcoin.addresses.getNewAddress('paymentaddress',  addressType.bech32, 'torawallet');
    const address = data.result;
    return address;
}

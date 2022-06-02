import { AddInvoiceResponse } from "@radar/lnrpc";

export interface LnurlpayRes {
    secret: string;
    params: any;
    result: {
        invoice: AddInvoiceResponse,
        id: any
    }
}
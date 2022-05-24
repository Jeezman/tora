export interface CartRequestModel{
    storeId?: number;
    productId?: number;
    itemCount: number;
    total: number;
    amount: number;
}

export interface ConsolidatedCartDetail {
    msg:  string;
    data: CartDetail;
}

export interface CartDetail {
    data: {}
}

export interface CheckoutRequestModel {
    cartId: string;
    email: string;
    phoneNumber: string;
    address: string;
} 

export interface CheckoutRequestResponse {
    cartId: string;
    email: string;
    phoneNumber: string;
    address: string;
} 

export interface PaymentRequestModel {
    orderId: string;
    orderTotal: number;
} 

export interface PaymentRequestResponse {
    bitcoinAddress: string;
    lnInvoice: string;
} 

export interface OrderDetailsModel {
    orderId: string;
    email: string;
    phoneNumber: string;
    address: string
}
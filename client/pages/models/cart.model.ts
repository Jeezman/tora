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
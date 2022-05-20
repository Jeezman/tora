export interface StoreRequestModel{
  name: string
}

export interface ConsolidatedStoreDetail {
    msg:  string;
    data: StoreDetail;
}

export interface StoreDetail {
    data: {
        userId: number;
        email:  string;
        token:  string;
    }
}

export interface RegisterRequestModel extends StoreRequestModel {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string
}

export interface ConsolidatedRegisterDetail {
    msg:  string;
    data: RegisterDetail;
}

export interface RegisterDetail {
}

export interface ProductRequestModel{
    storeId?: number;
    productId?: number;
    name: string;
    amount: number;
    description: string;
    dTimeline: number;
    count: number,
    image: string | null
}

export interface ConsolidatedProductDetail {
    msg:  string;
    data: ProductDetail;
}

export interface ProductDetail {
    data: {}
}



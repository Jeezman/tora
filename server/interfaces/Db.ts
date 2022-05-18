export namespace DB {
    export interface User {
        userId?: number;
        email?: string;
        password?: string;
        publicKey?: string;
        token?: string;
    }

    export interface UserDetails {
        userId?: number;
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
        country?: string;
    }

    export interface Product {
        productId?: number;
        storeId: number;
        name: string;
        amount: number;
        description: string;
        dTimeline: number;
        count: number;
        date_created?: string;
        perPage?: number;
        image?: string;
        currentPage?: number;
        pagination?: {
            perPage: number,
            currentPage: number,
            from: number,
            to: number
        }
    }
    export interface Store {
        storeId?: number;
        userId: number;
        name: string;
        date_created?: string;
        products?: Product[];
    }

    export interface Cart {
        productId: number;
        cartId: string;
        buyerPubKey?: string;
        buyerUsername?: string;
        amount: number;
        itemCount: number;
        total: number;
        storeId?: number;
    }

    export interface CartId {
        id?: number;
        cartId: string;
        buyerUsername: string;
        status: string;
        date_created?: string;
    }
}
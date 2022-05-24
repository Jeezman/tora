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

    export interface Order {
        id?: number;
        orderId: string;
        storeId: number;
        user: string;
        status: string;
        date_created?: string;
        orderTotal: number;
    }

    export interface OrderItems {
        productId: number;
        orderId: string;
        user: string;
        itemAmount: number;
        itemCount: number;
        itemTotal: number;
        storeId?: number;
    }

    export interface OrderDetails {
        orderId: string;
        address: string;
        email: string;
        phoneNumber: string;
    }

    export interface OrderPayment {
        id?: number;
        paymentId: string;
        orderId: string;
        totalAmount: number;
        invoice: string;
        address: string;
        date_created?: string;
        status: string;
    }

    export interface OrderInvoiceLog {
        paymentId: string;
        invoice: string;
        address: string;
        date_created?: string;
    }

    export interface UserBalance {
        id?: number;
        userId: number;
        balance: number;
    }
    
    export interface TransactionLogs {
        id?: number;
        amount: number;
        txid?: string;
        lninvoice?: string;
        status: number;
        type: string;
        userid?: number;
    }
}
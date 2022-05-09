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
}
import knex from '../db/knex';
import { DB } from '../interfaces/Db';

export default async (user: string | undefined, ipAddress: string) => {
    try {
        if (ipAddress && user) {
            await knex<DB.CartId>('CartId').where({ buyerUsername: ipAddress }).update({ buyerUsername: user });
            await knex<DB.Cart>('Carts').where({ buyerUsername: ipAddress }).update({ buyerUsername: user });
        }
    } catch (e) {
        console.log(`Update Ip to User Error ${(e as Error).message}`);
    }
};
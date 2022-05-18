import { Request, Response, NextFunction } from 'express';
import knex from '../db/knex';
import { validationResult } from 'express-validator';
import { DB } from '../interfaces/Db';
import { responseSuccess, responseErrorValidation } from '../helpers';
import { v4 } from 'uuid';
import { RequestUser } from '../interfaces';

// Controller for adding to cart
export const addToCart = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const productId: number = req.body.productId;
        const itemCount: number = req.body.itemCount;
        const amount: number = req.body.amount;
        const total: number = req.body.total;
        const buyerPubKey: string = String(req.body.buyerPubKey);
        const buyerUsername: string = String(req.body.buyerUsername);
        const storeId: number = req.body.storeId;

        // If the product is already added update it and return
        const cartExist = await knex<DB.Cart>('Carts').where({ buyerUsername, productId }).orWhere({ buyerPubKey, productId });

        if (cartExist.length > 0) {
            await knex<DB.Cart>('Carts').update({ total: knex.raw(`total +  ${itemCount * amount}`), itemCount: cartExist[0].itemCount +  itemCount }).where({ buyerUsername, productId }).orWhere({ buyerPubKey, productId });

            return responseSuccess(res, 200, 'Updated to cart successfully', {});
        } else {

            // Get or create cartId
            const cartIdCheck: DB.CartId[] = await knex<DB.CartId>('CartId').where({ buyerUsername, status: 'active' });

            if (cartIdCheck.length === 0) {
                const cartId = v4().substring(0, 10);
                await knex<DB.CartId>('CartId').insert({ buyerUsername, cartId });
            }

            if (buyerPubKey && buyerPubKey !== 'undefined') {
                const cartId = await knex<DB.CartId>('CartId').where({ buyerUsername: buyerPubKey, status: 'active' }).orderBy(
                    'id', 'desc'
                );

                await knex<DB.Cart>('Carts').insert({ buyerPubKey, cartId: cartId[0].cartId, productId, itemCount, amount, total, storeId });
            } else {
                const cartId = await knex<DB.CartId>('CartId').where({ buyerUsername, status: 'active' }).orderBy(
                    'id', 'desc'
                );

                await knex<DB.Cart>('Carts').insert({ buyerUsername, productId, cartId: cartId[0].cartId, itemCount, amount, total, storeId });
            }

            return responseSuccess(res, 200, 'Added to cart successfully', {});

        }

    } catch (err) {
        next(err);
    }
};

// Controller for updating cart product
export const updateCart = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const productId: number = req.body.productId;
        const cartId: string = req.body.cartId;
        const itemCount: number = req.body.itemCount;
        const amount: number = req.body.amount;
        const total: number = req.body.total;
        const buyerPubKey: string = req.body.buyerPubKey;
        const buyerUsername: string = req.body.buyerUsername;

        if (buyerPubKey) {
            await knex<DB.Cart>('Carts').update({ itemCount, amount, total }).where({ buyerPubKey, productId, cartId });
        } else {
            await knex<DB.Cart>('Carts').update({ itemCount, amount, total }).where({ buyerUsername, productId, cartId })
        }

        return responseSuccess(res, 200, 'Updated from cart successfully', {});

    } catch (err) {
        next(err);
    }
};

// Controller for updating cart product
export const listCart = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        let carts: DB.Cart[]
        const buyerPubKey: string  = String(req.query.buyerPubKey);
        const buyerUsername: string = String(req.query.buyerUsername);

        if (buyerPubKey !== 'undefined') {
            carts = await knex<DB.Cart>('Carts').where({ buyerPubKey });
        } else {
            carts = await knex<DB.Cart>('Carts').where({ buyerUsername })
        }

        return responseSuccess(res, 200, 'listed user cart successfully', carts);

    } catch (err) {
        next(err);
    }
};

// Controller for deleting from cart
export const deleteFromCart = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const productId: number = req.body.productId;
        const buyerPubKey: string = req.body.buyerPubKey;
        const buyerUsername: string = req.body.buyerUsername;
        const cartId: string = req.body.cartId;

        if (buyerPubKey) {
            await knex<DB.Cart>('Carts').delete().where({ buyerPubKey, productId, cartId });
        } else {
            await knex<DB.Cart>('Carts').delete().where({ buyerUsername, productId, cartId })
        }

        return responseSuccess(res, 200, 'Deleted from cart successfully', {});

    } catch (err) {
        next(err);
    }
};

// Controller for checking out cart
export const cartCheckout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const reqUser = req as RequestUser;
        const cartId: string = req.body.cartId;

        return responseSuccess(res, 200, 'Deleted from cart successfully', {});

    } catch (err) {
        next(err);
    }
};
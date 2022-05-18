import { Request, Response, NextFunction } from 'express';
import knex from '../db/knex';
import { validationResult } from 'express-validator';
import { DB } from '../interfaces/Db';
import { responseSuccess, responseErrorValidation, responseError } from '../helpers';
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
        const buyerPubKey: string = req.body.buyerPubKey;
        const buyerUsername: string = req.body.buyerUsername;

        if (buyerPubKey) {
            await knex<DB.Cart>('Carts').insert({ buyerPubKey, productId, itemCount, amount, total });
        } else {
            await knex<DB.Cart>('Carts').insert({ buyerUsername, productId, itemCount, amount, total });
        }

        return responseSuccess(res, 200, 'Added to cart successfully', {});

    } catch (err) {
        next(err);
    }
};

// Controller for deleting from cart
export const updateCart = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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
        const buyerPubKey: string = req.body.buyerPubKey;
        const buyerUsername: string = req.body.buyerUsername;

        if (buyerPubKey) {
            await knex<DB.Cart>('Carts').update({ itemCount, amount, total }).where({ buyerPubKey, productId });
        } else {
            await knex<DB.Cart>('Carts').update({ itemCount, amount, total }).where({ buyerUsername, productId })
        }

        return responseSuccess(res, 200, 'Deleted from cart successfully', {});

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

        if (buyerPubKey) {
            await knex<DB.Cart>('Carts').delete().where({ buyerPubKey, productId });
        } else {
            await knex<DB.Cart>('Carts').delete().where({ buyerUsername, productId })
        }

        return responseSuccess(res, 200, 'Deleted from cart successfully', {});

    } catch (err) {
        next(err);
    }
};
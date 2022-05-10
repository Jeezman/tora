import { Request, Response, NextFunction } from 'express';
import knex from '../db/knex';
import { validationResult } from 'express-validator';
import { DB } from '../interfaces/Db';
import { responseSuccess, responseErrorValidation, responseError } from '../helpers';
import { RequestUser } from '../interfaces';

// Controller for registering user
export const createStore = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const reqUser = req as RequestUser;

        const name: string = req.body.name;
        const userId: number = Number(reqUser.user.userId);

        let store: DB.Store[] = await knex<DB.Store>('Stores').where({ name });

        if (store.length > 0) {
            return responseError(res, 404, 'Store name already exists');
        }

        await knex<DB.Store>('Stores').insert({ userId, name });

        responseSuccess(res, 200, 'Successfully created store', {});

    } catch (err) {
        next(err);
    }
};

export const addProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const storeId: number = req.body.storeId;
        
        // Check if the store belongs to the user
        const reqUser = req as RequestUser;
        const store: DB.Store[] = await knex<DB.Store>('Stores').where({ storeId });

        if (store.length > 0 && store[0].userId === reqUser.user.userId) {

            const name: string = req.body.name;
            const amount: number = req.body.amount;
            const description: string = req.body.description;
            const dTimeline: number = req.body.dTimeline;
            const count: number = req.body.count;

            await knex<DB.Product>('Products').insert({ storeId, name, amount, description, dTimeline, count });

            responseSuccess(res, 200, 'Successfully created product', {});
        } else {
            responseError(res, 404, 'You don\'t have access to this store');
        }

    } catch (err) {
        next(err);
    }
};
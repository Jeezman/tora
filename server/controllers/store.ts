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
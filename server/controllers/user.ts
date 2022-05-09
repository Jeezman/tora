import { Request, Response, NextFunction } from 'express';
import knex from '../db/knex';
import { validationResult } from 'express-validator';
import { DB } from '../interfaces/Db';
import { responseSuccess, responseErrorValidation, responseError } from '../helpers';
import { hashPassword, verifyPassword } from '../helpers/password';
import { signUser } from '../helpers/jwt';

// Controller for registering user
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const email: string = req.body.email;
        const pass: string = req.body.password;
        const publicKey: string = req.body.publicKey;

        const user: DB.User[] = await knex<DB.User>('users').where({ email }).orWhere({ publicKey });

        if (user.length > 0) {
            return responseError(res, 404, 'User already exists');
        }

        if (publicKey) {
            await knex<DB.User>('users').insert({ publicKey });
        } else {

            const password: string = hashPassword(pass);

            await knex<DB.User>('users').insert({ email, password });
        }

        responseSuccess(res, 200, 'Successfully created user', {});
    } catch (err) {
        next(err);
    }
};

// Controller for user login
export const userLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const email: string = req.body.email;
        const pass: string = req.body.password;
        const publicKey: string = req.body.publicKey;

        if (publicKey) {
            const users: DB.User[] = await knex<DB.User>('users').where({ publicKey });

            if (users.length > 0) {
                let user = users[0];
                // // delete user password and pk
                delete user.password;
                delete user.publicKey;

                const token = signUser(user);

                // Add token to user object
                user.token = token;

                return responseSuccess(res, 200, 'Successfully login', user);
            }
        }
        const users: DB.User[] = await knex<DB.User>('users').where({ email });

        if (users.length > 0) {
            let user = users[0];
            if (!verifyPassword(pass, user.password)) {
                return responseError(res, 404, 'Error with login');
            }

            // // delete user password and pk
            delete user.password;
            delete user.publicKey;

            const token = signUser(user);

            // Add token to user object
            user.token = token;

            return responseSuccess(res, 200, 'Successfully login', user);
        } else {
            return responseError(res, 404, 'Not a valid user');
        }

    } catch (err) {
        next(err);
    }
};
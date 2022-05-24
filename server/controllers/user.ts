import { Request, Response, NextFunction } from 'express';
import knex from '../db/knex';
import { validationResult } from 'express-validator';
import { DB } from '../interfaces/Db';
import { responseSuccess, responseErrorValidation, responseError } from '../helpers';
import { hashPassword, verifyPassword } from '../helpers/password';
import { signUser } from '../helpers/jwt';
import { RequestUser } from '../interfaces';
import lnurlServer from '../helpers/lnurl';
import { emitSocketEvent } from '../app';

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

        let user: DB.User[] = [];

        user = await knex<DB.User>('Users').where({ email });

        if (user.length > 0) {
            return responseError(res, 404, 'User already exists');
        }

        const password: string = hashPassword(pass);
        const userCreated = await knex<DB.User>('Users').insert({ email, password }).returning('userId');

        // Create user balance default to 0
        await knex<DB.UserWallet>('UserWallet').insert({ userId: userCreated[0].userId, balance: 0 });

        responseSuccess(res, 200, 'Successfully created user', {});

    } catch (err) {
        next(err);
    }
};

// Controller for user login
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const email: string = req.body.email;
        const pass: string = req.body.password;

        const users: DB.User[] = await knex<DB.User>('Users').where({ email });

        if (users.length > 0) {
            let user = users[0];

            if (!verifyPassword(pass, user.password)) {
                return responseError(res, 404, 'Error with login');
            }

            // Delete user password and pk
            delete user.password;

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

// Controller for user login
export const updateUserDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const reqUser = req as RequestUser;

        const firstName: string = req.body.firstName;
        const lastName: string = req.body.lastName;
        const phoneNumber: string = req.body.phoneNumber;
        const country: string = req.body.country;

        const users: DB.UserDetails[] = await knex<DB.UserDetails>('UserDetails').where({ userId: reqUser.user.userId });

        if (users.length === 0) {
            await knex<DB.UserDetails>('UserDetails').insert({ userId: reqUser.user.userId, firstName, lastName, phoneNumber, country }).where({ userId: reqUser.user.userId });

            return responseSuccess(res, 201, 'Successfully updated user details', {});
        }

        await knex<DB.UserDetails>('UserDetails').update({ firstName, lastName, phoneNumber, country }).where({ userId: reqUser.user.userId });

        return responseSuccess(res, 201, 'Successfully updated user details', {});
    } catch (err) {
        next(err);
    }
};

// Controller for user login
export const userBalance = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const reqUser = req as RequestUser;

        const userBalance: DB.UserWallet | undefined = await knex<DB.UserWallet>('UserWallet').where({ userId: reqUser.user.userId }).first();

        return responseSuccess(res, 201, 'Successfully fetch user balance', userBalance);
    } catch (err) {
        next(err);
    }
};

export const lnurlLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await lnurlServer.generateNewUrl("login");

        res.send(result);
    } catch (err) {
        next(err);
    }
}

export const pseudoLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const query = req.query;
        if (query.key) {
            const key: string = String(query.key);

            // Check if user exists in the database;
            const users: DB.User[] = await knex<DB.User>('Users').where({ publicKey: key });

            if (users.length === 0) {
                const userCreated = await knex<DB.User>('Users').insert({ publicKey: key }).returning('userId');

                // Create user balance default to 0
                await knex<DB.UserWallet>('UserWallet').insert({ userId: userCreated[0].userId, balance: 0 });
            }

            // Get user again for token
            const usersToken: DB.User[] = await knex<DB.User>('Users').where({ publicKey: key });
            let user = usersToken[0];

            // Delete user password and pk
            delete user.password;

            const token = signUser(user);

            emitSocketEvent.emit('auth', { key, token });
            res.json({ key });
        } else {
            return responseError(res, 404, 'Unsuccesful LNURL AUTH login');
        }
    } catch (err) {
        next(err);
    }
}
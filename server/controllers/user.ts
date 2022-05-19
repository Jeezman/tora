import { Request, Response, NextFunction } from 'express';
import knex from '../db/knex';
import { validationResult } from 'express-validator';
import { DB } from '../interfaces/Db';
import { responseSuccess, responseErrorValidation, responseError } from '../helpers';
import { hashPassword, verifyPassword } from '../helpers/password';
import { signUser } from '../helpers/jwt';
import { RequestUser } from '../interfaces';
import ipToUser from '../helpers/ipToUser';

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

        let user: DB.User[] = [];
        if (publicKey) {
            user = await knex<DB.User>('Users').where({ publicKey });
            if (user.length > 0) {
                return responseError(res, 404, 'User already exists');
            }

            await knex<DB.User>('Users').insert({ publicKey });
            return responseSuccess(res, 200, 'Successfully created user', {});
        }

        user = await knex<DB.User>('Users').where({ email });
        if (user.length > 0) {
            return responseError(res, 404, 'User already exists');
        }

        const password: string = hashPassword(pass);
        await knex<DB.User>('Users').insert({ email, password });

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
        const publicKey: string = req.body.publicKey;
        const ipAddress: string = req.body.ipAddress;

        if (publicKey) {
            const users: DB.User[] = await knex<DB.User>('Users').where({ publicKey });

            if (users.length > 0) {
                let user = users[0];

                // If user is login in to checkout cart update IP address to user public key
                ipToUser(user.publicKey, ipAddress);

                // Delete user password and pk
                delete user.password;
                delete user.publicKey;

                const token = signUser(user);

                // Add token to user object
                user.token = token;

                return responseSuccess(res, 200, 'Successfully login', user);
            }
        }

        const users: DB.User[] = await knex<DB.User>('Users').where({ email });

        if (users.length > 0) {
            let user = users[0];

            if (!verifyPassword(pass, user.password)) {
                return responseError(res, 404, 'Error with login');
            }

            // If user is login in to checkout cart update IP address to user email
            ipToUser(user.email, ipAddress);

            // Delete user password and pk
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
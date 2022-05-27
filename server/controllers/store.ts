import { Request, Response, NextFunction } from 'express';
import knex from '../db/knex';
import { validationResult } from 'express-validator';
import { Formidable } from 'formidable';
import { DB } from '../interfaces/Db';
import { responseSuccess, responseErrorValidation, responseError } from '../helpers';
import { RequestUser } from '../interfaces';
import { attachPaginate } from 'knex-paginate';
import { uploadFile } from '../config/cloudinary';

attachPaginate();

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

        await knex<DB.Store>('Stores').insert({ userId, name: name.toLowerCase() });

        return responseSuccess(res, 200, 'Successfully created store', {});

    } catch (err) {
        next(err);
    }
};

// Controller for registering user
export const listStores = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const reqUser = req as RequestUser;

        const userId: number = Number(reqUser.user.userId);

        let stores: DB.Store[] = await knex<DB.Store>('Stores').where({ userId });

        return responseSuccess(res, 200, 'Successfully listed stores', stores);

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
            const image: string = req.body.image;
            const description: string = req.body.description;
            const dTimeline: number = req.body.dTimeline;
            const count: number = req.body.count;

            await knex<DB.Product>('Products').insert({ storeId, name, amount, description, dTimeline, count, image });

            return responseSuccess(res, 200, 'Successfully created product', {});
        }

        return responseError(res, 404, 'You don\'t have access to this store');
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const storeId: number = req.body.storeId;
        const productId: number = req.body.productId;

        // Check if product belongs to the store
        const reqUser = req as RequestUser;

        const store: DB.Store[] = await knex<DB.Store>('Stores').where({ storeId });
        const product: DB.Product[] = await knex<DB.Product>('Products').where({ storeId, productId });

        if (product.length > 0 && store[0].userId === reqUser.user.userId) {

            const name: string = req.body.name;
            const amount: number = req.body.amount;
            const image: string = req.body.image;
            const description: string = req.body.description;
            const dTimeline: number = req.body.dTimeline;
            const count: number = req.body.count;

            await knex<DB.Product>('Products').update({ storeId, name, amount, description, dTimeline, count, image }).where({ productId });

            return responseSuccess(res, 200, 'Successfully updated product', {});
        }

        return responseError(res, 404, 'You don\'t have access to this product');
    } catch (err) {
        next(err);
    }
};

export const storeProducts = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const name: string = req.params.storeName;
        const currentPage = Number(req.query.currentPage);
        const perPage = Number(req.query.perPage);

        // Check if the store exists
        const stores: DB.Store[] = await knex<DB.Store>('Stores').where({ name });

        if (stores.length) {
            const store = stores[0];

            // @ts-ignore
            const products: DB.Product[] = await knex<DB.Product>('Products').where({ storeId: store.storeId }).paginate({ perPage: perPage, currentPage: currentPage});
            if (store) {
                store.products = products;
            }

            return responseSuccess(res, 200, 'Successfully created product', store);
        }

        return responseError(res, 404, 'Store does not exists');
    } catch (err) {
        next(err);
    }
};

export const productImage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const form = new Formidable();

        form.parse(req, (err, fields, files) => {
             
            // @ts-ignore
            uploadFile(files.upload.filepath, (err, url) => {
                if(err) {
                    return responseError(res, 403, err);
                } else {
                    return responseSuccess(res, 201, 'Successfully updated product image', url);
                }
            });
        });
    } catch (err) {
        next(err);
    }
};
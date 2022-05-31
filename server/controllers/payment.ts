import { Request, Response, NextFunction } from 'express';
import knex from '../db/knex';
import { validationResult } from 'express-validator';
import { DB } from '../interfaces/Db';
import { responseSuccess, responseErrorValidation, responseError } from '../helpers';
import { v4 } from 'uuid';
import {createInvoice, createAddress, subscribeToInvoice} from '../helpers/paymentHelper';
import 'dotenv/config';
import { AddInvoiceResponse } from '@radar/lnrpc';

// Controller to generate lightning invoice and Bitcoin address
export const generateInvoice = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const orderId: string = req.params.orderId;
        const totalAmount: number = req.body.orderTotal;
        const amountInBtc: number = req.body.bitcoins;
        const amountInSats: number = req.body.sats;

        if (totalAmount < 0) throw new Error("amount out of range");

        // Generate Bitcoin address
        const bitcoinAddress = await createAddress();

        // Generate Lightning Invoice
        const lnInvoice: AddInvoiceResponse = await createInvoice(Math.round(amountInSats), process.env.DEFAULT_EXPIRY);

        const paymentId: string = v4().substring(0, 12).replace(/\-|\./g, '');

        // Check if order exists
        const orders: DB.Order[] = await knex<DB.Order>('Order').where({ orderId, orderTotal: totalAmount });
        
        if(orders.length === 0) {
            return responseError(res, 404, 'Not a valid order');
        }

        await knex<DB.OrderPayment>('OrderPayments').insert({ paymentId,  orderId, address: bitcoinAddress, invoice: lnInvoice.paymentRequest, totalAmount, amountInBtc, amountInSats });

        await knex<DB.OrderInvoiceLog>('OrderInvoiceLogs').insert({ paymentId, address: bitcoinAddress, invoice: lnInvoice.paymentRequest });

        const data = {
            bitcoinAddress,
            lnInvoice: lnInvoice.paymentRequest
        };

        subscribeToInvoice(lnInvoice);

        return responseSuccess(res, 200, 'Successfully created payment address and invoice', data);

    } catch (err) {
        next(err);
    }
};

export const generatePin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const pin = Math.floor(1000 + Math.random() * 9000);

        return responseSuccess(res, 200, 'Successfully created payment address and invoice', pin);

    } catch (err) {
        next(err);
    }
};


export const makeCrowdPayment = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const orderId: string = req.body.orderId;
        const paymentId: string = req.body.paymentId;
        const paymentPin: number = req.body.paymentPin;

        // Get the order 
        const orders: DB.Order[] = await knex<DB.Order>('Order').where({ orderId });
        if(!orders.length) {
            return responseError(res, 404, 'Not a valid order');
        }

        const totalAmount = orders[0].orderTotal;

        await knex<DB.CrowdPayments>('PaymentsCrowd').insert({ paymentId, orderId, totalAmount, paymentPin });

        return responseSuccess(res, 200, 'Successfully created crowd payment', {});

    } catch (err) {
        next(err);
    }
};

export const getCrowdPayment = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const paymentPin: number  = Number(req.params.code);

        if(!paymentPin) {
            return responseError(res, 404, 'Payment not found');
        }
        const crowdPayment = await knex<DB.CrowdPayments>('PaymentsCrowd').where({ paymentPin }).first();

        return responseSuccess(res, 200, 'Successfully created crowd payment', crowdPayment);

    } catch (err) {
        next(err);
    }
};
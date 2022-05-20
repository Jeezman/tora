import axios, { AxiosError } from 'axios';
import { BASE_URL } from '.';
import {
    CartRequestModel, ConsolidatedCartDetail
} from '../pages/models/cart.model';


let token;
if (typeof window !== 'undefined') {
    token = window?.localStorage.getItem('@token');

    if (token) {
        token = JSON.parse(token);
    }
}
axios.defaults.baseURL = BASE_URL;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

type ServerError = {
    error: string;
    msg: string;
    data: any;
};

export const addToCart = async (
    params: CartRequestModel
): Promise<ConsolidatedCartDetail> => {
    try {
        const res: ConsolidatedCartDetail = await axios.post('cart/add', params);
        return res;
    } catch (error: any) {
        console.log('error is  ', error);
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response) {
                return serverError.response.data;
            }
        }
        console.log('calling error ', error);
        return error.response.data;
    }
};

export const fetchCart = async () => {
    try {
        const res = await axios.get(`cart/list`);
        return res.data;
    } catch (error: any) {
        console.log('error is  ', error);
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response) {
                return serverError.response.data;
            }
        }
        console.log('calling error ', error);
        return error.response.data;
    }
}
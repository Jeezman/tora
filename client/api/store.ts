import axios, { AxiosError } from 'axios';
import { BASE_URL } from '.';
import {
  ConsolidatedProductDetail,
  ConsolidatedStoreDetail,
  ProductRequestModel,
  StoreRequestModel,
} from '../pages/models/store.model';
import { getData } from '../util/storage';

let token;

const getToken = async () => {
  let token = await getData('token')
  return token;
}

if (typeof window !== 'undefined') {
  token = window?.localStorage.getItem('@token');

  if (token) {
    token = JSON.parse(token);
  }
}
axios.defaults.baseURL = BASE_URL;

axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

/**
 * 
 const instance = (token:string) => axios.create({   baseURL: `${config.API_URL}`,   timeout: 1000,   headers :{ 'authorization': 'Bearer ' + token } })
 */

type ServerError = {
  error: string;
  msg: string;
  data: any;
};

export const createStore = async (
  params: StoreRequestModel
): Promise<ConsolidatedStoreDetail> => {
  console.log(params);
  try {
    const res: ConsolidatedStoreDetail = await axios.post('store/create', {
      name: params.name,
    });
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

export const createProduct = async (
  params: ProductRequestModel
): Promise<ConsolidatedProductDetail> => {
  console.log('createProduct ', params);
  try {
    const res:ConsolidatedProductDetail = await axios.post('store/product', params);
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

export const fetchProducts = async (storeName: string) => {
  try {
    console.log('store nameeee is  ', storeName)
    const res = await axios.get(`store/products/${storeName}?currentPage=0&perPage=10`);
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

export const fetchStore = async () => {
  try {
    const res = await axios.get(`store/list`);
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

export const getBalance = async () => {
  try {
    const res = await axios.get('user/balance');

    console.log('Response ====', res.data);
    return res.data;
  } catch (error) {
    console.log('calling error ', error);
  }
}
import axios, { AxiosError } from 'axios';
import { ConsolidatedStoreDetail, StoreRequestModel } from '../pages/models/store.model';

let token;
if (typeof window !== "undefined") {
  token = window?.localStorage.getItem('@token')

  if (token) {
    token = JSON.parse(token)
  }
}


export const BASE_URL = 'http://localhost:5002/api/';

axios.defaults.baseURL = BASE_URL;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

type ServerError = {
  error: string;
  msg: string;
  data: any;
};


export const createStore = async (params: StoreRequestModel): Promise<ConsolidatedStoreDetail> => {
    console.log(params)
  try {
      const res:ConsolidatedStoreDetail = await axios.post('store/create', {
          name: params.name,
      });
    return res;
  } catch (error: any) {
    console.log('error is  ', error)
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    console.log('calling error ', error);
    return  error.response.data;
  }
};
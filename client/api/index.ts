import axios, { AxiosError } from 'axios';
import { ConsolidatedLoginDetail, ConsolidatedRegisterDetail, LoginRequestModel, RegisterRequestModel } from '../pages/models/auth.model';

// export const BASE_URL = 'http://localhost:5002/api/';
export const BASE_URL = 'https://tora-dev.ngrok.io/api/';


axios.defaults.baseURL = BASE_URL;

type ServerError = {
  error: string;
  msg: string;
  data: any;
};


export const login = async (params: LoginRequestModel): Promise<ConsolidatedLoginDetail> => {
    console.log(params)
  try {
      const res:ConsolidatedLoginDetail = await axios.post('user/login', {
          email: params.email,
          password: params.password
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

export const register = async (params:RegisterRequestModel): Promise<ConsolidatedRegisterDetail> => {
    console.log(params)
  try {
      const res:ConsolidatedRegisterDetail = await axios.post('user/register', {
          email: params.email,
          password: params.password,
          firstName: params.firstName,
          lastName: params.lastName,
          phoneNumber: params.phoneNumber,
          country: params.country,
      });
    return res;
  } catch (error: any) {
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

export const loginWithLN = async (): Promise<any> => {
  try {
    const res = await axios.get('user/login-lnurl');
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    console.log('calling error ', error);
  }
}
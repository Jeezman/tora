import axios, { AxiosError } from 'axios';
// import { BASE_URL } from '../constants';

export const BASE_URL = 'http://localhost:5002/api/';


axios.defaults.baseURL = BASE_URL;

type ServerError = {
  error: string;
};
type Data = {
  data: string;
};



export const login = async (data): Promise<any> => {
    console.log(data)
  try {
      const res = await axios.post<Data>('user/login', {
          email: data.email,
          password: data.password
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
    return { error };
  }
};

export const register = async (data): Promise<any> => {
    console.log(data)
  try {
      const res = await axios.post<Data>('user/register', {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          country: data.country,
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
    return { error };
  }
};
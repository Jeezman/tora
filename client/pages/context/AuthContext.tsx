import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { login, register } from '../../api';
import { storeData } from '../../util/storage';
import { LoginRequestModel, RegisterRequestModel } from '../models/auth.model';

interface Props {
  children: React.ReactNode;
}

interface IAuthContext {
  isLoggedIn: boolean;
  isLoading: boolean;
  handleLogin: (data: LoginRequestModel) => void;
  handleRegister: (data: RegisterRequestModel) => void;
}

const defaultState = {
  isLoggedIn: false,
  isLoading: false,
  handleLogin: (data: LoginRequestModel) => {},
  handleRegister: (data: RegisterRequestModel) => {}
};

export const AuthContext = React.createContext<IAuthContext>(defaultState);

export const AuthContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(defaultState.isLoggedIn);
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);

  const router = useRouter();

  const handleLogin = async (data: LoginRequestModel) => {
    setIsLoading(true);
    let response = await login(data);
    if (response.data) {
      const responseData = response?.data?.data;
      setIsLoading(false);
      storeData('token', responseData.token);
      router.push('/dashboard/');
    } else {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterRequestModel) => {
    setIsLoading(true);
    let response = await register(data);
    if (response.data) {
      setIsLoading(false);
      router.push('/');
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    handleLogin,
    handleRegister,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

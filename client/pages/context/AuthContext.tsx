import React, { useState, useEffect, useContext, useCallback } from 'react';
import Router, { useRouter } from 'next/router';
import { login, loginWithLN, register } from '../../api';
import { getData, storeData } from '../../util/storage';
import { LoginRequestModel, RegisterRequestModel } from '../models/auth.model';
import { io } from 'socket.io-client';
import { v4 } from 'uuid';
import LoadingScreen from '../../components/shared/LoadingScreen';
import { useGetBTCPrice } from '../../components/shared/useGetBTCPrice';

export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || '';

export const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  auth: {
    'client-id': v4().substring(0, 10),
  },
});

interface LNData {
  encoded: string;
  secret: string;
  url: string;
}

interface Props {
  children: React.ReactNode;
}

interface IAuthContext {
  isLoggedIn: boolean;
  isLoading: boolean;
  handleLogin: (data: LoginRequestModel) => void;
  handleRegister: (data: RegisterRequestModel) => void;
  handleLoginWithLN: () => void;
  lnData: LNData;
}

const defaultState = {
  isLoggedIn: false,
  isLoading: false,
  handleLogin: (data: LoginRequestModel) => {},
  handleRegister: (data: RegisterRequestModel) => {},
  handleLoginWithLN: () => {},
  lnData: { encoded: '', secret: '', url: '' },
};

export const AuthContext = React.createContext<IAuthContext>(defaultState);

export const AuthContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(defaultState.isLoggedIn);
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);
  const [lnAuth, setLnAuth] = useState({});
  const [lnData, setLnData] = useState(defaultState.lnData);

  const router = useRouter();


  const getEventsSocket = useCallback(() => {
    socket.on('auth', (arg: any) => {
      console.log('socket connected ', arg);

      if (arg.token) {
        storeData('token', arg.token);
        setIsLoading(false);
        setIsLoggedIn(true);
        router.push('/dashboard/');
      }
    });
  }, [router]);

  useEffect(() => {
    getEventsSocket();
  }, [getEventsSocket]);

  const handleLogin = async (data: LoginRequestModel) => {
    setIsLoading(true);
    let response = await login(data);
    if (response.data) {
      const responseData = response?.data?.data;
      setIsLoading(false);
      setIsLoggedIn(true);
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

  const handleLoginWithLN = async () => {
    let response = await loginWithLN();
    console.log('handleLoginWithLN response ', response.data);
    setLnData(response.data);
  };
  useEffect(() => {
    const _getData = async () => {
      let token = await getData('token');
      if (token && !isLoggedIn && router.pathname !== '/store/[store]') {
        setIsLoggedIn(true);
        router.push('/dashboard');
      }
    };
    _getData();
  }, [isLoggedIn]);

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    handleLogin,
    handleRegister,
    lnData,
    handleLoginWithLN,
    lnAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const OPEN_ROUTES = [
  '/',
  '/store/[store]',
  '/store/[store]/checkout',
]

export const ProtectRoute = ({ children }: any) => {
  const router = useRouter();

  console.log('Protected route ', router);

  const { isLoading, isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn && !OPEN_ROUTES.includes(router.pathname)) {
    console.log('calling Loading screen');
    return <LoadingScreen />;
  }
  return children;
};

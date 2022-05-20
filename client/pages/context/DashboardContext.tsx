import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createStore } from '../../api/store';
import { getData, storeData } from '../../util/storage';
import { StoreRequestModel } from '../models/store.model';

interface Props {
  children: React.ReactNode;
}

interface IDashboardContext {
  storeName: string;
  isLoading: boolean;
handleCreateStore: (data: StoreRequestModel) => void;
}

const defaultState = {
  storeName: '',
  isLoading: false,
  handleCreateStore: (data: StoreRequestModel) => {},
};

export const DashboardContext =
  React.createContext<IDashboardContext>(defaultState);

export const DashboardContextProvider = ({ children }: Props) => {
  const [storeName, setStoreName] = useState(defaultState.storeName);
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);

  const handleCreateStore = async (data: StoreRequestModel) => {
    setIsLoading(true);
    let response = await createStore(data);
    if (response.data) {
      const responseData = response?.data?.data;
      //   setIsLoading(false);
      //   storeData('token', responseData.token);
      //   router.push('/dashboard/');
    } else {
      setIsLoading(false);
    }
  };

  const contextValue = {
    storeName,
    isLoading,
    handleCreateStore,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

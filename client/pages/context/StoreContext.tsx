import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createStore, createProduct, fetchProducts } from '../../api/store';
import { getData, storeData } from '../../util/storage';
import { StoreRequestModel, ProductRequestModel } from '../models/store.model';

interface Props {
  children: React.ReactNode;
}

interface IStoreContext {
  storeName: string;
  isLoading: boolean;
  handleCreateStore: (data: StoreRequestModel) => void;
  handleAddProduct: (data: ProductRequestModel) => void;
  handleGetAllProducts: () => void;
  products: ProductRequestModel[]
}

const defaultState = {
  storeName: '',
  isLoading: false,
  products: [],
  handleCreateStore: (data: StoreRequestModel) => {},
  handleAddProduct: (data: ProductRequestModel) => {},
  handleGetAllProducts: () => {},
};

export const StoreContext = React.createContext<IStoreContext>(defaultState);

export const StoreContextProvider = ({ children }: Props) => {
  const [storeName, setStoreName] = useState(defaultState.storeName);
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);
  const [products, setProducts] = useState(defaultState.products);

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

  const handleAddProduct = async (data: ProductRequestModel) => {
    console.log('handleAddProduct ', data);
    let response = await createProduct(data);

      let isData = Object.keys(response.data);
      if (isData.length > 0) {
          handleGetAllProducts()
      }

    console.log('handleAddProduct ', { res: response.data, isData });
  };

  const handleGetAllProducts = async () => {
      let response = await fetchProducts();
      
    setProducts(response.data.products.data)
    setStoreName(response.data.name);
      console.log('handleGetAllProducts ', response)
  };

  const contextValue = {
    storeName,
    isLoading,
    products,
    handleCreateStore,
    handleAddProduct,
    handleGetAllProducts,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

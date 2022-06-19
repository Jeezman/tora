import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  createStore,
  createProduct,
  fetchProducts,
  fetchStore,
} from '../../api/store';
import { getData, storeData } from '../../util/storage';
import { StoreRequestModel, ProductRequestModel } from '../models/store.model';
import { addToCart, checkout, fetchCart, makePayment } from '../../api/cart';
import {
  CartRequestModel,
  CheckoutRequestModel,
  OrderDetailsModel,
  PaymentRequestResponse,
  PaymentRequestModel,
} from '../models/cart.model';

interface Props {
  children: React.ReactNode;
}
export interface CartItems {
  cartId: string;
  productId: number;
  buyerPubKey: null;
  buyerUsername: string;
  amount: number;
  itemCount: number;
  total: number;
  storeId: number;
}
interface IStoreContext {
  storeName: string;
  isLoading: boolean;
  handleCreateStore: (data: StoreRequestModel) => void;
  handleAddProduct: (data: ProductRequestModel) => void;
  handleGetAllProducts: (data: string|string[]) => string|string[];
  handleAddToCart: (data: CartRequestModel) => void;
  setStoreName: (data: string | string[]) => void;
  products: ProductRequestModel[];
  handleFetchCart: () => void;
  cartItems: CartItems[];
  isFetchingInvoice: boolean;
  orderDetails: OrderDetailsModel;
  orderTotal: number;
  addresses: PaymentRequestResponse;
  handleCartCheckout: (data: CheckoutRequestModel) => void;
  handlePayment: (data: PaymentRequestModel) => void;
}

const defaultState = {
  storeName: '',
  isLoading: false,
  products: [],
  handleCreateStore: (data: StoreRequestModel) => {},
  handleAddProduct: (data: ProductRequestModel) => {},
  handleGetAllProducts: (data: string|string[]) => data,
  setStoreName: (data:string|string[]) => {},
  handleFetchCart: () => { },
  cartItems: [],
  handleAddToCart: (data: CartRequestModel) => { },
  isFetchingInvoice: false,
  orderDetails: {
    orderId: '',
    email: '',
    phoneNumber: '',
    address: '',
  },
  orderTotal: 0,
  addresses: {
    bitcoinAddress: '',
    lnInvoice: '',
  },
  handleCartCheckout: async (data: CheckoutRequestModel) => { },
  handlePayment: (data: PaymentRequestModel) => { },
};

export const StoreContext = React.createContext<IStoreContext>(defaultState);

export const StoreContextProvider = ({ children }: Props) => {
  const [storeName, setStoreName] = useState(defaultState.storeName);
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);
  const [products, setProducts] = useState(defaultState.products);
  const [cartItems, setCartItems] = useState(defaultState.cartItems);
  const [isFetchingInvoice, setIsFetchingInvoice] = useState(
    defaultState.isFetchingInvoice
  );
  const [orderDetails, setOrderDetails] = useState(defaultState.orderDetails);
  const [orderTotal, setOrderTotal] = useState(defaultState.orderTotal);
  const [addresses, setAddresses] = useState(defaultState.addresses);


  const router = useRouter()

  useEffect(() => {
  }, []);

  useEffect(() => {
    const fetchStoreData = async () => {
      const res = await fetchStore();
      let token = getData('token');
      if (!!token) {
        if (res?.data?.length > 0) {
          setStoreName(res?.data[0]?.name)
        };
      }
    };

    if (router.pathname !== '/' && router.pathname !== '/store/[store]') fetchStoreData();
  }, [router.pathname]);

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
    let response = await createProduct(data);

    let isData = Object.keys(response.data);
    if (isData.length > 0) {
      handleGetAllProducts(storeName);
    }
  };

  const handleGetAllProducts = async (storeName: string) => {
    let response = await fetchProducts(storeName);

    if (response) {
      setProducts(response.data.products.data);
      setStoreName(response.data.name);
    }
  };

  const handleFetchCart =  useCallback(async () => {
    let res = await fetchCart();
    if (cartItems !== res.data) {
      setCartItems(res.data);
    }
  }, [cartItems]);

  const handleAddToCart = async (data: CartRequestModel) => {
    let res = await addToCart(data);
    handleFetchCart();
  };

  const handleCartCheckout = async (data: CheckoutRequestModel) => {
    setIsFetchingInvoice(true);
    let res = await checkout(data);
    await setOrderDetails(res.data.data.orderDetails);
    await setOrderTotal(res.data.data.orderTotal);
  };

  const handlePayment = useCallback(async (data: PaymentRequestModel) => {
    let req = {
      orderId: data.orderId,
      orderTotal: data.orderTotal,
      bitcoins: data.bitcoins,
      sats: data.sats,
    };
    let res = await makePayment(req);
    if (res?.data?.data) {
      setAddresses(res.data.data);
    }
    setIsFetchingInvoice(false);
    return res;
  }, []);

  const contextValue = {
    storeName,
    setStoreName,
    isLoading,
    products,
    handleCreateStore,
    handleAddProduct,
    handleGetAllProducts,
    handleFetchCart,
    cartItems,
    setCartItems,
    handleAddToCart,
    isFetchingInvoice,
    orderDetails,
    orderTotal,
    handleCartCheckout,
    addresses,
    handlePayment
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

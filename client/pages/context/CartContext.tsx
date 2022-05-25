import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
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


interface ICartContext {
  isLoading: boolean;
  handleAddToCart: (data: CartRequestModel) => void;
  handleFetchCart: () => void;
  handlePayment: (data: PaymentRequestModel) => void;
  handleCartCheckout: (data: CheckoutRequestModel) => void;
  cartItems: CartItems[];
  order: any[];
  orderDetails: OrderDetailsModel;
  orderTotal: number;
  addresses: PaymentRequestResponse;
  isFetchingInvoice: boolean;
}

const defaultState = {
  isLoading: false,
  handleAddToCart: (data: CartRequestModel) => { },
  handleFetchCart: () => { },
  handlePayment: (data: PaymentRequestModel) => { },
  handleCartCheckout: async (data: CheckoutRequestModel) => { },
  cartItems: [],
  order: [],
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
  isFetchingInvoice: false,
};

export const CartContext = React.createContext<ICartContext>(defaultState);

export const CartContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);
  const [cartItems, setCartItems] = useState(defaultState.cartItems);
  const [order, setOrder] = useState(defaultState.order);
  const [orderDetails, setOrderDetails] = useState(defaultState.orderDetails);
  const [orderTotal, setOrderTotal] = useState(defaultState.orderTotal);
  const [addresses, setAddresses] = useState(defaultState.addresses);
  const [isFetchingInvoice, setIsFetchingInvoice] = useState(
    defaultState.isFetchingInvoice
  );

  const router = useRouter();

  const handleAddToCart = async (data: CartRequestModel) => {
    let res = await addToCart(data);
    handleFetchCart();
  };
  const handleFetchCart = async () => {
    let res = await fetchCart();
    setCartItems(res.data);
  };

  const handleDeletefromCart = () => { };
  const handleClearCart = () => { };

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
      sats: data.sats,
    };
    let res = await makePayment(req);
    console.log('handlePayment res ', res);
    if (res?.data?.data) {
      setAddresses(res.data.data);
    }
    setIsFetchingInvoice(false);
    return res;
  }, []);

  const contextValue = {
    cartItems,
    setCartItems,
    isFetchingInvoice,
    addresses,
    isLoading,
    handleAddToCart,
    handleFetchCart,
    handleCartCheckout,
    order,
    orderDetails,
    orderTotal,
    handlePayment,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

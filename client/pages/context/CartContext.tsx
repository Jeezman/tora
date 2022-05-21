import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { addToCart, checkout, fetchCart, makePayment } from '../../api/cart';
import {
  CartRequestModel,
  CheckoutRequestModel,
  OrderDetailsModel,
  PaymentRequestResponse,
  PaymentRequestModel
} from '../models/cart.model';

interface Props {
  children: React.ReactNode;
}

interface ICartContext {
  isLoading: boolean;
  handleAddToCart: (data: CartRequestModel) => void;
  handleFetchCart: () => void;
  handlePayment: (data: PaymentRequestModel) => void;
  handleCartCheckout: (data: CheckoutRequestModel) => void;
  cartItems: any[];
  order: any[];
  orderDetails: OrderDetailsModel;
  orderTotal: number;
  addresses: PaymentRequestResponse,
  isFetchingInvoice: boolean
}

const defaultState = {
  isLoading: false,
  handleAddToCart: (data: CartRequestModel) => {},
  handleFetchCart: () => {},
  handlePayment: (data: PaymentRequestModel) => {},
  handleCartCheckout: async (data: CheckoutRequestModel) => {},
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
    bitcoinAddress: "",
    lnInvoice: ""
  },
  isFetchingInvoice: false
};

export const CartContext = React.createContext<ICartContext>(defaultState);

export const CartContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);
  const [cartItems, setCartItems] = useState(defaultState.cartItems);
  const [order, setOrder] = useState(defaultState.order);
  const [orderDetails, setOrderDetails] = useState(defaultState.orderDetails);
  const [orderTotal, setOrderTotal] = useState(defaultState.orderTotal);
  const [addresses, setAddresses] = useState(defaultState.addresses);
  const [isFetchingInvoice, setIsFetchingInvoice] = useState(defaultState.isFetchingInvoice)

  const router = useRouter();

  const handleAddToCart = async (data: CartRequestModel) => {
    let res = await addToCart(data);
    handleFetchCart();
  };
  const handleFetchCart = async () => {
    let res = await fetchCart();
    setCartItems(res.data);
  };

  const handleDeletefromCart = () => {};
  const handleClearCart = () => {};

  const handleCartCheckout = async (data: CheckoutRequestModel) => {
    setIsFetchingInvoice(true)
    checkout(data)
      .then((res) => {
        setOrderDetails(res.data.data.orderDetails);
        setOrderTotal(res.data.data.orderTotal);
      })
      .then((res) => {
        if (orderDetails) {
          let requestData = {
            orderId: orderDetails.orderId,
            orderTotal,
          };
          handlePayment(requestData)
        }
      });
  };

  const handlePayment = async (data: PaymentRequestModel) => {
    let req = {
      orderId: data.orderId,
      orderTotal: data.orderTotal,
    };
    let res = await makePayment(req);
    setAddresses(res.data.data);
    setIsFetchingInvoice(false)
    return res;
  };

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

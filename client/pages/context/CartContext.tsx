import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { addToCart, fetchCart } from '../../api/cart';
import { CartRequestModel } from '../models/cart.model';

interface Props {
  children: React.ReactNode;
}

interface ICartContext {
  isLoading: boolean;
  handleAddToCart: (data: CartRequestModel) => void;
  handleFetchCart: () => void;
  cartItems: any[];
}

const defaultState = {
  isLoading: false,
  handleAddToCart: (data: CartRequestModel) => {},
  handleFetchCart: () => {},
  cartItems: [],
};

export const CartContext = React.createContext<ICartContext>(defaultState);

export const CartContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);
  const [cartItems, setCartItems] = useState(defaultState.cartItems);

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
  const handleCartCheckout = () => {};

  const contextValue = {
    cartItems,
    setCartItems,
    isLoading,
    handleAddToCart,
    handleFetchCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

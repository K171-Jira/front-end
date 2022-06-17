import React, { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContextType, ICartItem } from '../models/CartContext';
import Mask from '../../masks/models/Mask';

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [items, setItems] = useState<ICartItem[]>(
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : []
  );

  const addItem = (newItem: ICartItem) => {
    const maskIndex = items.findIndex((item) => item.mask.id === newItem.mask.id);
    if (maskIndex != -1) {
      items[maskIndex].amount += newItem.amount;
      items[maskIndex].price += newItem.price;
      setItems([...items]);
      localStorage.setItem('cart', JSON.stringify([...items]));
    } else {
      setItems([...items, newItem]);
      localStorage.setItem('cart', JSON.stringify([...items, newItem]));
    }
  };

  const removeItem = (index: number) => {
    items.splice(index, 1);
    setItems([...items]);
    localStorage.setItem('cart', JSON.stringify([...items]));
  };

  const maskUpdated = (newMask: Mask) => {
    const maskIndex = items.findIndex((item) => item.mask.id === newMask.id);
    if (maskIndex != -1) {
      items[maskIndex].mask = { ...newMask };
      setItems([...items]);
      localStorage.setItem('cart', JSON.stringify([...items]));
    }
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, maskUpdated }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

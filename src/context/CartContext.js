import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
  setCartItems((prev) => {
    const existingItem = prev.find((i) => i.id === item.id);
    if (existingItem) {
      return prev.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      return [...prev, { ...item, quantity: 1 }];
    }
  });
};


  const clearCart = () => {
    setCartItems([]);
  };

  const removeItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && newQuantity > 0
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, clearCart, removeItem, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

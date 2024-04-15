import React, { useState, createContext } from 'react';

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartArray, setCartArray] = useState([]);


  return (
    <cartContext.Provider value={{ cartArray, setCartArray }}>
      {children}
    </cartContext.Provider>
  );
};



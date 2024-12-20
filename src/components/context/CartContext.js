import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0); 

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedDiscount = localStorage.getItem('discount');
    if (savedDiscount) {
      setDiscount(parseFloat(savedDiscount));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart)); 
    }
    localStorage.setItem('discount', discount); 
  }, [cart, discount]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
      )
    );
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart); 
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const calculateTotalBeforeDiscount = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const applyDiscount = (discountPercentage) => {
    const discountValue = parseFloat(discountPercentage);
    if (!isNaN(discountValue) && discountValue >= 0 && discountValue <= 100) {
      setDiscount(discountValue); 
    } else {
      alert("Please enter a valid discount percentage between 0 and 100.");
      setDiscount(0); 
    }
  };

  const calculateTotalAfterDiscount = () => {
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    return totalBeforeDiscount - (totalBeforeDiscount * (discount / 100));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        handleQuantityChange,
        removeFromCart,
        totalItems,
        discount,
        applyDiscount,
        calculateTotalBeforeDiscount,
        calculateTotalAfterDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
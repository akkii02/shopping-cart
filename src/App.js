import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from '../src/components/context/CartContext';
import Navbar from './components/Navbar/Navbar';
import ProductPage from './components/Product/ProductPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
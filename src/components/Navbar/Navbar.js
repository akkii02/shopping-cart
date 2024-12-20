import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Shop</Link>
      </div>
      <div className={styles.cart}>
        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className={styles.cartCount}>{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

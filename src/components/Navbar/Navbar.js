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
      <div className={styles.links}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/" className={styles.navLink}>Browse Categories</Link>
        <Link to="/" className={styles.navLink}>Offers</Link>
        <Link to="/" className={styles.navLink}>Contact Us</Link>
        <Link to="/cart" className={styles.cart}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className={styles.cartCount}>{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

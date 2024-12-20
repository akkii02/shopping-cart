import React from 'react';
import { useCart } from '../context/CartContext';
import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'Product A', price: 450, image: 'https://m.media-amazon.com/images/I/712XSsZUzYL._AC_UY218_.jpg' },
    { id: 2, name: 'Product B', price: 330, image: 'https://m.media-amazon.com/images/I/611AaVzaCQL._AC_UY218_.jpg' },
    { id: 3, name: 'Product C', price: 270, image: 'https://m.media-amazon.com/images/I/611AaVzaCQL._AC_UY218_.jpg' },
  ];

  return (
    <div className={styles.productPage}>
      <h1 className={styles.heading}>Our Products</h1>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productDetails}>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productPrice}>₹{product.price}</p>
              <button
                className={styles.addToCartBtn}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;

import { useCart } from '../context/CartContext';
import React, { useState } from 'react';
import styles from './ShoppingCart.module.css';

const ShoppingCart = () => {
  const {
    cart,
    handleQuantityChange,
    removeFromCart,
    discount,
    applyDiscount,
    calculateTotalBeforeDiscount,
    calculateTotalAfterDiscount
  } = useCart();
  
  const [discountInput, setDiscountInput] = useState(discount);

  const handleDiscountChange = (e) => {
    setDiscountInput(e.target.value); 
  };

  const handleDiscountApply = () => {
    applyDiscount(discountInput); 
  };

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.heading}>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <div>
          <ul className={styles.cartItems}>
            {cart.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <div className={styles.itemDetails}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>₹{item.price}</span>
                    <div className={styles.quantitySection}>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value, 10))
                        }
                        className={styles.quantityInput}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          
          <div className={styles.discountSection}>
            <input
              type="number"
              value={discountInput}
              onChange={handleDiscountChange}
              placeholder="Enter discount percentage"
              min="0"
              max="100"
              className={styles.discountInput}
            />
            <button onClick={handleDiscountApply} className={styles.discountBtn}>
              Apply Discount
            </button>
            {discount > 0 && (
              <p className={styles.discountApplied}>Discount applied: {discount}%</p>
            )}
          </div>

          <div className={styles.total}>
            <p>Total Before Discount: ₹{calculateTotalBeforeDiscount()}</p>
            {discount > 0 && <p>Discount: -₹{(calculateTotalBeforeDiscount() * (discount / 100)).toFixed(2)}</p>}
            <p>Total After Discount: ₹{calculateTotalAfterDiscount().toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

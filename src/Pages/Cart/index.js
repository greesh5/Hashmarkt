import React from 'react';
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import styles from './styles.module.css';

const Cart = () => {
  const { items, removeFromCart } = useCart();

  const subtotal = items.reduce((acc, obj) => acc + obj.price, 0).toFixed(1);

  return(
    <div className="flex justify-between items-center">
      <ul>
      {items.length < 1 && (
        <div className="flex flex-wrap max-w-7xl mx-auto my-4"> 
          <div className="w-full sm:w-2/2 md:w-2/2 xl:w-5/5 p-4 h-[500px] my-auto">
            <div className={styles.cardBg} >
              <ShoppingCartIcon className="h-40 w-40 mx-auto mt-10 text-slate-700" />
              <p className="text-xl text-black font-extralight tracking-widest text-center pt-6">
                There are no products in your cart.
              </p>
              <p className="text-center text-black mt-2 font-bold tracking-wide">
                Add the products you like to the cart and buy.
              </p>
              <Link to="/">
                <div className={styles.continueButton}>
                  <button className={styles.button}>
                    <span className={styles.buttonText}>Continue Shopping</span>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
      {items.map((item) => (
        <li className={styles.bgCart} key={item.id} width={"70%"}>
          <div className="flex items-center p-30 my-50">
            <img src={item.image} alt={item.title} className={styles.cardBg} width={"150 rem"}/> 
            <div className="flex flex-col ml-4 space-between">
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.price}>{`$${item.price}`}</p>
            </div>
            <button className={styles.buttonText} onClick={() => removeFromCart(item.id)}>
              <TrashIcon className="h-5 w-5 text-red-" />
            </button>
          </div>
        </li>
      ))}
      </ul>
      {items.length > 0 && (
        <div className={styles.bgCart} >
          <h3 className={styles.summaryTitle}>Order Summary</h3>
          <div className="flex justify-between items-center">
            <p className={styles.summaryText}>Subtotal</p>
            <p className={styles.summaryPrice}>{`$${subtotal}`}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className={styles.summaryText}>Shipping Estimate</p>
            <p className={styles.summaryPrice}>$5</p>
          </div>
          <div className="flex justify-between items-center">
            <p className={styles.summaryText}>Tax Estimate</p>
            <p className={styles.summaryPrice}>$5</p>
          </div>
          <div className="flex justify-between items-center">
            <p className={styles.summaryText}>Total: </p>
            <p className={styles.summaryPrice}>{`$${subtotal}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;


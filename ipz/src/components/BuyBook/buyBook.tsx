import React, { useState } from 'react';
import styles from './buyBook.module.css';
import { createOrder } from '../../API/Order/orderAPI';
import { toast, ToastContainer } from 'react-toastify';

interface BuyBookProps {
  book: {
    _id: string;
    name: string;
    author: string;
    genre: string;
  };
  onClose: () => void;
  token: string;
}

const BuyBook: React.FC<BuyBookProps> = ({ book, onClose, token }) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  
  const handleConfirmPurchase = async () => {
    try {
      if (!address || !phone || !paymentMethod) {
        setError('Please fill in all fields');
        toast.error('Please fill in all fields');
        return;
      }
      await createOrder(token, book._id, address, phone, paymentMethod);
      onClose();
      toast.success('Order created successfully');
    } catch (err) {
      setError('Failed to create order. Please try again.');
      toast.error('Failed to create order. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
        <ToastContainer />
      <h2 className={styles.title}>Confirm Book Purchase</h2>
      <h3 className={styles.bookInfo}>{book.name} by {book.author}</h3>

      <label className={styles.label}>Delivery Address</label>
      <textarea 
        className={styles.input} 
        placeholder="Enter your full address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></textarea>
  
      <label className={styles.label}>Phone Number</label>
      <input 
        type="tel" 
        pattern="38[0-9]{9}" 
        required 
        className={styles.input} 
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
  
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Payment Method</legend>
        <div className={styles.radioGroup}>
          <input 
            type="radio" 
            id="card" 
            name="payment" 
            value="card" 
            className={styles.radioInput}
            checked={paymentMethod === 'card'}
            onChange={() => setPaymentMethod('card')}
          />
          <label htmlFor="card" className={styles.radioLabel}>Card</label>
        </div>
        <div className={styles.radioGroup}>
          <input 
            type="radio" 
            id="cash" 
            name="payment" 
            value="cash" 
            className={styles.radioInput}
            checked={paymentMethod === 'cash'}
            onChange={() => setPaymentMethod('cash')}
          />
          <label htmlFor="cash" className={styles.radioLabel}>Cash</label>
        </div>
      </fieldset>
  
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={onClose}>Cancel</button>
        <button className={styles.button} onClick={handleConfirmPurchase}>Confirm Purchase</button>
      </div>
    </div>
  );
};

export default BuyBook;

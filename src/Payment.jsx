import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from './Payment.module.css';
import img18 from './Images/Screenshot 2024-04-08 120735.png';
import Navbar from './Homepage/Navbar';
import img17 from './Images/Screenshot 2024-04-04 161841.png';
import img19 from './Images/Screenshot 2024-04-04 162540.png';

function Payment({ cartItems }) {
  const [address, setAddress] = useState('');
  const userId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData'))._id : null;

  const handleSubmitOrder = async () => {
    try {
      if (!userId) {
        throw new Error('User ID not found');
      }

      // Fetch the existing cart from db.json
      const cartResponse = await fetch(`http://localhost:5000/cart/${userId}`);
      if (!cartResponse.ok) {
        throw new Error('Failed to fetch cart');
      }
      const cartData = await cartResponse.json();

      // Prepare order data
      const orderData = {
        userid: userId,
        address: address,
        cart: cartData.cartItems // Copy the cart from db.json
      };

      // Submit order to db.json
      const orderResponse = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to submit order');
      }

      // Delete ordered items from the cart
      for (const item of orderData.cart) {
        const deleteCartItemResponse = await fetch(`http://localhost:5000/cart/${item._id}`, {
          method: 'DELETE',
        });

        if (!deleteCartItemResponse.ok) {
          throw new Error('Failed to delete cart item');
        }
      }

      // Handle success (e.g., clear the cart)
      setAddress('');

    } catch (error) {
      console.error('Error submitting order:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="row">
          <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
            <form className="container">
              <div className="card">
                <div className="card-header">
                  <h2>Payment</h2>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <img src={img18} className={styles.card_img_top1} alt="Payment" />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input value={address} onChange={e => setAddress(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="card-footer">
                  <Link to="/order" type="button" className="btn btn-primary" onClick={handleSubmitOrder}>Submit</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <img src={img17} className={styles.kk} />
      <div className={styles.lineAboveImg}>
        <img src={img19} className={styles.kk1} />
      </div>
    </>
  );
}

export default Payment;

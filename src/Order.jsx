import React, { useState, useEffect } from 'react';
import Navbar from './Homepage/Navbar';
import styles from './Order.module.css';
import img17 from './Images/Screenshot 2024-04-04 161841.png';
import img18 from './Images/Screenshot 2024-04-04 162540.png';

function Order() {
  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loggedInUserID, setLoggedInUserID] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const userDataFromStorage = JSON.parse(localStorage.getItem('userData'));
    if (userDataFromStorage) {
      const userId = userDataFromStorage._id;
      setLoggedInUserID(userId);

      // Fetch orders for the logged-in user from the backend
      fetch(`http://localhost:5000/orders/${userId}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setOrderData(data.orders);
          }
        })
        .catch(error => console.error('Error fetching orders:', error));
      
      // Fetch all products to map product IDs to product details
      fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setProductData(data);
          }
        })
        .catch(error => console.error('Error fetching products:', error));
    }
  }, []);

  // Function to find product details by ID
  const findProductByID = (productId) => {
    return productData.find(product => product.pdid === productId);
  };

  return (
    <div>
      <Navbar />
      <h1 className='d-flex justify-content-center'>Order</h1>
      <div className="offset-lg-3 col-lg-6 mt-5">
        <div className="card-header"></div>
        <div className="card-body">
          {/* Render order data if available */}
          {orderData.length > 0 ? (
            orderData.map((order) => (
              <div key={order._id} className="mb-3 border rounded bg-light p-3">
                <div className="card-header">Order ID: {order._id}</div>
                <div className="card-body">
                  <p>User ID: {order.userid}</p>
                  <p>Address: {order.address}</p>
                  <p>Ordered Products:</p>
                  {/* Render cart-like component for each ordered product */}
                  {order.cart.map((item) => {
                    console.log(order.cart)
                    const product = findProductByID(item.pdid);
                    console.log(product)
                    return product ? (
                      <div key={item._id} className="cart">
                        {/* Render product image */}
                        <img src={product.image} alt={product.description} className="cart-image" />
                        {/* Render product details */}
                        <div className="cart-details">
                          <p>Product ID: {product.pdid}</p>
                          <p>Category: {product.category}</p>
                          <p>Brand: {product.brand}</p>
                          <p>Description: {product.description}</p>
                          <p>Price: {product.price}</p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ) : (
                      <p key={item._id}>Product details not found</p>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <p>No orders found for this user.</p>
          )}
        </div>
      </div>
      <img src={img17} className={styles.kk} />
      <div className={styles.lineAboveImg}>
        <img src={img18} className={styles.kk1} />
      </div>
    </div>
  );
}

export default Order;

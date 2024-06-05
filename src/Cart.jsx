import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import styles from './Cart.module.css';
import { MdDelete } from "react-icons/md";
import Navbar from './Homepage/Navbar';
import img17 from './Images/Screenshot 2024-04-04 161841.png';
import img18 from './Images/Screenshot 2024-04-04 162540.png';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    console.log(userData);
    if (userData && userData._id) {
      fetch(`http://localhost:5000/cart/${userData._id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch cart data');
          }
          return response.json();
        })
        .then(data => {
          // console.log(data);
          setCartItems(data.cartItems);
          fetchProducts();
        })
        .catch(error => {
          console.error('Error fetching cart data:', error);
        });
    }
  }, [userData]);

  useEffect(() => {
    const quantitiesObj = {};
    cartItems && cartItems.forEach(item => {
      quantitiesObj[item._id] = item.quantity;
    });
    setQuantities(quantitiesObj);
  }, [cartItems]);

  const fetchProducts = () => {
    fetch('http://localhost:5000/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        return response.json();
      })
      .then(data => {
        // console.log(data)
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  };

  const deleteCartItem = (itemId) => {
    console.log(itemId)
    fetch(`http://localhost:5000/cart/${itemId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete item from database');
      }
      setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== itemId));
    })
    .catch(error => {
      console.error('Error deleting item from database:', error);
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: newQuantity
    }));

    fetch(`http://localhost:5000/cart/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update quantity in database');
      }
    })
    .catch(error => {
      console.error('Error updating quantity in database:', error);
    });
  };

  const getProductDetails = (productId) => {
    return products.find(prod => prod.pdid === productId);
  };

  return (
    <>
      <Navbar />
      <h1 className={styles.s}>Cart</h1>
      {userData ? (
        <div className={styles.productGrid}>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map(item => {
              const product = getProductDetails(item.pdid);
              console.log(product)
              return (
                <div key={item._id} className={`card ${styles.productCard}`}>
                  <div className={styles.productImage}>
                    {product ? (
                      <>
                        <img src={product.image} className={`card-img-top ${styles.card_img_top}`} alt={product.description} />
                        <h5 className={styles.p}>{product.brand}</h5>
                        <p>Description: {product.description}</p>
                        <p>Price: {product.price}</p>
                        <div className="quantity-controls mt-3 d-flex align-items-center">
                          <p className="m-0 ps-3">Qtn.</p>
                          <div className="btn-group" role="group" aria-label="Quantity">
                            <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(item._id, Math.max(1, quantities[item._id] - 1))}>-</button>
                            <span className="px-3">{quantities[item._id]}</span>
                            <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(item._id, (quantities[item._id] || 0) + 1)}>+</button>
                          </div>
                          <p><span className={styles.hh} onClick={() => deleteCartItem(item._id)}><MdDelete /></span></p>
                        </div>
                      </>
                    ) : (
                      <p>Loading product details...</p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      ) : (
        <p>Please log in to view your cart.</p>
      )}
      <div className={styles.placeOrderContainer}>
        <Link to="/payment" className="btn d-flex align-items-center btn-lg mt-2 mx-3" style={{ width: '150px', backgroundColor: '#FFA41C' }}>Place order</Link>
      </div>
      <img src={img17} className={styles.kk} />
      <div className={styles.lineAboveImg}>
        <img src={img18} className={styles.kk1} />
      </div>
    </>
  );
}

export default Cart;

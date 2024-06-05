import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import styles from './Porder1.module.css';
import img13 from '../Images/71GY246XqyL._AC_UL320_.jpg';
import img14 from '../Images/Screenshot 2024-04-07 114934.png';
import { IoMdCart } from "react-icons/io";
import img1 from '../Images/e-commerce-logo-with-pointer-and-shopping-bag-free-vector.jpg';
import { IoSearch } from "react-icons/io5";
import img17 from '../Images/Screenshot 2024-04-04 161841.png';
import img18 from '../Images/Screenshot 2024-04-04 162540.png';

function Porder1() {
  const [product, setProduct] = useState(null);
const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          console.log(data[0])
          setProduct(data[0]);
        } else {
          throw new Error('No products found');
        }
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  useEffect(() => {
    let user = localStorage.getItem('userData');
    user = JSON.parse(user);
    if (user) {
      fetch(`http://localhost:5000/cart?userid=${user._id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch cart data');
          }
          return response.json();
        })
        .then(data => {
          if(data.success == true){
            setCartItems(data.cartItems);
            console.log(data)
          }
        })
        .catch(error => {
          console.error('Error fetching cart data:', error);
        });
    }
  }, []);

  const addToCart = () => {
    // Check if userData is present in localStorage
    const userData = localStorage.getItem('userData');
    if (!userData) {
      // If userData is not present, display a message prompting the user to log in
      alert('Please log in to add items to your cart.');
      navigate('/login'); // Redirect to the login page
      return;
    }
  
    // Parse userData
    const user = JSON.parse(userData);
  
    if (!product) {
      console.error('No product available to add to cart');
      return;
    }

    const existingItem = cartItems.find(item => item.pdid === product.pdid);
    
    if (existingItem) {
      // If the product already exists in the cart, update its quantity
      const updatedCartItems = cartItems.map(item => {
        if (item.pdid === existingItem.pdid) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCartItems);

      // Send request to update quantity in the database
      fetch(`http://localhost:5000/cart/${existingItem._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: existingItem.quantity + 1 }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update quantity in database');
          }
          return response.json()
        })
        .then(data => {
          console.log('Item added to cart:', data);
          navigate('/cart'); // Navigate to the cart page
        })
        .catch(error => {
          console.error('Error updating quantity in database:', error);
        });
    } else {
      // If the product is not in the cart, add it with quantity 1
      const newItem = {
        userid: user._id,
        pdid: product.pdid,
        quantity: 1
        // Add other properties as needed
      };
      setCartItems([...cartItems, newItem]);

      // Send request to add item to the database
      fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Item added to cart:', data);
          navigate('/cart'); // Navigate to the cart page
        })
        .catch(error => {
          console.error('Error adding item to cart:', error);
        });
    }
  };

  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user data exists in local storage
    const userData = localStorage.getItem('userData');
    setIsLoggedIn(!!userData); // Update isLoggedIn state based on the existence of user data
  }, []);

  const handleLogout = () => {
    // Remove the user data from local storage
    localStorage.removeItem('userData');
    setIsLoggedIn(false); // Update isLoggedIn state
    toggleLogoutConfirmation(); // Close logout confirmation dialog
  };

  const toggleLogoutConfirmation = () => {
    setShowLogoutConfirmation(!showLogoutConfirmation);
  };



  return (
    <>
     <div>
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              <a className="nav-link active" aria-current="page" href="#"><img src={img1} className="flip-image" style={{ width: '120px', height: '90px' }} alt="logo" /></a>
          <h1 className=" text-white my-4 ">E-commerce</h1>
            </div>
            <div className='but' style={{ paddingRight: '50px', marginLeft: 'auto' }}>
              <Link to="/order" className="a nav-link" href="#">ORDERS</Link>
              <Link to="/cart" className="cart-link"><IoMdCart className='cart-icon mx-5 bs-primary' size={40} style={{ color: 'white' }} /></Link>
              {!isLoggedIn && <Link to="/login" className="btn btn-md btn-primary mx-4 px-4">LOGIN</Link>}
              {isLoggedIn && <button onClick={toggleLogoutConfirmation} className="btn btn-primary mx-4 px-4">LOGOUT</button>}
              {!isLoggedIn && <Link to="/signup" className="btn btn-primary px-4">Signup</Link>}
            </div>
          </div>
        </div>
      </nav>
      {showLogoutConfirmation && (
        <div className="alert alert-danger" role="alert">
          Are you sure you want to logout?
          <button onClick={handleLogout} className="btn btn-danger mx-2">Yes</button>
          <button onClick={toggleLogoutConfirmation} className="btn btn-secondary">Cancel</button>
        </div>
      )}
    </div>
      <div>
        {product && (
          <div className={styles.card8}>
            <img src={img13} className={styles.card_img_top5} alt="Jeans" />
            <div className={styles.card9}>
              <p>Brand: {product.brand}</p>
              <h2>{product.description}</h2>
              <div className={styles.line}>
                <div className={styles.line1}>
                  <p>-70%</p>
                  <h5>{product.price}</h5>
                </div>
                <p>M.R.P: ₹2,199</p>
                <p>Inclusive of all taxes</p>
                <div className={styles.line}></div>
                <img src={img14} className={styles.card_img_top6} />
                <div className='d-flex'>
                  <button onClick={addToCart} className="btn d-flex align-items-center btn-lg mt-2" style={{ width: '150px', backgroundColor: '#FFA41C' }}>Add to cart</button>
                 
                </div>
              </div>
            </div>
          </div>
        )}
        
      <img src={img17} className={styles.kk} />
      <div className={styles.lineAboveImg}>
        <img src={img18} className={styles.kk1} />
      </div>
      </div>
    </>
  );
}

export default Porder1;

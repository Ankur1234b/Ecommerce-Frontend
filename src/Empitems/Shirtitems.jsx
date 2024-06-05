import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import styles from './Shirtitems.module.css';
import img17 from '../Images/Screenshot 2024-04-04 161841.png';
import img18 from '../Images/Screenshot 2024-04-04 162540.png';
import { IoMdCart } from "react-icons/io";
import img1 from '../Images/e-commerce-logo-with-pointer-and-shopping-bag-free-vector.jpg';
import { IoSearch } from "react-icons/io5";

const Body = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (product) => {
    console.log('Selected Product Details:');
    console.log({
      Brand: product.brand,
      Description: product.description,
      Price: product.price,
      Link: product.link
    });
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
    <> <div>
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
      <Link to="/" className="home-link"><IoHome /></Link>
      <div className={styles.container}>
        <h1 className={styles.s}>SHIRT</h1>
        <div className={styles.productGrid}>
          {products
            .filter(product => ['pd5', 'pd6', 'pd7', 'pd8'].includes(product.pdid) && !product.disabled) // Filter products based on pdid and disable flag
            .map(product => (
              <div key={product.pdid} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image} className={styles.card_img_top5} alt={product.description} />
                </div>
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>{product.brand}</h5>
                  <p className={styles.card_text}>{product.description}</p>
                  <p>{product.price}</p>
                  <Link
                    to={product.link}
                    className={`btn btn-primary ${styles.card_link}`}
                    onClick={() => handleViewDetails(product)}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
      <img src={img17} className={styles.kk} />
      <div className={styles.lineAboveImg}>
        <img src={img18} className={styles.kk1} />
      </div>
    </>
  );
};

export default Body;

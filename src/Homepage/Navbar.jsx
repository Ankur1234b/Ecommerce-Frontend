import React, { useState, useEffect } from 'react';
import { IoMdCart } from "react-icons/io";
import img1 from '../Images/e-commerce-logo-with-pointer-and-shopping-bag-free-vector.jpg';
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

function Navbar() {
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
  );
}

export default Navbar;

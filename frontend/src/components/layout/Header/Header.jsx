import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // You can create this CSS file for styling
import logo from "../../../images/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt='E-com' className="logo-img"/>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/search" className="nav-links">
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/aboutus" className="nav-links">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-links">
              Cart
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-links">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-links">
              Products
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

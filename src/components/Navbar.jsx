import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import LogoImg from '../assets/images/logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src={LogoImg} alt="Logo" className="navbar-logo" />
        <div className="logo-text"><i className="fas fa-shopping-bag"></i> Buy&Get</div>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>

      <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/" onClick={() => setIsOpen(false)}><i className="fas fa-home"></i> Home</Link></li>
          <li><Link to="/categories" onClick={() => setIsOpen(false)}><i className="fas fa-th-large"></i> Categories</Link></li>
          <li><Link to="/deals" onClick={() => setIsOpen(false)}><i className="fas fa-tag"></i> Deals</Link></li>
          <li><Link to="/cart" onClick={() => setIsOpen(false)}><i className="fas fa-shopping-cart"></i> Cart</Link></li>
          <li><Link to="/profile" onClick={() => setIsOpen(false)}><i className="fas fa-user"></i> Profile</Link></li>
          <li><Link to="/settings" onClick={() => setIsOpen(false)}><i className="fas fa-cog"></i> Settings</Link></li>
        </ul>
      </nav>

      <div className="search">
        <input type="text" placeholder="Search..." />
        <i className="fas fa-search"></i>
      </div>
    </header>
  );
};

export default Navbar;

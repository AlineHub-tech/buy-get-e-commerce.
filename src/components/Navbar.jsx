import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; 
import LogoImg from '../assets/images/logo.jpg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-content container">
          
          {/* 1. Logo */}
          <Link to="/" className="logo-section" onClick={closeMenu}>
            <div className="logo-img-wrapper">
                <img src={LogoImg} alt="Logo" className="nav-logo-img" />
            </div>
            <span className="logo-text">Buy<span>&</span>Get</span>
          </Link>

          {/* 2. Advanced Search */}
          <div className="nav-search-wrapper">
            <div className="cat-select-box">
              <select defaultValue="All">
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Laptops">Laptops</option>
              </select>
              <i className="fas fa-chevron-down"></i>
            </div>
            <input type="text" placeholder="Search for products..." />
            <button className="nav-search-btn"><i className="fas fa-search"></i></button>
          </div>

          {/* 3. Desktop Navigation (Ifite Icons zose) */}
          <nav className="nav-desktop">
            <ul className="nav-links">
              <li>
                <Link to="/">
                  <i className="fas fa-home"></i> 
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/Shop">
                  <i className="fas fa-th-large"></i> 
                  <span>Shop</span>
                </Link>
              </li>
              <li>
                <Link to="/deals">
                  <i className="fas fa-bolt"></i> 
                  <span>Deals</span>
                </Link>
              </li>
              <li className="cart-nav-item">
                <Link to="/cart">
                  <div className="cart-badge-wrapper">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-badge">3</span>
                  </div>
                  <span>Cart</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="nav-login-btn">
                  <i className="fas fa-sign-in-alt"></i> 
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* 4. Mobile Actions (Hamburger Menu) */}
          <div className="mobile-actions">
             <Link to="/cart" className="mobile-cart-link">
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-badge">3</span>
             </Link>
             <button className="menu-toggle-btn" onClick={toggleMenu}>
                <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
             </button>
          </div>

        </div>

        {/* 5. Mobile Sidebar (Ifite Icons zose) */}
        <div className={`mobile-sidebar ${isMenuOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-logo">Buy<span>&</span>Get</div>
            <i className="fas fa-times close-sidebar" onClick={closeMenu}></i>
          </div>
          
          <ul className="sidebar-links">
            <li><Link to="/" onClick={closeMenu}><i className="fas fa-home"></i> Home</Link></li>
            <li><Link to="/Shop" onClick={closeMenu}><i className="fas fa-th-large"></i> Shop</Link></li>
            <li><Link to="/deals" onClick={closeMenu}><i className="fas fa-bolt"></i> Hot Deals</Link></li>
            <li><Link to="/cart" onClick={closeMenu}><i className="fas fa-shopping-cart"></i> My Cart <span className="side-badge">3</span></Link></li>
            <li className="side-login-item">
              <Link to="/login" onClick={closeMenu} className="side-login-link">
                <i className="fas fa-sign-in-alt"></i> Login / Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {isMenuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
      </header>
    </>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        
        {/* 1. Brand & About */}
        <div className="footer-column brand-info">
          <h2 className="footer-logo">Buy<span>&</span>Get</h2>
          <p className="footer-desc">
            Your trusted partner for high-quality products in Rwanda. We bring the best deals directly to your doorstep with speed and security.
          </p>
          <div className="footer-contact">
              <p><i className="fas fa-location-dot"></i> Kigali, Rwanda</p>
              <p><i className="fas fa-phone"></i> +250 796 023 452</p>
              <p><i className="fas fa-envelope"></i> info@buyandget.rw</p>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div className="footer-column">
          <h3 className="column-title">Company</h3>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">Help & FAQ</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* 3. Categories */}
        <div className="footer-column">
          <h3 className="column-title">Shop Categories</h3>
          <ul className="footer-links">
            <li><Link to="/categories/electronics">Electronics</Link></li>
            <li><Link to="/categories/fashion">Fashion & Apparel</Link></li>
            <li><Link to="/categories/home">Home & Living</Link></li>
            <li><Link to="/categories/beauty">Beauty & Health</Link></li>
            <li><Link to="/deals">Flash Sales</Link></li>
          </ul>
        </div>

        {/* 4. Newsletter & Social */}
        <div className="footer-column">
          <h3 className="column-title">Join Our Newsletter</h3>
          <p className="newsletter-text">Get updates on new arrivals and special offers.</p>
          <form className="footer-newsletter">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Join</button>
          </form>
          
          <div className="footer-social">
            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-whatsapp"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container bottom-content">
          <p className="copyright">
            &copy; {new Date().getFullYear()} <strong>Buy&Get</strong>. All rights reserved.
          </p>
          
          <div className="payment-methods">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <span className="momo-badge">MoMo</span>
          </div>

          <p className="dev-by">
            Built with ❤️ by <a href="https://byte-flow-ltd.vercel.app/" target="_blank" rel="noreferrer">ByteFlow</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

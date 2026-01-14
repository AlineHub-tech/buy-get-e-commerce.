import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2><i className="fas fa-shopping-bag"></i> Buy&Get</h2>
          <p>
            Dukora ubucuruzi bw'ikoranabuhanga (e-commerce) mu Rwanda. Twishimiye kukugezaho ibicuruzwa byiza ku giciro cyiza.
          </p>
          <div className="contact-info">
              <span><i className="fas fa-map-marker-alt"></i> Kigali, Rwanda</span>
              <span><i className="fas fa-phone"></i> +250 796023452</span>
              <span><i className="fas fa-envelope"></i> info@buyandget.rw</span>
          </div>
        </div>

        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-section categories">
            <h2>Categories</h2>
             <ul>
                <li><Link to="/categories/electronics">Electronics</Link></li>
                <li><Link to="/categories/fashion">Fashion</Link></li>
                <li><Link to="/categories/groceries">Groceries</Link></li>
                <li><Link to="/categories/home">Home & Decor</Link></li>
            </ul>
        </div>

        <div className="footer-section social">
          <h2>Dukurikire</h2>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
          
          <div className="newsletter-signup">
              <h3>Subscribe kuri Newsletter</h3>
              <form>
                  <input type="email" placeholder="Email yawe..." />
                  <button type="submit">Subscribe</button>
              </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Buy&Get E-commerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

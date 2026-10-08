import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { categories } from '../data/products';

const Footer = () => (
    <footer className="site-footer">
        <div className="container footer-grid">
            <div className="footer-column brand-info">
                <Link to="/" className="footer-logo">Buy<span>&amp;</span>Get</Link>
                <p className="footer-desc">Phones, computers and everyday technology, brought together for shoppers in Rwanda.</p>
                <p className="footer-location"><i className="fas fa-map-marker-alt" aria-hidden="true" /> Rwanda</p>
            </div>
            <div className="footer-column">
                <h2 className="column-title">Shop</h2>
                <ul className="footer-links">
                    <li><Link to="/">Home</Link></li><li><Link to="/shop">All products</Link></li><li><Link to="/deals">Current deals</Link></li><li><Link to="/track-order">Track an order</Link></li>
                </ul>
            </div>
            <div className="footer-column">
                <h2 className="column-title">Categories</h2>
                <ul className="footer-links">
                    {categories.slice(0, 5).map((category) => <li key={category.id}><Link to={`/shop?category=${category.id}`}>{category.name}</Link></li>)}
                </ul>
            </div>
            <div className="footer-column">
                <h2 className="column-title">Need help?</h2>
                <p className="footer-desc">For product and delivery questions, please contact the Buy &amp; Get team through your usual customer-service channel.</p>
            </div>
        </div>
        <div className="footer-bottom"><div className="container bottom-content"><p>&copy; {new Date().getFullYear()} <strong>Buy &amp; Get</strong></p><p>Electronics &amp; accessories in Rwanda</p></div></div>
    </footer>
);

export default Footer;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import LogoImg from '../assets/images/logo.jpeg';
import { useCart } from '../context/cartStore';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [search, setSearch] = useState('');
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const submitSearch = (event) => {
        event.preventDefault();
        navigate(`/shop?q=${encodeURIComponent(search.trim())}`);
        setIsMenuOpen(false);
    };

    const closeMenu = () => setIsMenuOpen(false);
    const cartLabel = cartCount > 0 ? `Cart, ${cartCount} items` : 'Cart';

    return (
        <>
            <header className="navbar-container">
                <div className="navbar-content container">
                    <Link to="/" className="logo-section" onClick={closeMenu} aria-label="Buy and Get home">
                        <span className="logo-img-wrapper"><img src={LogoImg} alt="" className="nav-logo-img" /></span>
                        <span className="logo-text">Buy<span>&amp;</span>Get</span>
                    </Link>
                    <form className="nav-search-wrapper" role="search" onSubmit={submitSearch}>
                        <input aria-label="Search products" type="search" placeholder="Search phones, laptops, accessories..." value={search} onChange={(event) => setSearch(event.target.value)} />
                        <button className="nav-search-btn" type="submit" aria-label="Search"><i className="fas fa-search" aria-hidden="true" /></button>
                    </form>
                    <nav className="nav-desktop" aria-label="Main navigation">
                        <ul className="nav-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/deals">Deals</Link></li>
                            <li><Link to="/track-order">Track order</Link></li>
                            <li><Link className="nav-cart-link" to="/cart" aria-label={cartLabel}><i className="fas fa-shopping-bag" aria-hidden="true" /> Cart{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</Link></li>
                        </ul>
                    </nav>
                    <div className="mobile-actions">
                        <Link to="/shop" className="mobile-search-link" aria-label="Search products"><i className="fas fa-search" aria-hidden="true" /></Link>
                        <Link to="/cart" className="mobile-cart-link" aria-label={cartLabel}><i className="fas fa-shopping-bag" aria-hidden="true" />{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</Link>
                        <button className="menu-toggle-btn" type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
                            <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} aria-hidden="true" />
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="mobile-sidebar">
                        <form className="mobile-search" role="search" onSubmit={submitSearch}>
                            <input aria-label="Search products" type="search" placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)} />
                            <button type="submit" aria-label="Search"><i className="fas fa-search" aria-hidden="true" /></button>
                        </form>
                        <nav aria-label="Mobile navigation">
                            <Link to="/" onClick={closeMenu}>Home</Link>
                            <Link to="/shop" onClick={closeMenu}>Shop all</Link>
                            <Link to="/shop?category=phones" onClick={closeMenu}>Phones</Link>
                            <Link to="/shop?category=laptops" onClick={closeMenu}>Laptops</Link>
                            <Link to="/deals" onClick={closeMenu}>Deals</Link>
                            <Link to="/track-order" onClick={closeMenu}>Track order</Link>
                            <Link to="/cart" onClick={closeMenu}>Cart ({cartCount})</Link>
                        </nav>
                    </div>
                )}
            </header>
            {isMenuOpen && <button className="nav-overlay" type="button" aria-label="Close navigation menu" onClick={closeMenu} />}
        </>
    );
};

export default Navbar;

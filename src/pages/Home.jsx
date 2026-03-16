import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlide';
import '../styles/Home.css'; 

// --- 1. IMAGE IMPORTS (Sigaho izo wari ufite) ---
import ElectronicsImg from '../assets/images/images7.jpeg';
import FashionImg from '../assets/images/8.png';
import HomeImg from '../assets/images/images21.jpeg'; 
import LaptopImg from '../assets/images/images6.jpeg';
import ShoesImg from '../assets/images/12.png';
import WatchImg from '../assets/images/ekuter3.jpg';
import SofaImg from '../assets/images/shoo6.jpeg';
import CameraImg from '../assets/images/camera_pro.jpg'; 
import PrinterImg from '../assets/images/printer_hp.jpg'; 
import HeadphonesImg from '../assets/images/headphones_sony.jpg'; 
import TabletImg from '../assets/images/tablet_samsung.jpg'; 

// --- 2. DATA CONFIGURATION ---
const categoriesData = [
    { id: 1, name: 'Electronics', img: ElectronicsImg },
    { id: 2, name: 'Fashion', img: FashionImg },
    { id: 3, name: 'Home', img: HomeImg },
    { id: 4, name: 'Laptops', img: LaptopImg },
    { id: 5, name: 'Watches', img: WatchImg },
];

const featuredProducts = [
    { id: 1, name: 'MacBook Pro M2', img: LaptopImg, price: 1550000, stock: 12, rating: 4.9, cat: 'Laptops' },
    { id: 2, name: 'Nike Air Max', img: ShoesImg, price: 85000, stock: 45, rating: 4.5, cat: 'Fashion' },
    { id: 3, name: 'Rolex Oyster', img: WatchImg, price: 450000, stock: 4, rating: 4.9, cat: 'Accessories' },
    { id: 4, name: 'Modern Sofa Set', img: SofaImg, price: 500000, stock: 2, rating: 4.2, cat: 'Home' },
];

const latestProducts = [
    { id: 6, name: 'Sony Alpha Camera', img: CameraImg, price: 1200000, stock: 8, rating: 4.8 },
    { id: 7, name: 'HP Wireless Printer', img: PrinterImg, price: 180000, stock: 50, rating: 4.0 },
    { id: 8, name: 'Sony Headphones', img: HeadphonesImg, price: 250000, stock: 15, rating: 4.7 },
    { id: 9, name: 'Samsung Galaxy Tab', img: TabletImg, price: 450000, stock: 25, rating: 4.4 },
    { id: 11, name: 'Smart Security Cam', img: CameraImg, price: 95000, stock: 30, rating: 4.5 },
    { id: 12, name: 'Gaming Console', img: ElectronicsImg, price: 650000, stock: 10, rating: 4.9 },
];

const Home = () => {
    
    // Function yo guhindura igiciro mu buryo busomeka (RWF)
    const formatPrice = (price) => {
        return new Intl.NumberFormat('rw-RW', { 
            style: 'currency', 
            currency: 'RWF',
            maximumFractionDigits: 0 
        }).format(price);
    };

    // Reusable Component: Product Card
    const renderProduct = (item) => (
        <div className="product-card" key={item.id}>
            <div className="card-top">
                <Link to={`/product/${item.id}`}>
                    <img src={item.img} alt={item.name} loading="lazy" />
                </Link>
                {item.stock < 10 && <span className="stock-tag">Low Stock</span>}
                <button className="cart-quick-btn" title="Add to Cart">
                    <i className="fas fa-shopping-bag"></i>
                </button>
            </div>

            <div className="card-details">
                <div className="card-header">
                    <span className="card-cat">{item.cat || 'New'}</span>
                    <div className="card-rating">
                        <i className="fas fa-star"></i> {item.rating}
                    </div>
                </div>
                <Link to={`/product/${item.id}`} className="card-title">
                    {item.name}
                </Link>
                <div className="card-footer">
                    <span className="card-price">{formatPrice(item.price)}</span>
                    <div className="stock-mini-bar">
                        <div 
                            className="fill" 
                            style={{ width: `${(item.stock / 50) * 100}%`, backgroundColor: item.stock < 10 ? '#ff4757' : '#2ed573' }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="home-page-container">
            {/* 1. HERO SLIDER */}
            <HeroSlider />

            <div className="main-layout container">
                
                {/* 2. CIRCULAR CATEGORIES */}
                <section className="home-section">
                    <div className="section-title-area">
                        <h2>Top Categories</h2>
                        <Link to="/categories" className="see-all-link">See All</Link>
                    </div>
                    <div className="category-scroll-wrapper">
                        {categoriesData.map(cat => (
                            <Link to={`/categories?name=${cat.name}`} className="cat-item" key={cat.id}>
                                <div className="cat-img-circle">
                                    <img src={cat.img} alt={cat.name} />
                                </div>
                                <span>{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 3. FEATURED PRODUCTS (GRID) */}
                <section className="home-section">
                    <div className="section-title-area">
                        <h2>Trending Deals</h2>
                        <p>Specially selected products for you</p>
                    </div>
                    <div className="modern-product-grid">
                        {featuredProducts.map(renderProduct)}
                    </div>
                </section>

                {/* 4. MID-PAGE PROMO BANNER */}
                <div className="marketing-banner">
                    <div className="banner-info">
                        <span>New Collection</span>
                        <h2>Level Up Your Style</h2>
                        <p>Get the latest electronics and fashion with free delivery in Kigali.</p>
                        <button className="banner-btn">Explore Now</button>
                    </div>
                </div>

                {/* 5. LATEST PRODUCTS (GRID) */}
                <section className="home-section">
                    <div className="section-title-area">
                        <h2>Just Arrived</h2>
                    </div>
                    <div className="modern-product-grid">
                        {latestProducts.map(renderProduct)}
                    </div>
                </section>

            </div>

            {/* 6. FOOTER NEWSLETTER (OPTIONAL) */}
          
        </div>
    );
};

export default Home;

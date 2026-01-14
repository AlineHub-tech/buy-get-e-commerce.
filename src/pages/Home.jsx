import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlide';
import '../styles/Home.css'; // Style for this page
// Import all necessary images
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


// Sample Data (Ubu twongereyemo rating na stock)
const categoriesData = [
    { id: 1, name: 'Electronics', img: ElectronicsImg },
    { id: 2, name: 'Fashion', img: FashionImg },
    { id: 3, name: 'Home Essentials', img: HomeImg },
    { id: 4, name: 'Laptops', img: LaptopImg },
    { id: 5, name: 'Accessories', img: WatchImg },
];

const featuredProducts = [
    // Twahinduye price iba number (integer) yo kubara no kwereka Frw
    { id: 1, name: 'High-end Laptop', img: LaptopImg, price: 1200000, stock: 15, rating: 4.8 },
    { id: 2, name: 'Stylish Shoes', img: ShoesImg, price: 80000, stock: 45, rating: 4.5 },
    { id: 3, name: 'Luxury Watch', img: WatchImg, price: 250000, stock: 5, rating: 4.9 }, 
    { id: 4, name: 'Comfortable Sofa', img: SofaImg, price: 500000, stock: 22, rating: 4.2 },
];

const latestProducts = [
    { id: 6, name: 'Pro DSLR Camera', img: CameraImg, price: 950000, stock: 8, rating: 4.7 },
    { id: 7, name: 'HP Wireless Printer', img: PrinterImg, price: 150000, stock: 50, rating: 4.0 },
    { id: 8, name: 'Noise-Cancelling HP', img: HeadphonesImg, price: 200000, stock: 12, rating: 4.6 },
    { id: 9, name: 'Samsung Tablet 10"', img: TabletImg, price: 300000, stock: 25, rating: 4.4 },
];

// Helper function yo guhindura igiciro mu manyarwanda
const formatPrice = (price) => {
    // Ibi bisaba Javascript Intl API ikora muri browser zose zigezweho
    return new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF' }).format(price);
};


const Home = () => {
  return (
    <div className="home-container">
      <HeroSlider />

      {/* 1. Shop by Category Section */}
      <h2 className="section-title">Shop by Category</h2>
      <section className="categories-grid">
        {categoriesData.map(cat => (
             <Link to={`/categories?name=${cat.name}`} className="category-card" key={cat.name}>
                <img src={cat.img} alt={cat.name} />
                <h4>{cat.name}</h4>
             </Link>
        ))}
      </section>
      
      {/* 2. Featured Products Section */}
      <h2 className="section-title">Featured Products</h2>
      <section className="products-grid">
        {featuredProducts.map(product => (
            <Link to={`/product/${product.id}`} className="product-card" key={product.id}>
                <img src={product.img} alt={product.name} />
                <div className="product-info">
                    <div className="product-header">
                        <h3>{product.name}</h3>
                        <span className="product-rating"><i className="fas fa-star"></i> {product.rating}</span>
                    </div>
                    {/* Hano dukoresheje helper function na Stock */}
                    <p className="product-price">{formatPrice(product.price)}</p>
                    <p className={`stock-status ${product.stock < 10 ? 'low-stock' : ''}`}>
                        Stock: {product.stock} left
                    </p>
                </div>
            </Link>
        ))}
      </section>

      {/* 3. Latest Products Section (New Section) */}
      <h2 className="section-title">Latest Products</h2>
      <section className="products-grid">
        {latestProducts.map(product => (
            <Link to={`/product/${product.id}`} className="product-card" key={product.id}>
                <img src={product.img} alt={product.name} />
                 <div className="product-info">
                    <div className="product-header">
                        <h3>{product.name}</h3>
                         <span className="product-rating"><i className="fas fa-star"></i> {product.rating}</span>
                    </div>
                    <p className="product-price">{formatPrice(product.price)}</p>
                     <p className={`stock-status ${product.stock < 10 ? 'low-stock' : ''}`}>
                        Stock: {product.stock} left
                    </p>
                    <span className="new-badge">New</span>
                </div>
            </Link>
            
        ))}
           
      </section>
      
    </div>
    
  );
};

export default Home;

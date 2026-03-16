import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Shop.css';

// Import images (Koresha izo twari dufite)
import LaptopImg from '../assets/images/images6.jpeg';
import ShoesImg from '../assets/images/12.png';
import WatchImg from '../assets/images/ekuter3.jpg';
import CameraImg from '../assets/images/camera_pro.jpg';

const Shop = () => {
    const [filter, setFilter] = useState('All');
    
    const allProducts = [
        { id: 1, name: 'MacBook Pro M2', price: 1550000, cat: 'Electronics', img: LaptopImg, rating: 4.8 },
        { id: 2, name: 'Nike Air Max', price: 85000, cat: 'Fashion', img: ShoesImg, rating: 4.5 },
        { id: 3, name: 'Luxury Watch', price: 250000, cat: 'Accessories', img: WatchImg, rating: 4.9 },
        { id: 4, name: 'Sony Pro Camera', price: 950000, cat: 'Electronics', img: CameraImg, rating: 4.7 },
        // ... ongeraho ibindi byose ufite
    ];

    const categories = ['All', 'Electronics', 'Fashion', 'Laptops', 'Accessories', 'Home'];

    const filteredProducts = filter === 'All' 
        ? allProducts 
        : allProducts.filter(p => p.cat === filter);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF', maximumFractionDigits: 0 }).format(price);
    };

    return (
        <div className="shop-page-container container">
            {/* 1. Page Header */}
            <div className="shop-header">
                <h1>Our Collection <span>({filteredProducts.length} Products)</span></h1>
                <div className="sort-options">
                    <label>Sort by:</label>
                    <select>
                        <option>Newest Arrivals</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="shop-layout">
                {/* 2. Sidebar Filter (Ibumoso) */}
                <aside className="shop-sidebar">
                    <div className="filter-group">
                        <h3>Categories</h3>
                        <ul>
                            {categories.map(cat => (
                                <li 
                                    key={cat} 
                                    className={filter === cat ? 'active' : ''} 
                                    onClick={() => setFilter(cat)}
                                >
                                    {cat}
                                    <i className="fas fa-chevron-right"></i>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-group">
                        <h3>Price Range</h3>
                        <div className="price-inputs">
                            <input type="number" placeholder="Min" />
                            <input type="number" placeholder="Max" />
                        </div>
                        <button className="apply-btn">Apply Filter</button>
                    </div>
                </aside>

                {/* 3. Products Grid (Iburyo) */}
                <main className="shop-main-content">
                    <div className="shop-products-grid">
                        {filteredProducts.map(product => (
                            <div className="shop-product-card" key={product.id}>
                                <div className="p-img-box">
                                    <img src={product.img} alt={product.name} />
                                    <button className="wishlist-btn"><i className="far fa-heart"></i></button>
                                </div>
                                <div className="p-info-box">
                                    <span className="p-cat">{product.cat}</span>
                                    <Link to={`/product/${product.id}`} className="p-name">{product.name}</Link>
                                    <div className="p-rating">
                                        <i className="fas fa-star"></i> {product.rating}
                                    </div>
                                    <div className="p-footer">
                                        <span className="p-price">{formatPrice(product.price)}</span>
                                        <button className="p-add-btn"><i className="fas fa-cart-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Shop;

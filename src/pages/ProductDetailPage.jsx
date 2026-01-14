import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ProductDetails.css';
import LaptopImg from '../assets/images/images6.jpeg';
import ShoesImg from '../assets/images/12.png';
import WatchImg from '../assets/images/ekuter3.jpg';
import SofaImg from '../assets/images/shoo6.jpeg';
import CameraImg from '../assets/images/camera_pro.jpg'; 
import PrinterImg from '../assets/images/printer_hp.jpg'; 
import HeadphonesImg from '../assets/images/headphones_sony.jpg'; 
import TabletImg from '../assets/images/tablet_samsung.jpg'; 


const allProducts = [
    { id: 1, name: 'High-end Laptop', img: LaptopImg, price: 1200000, description: 'A sleek, powerful laptop with 16GB RAM and 1TB SSD. Perfect for work and gaming. Limited stock available.', stock: 15, rating: 4.8 },
    { id: 2, name: 'Stylish Shoes', img: ShoesImg, price: 80000, description: 'Comfortable and trendy shoes for all occasions. Available in multiple sizes (40-45).', stock: 45, rating: 4.5 },
    { id: 3, name: 'Luxury Watch', img: WatchImg, price: 250000, description:'Comfortable and trendy Watch for all occasions.', stock: 24, rating: 4.9 }, 
    { id: 4, name: 'Comfortable Sofa', img: SofaImg, price: 500000, description:'Sofa Perfect for living room relaxation.', stock: 40, rating: 4.2 },
    { id: 6, name: 'Pro DSLR Camera', img: CameraImg, price: 950000, stock: 8, description:'Professional DSLR camera for high quality photography.', rating: 4.7 },
    { id: 7, name: 'HP Wireless Printer', img: PrinterImg, price: 150000, stock: 50, description:'Wireless printer, scanner, and copier for home or office use.', rating: 4.0 },
    { id: 8, name: 'Noise-Cancelling HP', img: HeadphonesImg, price: 200000, stock: 12, description:'High quality noise cancelling headphones with long battery life.', rating: 4.6 },
    { id: 9, name: 'Samsung Tablet 10"', img: TabletImg, price: 300000, stock: 25, description:'10-inch Samsung tablet with vibrant display and 64GB storage.', rating: 4.4 },
];

const formatPrice = (price) => {
    return new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF' }).format(price);
};

const ProductDetailPage = () => {
    const { id } = useParams();
    const product = allProducts.find(p => p.id === parseInt(id)); 

    if (!product) {
        return <div className="product-details-container" style={{padding: '40px'}}>Product not found!</div>;
    }

    return (
        <div className="product-details-container">
            <div className="breadcrumb">
                <Link to="/">Home</Link> / <Link to="/categories">Categories</Link> / {product.name}
            </div>
            
            <div className="product-main-area">
                <div className="product-image-section">
                    <img src={product.img} alt={product.name} className="main-product-img" />
                </div>
                
                <div className="product-info-section">
                    <h1>{product.name}</h1>
                    <div className="product-rating-details">
                        <i className="fas fa-star"></i> {product.rating} Stars (24 reviews)
                    </div>

                    <p className="product-price">{formatPrice(product.price)}</p>
                    <p className="product-description">{product.description}</p>
                    <p className={`stock-status ${product.stock < 10 ? 'low-stock' : ''}`}>
                        Stock Status: <strong>{product.stock} in stock</strong>
                    </p>

                    <div className="product-actions">
                        <label>Size:</label>
                        <select>
                            <option>S</option><option>M</option><option>L</option>
                        </select>
                        <button className="btn add-to-cart-btn-lg">
                            <i className="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>

                    <div className="guarantees">
                        <div><i className="fas fa-truck"></i> Fast Delivery (Kigali 24h)</div>
                        <div><i className="fas fa-undo-alt"></i> Easy Returns</div>
                    </div>
                </div>
            </div>
            
            <div className="reviews-section">
                <h3>Customer Reviews (24)</h3>
                <div className="review-card">
                    <p>"Great product, very useful! Highly recommend."</p>
                    <span>- Alice</span>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;

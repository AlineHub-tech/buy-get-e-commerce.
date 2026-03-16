import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

// Import amafoto yawe (Koresha inzira yawe nyayo)
import LaptopImg from '../assets/images/images6.jpeg';
import ShoesImg from '../assets/images/12.png';
import WatchImg from '../assets/images/ekuter3.jpg';

const Cart = () => {
  // Sample Data: Ibintu biri mu kagari k'umukiriya
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'High-end MacBook Pro', price: 1550000, img: LaptopImg, qty: 1, stock: 12, cat: 'Electronics' },
    { id: 2, name: 'Nike Air Max Pro', price: 85000, img: ShoesImg, qty: 2, stock: 45, cat: 'Fashion' },
    { id: 3, name: 'Luxury Gold Watch', price: 250000, img: WatchImg, qty: 1, stock: 5, cat: 'Accessories' },
  ]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('rw-RW', { 
        style: 'currency', 
        currency: 'RWF', 
        maximumFractionDigits: 0 
    }).format(price);
  };

  const updateQty = (id, delta) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, Math.min(item.qty + delta, item.stock)) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = subtotal > 500000 ? 0 : 2500; // Free shipping niba barengeje 500k

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-state container">
        <div className="empty-icon"><i className="fas fa-shopping-basket"></i></div>
        <h2>Your basket is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="continue-shopping-btn">Explore Products</Link>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper container">
      <div className="cart-header-main">
        <h1>Shopping Basket <span>({cartItems.length} items)</span></h1>
        <Link to="/" className="back-to-shop"><i className="fas fa-arrow-left"></i> Continue Shopping</Link>
      </div>

      <div className="cart-grid-layout">
        {/* LEFT: Items List */}
        <div className="cart-items-list">
          {cartItems.map(item => (
            <div className="cart-card-item" key={item.id}>
              <div className="cart-item-img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <span className="item-category">{item.cat}</span>
                <h3>{item.name}</h3>
                <div className="item-price-mobile">{formatPrice(item.price)}</div>
                <div className="cart-item-actions">
                  <div className="qty-selector">
                    <button onClick={() => updateQty(item.id, -1)} disabled={item.qty <= 1}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} disabled={item.qty >= item.stock}>+</button>
                  </div>
                  <button className="delete-btn" onClick={() => removeItem(item.id)}>
                    <i className="far fa-trash-can"></i> Remove
                  </button>
                </div>
              </div>
              <div className="cart-item-price-desktop">
                <div className="total-item-price">{formatPrice(item.price * item.qty)}</div>
                {item.qty > 1 && <div className="unit-price">{formatPrice(item.price)} each</div>}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Order Summary */}
        <aside className="cart-summary-sidebar">
          <div className="summary-box">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span className={shipping === 0 ? "free-text" : ""}>
                {shipping === 0 ? "FREE" : formatPrice(shipping)}
              </span>
            </div>
            <div className="promo-code-area">
              <input type="text" placeholder="Promo Code" />
              <button>Apply</button>
            </div>
            <div className="summary-total-line">
              <span>Total Amount</span>
              <span>{formatPrice(subtotal + shipping)}</span>
            </div>
            <button className="checkout-main-btn">
              Checkout Now <i className="fas fa-lock"></i>
            </button>
            <div className="trust-badges">
                <p><i className="fas fa-shield-alt"></i> Secure Payment Guarantee</p>
                <div className="payment-icons">
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <span className="momo-text">MoMo</span>
                </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;

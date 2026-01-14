
import React, { useState, useMemo } from 'react';
import '../styles/Cart.css'; 
import LaptopImg from '../assets/images/images6.jpeg';
import ShoesImg from '../assets/images/12.png';

const initialCart = [
  { id: 1, img: LaptopImg, name: 'High-end Laptop', price: 1200, quantity: 1 },
  { id: 2, img: ShoesImg, name: 'Stylish Shoes', price: 80, quantity: 2 },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  const updateQuantity = (id, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta); 
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  const { subtotal, total } = useMemo(() => {
    const sub = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = sub > 0 ? 20 : 0; 
    const taxRate = 0.18; 
    const tax = sub * taxRate;
    return { 
        subtotal: sub, 
        total: sub + shipping + tax 
    };
  }, [cartItems]);

  return (
    <div className="cart-container-wrapper">
      <h2 className="section-title">Your Shopping Cart ({cartItems.length} items)</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <i className="fas fa-shopping-cart empty-icon"></i>
          <h3>Panier yawe irimo ubusa</h3>
          <p>Ongeramo ibicuruzwa kugira ngo ubashe kugura.</p>
          <button className="btn primary-btn" onClick={() => window.location.href='/'}>Komeza Gubona Ibicuruzwa</button>
        </div>
      ) : (
        <div className="cart-content">
          <section className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Price: <strong>${item.price.toFixed(2)}</strong></p>
                  <button className="remove-item-btn" onClick={() => removeItem(item.id)}>
                    <i className="fas fa-trash-alt"></i> Remove
                  </button>
                </div>
                
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>

                <div className="item-total">
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              </div>
            ))}
          </section>

          <aside className="cart-summary">
            <h3>Cart Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>$20.00</span>
            </div>
             <div className="summary-row">
              <span>VAT (18%):</span>
              <span>${(subtotal * 0.18).toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <button className="btn checkout-btn">
              Proceed to Checkout <i className="fas fa-arrow-right"></i>
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;

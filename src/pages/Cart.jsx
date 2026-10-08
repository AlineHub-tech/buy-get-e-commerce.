import { Link } from 'react-router-dom';
import { useCart } from '../context/cartStore';
import { formatPrice } from '../data/products';
import { FREE_DELIVERY_THRESHOLD, getDeliveryFee } from '../data/delivery';
import '../styles/Cart.css';

const Cart = () => {
    const { cartItems, updateQty, removeFromCart, totalPrice } = useCart();
    const deliveryFee = getDeliveryFee(totalPrice);

    if (cartItems.length === 0) {
        return (
            <section className="cart-empty-state container">
                <div className="empty-icon"><i className="fas fa-shopping-bag" aria-hidden="true" /></div>
                <h1>Your cart is empty</h1>
                <p>Looks like you haven't added anything yet.</p>
                <Link to="/shop" className="continue-shopping-btn">Start shopping</Link>
            </section>
        );
    }

    return (
        <div className="cart-page-wrapper">
            <div className="cart-header-main">
                <h1>Your cart <span>({cartItems.reduce((count, item) => count + item.qty, 0)} items)</span></h1>
                <Link to="/shop" className="back-to-shop">← Continue shopping</Link>
            </div>
            <div className="cart-grid-layout">
                <section className="cart-items-list" aria-label="Cart items">
                    {cartItems.map((item) => (
                        <article className="cart-card-item" key={item.id}>
                            <Link className="cart-item-img" to={`/product/${item.id}`}><img src={item.image} alt={item.imageAlt} /></Link>
                            <div className="cart-item-details">
                                <span className="item-category">{item.category}</span>
                                <h2><Link to={`/product/${item.id}`}>{item.name}</Link></h2>
                                <p className="cart-item-unit-price">{formatPrice(item.price)} each</p>
                                <div className="cart-item-actions className=p-design">
                                    <div className="item-list">
                                        <div className="p-item">
                                            </div>
                                            </div>
                                    <div className="qty-selector">
                                        <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQty(item.id, -1)} disabled={item.qty <= 1}>−</button>
                                        <span>{item.qty}</span>
                                        <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => updateQty(item.id, 1)} disabled={item.qty >= item.stock}>+</button>
                                    </div>
                                    <button className="delete-btn" type="button" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                            <strong className="total-item-price">{formatPrice(item.price * item.qty)}</strong>
                        </article>
                    ))}
                </section>
                <aside className="cart-summary-sidebar">
                    <div className="summary-box">
                        <h2>Order summary</h2>
                        <div className="summary-line"><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
                        <div className="summary-line"><span>Standard delivery</span><span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span></div>
                        {deliveryFee > 0 && <p className="delivery-progress">Add {formatPrice(FREE_DELIVERY_THRESHOLD + 1 - totalPrice)} more to qualify for free standard delivery.</p>}
                        <div className="summary-total-line"><span>Total</span><span>{formatPrice(totalPrice + deliveryFee)}</span></div>
                        <Link className="checkout-main-btn" to="/checkout">Continue to checkout</Link>
                        <p className="cart-payment-note">Cash on delivery. Delivery details are collected at checkout.</p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Cart;

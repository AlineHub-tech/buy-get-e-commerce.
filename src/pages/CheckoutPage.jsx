import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartStore';
import { formatPrice } from '../data/products';
import { getDeliveryFee } from '../data/delivery';
import '../styles/Checkout.css';

const CheckoutPage = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const deliveryFee = getDeliveryFee(totalPrice);
    const total = totalPrice + deliveryFee;

    const placeOrder = (event) => {
        event.preventDefault();
        setError('');
        const formData = new FormData(event.currentTarget);
        const date = new Date();
        const order = {
            id: `BG-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${String(Date.now()).slice(-6)}`,
            customer: {
                name: String(formData.get('name')).trim(),
                phone: String(formData.get('phone')).trim(),
                district: String(formData.get('district')).trim(),
                sector: String(formData.get('sector')).trim(),
                address: String(formData.get('address')).trim(),
                note: String(formData.get('note')).trim(),
            },
            items: cartItems,
            subtotal: totalPrice,
            deliveryFee,
            total,
            paymentMethod: formData.get('payment'),
            status: 'Order Placed',
            createdAt: date.toISOString(),
        };

        try {
            const savedOrders = JSON.parse(localStorage.getItem('buyAndGetOrders') || '[]');
            if (!Array.isArray(savedOrders)) throw new Error('Saved orders have an invalid format.');
            localStorage.setItem('buyAndGetOrders', JSON.stringify([...savedOrders, order]));
        } catch (storageError) {
            console.error('Unable to save the order.', storageError);
            setError('We could not save your order on this device. Please try again.');
            return;
        }

        clearCart();
        navigate(`/order-success/${order.id}`, { state: { order } });
    };

    if (cartItems.length === 0) {
        return (
            <section className="checkout-empty container">
                <h1>Your cart is empty</h1>
                <p>Add products to your cart before checking out.</p>
                <Link to="/shop">Browse products</Link>
            </section>
        );
    }

    return (
        <div className="checkout-page container">
            <header className="checkout-heading"><span className="store-eyebrow">Almost there</span><h1>Checkout</h1><p>Cash on delivery · No online payment is collected.</p></header>
            <div className="checkout-layout">
                <form className="checkout-form" onSubmit={placeOrder}>
                    <section>
                        <h2>Delivery information</h2>
                        <label>Full name<input name="name" autoComplete="name" required /></label>
                        <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="0781234567" pattern="(\+?250\d{9}|0\d{9})" title="Enter a valid Rwanda phone number." required /></label>
                        <div className="checkout-form-row">
                            <label>District<input name="district" autoComplete="address-level2" required /></label>
                            <label>Sector<input name="sector" autoComplete="address-level3" required /></label>
                        </div>
                        <label>Detailed address<textarea name="address" rows="3" placeholder="Street, building, nearby landmark..." required /></label>
                        <label>Delivery option<select name="delivery" defaultValue="standard"><option value="standard">Standard delivery - {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</option></select></label>
                        <label>Additional note (optional)<textarea name="note" rows="2" /></label>
                    </section>
                    <fieldset className="payment-method-options">
                        <legend>Payment method</legend>
                        <label><input type="radio" name="payment" value="Cash on Delivery" defaultChecked required /> <span><strong>Cash on delivery</strong><small>Pay the delivery agent when your order arrives.</small></span></label>
                    </fieldset>
                    {error && <p className="checkout-error" role="alert">{error}</p>}
                    <button className="checkout-submit" type="submit">Place order · {formatPrice(total)}</button>
                </form>

                <aside className="checkout-order-summary">
                    <h2>Your order</h2>
                    {cartItems.map((item) => (
                        <div className="checkout-summary-product" key={item.id}>
                            <img src={item.image} alt="" />
                            <span>{item.name}<small>Qty: {item.qty}</small></span>
                            <strong>{formatPrice(item.price * item.qty)}</strong>
                        </div>
                    ))}
                    <div className="summary-line"><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
                    <div className="summary-line"><span>Standard delivery</span><span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span></div>
                    <div className="summary-total-line"><span>Total</span><span>{formatPrice(total)}</span></div>
                </aside>
            </div>
        </div>
    );
};

export default CheckoutPage;

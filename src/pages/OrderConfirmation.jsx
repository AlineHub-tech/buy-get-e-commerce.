import { Link, useLocation, useParams } from 'react-router-dom';
import { formatPrice } from '../data/products';
import '../styles/Checkout.css';

const ORDER_STAGES = ['Order Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const { state } = useLocation();
    let order = state?.order;

    if (!order) {
        try {
            const savedOrders = JSON.parse(localStorage.getItem('buyAndGetOrders') || '[]');
            order = savedOrders.find((item) => item.id === orderId);
        } catch (error) {
            console.error('Unable to read saved order information.', error);
        }
    }

    if (!order) {
        return <section className="checkout-empty container"><h1>Order not found</h1><p>We couldn't find this order on this device.</p><Link to="/track-order">Track an order</Link></section>;
    }

    const currentStage = ORDER_STAGES.indexOf(order.status);

    return (
        <section className="order-confirmation-page container">
            <div className="order-confirmation-card">
                <span className="order-success-icon" aria-hidden="true"><i className="fas fa-check" /></span>
                <span className="store-eyebrow">Thank you for your order</span>
                <h1>Order placed successfully</h1>
                <p>Order number <strong>{order.id}</strong></p>
                <div className="order-confirmation-details">
                    <div><span>Customer</span><strong>{order.customer.name}</strong></div>
                    <div><span>Delivery</span><strong>{order.customer.district}, {order.customer.sector}</strong></div>
                    <div><span>Payment</span><strong>{order.paymentMethod}</strong></div>
                    <div><span>Total</span><strong>{formatPrice(order.total)}</strong></div>
                </div>
                <h2>Order status</h2>
                <ol className="order-status-list">
                    {ORDER_STAGES.map((stage, index) => (
                        <li className={index <= currentStage ? 'status-complete' : ''} key={stage}>
                            <span aria-hidden="true">{index < currentStage ? '✓' : index === currentStage ? '•' : '○'}</span>{stage}
                        </li>
                    ))}
                </ol>
                <div className="order-confirmation-actions">
                    <Link to={`/track-order?order=${order.id}`}>Track order</Link>
                    <Link to="/shop">Continue shopping</Link>
                </div>
            </div>
        </section>
    );
};

export default OrderConfirmation;

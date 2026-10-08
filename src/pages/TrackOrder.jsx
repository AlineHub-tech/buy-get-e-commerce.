import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { formatPrice } from '../data/products';
import '../styles/Checkout.css';

const ORDER_STAGES = ['Order Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];

const TrackOrder = () => {
    const [searchParams] = useSearchParams();
    const [orderId, setOrderId] = useState(searchParams.get('order') || '');
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');

    const findOrder = (event) => {
        event.preventDefault();
        setError('');
        setOrder(null);
        try {
            const orders = JSON.parse(localStorage.getItem('buyAndGetOrders') || '[]');
            const match = Array.isArray(orders) && orders.find((item) => item.id.toLowerCase() === orderId.trim().toLowerCase());
            if (!match) {
                setError('We could not find that order on this device. Check the order number and try again.');
                return;
            }
            setOrder(match);
        } catch (storageError) {
            console.error('Unable to read saved order information.', storageError);
            setError('We could not look up your order right now. Please try again.');
        }
    };

    const currentStage = order ? ORDER_STAGES.indexOf(order.status) : -1;

    return (
        <main className="track-order-page container">
            <header><span className="store-eyebrow">Buy &amp; Get support</span><h1>Track your order</h1><p>Enter the order number from your confirmation.</p></header>
            <form className="track-order-form" onSubmit={findOrder}>
                <label htmlFor="order-number">Order number</label>
                <div><input id="order-number" value={orderId} onChange={(event) => setOrderId(event.target.value)} placeholder="BG-20261007-123456" required /><button type="submit">Track order</button></div>
                {error && <p role="alert">{error}</p>}
            </form>
            {order && (
                <section className="tracked-order-card">
                    <h2>Order {order.id}</h2>
                    <p>{order.customer.name} · Total {formatPrice(order.total)}</p>
                    <ol className="order-status-list">
                        {ORDER_STAGES.map((stage, index) => <li className={index <= currentStage ? 'status-complete' : ''} key={stage}><span aria-hidden="true">{index < currentStage ? '✓' : index === currentStage ? '•' : '○'}</span>{stage}</li>)}
                    </ol>
                    <Link to={`/order-success/${order.id}`} state={{ order }}>View order details</Link>
                </section>
            )}
        </main>
    );
};

export default TrackOrder;

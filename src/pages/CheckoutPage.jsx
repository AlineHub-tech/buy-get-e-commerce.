import React, { useState } from 'react';
import '../styles/Checkout.css'; 

const CheckoutPage = () => {
    const [step, setStep] = useState(1); 
     const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const completeOrder = () => {
        alert("Order Placed! Thank you for shopping with Buy&Get.");
        setStep(3);
       };

    return (
        <div className="checkout-container">
            <h2 className="section-title">Checkout Process (Step {step}/2)</h2>

            {step === 1 && (
                <div className="checkout-step">
                    <h3>1. Shipping Information</h3>
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email Address" required />
                    <input type="text" placeholder="Phone Number (e.g. 078XXXXXXX)" required />
                    <textarea placeholder="Delivery Address (Kigali, Street, House No.)"></textarea>
                    <button className="btn" onClick={nextStep}>Continue to Payment</button>
                </div>
            )}

            {step === 2 && (
                <div className="checkout-step">
                    <h3>2. Payment Method</h3>
                    <div className="payment-options">
                        <label><input type="radio" name="payment" /> Mobile Money (MTN MoMo/Airtel Money)</label>
                        <label><input type="radio" name="payment" /> Credit Card (Stripe)</label>
                    </div>
                    <div className="form-actions">
                        <button className="btn btn-secondary" onClick={prevStep}>Back to Shipping</button>
                        <button className="btn" onClick={completeOrder}>Place Order</button>
                    </div>
                </div>
            )}
            
            {step === 3 && (
                <div className="order-confirmation">
                    <i className="fas fa-check-circle"></i>
                    <h3>Order Confirmed!</h3>
                    <p>Thank you for your purchase. Your order #12345 is being processed.</p>
                    <Link to="/" className="btn">Continue Shopping</Link>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;

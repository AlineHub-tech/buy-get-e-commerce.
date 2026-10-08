
// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Deals from './pages/Deals';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import TrackOrder from './pages/TrackOrder';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/cartStore';

const StoreToast = () => {
  const { toastMessage } = useCart();
  return toastMessage ? <div className="store-toast" role="status">{toastMessage}</div> : null;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success/:orderId" element={<OrderConfirmation />} />
            <Route path="/track-order" element={<TrackOrder />} />
          </Routes>
        </main>
        <Footer />
        <StoreToast />
      </Router>
    </CartProvider>
  );
}

export default App;

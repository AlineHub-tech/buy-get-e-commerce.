import React, { useState, useEffect } from 'react';
import { CartContext } from './cartStore';

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('buyAndGetCart');
            const parsedCart = savedCart ? JSON.parse(savedCart) : [];
            return Array.isArray(parsedCart) ? parsedCart : [];
        } catch (error) {
            console.error('Unable to read the saved cart.', error);
            return [];
        }
    });
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        try {
            localStorage.setItem('buyAndGetCart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Unable to save the cart.', error);
        }
    }, [cartItems]);

    useEffect(() => {
        if (!toastMessage) return undefined;
        const timer = window.setTimeout(() => setToastMessage(''), 2200);
        return () => window.clearTimeout(timer);
    }, [toastMessage]);

    const addToCart = (product, quantity = 1) => {
        if (!product || product.stock < 1) return;
        setCartItems((prevItems) => {
            const existing = prevItems.find((item) => item.id === product.id);
            if (existing) {
                return prevItems.map((item) => item.id === product.id
                    ? { ...item, qty: Math.min(item.qty + quantity, product.stock) }
                    : item);
            }
            return [...prevItems, { ...product, qty: Math.min(quantity, product.stock) }];
        });
        setToastMessage(`${product.name} added to cart`);
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQty = (id, delta) => {
        setCartItems((prev) => prev.map((item) => item.id === id
            ? { ...item, qty: Math.max(1, Math.min(item.stock, item.qty + delta)) }
            : item));
    };

    const clearCart = () => setCartItems([]);

    const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);

    return (
        <CartContext.Provider value={{
            cartItems, addToCart, removeFromCart, updateQty,
            clearCart, cartCount, totalPrice, toastMessage,
        }}>
            {children}
        </CartContext.Provider>
    );
};

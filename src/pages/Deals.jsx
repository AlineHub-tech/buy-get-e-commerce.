import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Deals.css';

// Import amashusho yawe nka kare (Koresha inzira yawe nyayo)
import LaptopImg from '../assets/images/images6.jpeg';
import WatchImg from '../assets/images/ekuter3.jpg';
import HeadphonesImg from '../assets/images/headphones_sony.jpg';

const Deals = () => {
    // 1. Timer Logic (Ibara amasaha, iminota n'amasegonda)
    const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { h, m, s } = prev;
                if (s > 0) s--;
                else {
                    s = 59;
                    if (m > 0) m--;
                    else {
                        m = 59;
                        if (h > 0) h--;
                    }
                }
                return { h, m, s };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const dealsData = [
        { id: 1, name: 'MacBook Pro M2', oldPrice: 1800000, newPrice: 1550000, discount: '14%', img: LaptopImg, sold: 85 },
        { id: 2, name: 'Luxury Gold Watch', oldPrice: 350000, newPrice: 250000, discount: '28%', img: WatchImg, sold: 40 },
        { id: 3, name: 'Sony Headphones', oldPrice: 300000, newPrice: 210000, discount: '30%', img: HeadphonesImg, sold: 60 },
    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF', maximumFractionDigits: 0 }).format(price);
    };

    return (
        <div className="deals-page-container container">
            {/* Header ifite Countdown */}
            <div className="deals-header">
                <div className="header-text">
                    <h1>Flash Sales <i className="fas fa-bolt"></i></h1>
                    <p>Grab these limited-time offers before they're gone!</p>
                </div>
                <div className="countdown-timer">
                    <span>Ends in:</span>
                    <div className="timer-box">
                        <div className="time-unit"><b>{timeLeft.h < 10 ? `0${timeLeft.h}` : timeLeft.h}</b><small>Hrs</small></div>:
                        <div className="time-unit"><b>{timeLeft.m < 10 ? `0${timeLeft.m}` : timeLeft.m}</b><small>Min</small></div>:
                        <div className="time-unit"><b>{timeLeft.s < 10 ? `0${timeLeft.s}` : timeLeft.s}</b><small>Sec</small></div>
                    </div>
                </div>
            </div>

            {/* Deals Grid */}
            <div className="deals-grid">
                {dealsData.map(deal => (
                    <div className="deal-card" key={deal.id}>
                        <div className="deal-badge">-{deal.discount} Off</div>
                        <div className="deal-img">
                            <img src={deal.img} alt={deal.name} />
                        </div>
                        <div className="deal-info">
                            <h3 className="deal-name">{deal.name}</h3>
                            <div className="price-area">
                                <span className="new-price">{formatPrice(deal.newPrice)}</span>
                                <span className="old-price">{formatPrice(deal.oldPrice)}</span>
                            </div>
                            
                            {/* Stock Progress Bar */}
                            <div className="deal-progress">
                                <div className="progress-info">
                                    <span>Sold: {deal.sold}%</span>
                                    <span>Limited Items</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="fill" style={{ width: `${deal.sold}%` }}></div>
                                </div>
                            </div>

                            <button className="buy-deal-btn">Buy Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Deals;

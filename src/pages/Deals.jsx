
import React, { useState, useEffect } from 'react';
import '../styles/Deals.css'; 
import LaptopImg from '../assets/images/images6.jpeg';
import ShoesImg from '../assets/images/12.png';
import WatchImg from '../assets/images/ekuter3.jpg';
import SofaImg from '../assets/images/shoo6.jpeg';

const initialDeals = [
  { img: LaptopImg, name: 'High-end Laptop', price: 1200, oldPrice: 1500, stock: 15 },
  { img: ShoesImg, name: 'Stylish Shoes', price: 80, oldPrice: 100, stock: 45 },
  { img: WatchImg, name: 'Luxury Watch', price: 250, oldPrice: 300, stock: 5 },
  { img: SofaImg, name: 'Comfortable Sofa', price: 500, oldPrice: 600, stock: 22 },
];

const Deals = () => {
  const [deals, setDeals] = useState(initialDeals);
  const [timeLeft, setTimeLeft] = useState('00:00:00');
  useEffect(() => {
    const countdownDate = new Date();
    countdownDate.setHours(countdownDate.getHours() + 2); 
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft("EXPIRED");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const removeDeal = (index) => {
    setDeals(deals.filter((_, i) => i !== index));
  };

  return (
    <div className="deals-container">
      <div className="deals-header-banner">
        <h2 className="section-title-deals"><i className="fas fa-bolt"></i> Flash Deals of the Day</h2>
        <div className="countdown-timer">
            Ends in: <span>{timeLeft}</span>
        </div>
      </div>
      
      <section className="products-grid">
        {deals.map((deal, i) => (
          <div key={i} className="product-card">
            <img src={deal.img} alt={deal.name} />
            <div className="product-info">
                <h3>{deal.name}</h3>
                <p className="price-section">
                    <span className="old-price">${deal.oldPrice}</span> 
                    <span className="current-price">${deal.price}</span>
                </p>
                <p className={`stock-status ${deal.stock < 10 ? 'low-stock' : ''}`}>
                    Stock: {deal.stock} left
                </p>
                 <button className="add-to-cart-btn" onClick={() => removeDeal(i)}>Add to Cart</button>
            </div>
                   <span className="deal-badge">SAVE {Math.round(((deal.oldPrice - deal.price) / deal.oldPrice) * 100)}%</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Deals;

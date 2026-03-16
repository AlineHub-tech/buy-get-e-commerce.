import React, { useEffect, useState, useCallback } from 'react';
import '../styles/HeroSlider.css'; 

// Izitumanaho z'amashusho (Sigaho izo wari ufite)
import SlideImg1 from '../assets/images/d1.jpg'; 
import SlideImg2 from '../assets/images/d2.jpg'; 
import SlideImg3 from '../assets/images/d3.jpg'; 

const slidesData = [
  { 
    title: 'Mega Deals!', 
    subtitle: 'Limited Time Offer',
    icon: 'fas fa-bolt', 
    text: 'Up to 70% off on all Electronics items.', 
    imageUrl: SlideImg1,
    btnText: 'Claim Offer',
    color: '#ff4757'
  },
  { 
    title: 'New Fashion', 
    subtitle: 'Season 2024',
    icon: 'fas fa-gift', 
    text: 'Discover the trendiest clothes at best prices.', 
    imageUrl: SlideImg2,
    btnText: 'Shop Fashion',
    color: '#2f3542'
  },
  { 
    title: 'Fresh Groceries', 
    subtitle: 'Healthy Living',
    icon: 'fas fa-apple-alt', 
    text: 'Organic products delivered straight to your door.', 
    imageUrl: SlideImg3,
    btnText: 'Order Now',
    color: '#2ed573'
  },
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setIndex(prev => (prev + 1) % slidesData.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000); // 6 seconds ni igihe cyiza
    return () => clearInterval(timer);
  }, [nextSlide]);

  const prevSlide = () => {
    setIndex(prev => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const currentSlide = slidesData[index];

  return (
    <section className="hero-slider-container">
      {/* Background Image with Overlay */}
      <div 
        className="slide-background" 
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${currentSlide.imageUrl})` }}
      >
        <div className="container hero-content-wrapper">
            {/* Main Content Area */}
            <div className="hero-main-text" key={index}> {/* Key ituma animation yongera gukora */}
                <span className="slide-subtitle">{currentSlide.subtitle}</span>
                <h1 className="animate-text">{currentSlide.title}</h1>
                <p className="animate-p">{currentSlide.text}</p>
                <div className="hero-buttons">
                    <button className="btn-primary-pro" style={{backgroundColor: currentSlide.color}}>
                        {currentSlide.btnText} <i className="fas fa-shopping-bag"></i>
                    </button>
                    <button className="btn-outline-pro">View Details</button>
                </div>
            </div>

            {/* Navigation & Controls */}
            <div className="hero-controls-area">
                <div className="slider-nav">
                    <button onClick={prevSlide} className="nav-arrow"><i className="fas fa-long-arrow-alt-left"></i></button>
                    <div className="dot-indicators">
                        {slidesData.map((_, i) => (
                          <span 
                            key={i} 
                            className={`pro-dot ${i === index ? 'active' : ''}`} 
                            onClick={() => setIndex(i)}
                          ></span>
                        ))}
                    </div>
                    <button onClick={nextSlide} className="nav-arrow"><i className="fas fa-long-arrow-alt-right"></i></button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;

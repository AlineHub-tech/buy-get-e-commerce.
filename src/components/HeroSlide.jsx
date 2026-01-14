
import React, { useEffect, useState, useCallback } from 'react';
import '../styles/HeroSlider.css'; 

import SlideImg1 from '../assets/images/d1.jpg'; 
import SlideImg2 from '../assets/images/d2.jpg'; 
import SlideImg3 from '../assets/images/d3.jpg'; 


const slidesData = [
  { title: 'Mega Deals!', icon: 'fas fa-bolt', text: 'Up to 70% off on Electronics', imageUrl: SlideImg1 },
  { title: 'Fashion Sale', icon: 'fas fa-gift', text: 'Trendy clothes at best prices', imageUrl: SlideImg2 },
  { title: 'Fresh Groceries', icon: 'fas fa-apple-alt', text: 'Delivered straight to your door', imageUrl: SlideImg3 },
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setIndex(prev => (prev + 1) % slidesData.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); 
    return () => clearInterval(timer);
  }, [nextSlide]);

  const prevSlide = () => {
    setIndex(prev => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const currentSlide = slidesData[index];

  return (
    <section className="hero-slider-container">
      
      <div 
        className="slide-background" 
        style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
      >
        <div className="slide-content">
            <div className="hero-text-area">
                <h1>Welcome to Buy & Get</h1>
                <p>Shop your favorite products at the best prices</p>
                <button className="btn primary-btn">Shop Now <i className="fas fa-arrow-right"></i></button>
            </div>

            <div className="slider-promo-area">
                <h2><i className={currentSlide.icon}></i> {currentSlide.title}</h2>
                <p>{currentSlide.text}</p>
                <div className="slider-controls">
                    <button onClick={prevSlide} aria-label="Previous Slide"><i className="fas fa-chevron-left"></i></button>
                    {slidesData.map((_, i) => (
                      <span 
                        key={i} 
                        className={`dot ${i === index ? 'active' : ''}`} 
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                      ></span>
                    ))}
                    <button onClick={nextSlide} aria-label="Next Slide"><i className="fas fa-chevron-right"></i></button>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSlider;


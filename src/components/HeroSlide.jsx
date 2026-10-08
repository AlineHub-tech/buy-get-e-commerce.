import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import '../styles/HeroSlider.css';

const slides = [
    {
        categoryId: 'phones',
        eyebrow: 'Phones & everyday tech',
        title: 'Find a phone that fits your day.',
        description: 'Browse smartphones and accessories selected for everyday use.',
        imageAlt: 'Phones available in the Buy & Get store',
    },
    {
        categoryId: 'laptops',
        eyebrow: 'Work, study & create',
        title: 'Make room for bigger ideas.',
        description: 'Explore laptops and tablets for work, school and home.',
        imageAlt: 'Laptops available in the Buy & Get store',
    },
    {
        categoryId: 'headphones',
        eyebrow: 'Audio & accessories',
        title: 'Take your sound with you.',
        description: 'Find headphones, speakers, chargers and other useful tech.',
        imageAlt: 'Headphones and audio products available in the Buy & Get store',
    },
];

const HeroSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const slide = slides[activeIndex];
    const category = categories.find((item) => item.id === slide.categoryId);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveIndex((index) => (index + 1) % slides.length);
        }, 6000);
        return () => window.clearInterval(timer);
    }, []);

    const showSlide = (index) => setActiveIndex((index + slides.length) % slides.length);

    return (
        <section className="store-hero" aria-label="Featured categories">
            <div className="store-hero-content" key={slide.categoryId}>
                <span className="store-eyebrow">{slide.eyebrow}</span>
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <div className="store-hero-actions">
                    <Link className="store-primary-link" to={`/shop?category=${slide.categoryId}`}>Shop {category.name}</Link>
                    <Link className="store-secondary-link" to="/shop">Browse all products</Link>
                </div>
                <div className="store-hero-controls">
                    <button type="button" aria-label="Previous featured category" onClick={() => showSlide(activeIndex - 1)}>‹</button>
                    <div className="store-hero-dots" aria-label="Choose featured category">
                        {slides.map((item, index) => (
                            <button
                                key={item.categoryId}
                                type="button"
                                className={index === activeIndex ? 'active' : ''}
                                aria-label={`Show ${categories.find((entry) => entry.id === item.categoryId).name}`}
                                aria-current={index === activeIndex ? 'true' : undefined}
                                onClick={() => showSlide(index)}
                            />
                        ))}
                    </div>
                    <button type="button" aria-label="Next featured category" onClick={() => showSlide(activeIndex + 1)}>›</button>
                </div>
            </div>
            <Link className="store-hero-image" to={`/shop?category=${slide.categoryId}`} aria-label={`Shop ${category.name}`}>
                <img key={slide.categoryId} src={category.image} alt={slide.imageAlt} fetchPriority="high" />
            </Link>
        </section>
    );
};

export default HeroSlider;

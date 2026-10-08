import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlide';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';
import '../styles/Home.css';

const Home = () => {
    const featured = products.filter((product) => product.featured).slice(0, 8);
    const bestSellers = products.filter((product) => product.bestSeller).slice(0, 4);
    const newArrivals = products.filter((product) => product.newArrival).slice(0, 4);

    return (
        <div className="home-page-container">
            <section className="top-categories-strip container" aria-label="Top categories">
                <span>Top categories</span>
                <div>{categories.slice(0, 8).map((category) => <Link key={category.id} to={`/shop?category=${category.id}`}>{category.name}</Link>)}</div>
            </section>
            <HeroSlider />

            <div className="home-content container">
                <section className="home-section" id="categories">
                    <div className="store-section-heading">
                        <div><span className="store-eyebrow">Find your next favourite</span><h2>Shop by category</h2></div>
                        <Link to="/shop">View all products <span aria-hidden="true">→</span></Link>
                    </div>
                    <div className="store-category-grid">
                        {categories.map((category) => (
                            <Link className="store-category-card" key={category.id} to={`/shop?category=${category.id}`}>
                                <img src={category.image} alt="" loading="lazy" />
                                <span>{category.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="home-section">
                    <div className="store-section-heading">
                        <div><span className="store-eyebrow">Picked for you</span><h2>Featured electronics</h2></div>
                        <Link to="/shop">Shop all <span aria-hidden="true">→</span></Link>
                    </div>
                    <div className="store-product-grid">
                        {featured.map((product) => <ProductCard key={product.id} product={product} />)}
                    </div>
                </section>

                <section className="home-section">
                    <div className="store-section-heading">
                        <div><span className="store-eyebrow">Popular picks</span><h2>Best sellers</h2></div>
                        <Link to="/shop?sort=popular">Shop popular products <span aria-hidden="true">→</span></Link>
                    </div>
                    <div className="store-product-grid">
                        {bestSellers.map((product) => <ProductCard key={product.id} product={product} />)}
                    </div>
                </section>

                <section className="store-promise">
                    <div><i className="fas fa-check-circle" aria-hidden="true" /><span><strong>Products you can browse</strong><small>Clear categories and product details</small></span></div>
                    <div><i className="fas fa-truck" aria-hidden="true" /><span><strong>Delivery details at checkout</strong><small>Choose a delivery option that suits you</small></span></div>
                    <div><i className="fas fa-headset" aria-hidden="true" /><span><strong>Here to help</strong><small>Get in touch with the Buy &amp; Get team</small></span></div>
                </section>

                <section className="home-section">
                    <div className="store-section-heading">
                        <div><span className="store-eyebrow">Fresh picks</span><h2>New arrivals</h2></div>
                        <Link to="/shop?sort=newest">Discover more <span aria-hidden="true">→</span></Link>
                    </div>
                    <div className="store-product-grid">
                        {newArrivals.map((product) => <ProductCard key={product.id} product={product} />)}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;

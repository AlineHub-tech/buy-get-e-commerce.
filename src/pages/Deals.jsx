import ProductCard from '../components/ProductCard';
import { discountedProducts } from '../data/products';
import '../styles/Deals.css';

const Deals = () => (
    <main className="deals-page-container container">
        <header className="deals-header">
            <span className="store-eyebrow">Worth a closer look</span>
            <h1>Current deals</h1>
            <p>Browse products with a marked price reduction. No countdowns, just the listed prices.</p>
        </header>
        {discountedProducts.length > 0 ? (
            <div className="store-product-grid">
                {discountedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
        ) : (
            <div className="shop-empty-state"><h2>No current deals</h2><p>Check back later for price reductions.</p></div>
        )}
    </main>
);

export default Deals;

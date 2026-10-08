import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/cartStore';
import { formatPrice, getProductById } from '../data/products';
import '../styles/ProductDetails.css';

const ProductDetailPage = () => {
    const { id } = useParams();
    const product = getProductById(id);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    if (!product) {
        return (
            <section className="product-not-found container">
                <h1>Product not found</h1>
                <p>This product may have been removed or the link may be incorrect.</p>
                <Link to="/shop">Browse all products</Link>
            </section>
        );
    }

    const buyNow = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    return (
        <div className="product-details-container container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link><span>/</span><Link to={`/shop?category=${product.categoryId}`}>{product.category}</Link><span>/</span>{product.name}
            </nav>
            <div className="product-main-area">
                <div className="product-image-section">
                    <img src={product.image} alt={product.imageAlt} className="main-product-img" />
                </div>
                <section className="product-info-section">
                    <span className="product-category-label">{product.category}</span>
                    <h1>{product.name}</h1>
                    <p className="product-brand">Brand: {product.brand}</p>
                    <p className="product-price">{formatPrice(product.price)}</p>
                    <p className="product-description">{product.description}</p>
                    <p className={`product-stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>
                        {product.stock > 0 ? `${product.stock} available` : 'Currently out of stock'}
                    </p>
                    <div className="product-actions">
                        <div className="product-quantity">
                            <label htmlFor="product-quantity">Quantity</label>
                            <div className="quantity-control">
                                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
                                <span id="product-quantity" aria-live="polite">{quantity}</span>
                                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))} disabled={quantity >= product.stock}>+</button>
                            </div>
                        </div>
                        <button className="product-add-button" type="button" onClick={() => addToCart(product, quantity)} disabled={product.stock === 0}>Add to cart</button>
                        <button className="product-buy-button" type="button" onClick={buyNow} disabled={product.stock === 0}>Buy now</button>
                    </div>
                    <div className="product-guarantees">
                        <span><i className="fas fa-box" aria-hidden="true" /> Order online with cash on delivery</span>
                        <span><i className="fas fa-map-marker-alt" aria-hidden="true" /> Delivery details confirmed at checkout</span>
                    </div>
                </section>
            </div>
            <section className="product-specifications">
                <h2>Specifications</h2>
                <dl>
                    {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key}><dt>{key}</dt><dd>{value}</dd></div>
                    ))}
                </dl>
            </section>
        </div>
    );
};

export default ProductDetailPage;

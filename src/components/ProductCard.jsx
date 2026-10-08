import { Link } from 'react-router-dom';
import { useCart } from '../context/cartStore';
import { formatPrice } from '../data/products';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <article className="store-product-card">
            <Link className="store-product-image" to={`/product/${product.id}`}>
                <img src={product.image} alt={product.imageAlt} loading="lazy" />
                {product.oldPrice && <span className="product-badge">Deal</span>}
            </Link>
            <div className="store-product-info">
                <span className="store-product-category">{product.category}</span>
                <Link className="store-product-title" to={`/product/${product.id}`}>{product.name}</Link>
                <div className="store-product-price">{formatPrice(product.price)}</div>
                <p className={`store-stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </p>
                <button
                    className="store-add-button"
                    type="button"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                >
                    <i className="fas fa-shopping-bag" aria-hidden="true" />
                    <span>{product.stock > 0 ? 'Add to cart' : 'Out of stock'}</span>
                </button>
            </div>
        </article>
    );
};

export default ProductCard;

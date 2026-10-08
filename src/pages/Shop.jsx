import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';
import '../styles/Shop.css';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('q') || '');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [sort, setSort] = useState(searchParams.get('sort') || 'featured');
    const category = searchParams.get('category') || 'all';

    useEffect(() => {
        setSearch(searchParams.get('q') || '');
        setSort(searchParams.get('sort') || 'featured');
    }, [searchParams]);

    const updateSearch = (value) => {
        setSearch(value);
        const next = new URLSearchParams(searchParams);
        if (value.trim()) next.set('q', value);
        else next.delete('q');
        setSearchParams(next);
    };

    const updateSort = (value) => {
        setSort(value);
        const next = new URLSearchParams(searchParams);
        if (value === 'featured') next.delete('sort');
        else next.set('sort', value);
        setSearchParams(next);
    };

    const selectCategory = (value) => {
        const next = new URLSearchParams(searchParams);
        if (value === 'all') next.delete('category');
        else next.set('category', value);
        setSearchParams(next);
    };

    const filteredProducts = useMemo(() => {
        const term = search.trim().toLowerCase();
        const filtered = products.filter((product) => {
            const matchesSearch = !term || [
                product.name,
                product.category,
                product.brand,
                ...product.keywords,
            ].join(' ').toLowerCase().includes(term);
            const matchesCategory = category === 'all' || product.categoryId === category;
            const matchesMin = minPrice === '' || product.price >= Number(minPrice);
            const matchesMax = maxPrice === '' || product.price <= Number(maxPrice);
            return matchesSearch && matchesCategory && matchesMin && matchesMax && (!inStockOnly || product.stock > 0);
        });

        return filtered.sort((a, b) => {
            if (sort === 'price-ascending') return a.price - b.price;
            if (sort === 'price-descending') return b.price - a.price;
            if (sort === 'newest') return Number(b.newArrival) - Number(a.newArrival);
            if (sort === 'popular') return Number(b.bestSeller) - Number(a.bestSeller);
            return Number(b.featured) - Number(a.featured);
        });
    }, [category, inStockOnly, maxPrice, minPrice, search, sort]);

    return (
        <div className="shop-page-container container">
            <header className="shop-header">
                <div>
                    <span className="store-eyebrow">Buy &amp; Get collection</span>
                    <h1>Shop electronics</h1>
                    <p>Find the right tech for your everyday.</p>
                </div>
                <label className="shop-sort">
                    <span>Sort by</span>
                    <select value={sort} onChange={(event) => updateSort(event.target.value)}>
                        <option value="featured">Featured</option>
                        <option value="newest">Newest</option>
                        <option value="price-ascending">Price: low to high</option>
                        <option value="price-descending">Price: high to low</option>
                        <option value="popular">Popular</option>
                    </select>
                </label>
            </header>

            <div className="shop-search">
                <i className="fas fa-search" aria-hidden="true" />
                <input aria-label="Search products" placeholder="Search phones, laptops, brands..." value={search} onChange={(event) => updateSearch(event.target.value)} />
                <button type="button" onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen}>
                    <i className="fas fa-sliders-h" aria-hidden="true" /> Filters
                </button>
            </div>

            <div className="shop-layout">
                <aside className={`shop-sidebar ${filtersOpen ? 'filters-open' : ''}`}>
                    <div className="filter-section">
                        <h2>Categories</h2>
                        <button className={category === 'all' ? 'active' : ''} onClick={() => selectCategory('all')} type="button">All products</button>
                        {categories.map((item) => (
                            <button className={category === item.id ? 'active' : ''} key={item.id} onClick={() => selectCategory(item.id)} type="button">
                                {item.name}
                            </button>
                        ))}
                    </div>
                    <div className="filter-section">
                        <h2>Price range (RWF)</h2>
                        <div className="price-filter-inputs">
                            <label><span>Min</span><input type="number" min="0" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} /></label>
                            <label><span>Max</span><input type="number" min="0" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} /></label>
                        </div>
                    </div>
                    <label className="stock-filter"><input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} /> In stock only</label>
                    <button className="filter-close" onClick={() => setFiltersOpen(false)} type="button">Show {filteredProducts.length} products</button>
                </aside>

                <section className="shop-main-content" aria-label="Products">
                    <p className="shop-result-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</p>
                    {filteredProducts.length > 0 ? (
                        <div className="store-product-grid">
                            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                        </div>
                    ) : (
                        <div className="shop-empty-state">
                            <h2>No products found</h2>
                            <p>Try another search or adjust your filters.</p>
                            <button type="button" onClick={() => { setSearch(''); setMinPrice(''); setMaxPrice(''); setInStockOnly(false); selectCategory('all'); }}>Clear filters</button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Shop;

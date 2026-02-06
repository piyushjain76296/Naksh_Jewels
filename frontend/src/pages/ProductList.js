import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/ProductList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/products`);

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();

            if (data.success) {
                setProducts(data.data);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="error">
                    <h2>Error Loading Products</h2>
                    <p>{error}</p>
                    <button onClick={fetchProducts} className="retry-btn">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="page-header">
                <h2>Our Collection</h2>
                <p>Discover our exquisite range of premium jewelry</p>
            </div>

            {products.length === 0 ? (
                <div className="empty-state">
                    <p>No products available at the moment.</p>
                </div>
            ) : (
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;

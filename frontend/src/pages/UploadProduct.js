import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Upload.css';

const UploadProduct = () => {
    const { isOwner, user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        stock: '',
        image: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOwner()) {
        return (
            <div className="container upload-error">
                <div className="error-card">
                    <h2>Access Denied</h2>
                    <p>Only store owners can upload products.</p>
                    <button onClick={() => navigate('/')} className="back-btn">
                        Go to Products
                    </button>
                </div>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            // Add product to in-memory store via API
            const response = await fetch('http://localhost:5000/api/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock)
                })
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Product uploaded successfully!' });
                setFormData({
                    name: '',
                    price: '',
                    category: '',
                    description: '',
                    stock: '',
                    image: ''
                });
                setTimeout(() => navigate('/'), 2000);
            } else {
                setMessage({ type: 'error', text: 'Failed to upload product' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error uploading product' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container upload-container">
            <div className="upload-card">
                <h2>Upload New Product</h2>
                <p className="upload-subtitle">Welcome, {user?.name}! Add a new jewelry item to your collection</p>

                {message && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Product Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., Diamond Ring"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Category *</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Rings">Rings</option>
                                <option value="Necklaces">Necklaces</option>
                                <option value="Earrings">Earrings</option>
                                <option value="Bracelets">Bracelets</option>
                                <option value="Pendants">Pendants</option>
                                <option value="Anklets">Anklets</option>
                                <option value="Chains">Chains</option>
                                <option value="Bangles">Bangles</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price (₹) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="5000"
                                min="0"
                                step="100"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Stock Quantity *</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="10"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the product details, materials, design..."
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Image URL *</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                        {formData.image && (
                            <div className="image-preview">
                                <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        )}
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadProduct;

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
    const [dragActive, setDragActive] = useState(false);
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

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setFormData(prev => ({
                        ...prev,
                        image: event.target.result
                    }));
                };
                reader.readAsDataURL(file);
            } else {
                setMessage({ type: 'error', text: 'Please drop an image file' });
            }
        }
    };

    const handleImageClick = () => {
        document.getElementById('imageInput').click();
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    image: event.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
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
            setMessage({ type: 'error', text: 'Error uploading product: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container upload-container">
            <div className="upload-card">
                <h2>Upload New Product</h2>
                <p className="upload-subtitle">Add a new jewelry item to your collection, {user?.name}</p>

                {message && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Product Name</label>
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
                            <label>Category</label>
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
                            <label>Price (Rs)</label>
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
                            <label>Stock Quantity</label>
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
                        <label>Description</label>
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
                        <label>Product Image</label>
                        <div
                            className={`drag-drop-area ${dragActive ? 'active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={handleImageClick}
                        >
                            {formData.image ? (
                                <div className="image-preview-large">
                                    <img src={formData.image} alt="Preview" />
                                    <p>Click to change image or drag new one</p>
                                </div>
                            ) : (
                                <div className="drag-drop-content">
                                    <div className="drag-drop-icon">⬆</div>
                                    <p>Drag and drop image here</p>
                                    <small>or click to select from computer</small>
                                </div>
                            )}
                            <input
                                id="imageInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </div>
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

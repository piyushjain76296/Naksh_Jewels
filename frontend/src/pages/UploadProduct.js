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
        images: []
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

    const processFiles = (files) => {
        const fileArray = Array.from(files);
        let processedCount = 0;

        fileArray.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setFormData(prev => ({
                        ...prev,
                        images: [...prev.images, event.target.result]
                    }));
                    processedCount++;
                };
                reader.readAsDataURL(file);
            }
        });

        if (fileArray.length > processedCount) {
            setTimeout(() => {
                setMessage({ type: 'error', text: 'Only image files are supported' });
            }, 100);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFiles(files);
        }
    };

    const handleImageClick = () => {
        document.getElementById('imageInput').click();
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            processFiles(e.target.files);
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!formData.images || formData.images.length === 0) {
            setMessage({ type: 'error', text: 'Please upload at least one product image' });
            return;
        }

        if (!formData.name || !formData.price || !formData.category || !formData.stock || !formData.description) {
            setMessage({ type: 'error', text: 'Please fill in all required fields' });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    price: parseFloat(formData.price),
                    category: formData.category,
                    description: formData.description,
                    stock: parseInt(formData.stock),
                    images: formData.images
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
                    images: []
                });
                setTimeout(() => navigate('/'), 2000);
            } else {
                const errorData = await response.json();
                setMessage({ type: 'error', text: errorData.error || 'Failed to upload product' });
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
                            <label>Price (Rs) *</label>
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
                        <label>Product Images * ({formData.images.length} uploaded)</label>
                        <div
                            className={`drag-drop-area ${dragActive ? 'active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={handleImageClick}
                        >
                            <div className="drag-drop-content">
                                <div className="drag-drop-icon">Image Upload</div>
                                <p>Drag & drop images here</p>
                                <small>or click to select files (multiple images supported)</small>
                            </div>
                        </div>
                        <input
                            id="imageInput"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </div>

                    {formData.images.length > 0 && (
                        <div className="images-preview">
                            <h4>Uploaded Images ({formData.images.length})</h4>
                            <div className="images-grid">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="image-preview-item">
                                        <img src={image} alt={`Product ${index + 1}`} />
                                        <button
                                            type="button"
                                            className="remove-image-btn"
                                            onClick={() => removeImage(index)}
                                            title="Remove image"
                                        >
                                            X
                                        </button>
                                        <span className="image-number">{index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading || !formData.images.length}
                    >
                        {loading ? 'Uploading...' : 'Upload Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadProduct;

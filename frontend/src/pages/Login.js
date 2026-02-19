import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
        role: 'user'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { login, signup } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            login(formData.email, formData.password, formData.role);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password || !formData.name || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }

        try {
            signup(formData.email, formData.password, formData.name, formData.role);
            setSuccess('Account created successfully! Redirecting...');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError(err.message || 'Sign up failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Naksh Jewels</h2>
                <p className="auth-subtitle">Premium Jewelry Collection</p>

                <div className="tab-buttons">
                    <button
                        className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('login');
                            setError('');
                            setSuccess('');
                        }}
                    >
                        Login
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('signup');
                            setError('');
                            setSuccess('');
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                {activeTab === 'login' ? (
                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Login as</label>
                            <div className="role-selector">
                                <label className="role-option">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="user"
                                        checked={formData.role === 'user'}
                                        onChange={handleChange}
                                    />
                                    <span>Customer</span>
                                </label>
                                <label className="role-option">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="owner"
                                        checked={formData.role === 'owner'}
                                        onChange={handleChange}
                                    />
                                    <span>Store Owner</span>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="auth-btn">
                            Login
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSignup} className="auth-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="At least 6 characters"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Register as</label>
                            <div className="role-selector">
                                <label className="role-option">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="user"
                                        checked={formData.role === 'user'}
                                        onChange={handleChange}
                                    />
                                    <span>Customer</span>
                                </label>
                                <label className="role-option">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="owner"
                                        checked={formData.role === 'owner'}
                                        onChange={handleChange}
                                    />
                                    <span>Store Owner</span>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="auth-btn">
                            Create Account
                        </button>
                    </form>
                )}

                <div className="auth-footer">
                    <p>Try demo accounts (password: password123)</p>
                    <p className="demo-info">demo@user.com or demo@owner.com</p>
                </div>

                <Link to="/" className="back-link">Back to Products</Link>
            </div>
        </div>
    );
};

export default Login;

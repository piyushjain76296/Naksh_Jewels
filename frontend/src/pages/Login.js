import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // 'user' or 'owner'
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }

        try {
            login(email, password, role);
            navigate('/');
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome to Naksh Jewels</h2>
                <p className="login-subtitle">Login to your account</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Login as</label>
                        <div className="role-selector">
                            <label className="role-option">
                                <input
                                    type="radio"
                                    value="user"
                                    checked={role === 'user'}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <span>Customer</span>
                            </label>
                            <label className="role-option">
                                <input
                                    type="radio"
                                    value="owner"
                                    checked={role === 'owner'}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <span>Store Owner</span>
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? Use demo credentials:</p>
                    <p className="demo-creds">
                        User: demo@user.com | Owner: demo@owner.com<br/>
                        Password: any password
                    </p>
                </div>

                <Link to="/" className="back-link">← Back to Products</Link>
            </div>
        </div>
    );
};

export default Login;

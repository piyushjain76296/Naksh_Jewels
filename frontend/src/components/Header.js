import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
    const { getCartCount } = useCart();
    const { user, logout, isOwner } = useAuth();
    const cartCount = getCartCount();

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    <h1>✨ Naksh Jewels</h1>
                </Link>

                <nav className="nav">
                    <Link to="/" className="nav-link">Products</Link>
                    
                    {isOwner() && (
                        <Link to="/upload" className="nav-link upload-link">
                            📤 Upload Product
                        </Link>
                    )}

                    {user ? (
                        <div className="user-menu">
                            <span className="user-info">
                                {user.name} <span className="role-badge">{user.role === 'owner' ? '👤 Owner' : '👥 Customer'}</span>
                            </span>
                            <button onClick={logout} className="logout-btn">Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-link login-link">🔑 Login</Link>
                    )}

                    <Link to="/cart" className="nav-link cart-link">
                        🛒 Cart
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;

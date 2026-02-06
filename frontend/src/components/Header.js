import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Header.css';

const Header = () => {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    <h1>Naksh Jewels</h1>
                </Link>

                <nav className="nav">
                    <Link to="/" className="nav-link">Products</Link>
                    <Link to="/cart" className="nav-link cart-link">
                        Cart
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;

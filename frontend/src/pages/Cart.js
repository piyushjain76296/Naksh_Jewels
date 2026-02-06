import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    const handleQuantityChange = (productId, newQuantity) => {
        const quantity = parseInt(newQuantity);
        if (quantity >= 0) {
            updateQuantity(productId, quantity);
        }
    };

    const handleIncrement = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity + 1);
    };

    const handleDecrement = (productId, currentQuantity) => {
        if (currentQuantity > 1) {
            updateQuantity(productId, currentQuantity - 1);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container">
                <div className="empty-cart">
                    <h2>Your Cart is Empty</h2>
                    <p>Add some beautiful jewelry to your cart!</p>
                    <Link to="/" className="continue-shopping-btn">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="cart-header">
                <h2>Shopping Cart</h2>
                <button onClick={clearCart} className="clear-cart-btn">
                    Clear Cart
                </button>
            </div>

            <div className="cart-content">
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item._id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />

                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p className="cart-item-category">{item.category}</p>
                                <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</p>
                            </div>

                            <div className="cart-item-actions">
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => handleDecrement(item._id, item.quantity)}
                                        className="quantity-btn"
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                        className="quantity-input"
                                    />
                                    <button
                                        onClick={() => handleIncrement(item._id, item.quantity)}
                                        className="quantity-btn"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            </div>

                            <div className="cart-item-total">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>

                    <div className="summary-row">
                        <span>Subtotal:</span>
                        <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                    </div>

                    <div className="summary-row">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>

                    <div className="summary-row total">
                        <span>Total:</span>
                        <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                    </div>

                    <button className="checkout-btn">
                        Proceed to Checkout
                    </button>

                    <Link to="/" className="continue-shopping-link">
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;

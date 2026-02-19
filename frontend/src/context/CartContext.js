import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartLoading, setCartLoading] = useState(false);

    // Limit localStorage to small data only (user session, not products)
    const serializeCart = (cartItems) => {
        // Only store product IDs and quantities, not entire product objects
        return cartItems.map(item => ({
            productId: item._id,
            quantity: item.quantity
        }));
    };

    // Save minimal cart data to localStorage
    const saveCartLocal = useCallback((cartItems) => {
        try {
            const minimal = serializeCart(cartItems);
            localStorage.setItem('naksh-jewels-cart-minimal', JSON.stringify(minimal));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, []);

    // Load cart from localStorage on mount
    useEffect(() => {
        const loadCart = async () => {
            try {
                setCartLoading(true);
                // Try to fetch full cart data from backend or localStorage
                const savedCart = localStorage.getItem('naksh-jewels-cart-minimal');
                if (savedCart) {
                    const minimal = JSON.parse(savedCart);
                    // Convert to full product structure with basic info
                    const fullCart = minimal.map(item => ({
                        _id: item.productId,
                        name: `Product ${item.productId}`,
                        quantity: item.quantity,
                        price: 0,
                        image: ''
                    }));
                    setCart(fullCart);
                } else {
                    setCart([]);
                }
            } catch (error) {
                console.error('Error loading cart:', error);
                setCart([]);
            } finally {
                setCartLoading(false);
            }
        };
        loadCart();
    }, []);

    // Save minimal cart data whenever it changes
    useEffect(() => {
        saveCartLocal(cart);
    }, [cart, saveCartLocal]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item._id === product._id);

            let newCart;
            if (existingItem) {
                // Update quantity if item already exists
                newCart = prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item (limit product data stored)
                newCart = [...prevCart, {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                }];
            }
            return newCart;
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('naksh-jewels-cart-minimal');
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cart,
        cartLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


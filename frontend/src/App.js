import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import './styles/App.css';

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="app">
                    <Header />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<ProductList />} />
                            <Route path="/cart" element={<Cart />} />
                        </Routes>
                    </main>
                    <footer className="footer">
                        <p>&copy; 2026 Naksh Jewels. All rights reserved.</p>
                    </footer>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;

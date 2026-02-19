import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Login from './pages/Login';
import UploadProduct from './pages/UploadProduct';
import './styles/App.css';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="app">
                        <Header />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<ProductList />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/upload" element={<UploadProduct />} />
                            </Routes>
                        </main>
                        <footer className="footer">
                            <p>&copy; 2026 Naksh Jewels. All rights reserved.</p>
                        </footer>
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;

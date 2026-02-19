import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Simple in-memory user database
let usersDatabase = {
    'demo@user.com': { password: 'password123', name: 'Demo User', role: 'user' },
    'demo@owner.com': { password: 'password123', name: 'Demo Owner', role: 'owner' }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signup = (email, password, name, role = 'user') => {
        if (usersDatabase[email]) {
            throw new Error('Email already registered');
        }

        usersDatabase[email] = {
            password,
            name,
            role
        };

        const userData = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            role
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    };

    const login = (email, password, role) => {
        const userRecord = usersDatabase[email];

        if (!userRecord || userRecord.password !== password) {
            throw new Error('Invalid email or password');
        }

        const userData = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: userRecord.name,
            role: userRecord.role
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const isOwner = () => user && user.role === 'owner';
    const isLoggedIn = () => !!user;

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, loading, isOwner, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

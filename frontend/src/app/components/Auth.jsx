"use client"
import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const Auth = () => {
    const [showLogin, setShowLogin] = useState(true) // Default to show login

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-96">
                {showLogin ? (
                    <Login setShowLogin={setShowLogin} />
                ) : (
                    <Register setShowLogin={setShowLogin} />
                )}
            </div>
        </div>
    );
};

export default Auth;

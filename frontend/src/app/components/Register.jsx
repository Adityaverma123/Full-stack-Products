import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { register } from '../services/backend/authService';

const Register = ({ setShowLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, password)
            setError(null);
            setUsername('');
            setPassword('');
            router.push('/products')

        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600 transition"
                >
                    Register
                </button>
            </form>
            <p className="text-center mt-4">
                Already have an account?{' '}
                <button
                    onClick={() => setShowLogin(true)} // Show login component
                    className="text-blue-500 hover:underline"
                >
                    Login
                </button>
            </p>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {success && <p className="text-green-500 text-center mt-2">{success}</p>}
        </div>
    );
};

export default Register;

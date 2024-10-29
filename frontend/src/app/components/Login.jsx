import React, { useState } from 'react';
import { login } from '../services/backend/authService';
import { useRouter } from "next/navigation";

const  Login = ({ setShowLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password)
            setError(null);
            setUsername('');
            setPassword('');
            router.push('/products')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
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
                    className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </form>
            <p className="text-center mt-4">
                New here?{' '}
                <button
                    onClick={() => setShowLogin(false)}
                    className="text-blue-500 hover:underline"
                >
                    Register
                </button>
            </p>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {success && <p className="text-green-500 text-center mt-2">{success}</p>}
        </div>
    );
};

export default Login;

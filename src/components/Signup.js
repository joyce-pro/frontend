import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const baseUrl = process.env.REACT_APP_USER_MANAGEMENT_URL;

    const handleSignup = async () => {
        try {
            const response = await fetch(`${baseUrl}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/');
            } else {
                setError(data.message || 'Signup failed.');
                // console
            }
        } catch (err) {
            console.log(err)
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="bg-gray-50 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg relative overflow-hidden">
                <h2 className="text-2xl font-semibold text-center text-black">Create an Account</h2>
                <p className="text-sm text-center text-gray-600 mt-1">Sign up to get started</p>
                <form
                    className="mt-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSignup();
                    }}
                >
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-black">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-black">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-black">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 shadow-md transition duration-300 ease-in-out"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-700">
                    Already have an account?{' '}
                    <a href="/" className="text-yellow-500 font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Signup;

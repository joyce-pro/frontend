import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const baseUrl = process.env.REACT_APP_USER_MANAGEMENT_URL;

    const handleLogin = async () => {
        try {

            if (email == "aeschiring@gmail.com" && password == "aesc#123@") {
                localStorage.setItem('token', "snlkvjskejisjeojeocmc;wm");
                navigate('/');
            } else {
                setError('Login failed.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="bg-gray-50 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg relative overflow-hidden">
                <h2 className="text-2xl font-semibold text-center text-black">Welcome Back</h2>
                <p className="text-sm text-center text-gray-600 mt-1">Please log in to continue</p>
                <form
                    className="mt-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
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
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-700">
                    Don’t have an account?{' '}
                    <a href="/signup" className="text-yellow-500 font-semibold hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;

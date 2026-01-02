import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate('/games');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)] p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700">
                <h2 className="text-3xl mb-6 font-bold text-center text-gray-800 dark:text-white">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 mb-2 text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 mb-2 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-brand-600 text-white p-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors shadow-lg hover:shadow-brand-600/30"
                    >
                        Sign In
                    </button>
                    <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                        Don't have an account? <Link to="/register" className="text-brand-600 dark:text-brand-400 hover:underline">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;

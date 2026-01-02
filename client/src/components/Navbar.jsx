import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaGamepad } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setDarkMode(true);
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md p-4 transition-colors duration-300 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-brand-600 dark:text-brand-400 flex items-center gap-2">
                    <FaGamepad className="text-3xl" />
                    <span>Mini Sports</span>
                </Link>

                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
                    >
                        {darkMode ? <FaSun className="text-yellow-400 text-xl" /> : <FaMoon className="text-gray-600 text-xl" />}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/games" className="font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Games</Link>
                            <Link to="/favorites" className="font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Favorites</Link>
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-lg hover:shadow-red-500/30"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Login</Link>
                            <Link
                                to="/register"
                                className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors shadow-lg hover:shadow-brand-600/30"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

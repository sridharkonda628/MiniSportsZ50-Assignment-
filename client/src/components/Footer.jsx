import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Mini Sports</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">© {new Date().getFullYear()} All rights reserved.</p>
                    </div>

                    <div className="flex space-x-6 mb-4 md:mb-0">
                        <Link to="#" className="text-gray-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                            <FaTwitter className="text-xl" />
                        </Link>
                        <Link to="#" className="text-gray-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                            <FaFacebook className="text-xl" />
                        </Link>
                        <Link to="#" className="text-gray-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                            <FaInstagram className="text-xl" />
                        </Link>
                        <Link to="#" className="text-gray-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                            <FaGithub className="text-xl" />
                        </Link>
                    </div>

                    <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <Link to="#" className="hover:underline">Privacy Policy</Link>
                        <Link to="#" className="hover:underline">Terms of Service</Link>
                        <Link to="#" className="hover:underline">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

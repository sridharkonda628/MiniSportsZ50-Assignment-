import { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { FaTrash, FaCalendarAlt, FaGamepad } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await api.get('/favorites');
                setFavorites(res.data);
            } catch (error) {
                console.error('Error fetching favorites', error);
                toast.error('Failed to load favorites');
            }
        };
        fetchFavorites();
    }, []);

    const removeFavorite = async (gameId) => {
        try {
            await api.delete(`/favorites/${gameId}`);
            setFavorites(favorites.filter(f => f.gameId !== gameId));
            toast.success('Removed from favorites');
        } catch (error) {
            console.error('Error removing favorite', error);
            toast.error('Failed to remove favorite');
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">My Favorites</h1>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <FaGamepad className="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-xl mb-6">No favorites added yet.</p>
                    <Link
                        to="/games"
                        className="bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors shadow-lg hover:shadow-brand-600/30"
                    >
                        Browse Games
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((fav) => (
                        <div key={fav.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-2 h-full bg-brand-500 transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>

                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {fav.game.sport}
                                </span>
                                <button
                                    onClick={() => removeFavorite(fav.gameId)}
                                    className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                    title="Remove from favorites"
                                >
                                    <FaTrash className="text-lg" />
                                </button>
                            </div>

                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{fav.game.teamA} <span className="text-brand-500">vs</span> {fav.game.teamB}</h2>
                            <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">{fav.game.league}</p>

                            <div className="flex items-center text-gray-400 text-sm mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                <FaCalendarAlt className="mr-2" />
                                {new Date(fav.game.startTime).toLocaleDateString()} • {new Date(fav.game.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;

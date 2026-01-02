import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaHeart, FaRegHeart, FaCalendarAlt } from 'react-icons/fa';

const Games = () => {
    const [games, setGames] = useState([]);
    const [sport, setSport] = useState('');
    const [favorites, setFavorites] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetchGames();
        if (user) fetchFavorites();
    }, [sport, user]);

    const fetchGames = async () => {
        try {
            const res = await api.get(`/games${sport ? `?sport=${sport}` : ''}`);
            setGames(res.data);
        } catch (error) {
            console.error('Error fetching games', error);
            toast.error('Failed to load games');
        }
    };

    const fetchFavorites = async () => {
        try {
            const res = await api.get('/favorites');
            setFavorites(res.data.map(f => f.gameId));
        } catch (error) {
            console.error('Error fetching favorites', error);
        }
    };

    const toggleFavorite = async (gameId) => {
        try {
            if (favorites.includes(gameId)) {
                await api.delete(`/favorites/${gameId}`);
                setFavorites(favorites.filter(id => id !== gameId));
                toast.success('Removed from favorites');
            } else {
                await api.post(`/favorites/${gameId}`);
                setFavorites([...favorites, gameId]);
                toast.success('Added to favorites');
            }
        } catch (error) {
            console.error('Error toggling favorite', error);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Live Matches</h1>
                <select
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 w-full md:w-64 shadow-sm"
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                >
                    <option value="">All Sports</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Casino">Casino</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game) => (
                    <div key={game.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-brand-500 transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>

                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                                {game.sport}
                            </span>
                            {user && (
                                <button
                                    onClick={() => toggleFavorite(game.id)}
                                    className={`p-2 rounded-full transition-all ${favorites.includes(game.id)
                                            ? 'text-red-500 bg-red-50 dark:bg-red-900/20 md:hover:bg-red-100'
                                            : 'text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {favorites.includes(game.id) ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
                                </button>
                            )}
                        </div>

                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{game.teamA} <span className="text-brand-500">vs</span> {game.teamB}</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">{game.league}</p>

                        <div className="flex items-center text-gray-400 text-sm mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                            <FaCalendarAlt className="mr-2" />
                            {new Date(game.startTime).toLocaleDateString()} • {new Date(game.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                ))}
            </div>
            {games.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No matches found for this category.</p>
                </div>
            )}
        </div>
    );
};

export default Games;

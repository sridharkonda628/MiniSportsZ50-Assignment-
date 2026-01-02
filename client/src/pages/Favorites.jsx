import { useState, useEffect } from 'react';
import api from '../api/axios';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const res = await api.get('/favorites');
            setFavorites(res.data);
        } catch (error) {
            console.error('Error fetching favorites', error);
        }
    };

    const removeFavorite = async (gameId) => {
        try {
            await api.delete(`/favorites/${gameId}`);
            setFavorites(favorites.filter(f => f.gameId !== gameId));
        } catch (error) {
            console.error('Error removing favorite', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.map((fav) => (
                        <div key={fav.id} className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-bold">{fav.game.teamA} vs {fav.game.teamB}</h2>
                            <p className="text-gray-600">{fav.game.sport} - {fav.game.league}</p>
                            <p className="text-gray-500">{new Date(fav.game.startTime).toLocaleString()}</p>
                            <button
                                onClick={() => removeFavorite(fav.gameId)}
                                className="mt-2 px-4 py-2 rounded bg-red-500 text-white"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;

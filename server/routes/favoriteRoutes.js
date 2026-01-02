const express = require('express');
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:gameId', protect, addFavorite);
router.delete('/:gameId', protect, removeFavorite);
router.get('/', protect, getFavorites);

module.exports = router;

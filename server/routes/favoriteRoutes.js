const express = require('express');
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:gameId', authMiddleware, addFavorite);
router.delete('/:gameId', authMiddleware, removeFavorite);
router.get('/', authMiddleware, getFavorites);

module.exports = router;

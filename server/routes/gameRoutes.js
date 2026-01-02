const express = require('express');
const { getGames } = require('../controllers/gameController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getGames);

module.exports = router;

const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

module.exports = router;

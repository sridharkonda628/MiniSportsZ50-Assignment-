const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

exports.protect = (req, res, next) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Not authorized, please login', 401));
    } try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        next(new AppError('Invalid token, please login again', 401));
    }
};

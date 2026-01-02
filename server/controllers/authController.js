const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const AppError = require('../utils/AppError');

const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    const cookieOptions = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true, // Prevents client-side JS from reading the cookie
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        sameSite: 'strict' // CSRF protection
    };

    res.cookie('token', token, cookieOptions);

    user.password = undefined; // Don't send password back

    res.status(statusCode).json({
        status: 'success',
        token, // Optional: sent for debugging or client-side non-sensitive use
        user
    });
};

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return next(new AppError('User already exists', 409));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });

        sendTokenResponse(user, 201, res);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new AppError('Invalid credentials', 401));
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ status: 'success', message: 'Logged out successfully' });
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });

        user.password = undefined;

        res.status(200).json({
            status: 'success',
            user
        });
    } catch (error) {
        next(error);
    }
};

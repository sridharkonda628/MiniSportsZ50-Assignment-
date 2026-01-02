const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

dotenv.config();

const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:5173', 'https://minisportsz50-assignment.onrender.com'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/games', gameRoutes);
app.use('/favorites', favoriteRoutes);

// 404 handler for undefined routes
app.all(/(.*)/, (req, res, next) => {
    // If not API route and in production, serve React app
    if (process.env.NODE_ENV === 'production') {
        return next();
    }
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

const globalErrorHandler = require('./middleware/errorMiddleware');
app.use(globalErrorHandler);

// Serve static assets in production
const path = require('path');
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Mini Sports Platform API');
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

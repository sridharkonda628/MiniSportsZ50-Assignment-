const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addFavorite = async (req, res, next) => {
    try {
        const { gameId } = req.params;
        const userId = req.user.userId;
        const favorite = await prisma.favorite.create({
            data: { userId, gameId },
        });
        res.status(201).json(favorite);
    } catch (error) {
        next(error);
    }
};

exports.removeFavorite = async (req, res, next) => {
    try {
        const { gameId } = req.params;
        const userId = req.user.userId;
        await prisma.favorite.deleteMany({
            where: { userId, gameId },
        });
        res.json({ message: 'Favorite removed' });
    } catch (error) {
        next(error);
    }
};

exports.getFavorites = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const favorites = await prisma.favorite.findMany({
            where: { userId },
            include: { game: true },
        });
        res.json(favorites);
    } catch (error) {
        next(error);
    }
};

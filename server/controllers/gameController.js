const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getGames = async (req, res, next) => {
    try {
        const { sport } = req.query;
        const where = sport ? { sport } : {};
        const games = await prisma.game.findMany({ where });
        res.json(games);
    } catch (error) {
        next(error);
    }
};

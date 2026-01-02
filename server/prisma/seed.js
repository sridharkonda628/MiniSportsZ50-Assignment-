const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Cleaning up database...');
    await prisma.favorite.deleteMany({});
    await prisma.game.deleteMany({});

    const games = [
        // CRICKET
        {
            sport: 'Cricket',
            league: 'IPL',
            teamA: 'Chennai Super Kings',
            teamB: 'Mumbai Indians',
            startTime: new Date(Date.now() + 86400000), // Tomorrow
        },
        {
            sport: 'Cricket',
            league: 'IPL',
            teamA: 'Royal Challengers Bangalore',
            teamB: 'Kolkata Knight Riders',
            startTime: new Date(Date.now() + 172800000), // Day after tomorrow
        },
        {
            sport: 'Cricket',
            league: 'T20 World Cup',
            teamA: 'India',
            teamB: 'Australia',
            startTime: new Date(Date.now() + 259200000),
        },
        {
            sport: 'Cricket',
            league: 'T20 World Cup',
            teamA: 'England',
            teamB: 'Pakistan',
            startTime: new Date(Date.now() + 345600000),
        },

        // FOOTBALL
        {
            sport: 'Football',
            league: 'Premier League',
            teamA: 'Manchester United',
            teamB: 'Liverpool',
            startTime: new Date(Date.now() + 100000000),
        },
        {
            sport: 'Football',
            league: 'Premier League',
            teamA: 'Arsenal',
            teamB: 'Chelsea',
            startTime: new Date(Date.now() + 200000000),
        },
        {
            sport: 'Football',
            league: 'La Liga',
            teamA: 'Real Madrid',
            teamB: 'Barcelona',
            startTime: new Date(Date.now() + 300000000),
        },
        {
            sport: 'Football',
            league: 'Serie A',
            teamA: 'Juventus',
            teamB: 'AC Milan',
            startTime: new Date(Date.now() + 400000000),
        },

        // TENNIS
        {
            sport: 'Tennis',
            league: 'Wimbledon',
            teamA: 'Novak Djokovic',
            teamB: 'Carlos Alcaraz',
            startTime: new Date(Date.now() + 150000000),
        },
        {
            sport: 'Tennis',
            league: 'Roland Garros',
            teamA: 'Rafael Nadal',
            teamB: 'Stefanos Tsitsipas',
            startTime: new Date(Date.now() + 250000000),
        },

        // BASKETBALL
        {
            sport: 'Basketball',
            league: 'NBA',
            teamA: 'Lakers',
            teamB: 'Warriors',
            startTime: new Date(Date.now() + 50000000),
        },
        {
            sport: 'Basketball',
            league: 'NBA',
            teamA: 'Celtics',
            teamB: 'Heat',
            startTime: new Date(Date.now() + 120000000),
        },

        // CASINO (Simulated as games for the mini platform)
        {
            sport: 'Casino',
            league: 'Table Games',
            teamA: 'Blackjack',
            teamB: 'Table 1',
            startTime: new Date(),
        },
        {
            sport: 'Casino',
            league: 'Slots',
            teamA: 'Mega Moolah',
            teamB: 'Jackpot',
            startTime: new Date(),
        },
        {
            sport: 'Casino',
            league: 'Table Games',
            teamA: 'Poker',
            teamB: 'Texas Hold\'em',
            startTime: new Date(),
        },
    ];

    console.log(`Seeding ${games.length} games...`);

    for (const game of games) {
        await prisma.game.create({
            data: game,
        });
    }

    console.log('Seeding completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

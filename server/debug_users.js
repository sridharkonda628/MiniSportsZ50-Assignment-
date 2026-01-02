const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();
    console.log(`Total users: ${users.length}`);
    users.forEach(u => console.log(` - ${u.email} (${u.id})`));

    const email = 'test@example.com';
    const specific = await prisma.user.findUnique({ where: { email } });
    console.log(`FindUnique '${email}':`, specific ? 'FOUND' : 'NOT FOUND');
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

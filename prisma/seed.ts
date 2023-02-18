import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const aliceData = {
    email: 'alice@prisma.io',
    name: 'Alice',
    passwordHash:
      '$2y$19$GHloi75EHUiV/xixFVG3jeDtlE/FriMZxeL/9cFfDxEYV50l2r1n6', // secret
    role: 'ADMIN',
  };
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: aliceData,
    create: aliceData,
  });

  const bobData = {
    email: 'bob@prisma.io',
    name: 'Bob',
    passwordHash: 'bdc87b9c894da5168059e00ebffb9077', // password1234
    role: 'COMPANY',
  };
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: bobData,
    create: bobData,
  });

  console.log({ alice, bob });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

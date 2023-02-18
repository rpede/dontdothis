import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = {
    email: 'admin@example.com',
    name: 'God',
    passwordHash:
      '$2y$19$GHloi75EHUiV/xixFVG3jeDtlE/FriMZxeL/9cFfDxEYV50l2r1n6', // secret
    role: 'ADMIN',
  };
  await prisma.user.upsert({
    where: { email: admin.email },
    update: admin,
    create: admin,
  });

  const companyAData = {
    name: 'Company A',
  };
  const companyA = await prisma.company.upsert({
    where: { name: companyAData.name },
    update: companyAData,
    create: companyAData,
  });

  const michaelData = {
    email: 'michaelscott@a.com',
    name: 'Michael Scott',
    passwordHash: 'bdc87b9c894da5168059e00ebffb9077', // password1234
    role: 'COMPANY',
    companyId: companyA.id,
  };
  await prisma.user.upsert({
    where: { email: michaelData.email },
    update: michaelData,
    create: michaelData,
  });
  const jimData = {
    email: 'jim@a.com',
    name: 'Jim',
    passwordHash: 'bdc87b9c894da5168059e00ebffb9077', // password1234
    role: 'NORMAL',
    companyId: companyA.id,
  };
  await prisma.user.upsert({
    where: { email: jimData.email },
    update: jimData,
    create: jimData,
  });
  const pamData = {
    email: 'pam@a.com',
    name: 'Pam',
    passwordHash: 'bdc87b9c894da5168059e00ebffb9077', // password1234
    role: 'NORMAL',
    companyId: companyA.id,
  };
  await prisma.user.upsert({
    where: { email: pamData.email },
    update: pamData,
    create: pamData,
  });
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

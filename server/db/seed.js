import dotenv from 'dotenv';
import { prisma } from './client.js';
import bcrypt from 'bcryptjs';

dotenv.config();

async function main() {
  console.log('>> Очистка БД...');
  await prisma.creatureInstance.deleteMany();
  await prisma.battle.deleteMany();
  await prisma.userTask.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.task.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.creatureSpec.deleteMany();
  await prisma.user.deleteMany();

  console.log('>> Создание CreatureSpec...');
  const specsData = [
    { name: 'Гоблин', rarity: "COMMON", baseHP: 60, baseATK: 18, baseDEF: 8 },
    { name: 'Волк', rarity: "UNCOMMON", baseHP: 80, baseATK: 24, baseDEF: 12 },
    { name: 'Голем', rarity: "RARE", baseHP: 140, baseATK: 30, baseDEF: 30 },
    { name: 'Дракон', rarity: "EPIC", baseHP: 220, baseATK: 60, baseDEF: 45 },
    { name: 'Феникс', rarity: "LEGENDARY", baseHP: 250, baseATK: 70, baseDEF: 55 },
  ];
  const specs = [];
  for (const data of specsData) {
    specs.push(await prisma.creatureSpec.create({ data }));
  }

  console.log('>> Создание пользователя...');
  const passwordHash = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      username: 'admin',
      passwordHash,
      wallet: { create: { coins: 100000 } }, // фикс: coins вместо balance
    }
  });

  console.log('>> Создание инстансов...');
  for (let i = 0; i < 2; i++) {
    const spec = specs[i];
    await prisma.creatureInstance.create({
      data: {
        ownerId: user.id,
        specId: spec.id,
        stars: 1,
        hp: spec.baseHP,
        atk: spec.baseATK,
        def: spec.baseDEF
      }
    });
  }

  console.log('>> Задания...');
  const tasks = [
    { title: 'Выиграй бой', description: 'Победи хотя бы в одном сражении', reward: 100 },
    { title: 'Открой 3 яйца', description: 'Испытай удачу в гаче', reward: 50 },
    { title: 'Прокачай существо', description: 'Увеличь звёзды у любого существа', reward: 75 },
  ];
  for (const t of tasks) {
    await prisma.task.create({ data: t });
  }

  console.log('>> Галерея...');
  const gallery = [
    { specId: specs[0].id }, // Гоблин
    { specId: specs[1].id }, // Волк
    { specId: specs[3].id }, // Дракон
  ];
  for (const g of gallery) {
    await prisma.gallery.create({ data: g });
  }

  console.log('✅ Сид завершён: admin@example.com / admin123');
}

main()
  .catch(e => {
    console.error('❌ Ошибка сидера:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

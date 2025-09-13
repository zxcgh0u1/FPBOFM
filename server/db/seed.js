require('dotenv').config();
const { prisma } = require('./client');
const { Rarity } = require('@prisma/client');

console.log('>> Enum check:', Rarity);

async function main() {
  console.log('>> Specs preview:', [
    { name: 'Гоблин', rarity: Rarity.COMMON },
    { name: 'Волк', rarity: Rarity.UNCOMMON },
  ]);

  // чистим зависимые таблицы
  await prisma.creatureInstance.deleteMany();
  await prisma.battle.deleteMany();
  await prisma.userTask.deleteMany();
  await prisma.creatureSpec.deleteMany();

  const specs = [
    { name: 'Гоблин', rarity: Rarity.COMMON, dropRate: 50, baseHP: 60, baseATK: 18, baseDEF: 8 },
    { name: 'Волк', rarity: Rarity.UNCOMMON, dropRate: 30, baseHP: 80, baseATK: 24, baseDEF: 12 },
    { name: 'Голем', rarity: Rarity.RARE, dropRate: 12, baseHP: 140, baseATK: 30, baseDEF: 30 },
    { name: 'Дракон', rarity: Rarity.EPIC, dropRate: 6, baseHP: 220, baseATK: 60, baseDEF: 45 },
    { name: 'Феникс', rarity: Rarity.LEGENDARY, dropRate: 2, baseHP: 250, baseATK: 70, baseDEF: 55 },
  ];

  await prisma.creatureSpec.createMany({ data: specs });

  console.log('✅ Существа успешно засеяны');
}

main()
  .then(() => process.exit(0))
  .catch(e => { console.error(e); process.exit(1); });

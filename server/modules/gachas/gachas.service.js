const { prisma } = require('../../db/client');

async function rollCreature() {
  const specs = await prisma.creatureSpec.findMany();
  const sumRate = specs.reduce((sum, s) => sum + s.dropRate, 0);
  let r = Math.random() * sumRate;
  for (const s of specs) {
    r -= s.dropRate;
    if (r <= 0) return s;
  }
  return specs[0];
}

exports.openEgg = async (userId) => {
  const wallet = await prisma.wallet.findUnique({ where: { userId } });
  if (wallet.balance < 100) throw new Error('Недостаточно валюты');
  const spec = await rollCreature();
  return prisma.$transaction([
    prisma.wallet.update({
      where: { userId },
      data: { balance: { decrement: 100 } },
    }),
    prisma.creatureInstance.create({
      data: { ownerId: userId, specId: spec.id },
      include: { spec: true },
    }),
  ]).then(([, creature]) => creature);
};

exports.openChest = async (userId) => {
  const wallet = await prisma.wallet.findUnique({ where: { userId } });
  if (wallet.balance < 250) throw new Error('Недостаточно валюты');
  const spec = await rollCreature();
  return prisma.$transaction([
    prisma.wallet.update({
      where: { userId },
      data: { balance: { decrement: 250 } },
    }),
    prisma.creatureInstance.create({
      data: { ownerId: userId, specId: spec.id },
      include: { spec: true },
    }),
  ]).then(([, creature]) => creature);
};

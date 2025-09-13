const { prisma } = require('../../db/client');

async function rollSpec() {
  const specs = await prisma.creatureSpec.findMany();
  const sum = specs.reduce((s, x) => s + x.dropRate, 0);
  let r = Math.random() * sum;
  for (const s of specs) { r -= s.dropRate; if (r <= 0) return s; }
  return specs[0];
}

async function openGeneric(userId, price) {
  const wallet = await prisma.wallet.findUnique({ where: { userId } });
  if (!wallet || wallet.balance < price) throw new Error('Недостаточно валюты');
  const spec = await rollSpec();

  const [, inst] = await prisma.$transaction([
    prisma.wallet.update({ where: { userId }, data: { balance: { decrement: price } } }),
    prisma.creatureInstance.create({ data: { ownerId: userId, specId: spec.id } })
  ]);

  return { instance: inst, spec };
}

exports.openEgg = async (userId) => openGeneric(userId, Number(process.env.GACHA_EGG_PRICE || 200));
exports.openChest = async (userId) => openGeneric(userId, Number(process.env.GACHA_CHEST_PRICE || 1000));

const { prisma } = require('../../db/client');

function calcDamage(aSpec, bSpec) {
  return Math.max(1, aSpec.baseATK - bSpec.baseDEF + Math.floor(Math.random() * 5));
}

exports.startBattle = async (userId, opponentId) => {
  const a = await prisma.creatureInstance.findFirst({ where: { ownerId: userId }, include: { spec: true } });
  const b = await prisma.creatureInstance.findFirst({ where: { ownerId: opponentId }, include: { spec: true } });
  if (!a || !b) throw new Error('Нет существ для боя');

  const winnerId = (calcDamage(a.spec, b.spec) >= calcDamage(b.spec, a.spec)) ? userId : opponentId;
  return prisma.battle.create({ data: { aId: userId, bId: opponentId, winnerId } });
};

exports.listBattles = async (userId) =>
  prisma.battle.findMany({
    where: { OR: [{ aId: userId }, { bId: userId }] },
    orderBy: { createdAt: 'desc' }
  });

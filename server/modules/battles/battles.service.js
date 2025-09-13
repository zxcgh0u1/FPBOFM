const { prisma } = require('../../db/client');

function calcDamage(a, b) {
  return Math.max(1, a.baseATK - b.baseDEF + Math.floor(Math.random() * 5));
}

exports.startBattle = async (userId, opponentId) => {
  const userCreature = await prisma.creatureInstance.findFirst({
    where: { ownerId: userId },
    include: { spec: true },
  });
  const oppCreature = await prisma.creatureInstance.findFirst({
    where: { ownerId: opponentId },
    include: { spec: true },
  });

  if (!userCreature || !oppCreature) throw new Error('Нет существ для боя');

  const dmgToOpp = calcDamage(userCreature.spec, oppCreature.spec);
  const dmgToUser = calcDamage(oppCreature.spec, userCreature.spec);

  const winnerId = dmgToOpp >= dmgToUser ? userId : opponentId;

  return prisma.battle.create({
    data: { aId: userId, bId: opponentId, winnerId },
  });
};

exports.listBattles = async (userId) => {
  return prisma.battle.findMany({
    where: { OR: [{ aId: userId }, { bId: userId }] },
    include: { A: true, B: true },
    orderBy: { createdAt: 'desc' },
  });
};

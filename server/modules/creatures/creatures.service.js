const { prisma } = require('../../db/client');

exports.list = async (userId) => {
  return prisma.creatureInstance.findMany({
    where: { ownerId: userId },
    include: { spec: true },
  });
};

exports.upgrade = async (userId, creatureId) => {
  const creature = await prisma.creatureInstance.findUnique({
    where: { id: creatureId },
  });

  if (!creature || creature.ownerId !== userId) {
    throw new Error('Существо не найдено');
  }

  return prisma.creatureInstance.update({
    where: { id: creatureId },
    data: { stars: { increment: 1 } },
  });
};

const { prisma } = require('../../db/client');

exports.list = async (userId) =>
  prisma.creatureInstance.findMany({ where: { ownerId: userId }, include: { spec: true } });

exports.upgrade = async (userId, creatureId) => {
  const c = await prisma.creatureInstance.findUnique({ where: { id: creatureId } });
  if (!c || c.ownerId !== userId) throw new Error('Существо не найдено');
  return prisma.creatureInstance.update({ where: { id: creatureId }, data: { stars: { increment: 1 } } });
};

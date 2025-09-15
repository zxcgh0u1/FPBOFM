
import { prisma } from '../../db/client.js';

async function list(userId){
  return prisma.creatureInstance.findMany({
    where: { ownerId: userId },
    include: { spec: true },
  });
}

async function upgrade(userId, creatureId){
  if(!creatureId) throw new Error('ID обязателен');

  const creature = await prisma.creatureInstance.findUnique({
    where: { id: String(creatureId) },
    include: { spec: true },
  });
  if(!creature || creature.ownerId !== userId) throw new Error('Существо не найдено или принадлежит другому игроку');

  return prisma.creatureInstance.update({
    where: { id: String(creatureId) },
    data: { stars: { increment: 1 } },
    include: { spec: true },
  });
}

export default { list, upgrade };

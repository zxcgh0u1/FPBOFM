
import { prisma } from '../../db/client.js';
import { getRandomInt } from '../../utils/random.js';

export async function history(userId){
  return prisma.battle.findMany({
    where: { OR: [ { aId: userId }, { bId: userId } ] },
    orderBy: { createdAt: 'desc' }
  });
}

export async function start(userId, opponentId){
  if(!opponentId) throw new Error('Не указан соперник');
  if(opponentId === userId) throw new Error('Нельзя сражаться с собой');
  const winnerId = getRandomInt(0,1) ? userId : opponentId;
  return prisma.battle.create({ data: { aId: userId, bId: opponentId, winnerId } });
}

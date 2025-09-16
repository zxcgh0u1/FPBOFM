import { prisma } from '../../db/client.js';

// Создать новый бой
export async function createBattle(playerAId, playerBId, winnerId) {
  return prisma.battle.create({
    data: {
      playerA: playerAId,
      playerB: playerBId,
      winnerId,
    },
    include: {
      playerAUser: true,
      playerBUser: true,
      winner: true,
    },
  });
}

// Получить историю боёв
export async function getHistory(userId) {
  return prisma.battle.findMany({
    where: {
      OR: [
        { playerA: userId },
        { playerB: userId },
      ],
    },
    include: {
      playerAUser: true,
      playerBUser: true,
      winner: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

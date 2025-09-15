import { prisma } from '../../db/client.js';

export async function getBattleHistory(userId) {
  return prisma.battle.findMany({
    where: {
      OR: [
        { playerAId: userId },
        { playerBId: userId }
      ]
    },
    include: {
      playerA: true,
      playerB: true
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function createBattle(userId, opponentId) {
  // Проверим, что оппонент существует
  const opponent = await prisma.user.findUnique({
    where: { id: opponentId }
  });

  if (!opponent) {
    throw new Error('Противник не найден');
  }

  // ⚔️ Логика победителя (пока для теста — создатель всегда побеждает)
  const winnerId = userId;

  return prisma.battle.create({
    data: {
      playerAId: userId,
      playerBId: opponentId,
      winnerId
    },
    include: {
      playerA: true,
      playerB: true
    }
  });
}

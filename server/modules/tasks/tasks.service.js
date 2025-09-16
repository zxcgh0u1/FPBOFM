import prisma from '../../db/client.js';

const list = async (userId) => {
  return prisma.task.findMany({
    include: {
      userTasks: {
        where: { userId }
      }
    }
  });
};

const claimDaily = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { wallet: true }
  });

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  const now = new Date();
  const lastClaim = user.dailyClaimedAt;

  if (lastClaim && lastClaim.toDateString() === now.toDateString()) {
    throw new Error('Награда за сегодня уже получена');
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      dailyClaimedAt: now,
      wallet: {
        update: {
          coins: { increment: 500 }
        }
      }
    }
  });

  return { success: true, reward: 500 };
};

export default { list, claimDaily };

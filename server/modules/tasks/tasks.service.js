const { prisma } = require('../../db/client');

exports.list = async (userId) => {
  return prisma.userTask.findMany({
    where: { userId },
    include: { task: true },
  });
};

exports.claimDaily = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (user.dailyClaimedAt && user.dailyClaimedAt >= today) {
    throw new Error('Уже получено сегодня');
  }

  const reward = 100;
  await prisma.user.update({
    where: { id: userId },
    data: {
      dailyClaimedAt: new Date(),
      wallet: { update: { balance: { increment: reward } } },
    },
  });

  return reward;
};

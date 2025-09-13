const { prisma } = require('../../db/client');

exports.list = async (userId) =>
  prisma.userTask.findMany({ where: { userId }, include: { task: true } });

exports.claimDaily = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (user.dailyClaimedAt && user.dailyClaimedAt >= today)
    throw new Error('Уже получено сегодня');

  const reward = Number(process.env.ECON_DAILY_REWARD || 500);

  await prisma.$transaction([
    prisma.user.update({ where: { id: userId }, data: { dailyClaimedAt: now } }),
    prisma.wallet.update({ where: { userId }, data: { balance: { increment: reward } } })
  ]);

  return reward;
};

import { prisma } from '../../db/client.js';

async function getProfile(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { wallet: true },
  });

  if (!user) throw new Error('Пользователь не найден');

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    balance: user.wallet?.balance ?? 0,
    dailyClaimedAt: user.dailyClaimedAt,
  };
}

export default { getProfile };

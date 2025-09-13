const { prisma } = require('../../db/client');

exports.getMe = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { wallet: true },
  });
};

exports.getAll = async () => {
  return prisma.user.findMany({
    include: { wallet: true },
  });
};

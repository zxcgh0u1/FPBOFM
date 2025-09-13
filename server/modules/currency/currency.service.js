const { prisma } = require('../../db/client');

exports.getWallet = async (userId) =>
  prisma.wallet.findUnique({ where: { userId } });

exports.addFunds = async (userId, amount) =>
  prisma.wallet.update({ where: { userId }, data: { balance: { increment: Number(amount) } } });

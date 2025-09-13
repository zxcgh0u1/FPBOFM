const { prisma } = require('../../db/client');

exports.getMe = async (userId) =>
  prisma.user.findUnique({ where: { id: userId }, include: { wallet: true } });

exports.getAll = async () =>
  prisma.user.findMany({ include: { wallet: true } });

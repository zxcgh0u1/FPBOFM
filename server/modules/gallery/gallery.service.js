const { prisma } = require('../../db/client');

exports.list = async () => {
  return prisma.creatureSpec.findMany({
    orderBy: { rarity: 'asc' },
  });
};

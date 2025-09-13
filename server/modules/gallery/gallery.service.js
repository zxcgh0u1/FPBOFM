const { prisma } = require('../../db/client');

exports.list = async () =>
  prisma.creatureSpec.findMany({ orderBy: [{ rarity: 'asc' }, { name: 'asc' }] });

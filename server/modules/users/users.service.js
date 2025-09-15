import prisma from '../../db/client.js';

export default {
  findById: (id) => prisma.user.findUnique({ where: { id } }),
  findAll: () => prisma.user.findMany(),
  create: (data) => prisma.user.create({ data }),
  update: (id, data) => prisma.user.update({ where: { id }, data }),
  remove: (id) => prisma.user.delete({ where: { id } }),
};

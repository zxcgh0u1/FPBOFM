import { prisma } from '../../db/client.js';

async function list() {
  return prisma.gallery.findMany({
    include: {
      spec: true // правильное имя связи
    }
  });
}

async function add() {
  throw new Error('Добавление пока не реализовано');
}

export default { list, add };


import { prisma } from '../../db/client.js';

async function list(userId){
  const tasks = await prisma.task.findMany();
  const my = await prisma.userTask.findMany({ where: { userId } });
  return tasks.map(t => ({ ...t, done: !!my.find(m => m.taskId === t.id)?.done }));
}

async function claimDaily(userId){
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if(!user) throw new Error('Пользователь не найден');

  const today = new Date(); today.setHours(0,0,0,0);
  if(user.dailyClaimedAt && user.dailyClaimedAt >= today) throw new Error('Уже получено сегодня');

  await prisma.wallet.update({ where: { userId }, data: { balance: { increment: 50 } } });
  await prisma.user.update({ where: { id: userId }, data: { dailyClaimedAt: new Date() } });
  return { reward: 50 };
}

export default { list, claimDaily };

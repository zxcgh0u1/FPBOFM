
import { prisma } from '../../db/client.js';
export async function getWallet(userId){
  const w = await prisma.wallet.findUnique({ where: { userId } });
  if(!w) throw new Error('Кошелек не найден');
  return w;
}

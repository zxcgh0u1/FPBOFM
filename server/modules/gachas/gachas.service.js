
import { prisma } from '../../db/client.js';
import { getRandomInt } from '../../utils/random.js';

async function rollSpec(){
  const specs = await prisma.creatureSpec.findMany();
  const total = specs.reduce((a,s)=>a+s.dropRate,0);
  let roll = getRandomInt(1,total);
  for(const s of specs){
    roll -= s.dropRate;
    if(roll<=0) return s;
  }
  return specs[0];
}

async function openGeneric(userId, price){
  const wallet = await prisma.wallet.findUnique({ where: { userId } });
  if(!wallet || wallet.balance < price) throw new Error('Недостаточно валюты');
  const spec = await rollSpec();

  const [w, inst] = await prisma.$transaction([
    prisma.wallet.update({ where: { id: wallet.id }, data: { balance: { decrement: price } } }),
    prisma.creatureInstance.create({ data: { ownerId: userId, specId: spec.id, stars: 1 }, include: { spec: true } }),
  ]);
  return { instance: inst, spec, balance: w.balance };
}

const openEgg = (userId) => openGeneric(userId, 50);
const openChest = (userId) => openGeneric(userId, 200);

export default { openEgg, openChest };

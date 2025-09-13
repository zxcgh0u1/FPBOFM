const { prisma } = require('../../db/client');


const TICK = Number(process.env.ECON_TICK_SECONDS || 1);
const MAX_HOURS = Number(process.env.ECON_MAX_IDLE_HOURS || 12);


exports.getBalance = async (userId) => {
const w = await prisma.wallet.findUnique({ where: { userId } });
return w.balance;
};


exports.collectPassive = async (userId) => {
const user = await prisma.user.findUnique({ where: { id: userId } });
const now = new Date();
const last = user.lastPassiveAt || now;
const diffSec = Math.floor((now - last) / 1000);
const capSec = Math.min(diffSec, MAX_HOURS * 3600);
const perSec = 1; // базовый доход/сек — потом вынесем в конфиг/предметы
const income = capSec * perSec;


const updated = await prisma.$transaction(async (tx) => {
const wallet = await tx.wallet.update({ where: { userId }, data: { balance: { increment: income } } });
await tx.user.update({ where: { id: userId }, data: { lastPassiveAt: now } });
return wallet;
});
return { added: income, balance: updated.balance };
};


exports.addDonation = async (userId, amount) => {
const wallet = await prisma.wallet.update({ where: { userId }, data: { balance: { increment: amount } } });
return wallet.balance;
};
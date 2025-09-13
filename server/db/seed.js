const { prisma } = require('./client');


async function main() {
// базовые продукты гача
await prisma.gachaProduct.upsert({
where: { id: 'seed-egg' },
update: {},
create: { id: 'seed-egg', type: 'EGG', price: Number(process.env.GACHA_EGG_PRICE || 200), pityStep: 10 },
});
await prisma.gachaProduct.upsert({
where: { id: 'seed-chest' },
update: {},
create: { id: 'seed-chest', type: 'CHEST', price: Number(process.env.GACHA_CHEST_PRICE || 1000), pityStep: 30 },
});


// несколько видов существ
const specs = [
{ name: 'Flameling', rarity: 'COMMON', baseHP: 50, baseATK: 12, baseDEF: 6, dropRate: 0.45 },
{ name: 'Aquarius', rarity: 'RARE', baseHP: 70, baseATK: 15, baseDEF: 10, dropRate: 0.3 },
{ name: 'Terragorn', rarity: 'EPIC', baseHP: 100, baseATK: 22, baseDEF: 18, dropRate: 0.2 },
{ name: 'Zephyra', rarity: 'LEGENDARY', baseHP: 130, baseATK: 30, baseDEF: 24, dropRate: 0.05 },
];
for (const s of specs) {
await prisma.creatureSpec.upsert({
where: { name: s.name },
update: s,
create: s,
});
}


// ежедневка
await prisma.task.upsert({
where: { code: 'DAILY_LOGIN' },
update: {},
create: { code: 'DAILY_LOGIN', title: 'Ежедневный вход', reward: Number(process.env.ECON_DAILY_REWARD || 500), daily: true },
});
}


main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
import { prisma } from '../../db/client.js';
import { EGG_COST, CHEST_COST, rarityWeights } from '../../config/economy.js';

// 🎲 Рандом по весам
function getRandomRarity() {
  const roll = Math.random() * 100;
  let cumulative = 0;

  for (const [rarity, weight] of Object.entries(rarityWeights)) {
    cumulative += weight;
    if (roll <= cumulative) return rarity;
  }
  return 'COMMON';
}

// 🥚 Открыть яйцо
export async function openEgg(userId) {
  const wallet = await prisma.wallet.findUnique({ where: { userId } });
  if (!wallet || wallet.balance < EGG_COST) {
    throw new Error('Недостаточно монет для открытия яйца');
  }

  await prisma.wallet.update({
    where: { userId },
    data: { balance: { decrement: EGG_COST } }, // ✅ исправлено
  });

  const rarity = getRandomRarity();
  const spec = await prisma.creatureSpec.findFirst({ where: { rarity } });
  if (!spec) throw new Error('Не найдено существо для данной редкости');

  return prisma.creatureInstance.create({
    data: {
      ownerId: userId,
      specId: spec.id,
      hp: spec.baseHP,
      atk: spec.baseATK,
      def: spec.baseDEF,
      stars: 1,
    },
    include: { spec: true },
  });
}

// 📦 Открыть сундук
export async function openChest(userId) {
  const wallet = await prisma.wallet.findUnique({ where: { userId } });
  if (!wallet || wallet.balance < CHEST_COST) {
    throw new Error('Недостаточно монет для открытия сундука');
  }

  await prisma.wallet.update({
    where: { userId },
    data: { balance: { decrement: CHEST_COST } }, // ✅ исправлено
  });

  const rarity = getRandomRarity();
  const spec = await prisma.creatureSpec.findFirst({ where: { rarity } });
  if (!spec) throw new Error('Не найдено существо для данной редкости');

  return prisma.creatureInstance.create({
    data: {
      ownerId: userId,
      specId: spec.id,
      hp: spec.baseHP,
      atk: spec.baseATK,
      def: spec.baseDEF,
      stars: 1,
    },
    include: { spec: true },
  });
}

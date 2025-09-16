// server/db/client.js
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

// один инстанс на всё приложение (удобно в dev при HMR/перезапусках)
const prisma =
  globalForPrisma.__PRISMA__ ??
  new PrismaClient({
    // по желанию можно включить логи:
    // log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__PRISMA__ = prisma;
}

// ✅ Поддерживаем оба стиля импорта
export { prisma };      // именованный импорт
export default prisma;  // дефолтный импорт

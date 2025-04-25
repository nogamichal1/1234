
import { PrismaClient } from '@prisma/client';

const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root:da2xY2vyCVrxlb2Q@54.38.137.2:3706/kontrahenci_db';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['warn', 'error'],
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

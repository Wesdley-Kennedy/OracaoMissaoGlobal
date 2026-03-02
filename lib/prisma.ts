import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://postgres:Matchola8228..@db.nerfryuccuxfucrjckdp.supabase.co:5432/postgres", // pega a variável do Vercel
      },
    },
  });

//if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma;
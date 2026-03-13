import { PrismaClient } from "../../prisma/generated-client"; // v2 schema update
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prismaV3: PrismaClient | undefined;
};

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

// Singleton pattern to prevent connection leaks during hot reload
// Using V3 suffix to force-bust stale caches from previous schema versions
export const prisma = globalForPrisma.prismaV3 ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaV3 = prisma;


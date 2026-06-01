import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "../../configurations/envs.js";
import { PrismaClient } from "../../generated/prisma/client.js";

const adapter = new PrismaPg({connectionString: envs.POSTGRES_URL});
export const prisma = new PrismaClient({adapter: adapter});
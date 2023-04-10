import Redis from "ioredis";

export const redisConnect = new Redis(process.env.NEXT_PUBLIC_REDIS_URL!);

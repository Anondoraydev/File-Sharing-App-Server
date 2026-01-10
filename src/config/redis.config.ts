import { createClient } from "redis";
import { config } from "./config.ts";

const redisOptions: any = {
  username: config.REDIS_USERNAME,
  socket: {
    host: config.REDIS_HOST,
    port: Number(config.REDIS_PORT),
  },
};

if (config.REDIS_PASSWORD) redisOptions.password = config.REDIS_PASSWORD;

export const redisClient = createClient(redisOptions);

redisClient.on("error", (err) => console.log("Redis Client Error", err));

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis is connected");
  }
};

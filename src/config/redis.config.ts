import { createClient } from "redis";
import { config } from "./config.ts";
const redisClient = createClient({
  username: config.REDIS_USERNAME,
  password: config.REDIS_PASSWORD || "",
  socket: {
    host: config.REDIS_HOST,
    port: Number(config.REDIS_PORT),
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

// await client.set("foo", "bar");
// const result = await client.get("foo");
// console.log(result); // >>> bar

export const connectedRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis is connected");
  }
};

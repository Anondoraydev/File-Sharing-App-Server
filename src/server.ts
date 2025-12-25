// server.ts
import app from "./app.ts";
import { config } from "./config/config.ts";
import { connectDB } from "./db/index.ts";

const server = async () => {
  await connectDB();
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

server();

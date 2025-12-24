import app from "./app.ts";
import { config } from "./config/config.ts";
import { connectDB } from "./db/index.ts";

const server = async () => {
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
  await connectDB();
};

(async () => {
  await server();
})();

// server.ts
import app from "./app.ts";
import { config } from "./config/config.ts";
import { connectDB } from "./db/index.ts";

async function server() {
  try {
    await connectDB();

    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}

server();

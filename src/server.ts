import app from "./app.ts";
import { config } from "./config/config.ts";
import { connectDB } from "./db/index.ts";

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
  connectDB();
});
   
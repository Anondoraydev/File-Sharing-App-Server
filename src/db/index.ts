import mongoose from "mongoose";
import { config } from "../config/config.ts";

export async function connectDB() {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose Connected to MongoDB");
    });

    mongoose.connection.on("error", (error) => {
      console.error("❌ Mongoose connection error", error);
      process.exit(1);
    });

    await mongoose.connect(config.DATABASE_URL);
  } catch (error) {
    console.error("❌ MongoDB initial connection failed", error);
    process.exit(1);
  }
}

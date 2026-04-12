import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { isMemoryStore } from "./config/dataStore.js";

dotenv.config();

const port = process.env.PORT || 5000;

async function startServer() {
  if (isMemoryStore()) {
    console.log("Using in-memory data store for local development");
  } else {
    await connectDB();
  }

  app.listen(port, () => {
    console.log(`Traveler Record API running on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});

import mongoose from "mongoose";

let isConnected = false;

const CONFIG = useRuntimeConfig();
const NUXT_ENV = CONFIG.NUXT_ENV;
const NUXT_MONGO_DB_NAME = CONFIG.NUXT_MONGO_DB_NAME;
const MONGODB_URI = CONFIG.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

if (!NUXT_MONGO_DB_NAME) {
  throw new Error(
    "Please define the NUXT_MONGO_DB_NAME environment variable inside .env"
  );
}

if (!NUXT_ENV) {
  throw new Error(
    "Please define the NUXT_ENV environment variable inside .env"
  );
}

export async function connectToDatabase() {
  // If we're already connected, reuse the existing connection
  if (isConnected) {
    console.log("Using existing database connection");
    return mongoose.connection;
  }

  console.log("Creating new database connection");

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: NUXT_MONGO_DB_NAME, // dynamically uses "staging" or "production"
      // Common options you can enable or adjust:

      // useNewUrlParser: true,
      // useUnifiedTopology: true,

      // Manage connection pool sizing:
      maxPoolSize: 10, // Default is 10
      minPoolSize: 0, // Default is 0

      // How long to wait to find a server suitable for your operation
      // before throwing a timeout error (in milliseconds):
      serverSelectionTimeoutMS: 60000,

      // Additional options like:
      autoIndex: true, // By default, Mongoose auto-creates indexes
      autoCreate: true,
    });

    // Once connected, set isConnected so we don't reconnect unnecessarily
    isConnected = db.connections[0].readyState === 1;
    console.log("Database Connected Successfully");

    return db;
  } catch (error) {
    console.error("Failed to connect to database: ", error);
    throw new Error("Failed to connect to database");
  }
}

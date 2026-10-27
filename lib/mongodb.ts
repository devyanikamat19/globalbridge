import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/globalbridge_catalog";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000,
    };

    cached.promise = (async () => {
      // 1. Try connecting to the specified MONGODB_URI first
      try {
        const m = await mongoose.connect(MONGODB_URI, opts);
        return m;
      } catch (err: any) {
        console.warn(
          `[MongoDB] Direct connection to ${MONGODB_URI} failed (${err.message}). Starting in-memory fallback...`
        );
      }

      // 2. Fallback to MongoMemoryServer if local MongoDB is not installed/running
      try {
        const { MongoMemoryServer } = await import("mongodb-memory-server");
        const mongod = await MongoMemoryServer.create();
        const memoryUri = mongod.getUri();
        console.log(`[MongoDB] Connected to in-memory MongoDB instance at ${memoryUri}`);
        return await mongoose.connect(memoryUri);
      } catch (fallbackErr: any) {
        console.error("[MongoDB] In-memory fallback initialization failed:", fallbackErr.message);
        throw fallbackErr;
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

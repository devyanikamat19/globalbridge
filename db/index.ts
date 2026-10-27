import { getDatabase } from "@netlify/database";
import { drizzle } from "drizzle-orm/netlify-db";
import * as schema from "./schema";

function createDatabase() {
  return drizzle({ client: getDatabase(), schema });
}

// Next.js imports route modules during builds, before a runtime connection is needed.
// Resolve the managed connection only when a query or adapter first uses the client.
let client: ReturnType<typeof createDatabase> | undefined;
export const db = new Proxy({} as ReturnType<typeof createDatabase>, {
  get(_target, property) {
    client ??= createDatabase();
    const value = Reflect.get(client, property);
    return typeof value === "function" ? value.bind(client) : value;
  },
});

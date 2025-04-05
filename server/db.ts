import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Check if DATABASE_URL is available, if not, we'll use in-memory storage
let pool: Pool | null = null;
let db: any = null;

try {
  if (process.env.DATABASE_URL) {
    console.log("Database connection available, initializing PostgreSQL connection");
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema });
  } else {
    console.log("DATABASE_URL not set, app will use in-memory storage instead");
    // db will be null, and the application will use in-memory storage
  }
} catch (error) {
  console.error("Error connecting to database:", error);
  console.log("Falling back to in-memory storage");
}

export { pool, db };

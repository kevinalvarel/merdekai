// lib/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema"; // ini penting!

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema }); // schema harus ada di sini

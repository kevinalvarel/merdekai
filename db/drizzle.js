const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Neon
});

const db = drizzle(pool);

module.exports = { db };

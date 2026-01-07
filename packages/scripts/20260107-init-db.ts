// tsx init-db.ts
// Initializes the database by creating all required tables

import { Pool } from 'pg';
import { createTodoTable } from '@repo/gateways/tableUtils/todoUtils';

require('dotenv').config();

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

async function run() {
  console.log('Initializing database...');

  await createTodoTable(pool);
  console.log('Created todo table');

  console.log('Database initialization complete');

  await pool.end();
  process.exit(0);
}

run().catch((err) => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});

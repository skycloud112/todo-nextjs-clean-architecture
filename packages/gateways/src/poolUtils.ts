import pg from 'pg';

const { Pool } = pg;

let sharedPool: pg.Pool | undefined;

export const getSharedPool = (connectionString: string): pg.Pool => {
  if (!sharedPool) {
    sharedPool = new Pool({ connectionString });
  }
  return sharedPool;
};

export const createPool = (connectionString: string): pg.Pool => {
  return new Pool({ connectionString });
};

export const closePool = async (pool: pg.Pool): Promise<void> => {
  await pool.end();
};

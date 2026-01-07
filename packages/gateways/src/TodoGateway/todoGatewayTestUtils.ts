import type pg from 'pg';
import { Todo } from '@repo/entities/Todo';
import { createPool, closePool } from '../poolUtils';
import { createTodoTable, deleteAllTodos } from '../tableUtils/todoUtils';
import { createTodo } from './command/impls/createTodo';

export const TEST_DB_CONNECTION_STRING = 'postgresql://testuser:test@localhost:5432/testdb';

export const setupTodoTestDatabase = async (connectionString: string): Promise<pg.Pool> => {
  const pool = createPool(connectionString);
  await createTodoTable(pool);
  return pool;
};

export const teardownTodoTestDatabase = async (pool: pg.Pool): Promise<void> => {
  await closePool(pool);
};

export const cleanupTodoTestData = async (pool: pg.Pool): Promise<void> => {
  await deleteAllTodos(pool);
};

export type CreateTestTodoParams = {
  pool: pg.Pool;
  id?: string;
  title?: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export const createTestTodoInDb = async (params: CreateTestTodoParams): Promise<Todo> => {
  const now = new Date();
  const todo = new Todo(
    params.id ?? '1',
    params.title ?? 'Test Todo',
    params.completed ?? false,
    params.createdAt ?? now,
    params.updatedAt ?? now,
  );
  await createTodo(params.pool, todo);
  return todo;
};

import type pg from 'pg';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { Todo } from '@repo/entities/Todo';
import {
  setupTodoTestDatabase,
  teardownTodoTestDatabase,
  cleanupTodoTestData,
  TEST_DB_CONNECTION_STRING,
} from '../../../todoGatewayTestUtils.js';
import { createTodo } from '../createTodo.js';
import { getTodo } from '../../../query/impls/getTodo.js';

describe('createTodo', () => {
  let pool: pg.Pool;

  beforeAll(async () => {
    pool = await setupTodoTestDatabase(TEST_DB_CONNECTION_STRING);
  });

  afterAll(async () => {
    await teardownTodoTestDatabase(pool);
  });

  beforeEach(async () => {
    await cleanupTodoTestData(pool);
  });

  it('should create a todo with all fields', async () => {
    const now = new Date('2025-01-15T12:00:00.000Z');
    const todo = new Todo('1', 'Test Todo', false, now, now);

    await createTodo(pool, todo);

    const retrieved = await getTodo(pool, '1');
    expect(retrieved).toBeDefined();
    expect(retrieved!.id).toBe('1');
    expect(retrieved!.title).toBe('Test Todo');
    expect(retrieved!.completed).toBe(false);
    expect(retrieved!.createdAt).toEqual(now);
    expect(retrieved!.updatedAt).toEqual(now);
  });

  it('should create a completed todo', async () => {
    const now = new Date('2025-01-15T12:00:00.000Z');
    const todo = new Todo('2', 'Completed Todo', true, now, now);

    await createTodo(pool, todo);

    const retrieved = await getTodo(pool, '2');
    expect(retrieved).toBeDefined();
    expect(retrieved!.completed).toBe(true);
  });
});

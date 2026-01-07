import type pg from 'pg';
import SQL from '@nearform/sql';
import type { Todo } from '@repo/entities/Todo';
import { TODO_TABLE_NAME, TodoTableFieldNames } from '../../../tableUtils/todoUtils.js';

export const createTodo = async (pool: pg.Pool, todo: Todo): Promise<void> => {
  const query = SQL`
    INSERT INTO ${SQL.unsafe(TODO_TABLE_NAME)} (
      ${SQL.unsafe(TodoTableFieldNames.id)},
      ${SQL.unsafe(TodoTableFieldNames.title)},
      ${SQL.unsafe(TodoTableFieldNames.completed)},
      ${SQL.unsafe(TodoTableFieldNames.created_at)},
      ${SQL.unsafe(TodoTableFieldNames.updated_at)}
    ) VALUES (
      ${todo.id},
      ${todo.title},
      ${todo.completed},
      ${todo.createdAt},
      ${todo.updatedAt}
    )
  `;
  await pool.query(query.text, query.values);
};

import type pg from 'pg';
import SQL from '@nearform/sql';
import type { Todo } from '@repo/entities/Todo';
import { TODO_TABLE_NAME, TodoTableFieldNames } from '../../../tableUtils/todoUtils.js';

export const updateTodo = async (pool: pg.Pool, todo: Todo): Promise<void> => {
  const query = SQL`
    UPDATE ${SQL.unsafe(TODO_TABLE_NAME)}
    SET
      ${SQL.unsafe(TodoTableFieldNames.title)} = ${todo.title},
      ${SQL.unsafe(TodoTableFieldNames.completed)} = ${todo.completed},
      ${SQL.unsafe(TodoTableFieldNames.updated_at)} = ${todo.updatedAt}
    WHERE ${SQL.unsafe(TodoTableFieldNames.id)} = ${todo.id}
  `;
  await pool.query(query.text, query.values);
};

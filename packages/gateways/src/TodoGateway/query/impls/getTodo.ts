import type pg from 'pg';
import SQL from '@nearform/sql';
import { Todo } from '@repo/entities/Todo';
import { TODO_TABLE_NAME, TodoTableFieldNames } from '../../../tableUtils/todoUtils';

type TodoRow = {
  id: string;
  title: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
};

export const getTodo = async (pool: pg.Pool, id: string): Promise<Todo | undefined> => {
  const query = SQL`
    SELECT
      ${SQL.unsafe(TodoTableFieldNames.id)},
      ${SQL.unsafe(TodoTableFieldNames.title)},
      ${SQL.unsafe(TodoTableFieldNames.completed)},
      ${SQL.unsafe(TodoTableFieldNames.created_at)},
      ${SQL.unsafe(TodoTableFieldNames.updated_at)}
    FROM ${SQL.unsafe(TODO_TABLE_NAME)}
    WHERE ${SQL.unsafe(TodoTableFieldNames.id)} = ${id}
  `;
  const result = await pool.query<TodoRow>(query.text, query.values);
  if (result.rows.length === 0) {
    return undefined;
  }
  const row = result.rows[0]!;
  return new Todo(row.id, row.title, row.completed, row.created_at, row.updated_at);
};

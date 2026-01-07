import type pg from 'pg';
import SQL from '@nearform/sql';
import { Todo } from '@repo/entities/Todo';
import { TODO_TABLE_NAME, TodoTableFieldNames } from '../../../tableUtils/todoUtils.js';

type TodoRow = {
  id: string;
  title: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
};

export const getTodos = async (pool: pg.Pool): Promise<Todo[]> => {
  const query = SQL`
    SELECT
      ${SQL.unsafe(TodoTableFieldNames.id)},
      ${SQL.unsafe(TodoTableFieldNames.title)},
      ${SQL.unsafe(TodoTableFieldNames.completed)},
      ${SQL.unsafe(TodoTableFieldNames.created_at)},
      ${SQL.unsafe(TodoTableFieldNames.updated_at)}
    FROM ${SQL.unsafe(TODO_TABLE_NAME)}
    ORDER BY ${SQL.unsafe(TodoTableFieldNames.created_at)} DESC
  `;
  const result = await pool.query<TodoRow>(query.text, query.values);
  return result.rows.map(mapRowToTodo);
};

const mapRowToTodo = (row: TodoRow): Todo => {
  return new Todo(row.id, row.title, row.completed, row.created_at, row.updated_at);
};

import type pg from 'pg';
import SQL from '@nearform/sql';
import { TODO_TABLE_NAME, TodoTableFieldNames } from '../../../tableUtils/todoUtils.js';

export const deleteTodo = async (pool: pg.Pool, id: string): Promise<void> => {
  const query = SQL`
    DELETE FROM ${SQL.unsafe(TODO_TABLE_NAME)}
    WHERE ${SQL.unsafe(TodoTableFieldNames.id)} = ${id}
  `;
  await pool.query(query.text, query.values);
};

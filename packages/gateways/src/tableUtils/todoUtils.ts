import type pg from "pg";

export const TODO_TABLE_NAME = "todo";

export const TodoTableFieldNames = {
  id: "id",
  title: "title",
  completed: "completed",
  created_at: "created_at",
  updated_at: "updated_at",
} as const;

export const createTodoTable = async (pool: pg.Pool): Promise<void> => {
  await pool.query(`DROP TABLE IF EXISTS ${TODO_TABLE_NAME} CASCADE`);
  await pool.query(`
    CREATE TABLE ${TODO_TABLE_NAME} (
      ${TodoTableFieldNames.id} VARCHAR(36) PRIMARY KEY,
      ${TodoTableFieldNames.title} VARCHAR(255) NOT NULL,
      ${TodoTableFieldNames.completed} BOOLEAN NOT NULL DEFAULT false,
      ${TodoTableFieldNames.created_at} TIMESTAMP NOT NULL,
      ${TodoTableFieldNames.updated_at} TIMESTAMP NOT NULL
    )
  `);
};

export const deleteAllTodos = async (pool: pg.Pool): Promise<void> => {
  await pool.query(`DELETE FROM ${TODO_TABLE_NAME}`);
};

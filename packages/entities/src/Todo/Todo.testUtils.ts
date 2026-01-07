import { Todo } from './Todo.js';

export type CreateDummyTodoParams = {
  id?: string;
  title?: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export const createDummyTodo = (params: CreateDummyTodoParams = {}): Todo => {
  const now = new Date();
  return new Todo(
    params.id ?? '1',
    params.title ?? 'Test Todo',
    params.completed ?? false,
    params.createdAt ?? now,
    params.updatedAt ?? now,
  );
};

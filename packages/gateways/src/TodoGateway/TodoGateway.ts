import type { Todo } from '@repo/entities/Todo';

export interface TodoGateway {
  createTodo(todo: Todo): Promise<void>;
  getTodo(id: string): Promise<Todo | undefined>;
  getTodos(): Promise<Todo[]>;
  updateTodo(todo: Todo): Promise<void>;
  deleteTodo(id: string): Promise<void>;
}

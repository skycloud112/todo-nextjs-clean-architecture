import type { Todo } from '@repo/entities/Todo';
import type { InMemoryTodoStore } from '../../inMemoryStores/InMemoryTodoStore';

export const getTodo = async (todos: InMemoryTodoStore, id: string): Promise<Todo | undefined> => {
  return todos.get(id);
};

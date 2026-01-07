import type { InMemoryTodoStore } from '../../inMemoryStores/InMemoryTodoStore';

export const deleteTodo = async (todos: InMemoryTodoStore, id: string): Promise<void> => {
  todos.delete(id);
};

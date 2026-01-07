import type { Todo } from "@repo/entities/Todo";
import type { InMemoryTodoStore } from "../../inMemoryStores/InMemoryTodoStore.js";

export const getTodos = async (todos: InMemoryTodoStore): Promise<Todo[]> => {
  const result = Array.from(todos.values());
  return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

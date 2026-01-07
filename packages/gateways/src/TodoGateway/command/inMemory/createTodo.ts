import { Todo } from "@repo/entities/Todo";
import type { InMemoryTodoStore } from "../../inMemoryStores/InMemoryTodoStore.js";

export const createTodo = async (
  todos: InMemoryTodoStore,
  todo: Todo,
): Promise<void> => {
  const cloned = new Todo(
    todo.id,
    todo.title,
    todo.completed,
    todo.createdAt,
    todo.updatedAt,
  );
  todos.set(cloned.id, cloned);
};

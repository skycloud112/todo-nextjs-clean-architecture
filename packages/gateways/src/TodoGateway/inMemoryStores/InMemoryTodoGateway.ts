import type { Todo } from "@repo/entities/Todo";
import type { TodoGateway } from "../TodoGateway.js";
import type { InMemoryTodoStore } from "./InMemoryTodoStore.js";
import { createTodo } from "../command/inMemory/createTodo.js";
import { updateTodo } from "../command/inMemory/updateTodo.js";
import { deleteTodo } from "../command/inMemory/deleteTodo.js";
import { getTodo } from "../query/inMemory/getTodo.js";
import { getTodos } from "../query/inMemory/getTodos.js";

export class InMemoryTodoGateway implements TodoGateway {
  private todos: InMemoryTodoStore = new Map();

  async createTodo(todo: Todo): Promise<void> {
    return createTodo(this.todos, todo);
  }

  async getTodo(id: string): Promise<Todo | undefined> {
    return getTodo(this.todos, id);
  }

  async getTodos(): Promise<Todo[]> {
    return getTodos(this.todos);
  }

  async updateTodo(todo: Todo): Promise<void> {
    return updateTodo(this.todos, todo);
  }

  async deleteTodo(id: string): Promise<void> {
    return deleteTodo(this.todos, id);
  }

  clear(): void {
    this.todos.clear();
  }
}

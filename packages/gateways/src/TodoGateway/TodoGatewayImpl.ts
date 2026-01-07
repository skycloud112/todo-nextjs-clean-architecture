import type pg from "pg";
import type { Todo } from "@repo/entities/Todo";
import type { TodoGateway } from "./TodoGateway.js";
import { createTodo } from "./command/impls/createTodo.js";
import { updateTodo } from "./command/impls/updateTodo.js";
import { deleteTodo } from "./command/impls/deleteTodo.js";
import { getTodo } from "./query/impls/getTodo.js";
import { getTodos } from "./query/impls/getTodos.js";

export class TodoGatewayImpl implements TodoGateway {
  constructor(private pool: pg.Pool) {}

  async createTodo(todo: Todo): Promise<void> {
    return createTodo(this.pool, todo);
  }

  async getTodo(id: string): Promise<Todo | undefined> {
    return getTodo(this.pool, id);
  }

  async getTodos(): Promise<Todo[]> {
    return getTodos(this.pool);
  }

  async updateTodo(todo: Todo): Promise<void> {
    return updateTodo(this.pool, todo);
  }

  async deleteTodo(id: string): Promise<void> {
    return deleteTodo(this.pool, id);
  }
}

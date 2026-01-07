import type { TodoGateway } from "@repo/gateways/TodoGateway";
import { toISOString } from "@repo/utils/date";

export type TodoDto = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type GetTodosResponse = {
  todos: TodoDto[];
};

export class GetTodosUseCase {
  constructor(private todoGateway: TodoGateway) {}

  async getTodos(): Promise<GetTodosResponse> {
    const todos = await this.todoGateway.getTodos();
    return {
      todos: todos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: toISOString(todo.createdAt),
      })),
    };
  }
}

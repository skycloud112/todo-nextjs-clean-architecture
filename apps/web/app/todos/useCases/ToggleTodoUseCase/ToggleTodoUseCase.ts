import type { TodoGateway } from "@repo/gateways/TodoGateway";

export type ToggleTodoRequest = {
  todoId: string;
};

export class ToggleTodoUseCase {
  constructor(private todoGateway: TodoGateway) {}

  async toggleTodo(request: ToggleTodoRequest): Promise<void> {
    const todo = await this.todoGateway.getTodo(request.todoId);
    if (!todo) {
      throw new Error(`Todo not found: ${request.todoId}`);
    }
    todo.completed = !todo.completed;
    todo.updatedAt = new Date();
    await this.todoGateway.updateTodo(todo);
  }
}

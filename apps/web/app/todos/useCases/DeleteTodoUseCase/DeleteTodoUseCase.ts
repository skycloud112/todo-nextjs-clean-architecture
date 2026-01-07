import type { TodoGateway } from '@repo/gateways/TodoGateway';

export type DeleteTodoRequest = {
  todoId: string;
};

export class DeleteTodoUseCase {
  constructor(private todoGateway: TodoGateway) {}

  async deleteTodo(request: DeleteTodoRequest): Promise<void> {
    await this.todoGateway.deleteTodo(request.todoId);
  }
}

import { Todo } from '@repo/entities/Todo';
import type { TodoGateway } from '@repo/gateways/TodoGateway';
import { uuid } from '@repo/utils/uuid';

export type CreateTodoRequest = {
  title: string;
};

export type CreateTodoResponse = {
  todoId: string;
};

export class CreateTodoUseCase {
  constructor(private todoGateway: TodoGateway) {}

  async createTodo(request: CreateTodoRequest): Promise<CreateTodoResponse> {
    const id = uuid();
    const now = new Date();
    const todo = new Todo(id, request.title, false, now, now);
    await this.todoGateway.createTodo(todo);
    return { todoId: id };
  }
}

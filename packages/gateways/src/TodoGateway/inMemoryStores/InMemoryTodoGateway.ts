import type { Todo } from '@repo/entities/Todo';
import type { TodoGateway } from '../TodoGateway';
import type { InMemoryTodoStore } from './InMemoryTodoStore';
import { createTodo } from '../command/inMemory/createTodo';
import { updateTodo } from '../command/inMemory/updateTodo';
import { deleteTodo } from '../command/inMemory/deleteTodo';
import { getTodo } from '../query/inMemory/getTodo';
import { getTodos } from '../query/inMemory/getTodos';

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

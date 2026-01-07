import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InMemoryTodoGateway } from '@repo/gateways/InMemoryTodoGateway';
import { Todo } from '@repo/entities/Todo';
import { GetTodosUseCase } from '../GetTodosUseCase';

type TestContext = {
  todoGateway: InMemoryTodoGateway;
  createUseCase: () => GetTodosUseCase;
};

const createTestContext = (): TestContext => {
  vi.setSystemTime(new Date('2025-01-15T12:00:00.000Z'));

  const todoGateway = new InMemoryTodoGateway();

  const createUseCase = (): GetTodosUseCase => {
    return new GetTodosUseCase(todoGateway);
  };

  return {
    todoGateway,
    createUseCase,
  };
};

describe('GetTodosUseCase', () => {
  let ctx: TestContext;

  beforeEach(() => {
    ctx = createTestContext();
  });

  it('should return empty list when no todos exist', async () => {
    const useCase = ctx.createUseCase();

    const response = await useCase.getTodos();

    expect(response.todos).toEqual([]);
  });

  it('should return all todos', async () => {
    const todo1 = new Todo('1', 'Buy groceries', false, new Date('2025-01-15T12:00:00.000Z'), new Date('2025-01-15T12:00:00.000Z'));
    const todo2 = new Todo('2', 'Walk the dog', true, new Date('2025-01-14T10:00:00.000Z'), new Date('2025-01-14T10:00:00.000Z'));
    await ctx.todoGateway.createTodo(todo1);
    await ctx.todoGateway.createTodo(todo2);
    const useCase = ctx.createUseCase();

    const response = await useCase.getTodos();

    expect(response.todos).toHaveLength(2);
  });

  it('should convert todos to DTOs with ISO string dates', async () => {
    const todo = new Todo('1', 'Test todo', false, new Date('2025-01-15T12:00:00.000Z'), new Date('2025-01-15T12:00:00.000Z'));
    await ctx.todoGateway.createTodo(todo);
    const useCase = ctx.createUseCase();

    const response = await useCase.getTodos();

    expect(response.todos[0]).toEqual({
      id: '1',
      title: 'Test todo',
      completed: false,
      createdAt: '2025-01-15T12:00:00.000Z',
    });
  });
});

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InMemoryTodoGateway } from '@repo/gateways/InMemoryTodoGateway';
import { Todo } from '@repo/entities/Todo';
import { DeleteTodoUseCase } from '../DeleteTodoUseCase';

type TestContext = {
  todoGateway: InMemoryTodoGateway;
  createUseCase: () => DeleteTodoUseCase;
};

const createTestContext = (): TestContext => {
  vi.setSystemTime(new Date('2025-01-15T12:00:00.000Z'));

  const todoGateway = new InMemoryTodoGateway();

  const createUseCase = (): DeleteTodoUseCase => {
    return new DeleteTodoUseCase(todoGateway);
  };

  return {
    todoGateway,
    createUseCase,
  };
};

describe('DeleteTodoUseCase', () => {
  let ctx: TestContext;

  beforeEach(() => {
    ctx = createTestContext();
  });

  it('should delete an existing todo', async () => {
    const todo = new Todo('1', 'Buy groceries', false, new Date('2025-01-15T12:00:00.000Z'), new Date('2025-01-15T12:00:00.000Z'));
    await ctx.todoGateway.createTodo(todo);
    const useCase = ctx.createUseCase();

    await useCase.deleteTodo({ todoId: '1' });

    const deletedTodo = await ctx.todoGateway.getTodo('1');
    expect(deletedTodo).toBeUndefined();
  });

  it('should not affect other todos when deleting', async () => {
    const todo1 = new Todo('1', 'Buy groceries', false, new Date('2025-01-15T12:00:00.000Z'), new Date('2025-01-15T12:00:00.000Z'));
    const todo2 = new Todo('2', 'Walk the dog', true, new Date('2025-01-14T10:00:00.000Z'), new Date('2025-01-14T10:00:00.000Z'));
    await ctx.todoGateway.createTodo(todo1);
    await ctx.todoGateway.createTodo(todo2);
    const useCase = ctx.createUseCase();

    await useCase.deleteTodo({ todoId: '1' });

    const remainingTodo = await ctx.todoGateway.getTodo('2');
    expect(remainingTodo).toBeDefined();
    expect(remainingTodo!.title).toBe('Walk the dog');
  });
});

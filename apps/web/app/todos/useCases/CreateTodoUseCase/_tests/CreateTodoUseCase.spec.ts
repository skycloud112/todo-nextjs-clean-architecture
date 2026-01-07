import { describe, it, expect, beforeEach, vi } from "vitest";
import { InMemoryTodoGateway } from "@repo/gateways/InMemoryTodoGateway";
import { CreateTodoUseCase } from "../CreateTodoUseCase";

type TestContext = {
  todoGateway: InMemoryTodoGateway;
  createUseCase: () => CreateTodoUseCase;
};

const createTestContext = (): TestContext => {
  vi.setSystemTime(new Date("2025-01-15T12:00:00.000Z"));

  const todoGateway = new InMemoryTodoGateway();

  const createUseCase = (): CreateTodoUseCase => {
    return new CreateTodoUseCase(todoGateway);
  };

  return {
    todoGateway,
    createUseCase,
  };
};

describe("CreateTodoUseCase", () => {
  let ctx: TestContext;

  beforeEach(() => {
    ctx = createTestContext();
  });

  it("should create a todo with the given title", async () => {
    const useCase = ctx.createUseCase();

    const response = await useCase.createTodo({ title: "Buy groceries" });

    expect(response.todoId.length).toBeGreaterThan(0);

    const createdTodo = await ctx.todoGateway.getTodo(response.todoId);
    expect(createdTodo).toBeDefined();
    expect(createdTodo!.title).toBe("Buy groceries");
    expect(createdTodo!.completed).toBe(false);
  });

  it("should set createdAt and updatedAt to current time", async () => {
    const useCase = ctx.createUseCase();

    const response = await useCase.createTodo({ title: "Test todo" });

    const createdTodo = await ctx.todoGateway.getTodo(response.todoId);
    expect(createdTodo!.createdAt).toEqual(
      new Date("2025-01-15T12:00:00.000Z"),
    );
    expect(createdTodo!.updatedAt).toEqual(
      new Date("2025-01-15T12:00:00.000Z"),
    );
  });
});

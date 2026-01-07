"use server";

import { TodoGatewayImpl } from "@repo/gateways/TodoGatewayImpl";
import { getSharedPool } from "@repo/gateways/poolUtils";
import { ToggleTodoUseCase, type ToggleTodoRequest } from "./ToggleTodoUseCase";

const POSTGRES_URL = process.env.POSTGRES_URL!;

export const ToggleTodoUseCaseToggleTodoAction = async (
  request: ToggleTodoRequest,
): Promise<void> => {
  const useCase = createToggleTodoUseCase();
  return useCase.toggleTodo(request);
};

const createToggleTodoUseCase = (): ToggleTodoUseCase => {
  const pool = getSharedPool(POSTGRES_URL);
  return new ToggleTodoUseCase(new TodoGatewayImpl(pool));
};

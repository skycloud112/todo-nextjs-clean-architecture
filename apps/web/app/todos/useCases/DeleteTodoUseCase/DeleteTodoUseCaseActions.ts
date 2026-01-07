'use server';

import { TodoGatewayImpl } from '@repo/gateways/TodoGatewayImpl';
import { getSharedPool } from '@repo/gateways/poolUtils';
import { DeleteTodoUseCase, type DeleteTodoRequest } from './DeleteTodoUseCase';

const POSTGRES_URL = process.env.POSTGRES_URL!;

export const DeleteTodoUseCaseDeleteTodoAction = async (
  request: DeleteTodoRequest,
): Promise<void> => {
  const useCase = createDeleteTodoUseCase();
  return useCase.deleteTodo(request);
};

const createDeleteTodoUseCase = (): DeleteTodoUseCase => {
  const pool = getSharedPool(POSTGRES_URL);
  return new DeleteTodoUseCase(new TodoGatewayImpl(pool));
};

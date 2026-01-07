'use server';

import { TodoGatewayImpl } from '@repo/gateways/TodoGatewayImpl';
import { getSharedPool } from '@repo/gateways/poolUtils';
import { POSTGRES_URL } from '../../../../env';
import { DeleteTodoUseCase, type DeleteTodoRequest } from './DeleteTodoUseCase';

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

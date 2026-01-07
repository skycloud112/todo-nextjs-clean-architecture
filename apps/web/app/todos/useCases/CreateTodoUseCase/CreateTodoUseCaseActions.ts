'use server';

import { TodoGatewayImpl } from '@repo/gateways/TodoGatewayImpl';
import { getSharedPool } from '@repo/gateways/poolUtils';
import { POSTGRES_URL } from '../../../../env';
import {
  CreateTodoUseCase,
  type CreateTodoRequest,
  type CreateTodoResponse,
} from './CreateTodoUseCase';

export const CreateTodoUseCaseCreateTodoAction = async (
  request: CreateTodoRequest,
): Promise<CreateTodoResponse> => {
  const useCase = createCreateTodoUseCase();
  return useCase.createTodo(request);
};

const createCreateTodoUseCase = (): CreateTodoUseCase => {
  const pool = getSharedPool(POSTGRES_URL);
  return new CreateTodoUseCase(new TodoGatewayImpl(pool));
};

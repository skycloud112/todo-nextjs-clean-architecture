'use server';

import { TodoGatewayImpl } from '@repo/gateways/TodoGatewayImpl';
import { getSharedPool } from '@repo/gateways/poolUtils';
import {
  CreateTodoUseCase,
  type CreateTodoRequest,
  type CreateTodoResponse,
} from './CreateTodoUseCase';

const POSTGRES_URL = process.env.POSTGRES_URL!;

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

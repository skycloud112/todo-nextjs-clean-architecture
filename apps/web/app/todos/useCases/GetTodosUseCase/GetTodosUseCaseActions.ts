'use server';

import { TodoGatewayImpl } from '@repo/gateways/TodoGatewayImpl';
import { getSharedPool } from '@repo/gateways/poolUtils';
import { GetTodosUseCase, type GetTodosResponse } from './GetTodosUseCase';

const POSTGRES_URL = process.env.POSTGRES_URL!;

export const GetTodosUseCaseGetTodosAction = async (): Promise<GetTodosResponse> => {
  const useCase = createGetTodosUseCase();
  return useCase.getTodos();
};

const createGetTodosUseCase = (): GetTodosUseCase => {
  const pool = getSharedPool(POSTGRES_URL);
  return new GetTodosUseCase(new TodoGatewayImpl(pool));
};

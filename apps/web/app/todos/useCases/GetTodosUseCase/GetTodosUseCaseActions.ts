'use server';

import { TodoGatewayImpl } from '@repo/gateways/TodoGatewayImpl';
import { getSharedPool } from '@repo/gateways/poolUtils';
import { POSTGRES_URL } from '../../../../env';
import { GetTodosUseCase, type GetTodosResponse } from './GetTodosUseCase';

export const GetTodosUseCaseGetTodosAction = async (): Promise<GetTodosResponse> => {
  const useCase = createGetTodosUseCase();
  return useCase.getTodos();
};

const createGetTodosUseCase = (): GetTodosUseCase => {
  const pool = getSharedPool(POSTGRES_URL);
  return new GetTodosUseCase(new TodoGatewayImpl(pool));
};

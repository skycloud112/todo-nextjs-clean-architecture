import { useQuery } from '@tanstack/react-query';
import { GetTodosUseCaseGetTodosAction } from './GetTodosUseCaseActions';
import type { TodoDto } from './GetTodosUseCase';

export const useTodos = () => {
  const query = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await GetTodosUseCaseGetTodosAction();
      return response.todos;
    },
  });

  return {
    todos: query.data ?? ([] as TodoDto[]),
    isLoading: query.isLoading,
    error: query.error,
  };
};

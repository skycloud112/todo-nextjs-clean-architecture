import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ToggleTodoUseCaseToggleTodoAction } from './ToggleTodoUseCaseActions';

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['todos', 'toggle'],
    mutationFn: async (todoId: string) => {
      return ToggleTodoUseCaseToggleTodoAction({ todoId });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

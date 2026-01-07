import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteTodoUseCaseDeleteTodoAction } from "./DeleteTodoUseCaseActions";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["todos", "delete"],
    mutationFn: async (todoId: string) => {
      return DeleteTodoUseCaseDeleteTodoAction({ todoId });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTodoUseCaseCreateTodoAction } from "./CreateTodoUseCaseActions";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["todos", "create"],
    mutationFn: async (title: string) => {
      return CreateTodoUseCaseCreateTodoAction({ title });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

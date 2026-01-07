'use client';

import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodos } from './useCases/GetTodosUseCase/useTodos';
import { useCreateTodo } from './useCases/CreateTodoUseCase/useCreateTodo';
import { useToggleTodo } from './useCases/ToggleTodoUseCase/useToggleTodo';
import { useDeleteTodo } from './useCases/DeleteTodoUseCase/useDeleteTodo';

export const TodoPage = (): React.ReactElement => {
  const { todos, isLoading } = useTodos();
  const createTodo = useCreateTodo();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();

  const handleCreate = (title: string) => {
    createTodo.mutate(title);
  };

  const handleToggle = (todoId: string) => {
    toggleTodo.mutate(todoId);
  };

  const handleDelete = (todoId: string) => {
    deleteTodo.mutate(todoId);
  };

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom sx={{ textAlign: 'center' }}>
        Todo App
      </Typography>
      <Typography variant='subtitle1' color='text.secondary' sx={{ textAlign: 'center', mb: 4 }}>
        Clean Architecture Demo
      </Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <TodoForm onSubmit={handleCreate} isSubmitting={createTodo.isPending} />
        <TodoList
          todos={todos}
          isLoading={isLoading}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </Paper>
    </Container>
  );
};

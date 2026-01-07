"use client";

import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { TodoDto } from "../useCases/GetTodosUseCase/GetTodosUseCase";

type TodoListProps = {
  todos: TodoDto[];
  isLoading: boolean;
  onToggle: (todoId: string) => void;
  onDelete: (todoId: string) => void;
};

export const TodoList = ({
  todos,
  isLoading,
  onToggle,
  onDelete,
}: TodoListProps): React.ReactElement => {
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (todos.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
        No todos yet. Add one above!
      </Typography>
    );
  }

  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDelete(todo.id)}
            >
              <DeleteIcon />
            </IconButton>
          }
          disablePadding
        >
          <ListItemButton onClick={() => onToggle(todo.id)} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todo.completed}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText
              primary={todo.title}
              sx={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "text.secondary" : "text.primary",
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

'use client';

import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type TodoFormProps = {
  onSubmit: (title: string) => void;
  isSubmitting: boolean;
};

export const TodoForm = ({ onSubmit, isSubmitting }: TodoFormProps): React.ReactElement => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle('');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle((e.target as HTMLInputElement).value);
  };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <TextField
        fullWidth
        variant='outlined'
        placeholder='Add a new todo...'
        value={title}
        onChange={handleTitleChange}
        disabled={isSubmitting}
      />
      <Button
        type='submit'
        variant='contained'
        disabled={!title.trim() || isSubmitting}
        startIcon={<AddIcon />}
      >
        Add
      </Button>
    </Box>
  );
};

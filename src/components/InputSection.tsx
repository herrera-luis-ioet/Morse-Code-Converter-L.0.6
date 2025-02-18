import React from 'react';
import { Box, TextField, Typography, Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

interface InputSectionProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  mode: string;
  onModeToggle: () => void;
  onClear: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({ 
  value, 
  onChange, 
  error, 
  mode, 
  onModeToggle, 
  onClear 
}) => {
  return (
    <Box
      sx={{
        background: '#ffffff',
        border: '2px solid #000000',
        borderRadius: '30px',
        padding: '20px',
        margin: '20px 0',
        height: '290px',
        marginTop: '187px',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: '32px',
          color: '#000000',
          marginBottom: '20px',
        }}
      >
        Input:
      </Typography>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error}
        placeholder="Type your message here"
        data-testid="morse-code-input"
        variant="standard"
        InputProps={{
          sx: {
            fontSize: '28px',
            color: 'rgb(168, 168, 168)',
            fontFamily: '"JetBrains Mono", monospace',
            '&::placeholder': {
              color: 'rgb(168, 168, 168)',
            },
          },
        }}
      />
      {error && (
        <Alert
          severity="error"
          icon={<ErrorIcon />}
          sx={{
            mt: 2,
            backgroundColor: 'transparent',
            color: 'error.main',
            padding: (theme) => theme.spacing(2),
            '& .MuiAlert-icon': {
              color: 'error.main',
            },
          }}
        >
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default InputSection;

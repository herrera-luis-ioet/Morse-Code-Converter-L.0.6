import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

interface InputSectionProps {
  text: string;
  onTextChange: (text: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ text, onTextChange }) => {
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
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
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
    </Box>
  );
};

export default InputSection;

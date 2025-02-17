import React from 'react';
import { Box, Typography, TextField, IconButton, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import SettingsIcon from '@mui/icons-material/Settings';

interface OutputSectionProps {
  morseCode?: string;
}

const OutputSection: React.FC<OutputSectionProps> = ({ morseCode = '' }) => {
  return (
    <Box
      sx={{
        background: '#ffffff',
        border: '2px solid #000000',
        borderRadius: '30px',
        padding: '20px',
        margin: '20px 0',
        height: '464px',
        marginTop: '60px',
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
        Output:
      </Typography>
      <TextField
        fullWidth
        placeholder="Translated message"
        value={morseCode}
        InputProps={{
          readOnly: true,
          sx: {
            fontSize: '28px',
            color: 'rgb(168, 168, 168)',
            fontFamily: "'JetBrains Mono', monospace",
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          },
        }}
      />
      <Stack
        direction="row"
        spacing={5}
        justifyContent="center"
        sx={{ marginTop: '20px' }}
      >
        <IconButton
          sx={{
            width: '120px',
            height: '114px',
            background: '#000000',
            borderRadius: '30px',
            '&:hover': {
              background: '#000000',
            },
          }}
        >
          <PlayArrowIcon sx={{ color: '#ffffff', fontSize: '50px' }} />
        </IconButton>
        <IconButton
          sx={{
            width: '120px',
            height: '114px',
            background: '#000000',
            borderRadius: '30px',
            '&:hover': {
              background: '#000000',
            },
          }}
        >
          <PauseIcon sx={{ color: '#ffffff', fontSize: '50px' }} />
        </IconButton>
        <IconButton
          sx={{
            width: '120px',
            height: '114px',
            background: '#000000',
            borderRadius: '30px',
            '&:hover': {
              background: '#000000',
            },
          }}
        >
          <StopIcon sx={{ color: '#ffffff', fontSize: '50px' }} />
        </IconButton>
        <IconButton
          sx={{
            width: '120px',
            height: '114px',
            background: '#000000',
            borderRadius: '30px',
            '&:hover': {
              background: '#000000',
            },
          }}
        >
          <SettingsIcon sx={{ color: '#ffffff', fontSize: '50px' }} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default OutputSection;

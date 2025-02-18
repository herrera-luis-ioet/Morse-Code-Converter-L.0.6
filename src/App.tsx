import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import MorseCodeConverter from './components/MorseCodeConverter';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <MorseCodeConverter />
      </Container>
    </ThemeProvider>
  );
};

export default App;

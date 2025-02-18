import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import App from '../App';

describe('App Component', () => {
  it('renders MorseCodeConverter component', () => {
    render(<App />);
    expect(screen.getByTestId('morse-converter-container')).toBeInTheDocument();
  });

  it('applies Material-UI theme correctly', () => {
    const { container } = render(<App />);
    const themeElement = container.querySelector('.MuiContainer-root');
    expect(themeElement).toBeInTheDocument();
    expect(themeElement).toHaveStyle({ paddingTop: '32px', paddingBottom: '32px' });
  });

  it('uses correct theme configuration', () => {
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

    const { container } = render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );

    const themeElement = container.querySelector('.MuiContainer-root');
    expect(themeElement).toHaveStyle({
      maxWidth: '900px', // md container width
    });
  });

  it('renders with CssBaseline for consistent styling', () => {
    const { container } = render(<App />);
    const cssBaselineStyles = window.getComputedStyle(container.firstChild as Element);
    expect(cssBaselineStyles.margin).toBe('0px');
    expect(cssBaselineStyles.fontFamily).toMatch(/^Roboto/);
  });
});

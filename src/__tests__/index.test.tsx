import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders morse code converter container', () => {
    render(<App />);
    const container = screen.getByTestId('morse-converter-container');
    expect(container).toBeInTheDocument();
  });

  test('renders input and output sections', () => {
    render(<App />);
    const inputSection = screen.getByTestId('morse-input-section');
    const outputSection = screen.getByTestId('morse-output-section');
    
    expect(inputSection).toBeInTheDocument();
    expect(outputSection).toBeInTheDocument();
  });

  test('renders with correct initial layout', () => {
    render(<App />);
    
    // Check for main container
    const container = screen.getByTestId('morse-converter-container');
    expect(container).toHaveStyle({
      width: '100%',
      maxWidth: '1039px',
      margin: '0 auto',
      padding: '20px',
    });
  });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MorseCodeConverter from '../components/MorseCodeConverter';

describe('MorseCodeConverter', () => {
  beforeEach(() => {
    render(<MorseCodeConverter />);
  });

  describe('Component Integration', () => {
    test('renders all sections correctly', () => {
      expect(screen.getByTestId('morse-converter-container')).toBeInTheDocument();
      expect(screen.getByTestId('morse-input-section')).toBeInTheDocument();
      expect(screen.getByTestId('morse-output-section')).toBeInTheDocument();
    });

    test('integrates input and output sections', () => {
      const inputElement = screen.getByTestId('morse-code-input');
      fireEvent.change(inputElement, { target: { value: 'SOS' } });
      
      const outputElement = screen.getByPlaceholderText('Translated message');
      expect(outputElement).toHaveValue('... --- ...');
    });
  });

  describe('Layout and Styling', () => {
    test('applies correct container styling', () => {
      const container = screen.getByTestId('morse-converter-container');
      expect(container).toHaveStyle({
        width: '100%',
        maxWidth: '1039px',
        margin: '0 auto',
        padding: '20px',
      });
    });

    test('maintains correct section spacing', () => {
      const inputSection = screen.getByTestId('morse-input-section');
      const outputSection = screen.getByTestId('morse-output-section');
      
      expect(inputSection).toHaveStyle({
        marginTop: '187px',
      });
      
      expect(outputSection).toHaveStyle({
        marginTop: '60px',
      });
    });

    test('renders dividers with correct spacing', () => {
      const dividers = screen.getAllByRole('separator');
      expect(dividers).toHaveLength(2);
      dividers.forEach(divider => {
        expect(divider).toHaveStyle({
          marginTop: '32px',
          marginBottom: '32px'
        });
      });
    });

    test('maintains visual hierarchy', () => {
      const container = screen.getByTestId('morse-converter-container');
      const children = container.children;
      
      expect(children[0]).toHaveAttribute('data-testid', 'morse-input-section');
      expect(children[1]).toHaveClass('MuiDivider-root');
      expect(children[3]).toHaveClass('MuiDivider-root');
      expect(children[4]).toHaveAttribute('data-testid', 'morse-output-section');
    });
  });

  describe('Error Handling', () => {
    test('displays error message for invalid input', () => {
      const inputElement = screen.getByTestId('morse-code-input');
      fireEvent.change(inputElement, { target: { value: '@#$' } });
      
      expect(screen.getByText(/invalid characters/i)).toBeInTheDocument();
    });

    test('clears error when input becomes valid', () => {
      const inputElement = screen.getByTestId('morse-code-input');
      
      // First trigger an error
      fireEvent.change(inputElement, { target: { value: '@#$' } });
      expect(screen.getByText(/invalid characters/i)).toBeInTheDocument();
      
      // Then make input valid
      fireEvent.change(inputElement, { target: { value: 'SOS' } });
      expect(screen.queryByText(/invalid characters/i)).not.toBeInTheDocument();
    });
  });

  describe('Mode Handling', () => {
    test('handles mode changes correctly', () => {
      const { input, output } = useMorseCodeConverter();
      
      // Text to Morse
      fireEvent.change(screen.getByTestId('morse-code-input'), { target: { value: 'SOS' } });
      expect(output).toBe('... --- ...');
      
      // Clear input
      fireEvent.click(screen.getByTestId('clear-button'));
      expect(input).toBe('');
      expect(output).toBe('');
    });
  });
});

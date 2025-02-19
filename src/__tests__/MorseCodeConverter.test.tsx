import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MorseCodeConverter from '../components/MorseCodeConverter';
import { useMorseCodeConverter } from '../hooks/useMorseCodeConverter';

// Mock the useMorseCodeConverter hook
jest.mock('../hooks/useMorseCodeConverter');

describe('MorseCodeConverter', () => {
  beforeEach(() => {
    // Setup default mock implementation
    (useMorseCodeConverter as jest.Mock).mockReturnValue({
      input: '',
      output: '',
      setInput: jest.fn(),
      setOutput: jest.fn(),
      error: '',
      setError: jest.fn(),
      mode: 'text-to-morse',
      setMode: jest.fn(),
    });
    render(<MorseCodeConverter />);
  });

  describe('Component Integration', () => {
    test('renders all sections correctly', () => {
      expect(screen.getByTestId('morse-converter-container')).toBeInTheDocument();
      expect(screen.getByTestId('morse-input-section')).toBeInTheDocument();
      expect(screen.getByTestId('morse-output-section')).toBeInTheDocument();
    });

    test('integrates input and output sections', () => {
      const mockSetInput = jest.fn();
      const mockSetOutput = jest.fn();
      
      (useMorseCodeConverter as jest.Mock).mockReturnValue({
        input: 'SOS',
        output: '... --- ...',
        setInput: mockSetInput,
        setOutput: mockSetOutput,
        error: '',
        setError: jest.fn(),
        mode: 'text-to-morse',
        setMode: jest.fn(),
      });

      render(<MorseCodeConverter />);
      
      const inputElement = screen.getByTestId('morse-code-input');
      const outputElement = screen.getByPlaceholderText('Translated message');
      
      expect(inputElement).toHaveValue('SOS');
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
      const mockSetError = jest.fn();
      (useMorseCodeConverter as jest.Mock).mockReturnValue({
        input: '@#$',
        output: '',
        setInput: jest.fn(),
        setOutput: jest.fn(),
        error: 'Invalid characters detected',
        setError: mockSetError,
        mode: 'text-to-morse',
        setMode: jest.fn(),
      });

      render(<MorseCodeConverter />);
      expect(screen.getByText(/invalid characters/i)).toBeInTheDocument();
    });

    test('clears error when input becomes valid', () => {
      const mockSetError = jest.fn();
      const mockSetInput = jest.fn();
      
      // First render with error
      (useMorseCodeConverter as jest.Mock).mockReturnValue({
        input: '@#$',
        output: '',
        setInput: mockSetInput,
        setOutput: jest.fn(),
        error: 'Invalid characters detected',
        setError: mockSetError,
        mode: 'text-to-morse',
        setMode: jest.fn(),
      });

      const { rerender } = render(<MorseCodeConverter />);
      expect(screen.getByText(/invalid characters/i)).toBeInTheDocument();
      
      // Then update with valid input
      (useMorseCodeConverter as jest.Mock).mockReturnValue({
        input: 'SOS',
        output: '... --- ...',
        setInput: mockSetInput,
        setOutput: jest.fn(),
        error: '',
        setError: mockSetError,
        mode: 'text-to-morse',
        setMode: jest.fn(),
      });

      rerender(<MorseCodeConverter />);
      expect(screen.queryByText(/invalid characters/i)).not.toBeInTheDocument();
    });
  });

  describe('Mode Handling', () => {
    test('handles mode changes correctly', () => {
      // Mock the hook implementation
      const mockInput = 'SOS';
      const mockOutput = '... --- ...';
      (useMorseCodeConverter as jest.Mock).mockReturnValue({
        input: mockInput,
        output: mockOutput,
        setInput: jest.fn(),
        setOutput: jest.fn(),
        error: '',
        setError: jest.fn(),
        mode: 'text-to-morse',
        setMode: jest.fn(),
      });

      render(<MorseCodeConverter />);
      
      // Text to Morse
      const inputElement = screen.getByTestId('morse-code-input');
      fireEvent.change(inputElement, { target: { value: mockInput } });
      expect(screen.getByPlaceholderText('Translated message')).toHaveValue(mockOutput);
      
      // Clear input
      fireEvent.click(screen.getByTestId('clear-button'));
      expect(inputElement).toHaveValue('');
    });
  });
});

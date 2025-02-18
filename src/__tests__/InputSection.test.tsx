import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputSection from '../components/InputSection';

describe('InputSection', () => {
  const mockOnChange = jest.fn();
  const mockOnModeToggle = jest.fn();
  const mockOnClear = jest.fn();

  const defaultProps = {
    value: '',
    onChange: mockOnChange,
    mode: 'text',
    onModeToggle: mockOnModeToggle,
    onClear: mockOnClear,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with correct initial state', () => {
    render(<InputSection {...defaultProps} />);
    
    expect(screen.getByText('Input:')).toBeInTheDocument();
    expect(screen.getByTestId('morse-code-input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your message here')).toHaveValue('');
  });

  test('handles text input correctly', () => {
    render(<InputSection {...defaultProps} />);
    
    const inputElement = screen.getByTestId('morse-code-input');
    fireEvent.change(inputElement, { target: { value: 'Hello World' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('Hello World');
  });

  test('displays error message when error prop is provided', () => {
    const errorProps = {
      ...defaultProps,
      error: 'Invalid input',
    };
    
    render(<InputSection {...errorProps} />);
    
    expect(screen.getByText('Invalid input')).toBeInTheDocument();
    expect(screen.getByTestId('morse-code-input')).toHaveAttribute('aria-invalid', 'true');
  });

  test('applies correct styling based on error state', () => {
    const errorProps = {
      ...defaultProps,
      error: 'Invalid input',
    };
    
    const { rerender } = render(<InputSection {...defaultProps} />);
    const inputElement = screen.getByTestId('morse-code-input');
    
    // Without error
    expect(inputElement).not.toHaveAttribute('aria-invalid');
    
    // With error
    rerender(<InputSection {...errorProps} />);
    expect(inputElement).toHaveAttribute('aria-invalid', 'true');
  });

  test('handles mode changes correctly', () => {
    const { rerender } = render(<InputSection {...defaultProps} />);
    
    // Text mode
    expect(screen.getByTestId('morse-code-input')).toHaveAttribute('placeholder', 'Type your message here');
    
    // Morse mode
    rerender(<InputSection {...defaultProps} mode="morse" />);
    expect(screen.getByTestId('morse-code-input')).toHaveAttribute('placeholder', 'Type your message here');
  });

  test('applies correct font styling', () => {
    render(<InputSection {...defaultProps} />);
    
    const inputElement = screen.getByTestId('morse-code-input');
    expect(inputElement).toHaveStyle({
      fontSize: '28px',
      fontFamily: '"JetBrains Mono", monospace',
    });
  });
});

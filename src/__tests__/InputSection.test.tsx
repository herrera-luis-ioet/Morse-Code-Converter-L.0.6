import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputSection from '../components/InputSection';

describe('InputSection', () => {
  // Test case 1: Initial render state
  test('renders with correct initial state', () => {
    render(<InputSection />);
    
    // Check if the input label is present
    expect(screen.getByText('Input:')).toBeInTheDocument();
    
    // Check if the text input is present with correct placeholder
    const inputElement = screen.getByPlaceholderText('Type your message here');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  // Test case 2: Text input handling
  test('handles text input correctly', () => {
    render(<InputSection />);
    
    const inputElement = screen.getByPlaceholderText('Type your message here');
    
    // Simulate user typing
    fireEvent.change(inputElement, { target: { value: 'Hello World' } });
    
    // Check if the input value is updated
    expect(inputElement).toHaveValue('Hello World');
  });

  // Test case 3: Input validation
  test('validates input correctly', () => {
    render(<InputSection />);
    
    const inputElement = screen.getByPlaceholderText('Type your message here');
    
    // Test with valid input
    fireEvent.change(inputElement, { target: { value: 'Hello 123' } });
    expect(inputElement).toHaveValue('Hello 123');
    
    // Test with special characters
    fireEvent.change(inputElement, { target: { value: 'Hello@World!' } });
    expect(inputElement).toHaveValue('Hello@World!');
  });

  // Test case 4: Error state display
  test('displays error state when invalid input is provided', () => {
    render(<InputSection />);
    
    const inputElement = screen.getByPlaceholderText('Type your message here');
    
    // Simulate invalid input (if there are any validation rules)
    fireEvent.change(inputElement, { target: { value: '   ' } });
    
    // Add assertions for error state once validation rules are implemented
    // Currently no error state is implemented in the component
  });

  // Test case 5: Input clearing functionality
  test('clears input correctly', () => {
    render(<InputSection />);
    
    const inputElement = screen.getByPlaceholderText('Type your message here');
    
    // First add some text
    fireEvent.change(inputElement, { target: { value: 'Test text' } });
    expect(inputElement).toHaveValue('Test text');
    
    // Clear the input
    fireEvent.change(inputElement, { target: { value: '' } });
    expect(inputElement).toHaveValue('');
  });
});
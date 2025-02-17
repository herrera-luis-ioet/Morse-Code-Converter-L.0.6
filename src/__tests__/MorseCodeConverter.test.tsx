import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MorseCodeConverter from '../components/MorseCodeConverter';

describe('MorseCodeConverter', () => {
  beforeEach(() => {
    render(<MorseCodeConverter />);
  });

  describe('Initial Render', () => {
    it('renders component with all sections present', () => {
      // Input section
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      
      // Controls section
      expect(screen.getByRole('region', { name: /controls/i })).toBeInTheDocument();
      
      // Output section
      expect(screen.getByRole('region', { name: /output/i })).toBeInTheDocument();
    });

    it('starts in text-to-morse mode', () => {
      expect(screen.getByRole('button', { name: /mode/i })).toHaveTextContent(/text to morse/i);
    });
  });

  describe('Text to Morse Code Conversion', () => {
    it('converts valid text input to morse code', async () => {
      const input = 'HELLO';
      const textbox = screen.getByRole('textbox');
      
      await userEvent.type(textbox, input);
      
      // Expected Morse code for 'HELLO'
      const expectedOutput = '.... . .-.. .-.. ---';
      expect(screen.getByText(expectedOutput)).toBeInTheDocument();
    });

    it('shows no error for valid input', async () => {
      const input = 'TEST';
      const textbox = screen.getByRole('textbox');
      
      await userEvent.type(textbox, input);
      
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Mode Toggle Functionality', () => {
    it('toggles between text-to-morse and morse-to-text modes', async () => {
      const toggleButton = screen.getByRole('button', { name: /mode/i });
      
      // Initial mode
      expect(toggleButton).toHaveTextContent(/text to morse/i);
      
      // Toggle mode
      await userEvent.click(toggleButton);
      expect(toggleButton).toHaveTextContent(/morse to text/i);
      
      // Toggle back
      await userEvent.click(toggleButton);
      expect(toggleButton).toHaveTextContent(/text to morse/i);
    });

    it('clears input when mode is toggled', async () => {
      const textbox = screen.getByRole('textbox');
      const toggleButton = screen.getByRole('button', { name: /mode/i });
      
      // Enter some text
      await userEvent.type(textbox, 'TEST');
      expect(textbox).toHaveValue('TEST');
      
      // Toggle mode
      await userEvent.click(toggleButton);
      expect(textbox).toHaveValue('');
    });
  });

  describe('Error Handling', () => {
    it('displays error message for invalid text input', async () => {
      const textbox = screen.getByRole('textbox');
      
      // Type invalid character
      await userEvent.type(textbox, '§');
      
      expect(screen.getByRole('alert')).toHaveTextContent(/invalid characters/i);
    });

    it('clears error message when input is cleared', async () => {
      const textbox = screen.getByRole('textbox');
      const clearButton = screen.getByRole('button', { name: /clear/i });
      
      // Type invalid character
      await userEvent.type(textbox, '§');
      expect(screen.getByRole('alert')).toBeInTheDocument();
      
      // Clear input
      await userEvent.click(clearButton);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
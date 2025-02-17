import { render, screen, fireEvent } from '@testing-library/react';
import MorseCodeConverter from '../components/MorseCodeConverter';

describe('MorseCodeConverter', () => {
  beforeEach(() => {
    render(<MorseCodeConverter />);
  });

  describe('Component Rendering', () => {
    test('renders main component elements', () => {
      expect(screen.getByTestId('morse-code-converter')).toBeInTheDocument();
      expect(screen.getByTestId('input-section')).toBeInTheDocument();
      expect(screen.getByTestId('output-section')).toBeInTheDocument();
      expect(screen.getByTestId('controls-section')).toBeInTheDocument();
    });

    test('renders title and mode toggle button', () => {
      expect(screen.getByTestId('converter-title')).toHaveTextContent(/Morse Code Converter/i);
      expect(screen.getByTestId('mode-toggle-button')).toBeInTheDocument();
    });
  });

  describe('Mode Toggle Functionality', () => {
    test('toggles between text-to-morse and morse-to-text modes', () => {
      const modeButton = screen.getByTestId('mode-toggle-button');
      
      // Initial mode should be text-to-morse
      expect(screen.getByTestId('input-label')).toHaveTextContent(/text input/i);
      expect(screen.getByTestId('output-label')).toHaveTextContent(/morse code output/i);
      
      // Click mode button to switch to morse-to-text
      fireEvent.click(modeButton);
      expect(screen.getByTestId('input-label')).toHaveTextContent(/morse code input/i);
      expect(screen.getByTestId('output-label')).toHaveTextContent(/text output/i);
      
      // Click mode button again to switch back to text-to-morse
      fireEvent.click(modeButton);
      expect(screen.getByTestId('input-label')).toHaveTextContent(/text input/i);
      expect(screen.getByTestId('output-label')).toHaveTextContent(/morse code output/i);
    });

    test('mode toggle button has correct accessibility attributes', () => {
      const modeButton = screen.getByTestId('mode-toggle-button');
      expect(modeButton).toHaveAttribute('aria-label', 'Toggle conversion mode');
      expect(modeButton).toHaveAttribute('role', 'button');
    });
  });

  describe('Input/Output Functionality', () => {
    test('input and output sections are properly connected', () => {
      const input = screen.getByTestId('converter-input');
      const output = screen.getByTestId('converter-output');
      
      fireEvent.change(input, { target: { value: 'test' } });
      expect(output).toHaveValue('- . ... -'); // 'test' in Morse code
    });

    test('handles input validation', () => {
      const input = screen.getByTestId('converter-input');
      const errorMessage = screen.getByTestId('error-message');
      
      fireEvent.change(input, { target: { value: '@#$' } });
      expect(errorMessage).toHaveTextContent(/invalid characters/i);
    });
  });
});
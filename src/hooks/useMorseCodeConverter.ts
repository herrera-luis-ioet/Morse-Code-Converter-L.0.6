import { useState, useCallback } from 'react';
import { textToMorse, morseToText, isValidMorseCode, isValidText } from '../utils/morseCodeUtils';

interface UseMorseCodeConverterReturn {
  input: string;
  output: string;
  error: string | undefined;
  mode: 'text-to-morse' | 'morse-to-text';
  setInput: (value: string) => void;
  toggleMode: () => void;
  clearInput: () => void;
}

export const useMorseCodeConverter = (): UseMorseCodeConverterReturn => {
  const [input, setInput] = useState<string>('');
  const [mode, setMode] = useState<'text-to-morse' | 'morse-to-text'>('text-to-morse');
  const [error, setError] = useState<string | undefined>(undefined);

  const validateAndConvert = useCallback((value: string, currentMode: 'text-to-morse' | 'morse-to-text'): string => {
    if (!value) return '';

    if (currentMode === 'text-to-morse') {
      if (!isValidText(value)) {
        setError('Invalid characters detected. Only letters, numbers, and basic punctuation are allowed.');
        return '';
      }
      setError(undefined);
      return textToMorse(value);
    } else {
      if (!isValidMorseCode(value)) {
        setError('Invalid Morse code. Only dots, dashes, and spaces are allowed.');
        return '';
      }
      setError(undefined);
      return morseToText(value);
    }
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(prevMode => {
      const newMode = prevMode === 'text-to-morse' ? 'morse-to-text' : 'text-to-morse';
      setInput('');
      setError(undefined);
      return newMode;
    });
  }, []);

  const clearInput = useCallback(() => {
    setInput('');
    setError(undefined);
  }, []);

  const output = validateAndConvert(input, mode);

  return {
    input,
    output,
    error,
    mode,
    setInput: handleInputChange,
    toggleMode,
    clearInput,
  };
};

// Morse code mapping for letters, numbers, and common punctuation
const MORSE_CODE_MAP: Record<string, string> = {
  'A': '.-',
  'B': '-...',
  'C': '-.-.',
  'D': '-..',
  'E': '.',
  'F': '..-.',
  'G': '--.',
  'H': '....',
  'I': '..',
  'J': '.---',
  'K': '-.-',
  'L': '.-..',
  'M': '--',
  'N': '-.',
  'O': '---',
  'P': '.--.',
  'Q': '--.-',
  'R': '.-.',
  'S': '...',
  'T': '-',
  'U': '..-',
  'V': '...-',
  'W': '.--',
  'X': '-..-',
  'Y': '-.--',
  'Z': '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  '!': '-.-.--',
  ' ': ' ',
};

// Reverse mapping for Morse code to text conversion
const REVERSE_MORSE_CODE_MAP = Object.entries(MORSE_CODE_MAP).reduce(
  (acc, [char, morse]) => ({
    ...acc,
    [morse]: char,
  }),
  {} as { [key: string]: string }
);

/**
 * Converts text to Morse code
 * @param text Input text to convert
 * @returns Morse code string
 */
export const textToMorse = (text: string): string => {
  if (!text) return '';
  
  return text
    .toUpperCase()
    .split('')
    .map(char => MORSE_CODE_MAP[char] || char)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Converts Morse code to text
 * @param morse Morse code string to convert
 * @returns Decoded text string
 */
export const morseToText = (morse: string): string => {
  if (!morse) return '';

  return morse
    .split(' ')
    .map(code => REVERSE_MORSE_CODE_MAP[code] || code)
    .join('')
    .trim();
};

/**
 * Validates if a string is valid Morse code
 * @param morse Morse code string to validate
 * @returns boolean indicating if the input is valid Morse code
 */
export const isValidMorseCode = (morse: string): boolean => {
  if (!morse) return true;
  const morsePattern = /^[.\- ]*$/;
  return morsePattern.test(morse);
};

/**
 * Validates if a string can be converted to Morse code
 * @param text Text to validate
 * @returns boolean indicating if the input can be converted
 */
export const isValidText = (text: string): boolean => {
  if (!text) return true;
  return text.toUpperCase().split('').every(char => char in MORSE_CODE_MAP);
};

// Type definition for Morse code mapping
type MorseCodeMap = {
  [key: string]: string;
};

// PUBLIC_INTERFACE
/**
 * Mapping of characters to their Morse code representations
 */
const MORSE_CODE_MAP: MorseCodeMap = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----",
  " ": " ",
};

// PUBLIC_INTERFACE
/**
 * Converts text to Morse code
 * @param text - The text to convert to Morse code
 * @returns The Morse code representation of the input text
 */
export const textToMorse = (text: string): string => {
  return text
    .toUpperCase()
    .split("")
    .map((char) => MORSE_CODE_MAP[char] ?? char)
    .join(" ");
};

// PUBLIC_INTERFACE
/**
 * Converts Morse code to text
 * @param morse - The Morse code to convert to text
 * @returns The text representation of the input Morse code
 */
export const morseToText = (morse: string): string => {
  const morseToTextMap: MorseCodeMap = Object.fromEntries(
    Object.entries(MORSE_CODE_MAP).map(([key, value]) => [value, key])
  );

  return morse
    .split(" ")
    .map((code) => morseToTextMap[code] ?? code)
    .join("");
};

// PUBLIC_INTERFACE
/**
 * Validates if the input string is valid Morse code
 * @param input - The string to validate
 * @returns True if the input is valid Morse code, false otherwise
 */
export function isValidMorseCode(input: string): boolean {
  const validMorseChars = new Set(['.', '-', ' ']);
  return input.split('').every(char => validMorseChars.has(char));
}

// PUBLIC_INTERFACE
/**
 * Validates if the input string contains only valid characters that can be converted to Morse code
 * @param input - The string to validate
 * @returns True if the input contains only valid characters, false otherwise
 */
export function isValidText(input: string): boolean {
  return input.toUpperCase().split('').every(char => char in MORSE_CODE_MAP);
}

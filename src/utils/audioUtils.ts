// Constants for Morse code timing
const DOT_DURATION = 0.1; // seconds
const DASH_DURATION = DOT_DURATION * 3;
const SYMBOL_SPACE = DOT_DURATION;
const LETTER_SPACE = DOT_DURATION * 3;
const WORD_SPACE = DOT_DURATION * 7;

interface AudioConfig {
  speed: number;
  pitch: number;
  volume: number;
}

// PUBLIC_INTERFACE
/**
 * Creates and configures an AudioContext instance
 */
export const createAudioContext = (): AudioContext => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

// PUBLIC_INTERFACE
/**
 * Generates a beep sound for Morse code
 * @param audioContext - The Web Audio API context
 * @param duration - Duration of the beep in seconds
 * @param config - Configuration for audio playback
 */
export const generateBeep = (
  audioContext: AudioContext,
  duration: number,
  config: AudioConfig
): OscillatorNode => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.value = config.pitch;
  gainNode.gain.value = config.volume / 100;

  const adjustedDuration = duration / (config.speed / 100);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + adjustedDuration);

  return oscillator;
};

// PUBLIC_INTERFACE
/**
 * Schedules Morse code audio playback
 * @param morseCode - The Morse code string to play
 * @param config - Configuration for audio playback
 * @returns A promise that resolves when playback is complete
 */
export const scheduleMorseCodeAudio = async (
  morseCode: string,
  config: AudioConfig
): Promise<void> => {
  const audioContext = createAudioContext();
  let currentTime = 0;

  for (const symbol of morseCode) {
    switch (symbol) {
      case '.':
        generateBeep(audioContext, DOT_DURATION, config);
        currentTime += DOT_DURATION;
        break;
      case '-':
        generateBeep(audioContext, DASH_DURATION, config);
        currentTime += DASH_DURATION;
        break;
      case ' ':
        currentTime += WORD_SPACE;
        break;
      default:
        currentTime += LETTER_SPACE;
    }
    await new Promise(resolve => setTimeout(resolve, currentTime * 1000));
  }
};
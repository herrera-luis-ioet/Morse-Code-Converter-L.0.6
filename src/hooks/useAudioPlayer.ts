import { useState, useCallback } from 'react';
import { scheduleMorseCodeAudio } from '../utils/audioUtils';

interface AudioConfig {
  speed: number;
  pitch: number;
  volume: number;
}

interface AudioPlayerState {
  isPlaying: boolean;
  config: AudioConfig;
}

// PUBLIC_INTERFACE
/**
 * Custom hook for managing Morse code audio playback
 */
export const useAudioPlayer = () => {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    config: {
      speed: 100,
      pitch: 550,
      volume: 80,
    },
  });

  const play = useCallback(async (morseCode: string) => {
    setState(prev => ({ ...prev, isPlaying: true }));
    try {
      await scheduleMorseCodeAudio(morseCode, state.config);
    } finally {
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, [state.config]);

  const stop = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const updateConfig = useCallback((newConfig: Partial<AudioConfig>) => {
    setState(prev => ({
      ...prev,
      config: { ...prev.config, ...newConfig },
    }));
  }, []);

  return {
    isPlaying: state.isPlaying,
    config: state.config,
    play,
    stop,
    updateConfig,
  };
};
import React, { useState } from 'react';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import InputSection from './InputSection';
import OutputSection from './OutputSection';
import ControlsSection from './ControlsSection';
import { useMorseCodeConverter } from '../hooks/useMorseCodeConverter';

const Container = styled.div`
  width: 100%;
  max-width: 1039px;
  margin: 0 auto;
  padding: 20px;
`;

interface MorseCodeConverterProps {}

const MorseCodeConverter: React.FC<MorseCodeConverterProps> = () => {
  const [speed, setSpeed] = useState<number>(20);
  const [pitch, setPitch] = useState<number>(550);
  const [volume, setVolume] = useState<number>(80);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const {
    input,
    output,
    error,
    mode,
    setInput,
    toggleMode,
    clearInput
  } = useMorseCodeConverter();

  const handleSpeedChange = (value: number): void => {
    setSpeed(value);
  };

  const handlePitchChange = (value: number): void => {
    setPitch(value);
  };

  const handleVolumeChange = (value: number): void => {
    setVolume(value);
  };

  return (
    <Container data-testid="morse-converter-container">
      <div data-testid="morse-input-section">
        <InputSection
          value={input || ''}
          onChange={setInput}
          error={error}
          mode={mode}
          onModeToggle={toggleMode}
          onClear={clearInput}
        />
      </div>
      <Divider sx={{ my: 4 }} />
      <ControlsSection 
        speed={speed}
        pitch={pitch}
        volume={volume}
        onSpeedChange={handleSpeedChange}
        onPitchChange={handlePitchChange}
        onVolumeChange={handleVolumeChange}
        onPlay={() => setIsPlaying(true)}
        onStop={() => setIsPlaying(false)}
        onSettingsClick={() => {/* TODO: Implement settings dialog */}}
        morseCode={output || ''}
        disabled={!input}
      />
      <Divider sx={{ my: 4 }} />
      <div data-testid="morse-output-section">
        <OutputSection value={output || ''} />
      </div>
    </Container>
  );
};

export default MorseCodeConverter;

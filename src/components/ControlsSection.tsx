import React from 'react';
import styled from 'styled-components';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

const Section = styled.div`
  margin: 20px 0;
`;

const SliderContainer = styled.div`
  margin: 20px 0;
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  color: #000000;
  margin-bottom: 10px;
  font-family: 'JetBrains Mono', monospace;
`;

const SliderTrack = styled.div`
  position: relative;
  width: 100%;
  height: 11px;
  background: rgb(240, 240, 240);
  border-radius: 10px;
`;

const SliderFill = styled.div<{ width: number }>`
  position: absolute;
  height: 100%;
  background: rgb(132, 132, 132);
  border-radius: 10px;
  width: ${props => props.width}%;
`;

const SliderHandle = styled.div<{ left: number }>`
  position: absolute;
  width: 42px;
  height: 42px;
  background: #ffffff;
  border-radius: 50%;
  top: 50%;
  left: ${props => props.left}%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 10px 3px rgba(217, 217, 217, 0.5);
  cursor: pointer;
`;

const PlaybackControls = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  border: 2px solid #000;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #000;
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, onChange }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <SliderContainer>
      <SliderLabel>
        <span>{label}</span>
        <span>{value}{label === 'pitch' ? 'Hz' : '%'}</span>
      </SliderLabel>
      <SliderTrack>
        <SliderFill width={percentage} />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
        />
        <SliderHandle left={percentage} />
      </SliderTrack>
    </SliderContainer>
  );
};

interface ControlsSectionProps {
  morseCode: string;
}

const ControlsSection: React.FC<ControlsSectionProps> = ({ morseCode }) => {
  const { isPlaying, config, play, stop, updateConfig } = useAudioPlayer();

  return (
    <Section>
      <Slider
        label="speed"
        value={config.speed}
        min={50}
        max={200}
        onChange={(value) => updateConfig({ speed: value })}
      />
      <Slider
        label="pitch"
        value={config.pitch}
        min={200}
        max={1000}
        onChange={(value) => updateConfig({ pitch: value })}
      />
      <Slider
        label="volume"
        value={config.volume}
        min={0}
        max={100}
        onChange={(value) => updateConfig({ volume: value })}
      />
      <PlaybackControls>
        <Button
          onClick={() => play(morseCode)}
          disabled={isPlaying || !morseCode}
        >
          {isPlaying ? 'Playing...' : 'Play'}
        </Button>
        <Button onClick={stop} disabled={!isPlaying}>
          Stop
        </Button>
      </PlaybackControls>
    </Section>
  );
};

export default ControlsSection;

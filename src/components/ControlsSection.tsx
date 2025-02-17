import React from 'react';
import { Box, Slider, IconButton } from '@mui/material';
import { PlayArrow, Stop, Settings } from '@mui/icons-material';

interface ControlsSectionProps {
  speed: number;
  pitch: number;
  volume: number;
  onSpeedChange: (value: number) => void;
  onPitchChange: (value: number) => void;
  onVolumeChange: (value: number) => void;
  onPlay: () => void;
  onStop: () => void;
  onSettingsClick: () => void;
}

const ControlsSection: React.FC<ControlsSectionProps> = ({
  speed,
  pitch,
  volume,
  onSpeedChange,
  onPitchChange,
  onVolumeChange,
  onPlay,
  onStop,
  onSettingsClick,
}) => {
  return (
    <Box sx={{ width: '100%', p: 2 }} data-testid="controls-section-container">
      <Slider
        data-testid="speed-slider"
        value={speed}
        onChange={(_, value) => onSpeedChange(value as number)}
        min={10}
        max={100}
        valueLabelDisplay="auto"
        sx={{ mb: 2 }}
      />
      <Slider
        data-testid="pitch-slider"
        value={pitch}
        onChange={(_, value) => onPitchChange(value as number)}
        min={200}
        max={2000}
        valueLabelDisplay="auto"
        sx={{ mb: 2 }}
      />
      <Slider
        data-testid="volume-slider"
        value={volume}
        onChange={(_, value) => onVolumeChange(value as number)}
        min={0}
        max={100}
        valueLabelDisplay="auto"
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton onClick={onPlay} data-testid="play-button">
          <PlayArrow />
        </IconButton>
        <IconButton onClick={onStop} data-testid="stop-button">
          <Stop />
        </IconButton>
        <IconButton onClick={onSettingsClick} data-testid="settings-button">
          <Settings />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ControlsSection;
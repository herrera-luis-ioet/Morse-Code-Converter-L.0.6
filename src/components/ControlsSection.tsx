import React from 'react';
import { Box, Slider, IconButton, Typography } from '@mui/material';
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
    <Box 
      sx={{ 
        width: '100%', 
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
      }} 
      data-testid="controls-section-container"
    >
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          component="label"
          htmlFor="speed-slider"
          sx={{ fontFamily: "'JetBrains Mono', monospace", mb: 1, display: 'block' }}
        >
          Speed: {speed} WPM
        </Typography>
        <Slider
          id="speed-slider"
          data-testid="speed-slider"
          value={speed}
          onChange={(_, value) => onSpeedChange(value as number)}
          min={10}
          max={100}
          valueLabelDisplay="auto"
          aria-label="Speed"
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          component="label"
          htmlFor="pitch-slider"
          sx={{ fontFamily: "'JetBrains Mono', monospace", mb: 1, display: 'block' }}
        >
          Pitch: {pitch} Hz
        </Typography>
        <Slider
          id="pitch-slider"
          data-testid="pitch-slider"
          value={pitch}
          onChange={(_, value) => onPitchChange(value as number)}
          min={200}
          max={2000}
          valueLabelDisplay="auto"
          aria-label="Pitch"
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          component="label"
          htmlFor="volume-slider"
          sx={{ fontFamily: "'JetBrains Mono', monospace", mb: 1, display: 'block' }}
        >
          Volume: {volume}%
        </Typography>
        <Slider
          id="volume-slider"
          data-testid="volume-slider"
          value={volume}
          onChange={(_, value) => onVolumeChange(value as number)}
          min={0}
          max={100}
          valueLabelDisplay="auto"
          aria-label="Volume"
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton 
          onClick={onPlay} 
          data-testid="play-button"
          aria-label="Play"
        >
          <PlayArrow />
        </IconButton>
        <IconButton 
          onClick={onStop} 
          data-testid="stop-button"
          aria-label="Stop"
        >
          <Stop />
        </IconButton>
        <IconButton 
          onClick={onSettingsClick} 
          data-testid="settings-button"
          aria-label="Settings"
        >
          <Settings />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ControlsSection;

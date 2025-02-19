import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ControlsSection from '../components/ControlsSection';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

// Mock the useAudioPlayer hook
jest.mock('../hooks/useAudioPlayer');

describe('ControlsSection', () => {
  // Mock implementation of useAudioPlayer
  const mockPlay = jest.fn();
  const mockStop = jest.fn();
  const mockUpdateConfig = jest.fn();
  
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock implementation
    (useAudioPlayer as jest.Mock).mockReturnValue({
      isPlaying: false,
      config: {
        speed: 100,
        pitch: 550,
        volume: 80,
      },
      play: mockPlay,
      stop: mockStop,
      updateConfig: mockUpdateConfig,
    });
  });

  // Test case 1: Initial render state verification
  test('renders with correct initial state', () => {
    render(
      <ControlsSection 
        morseCode="..." 
        disabled={false}
        speed={100}
        pitch={550}
        volume={80}
        onSpeedChange={() => {}}
        onPitchChange={() => {}}
        onVolumeChange={() => {}}
        onPlay={() => {}}
        onStop={() => {}}
        onSettingsClick={() => {}}
      />
    );
    
    // Check if all sliders are present with correct initial values
    expect(screen.getByText('speed')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    
    expect(screen.getByText('pitch')).toBeInTheDocument();
    expect(screen.getByText('550Hz')).toBeInTheDocument();
    
    expect(screen.getByText('volume')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
    
    // Check if control buttons are present
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('Stop')).toBeInTheDocument();
  });

  // Test case 2: Slider value updates and validation
  test('updates slider values correctly', () => {
    render(
      <ControlsSection 
        morseCode="..." 
        disabled={false}
        speed={100}
        pitch={550}
        volume={80}
        onSpeedChange={() => {}}
        onPitchChange={() => {}}
        onVolumeChange={() => {}}
        onPlay={() => {}}
        onStop={() => {}}
        onSettingsClick={() => {}}
      />
    );
    
    // Get all range inputs
    const sliders = screen.getAllByRole('slider');
    const [speedSlider, pitchSlider, volumeSlider] = sliders;
    
    // Test speed slider
    fireEvent.change(speedSlider, { target: { value: '150' } });
    expect(mockUpdateConfig).toHaveBeenCalledWith({ speed: 150 });
    
    // Test pitch slider
    fireEvent.change(pitchSlider, { target: { value: '800' } });
    expect(mockUpdateConfig).toHaveBeenCalledWith({ pitch: 800 });
    
    // Test volume slider
    fireEvent.change(volumeSlider, { target: { value: '60' } });
    expect(mockUpdateConfig).toHaveBeenCalledWith({ volume: 60 });
  });

  // Test case 3: Audio control button interactions
  test('handles play and stop button clicks correctly', () => {
    render(
      <ControlsSection 
        morseCode="..." 
        disabled={false}
        speed={100}
        pitch={550}
        volume={80}
        onSpeedChange={() => {}}
        onPitchChange={() => {}}
        onVolumeChange={() => {}}
        onPlay={() => {}}
        onStop={() => {}}
        onSettingsClick={() => {}}
      />
    );
    
    const playButton = screen.getByText('Play');
    const stopButton = screen.getByText('Stop');
    
    // Test play button
    fireEvent.click(playButton);
    expect(mockPlay).toHaveBeenCalledWith('...');
    
    // Test stop button
    fireEvent.click(stopButton);
    expect(mockStop).toHaveBeenCalled();
  });

  // Test case 4: Button states based on isPlaying
  test('updates button states based on isPlaying', () => {
    // Render with isPlaying = true
    (useAudioPlayer as jest.Mock).mockReturnValue({
      isPlaying: true,
      config: {
        speed: 100,
        pitch: 550,
        volume: 80,
      },
      play: mockPlay,
      stop: mockStop,
      updateConfig: mockUpdateConfig,
    });
    
    render(
      <ControlsSection 
        morseCode="..." 
        disabled={false}
        speed={100}
        pitch={550}
        volume={80}
        onSpeedChange={() => {}}
        onPitchChange={() => {}}
        onVolumeChange={() => {}}
        onPlay={() => {}}
        onStop={() => {}}
        onSettingsClick={() => {}}
      />
    );
    
    // Check button states when playing
    expect(screen.getByText('Playing...')).toBeInTheDocument();
    expect(screen.getByText('Playing...')).toBeDisabled();
    expect(screen.getByText('Stop')).toBeEnabled();
    
    // Re-render with isPlaying = false
    (useAudioPlayer as jest.Mock).mockReturnValue({
      isPlaying: false,
      config: {
        speed: 100,
        pitch: 550,
        volume: 80,
      },
      play: mockPlay,
      stop: mockStop,
      updateConfig: mockUpdateConfig,
    });
    
    render(
      <ControlsSection 
        morseCode="..." 
        disabled={false}
        speed={100}
        pitch={550}
        volume={80}
        onSpeedChange={() => {}}
        onPitchChange={() => {}}
        onVolumeChange={() => {}}
        onPlay={() => {}}
        onStop={() => {}}
        onSettingsClick={() => {}}
      />
    );
    
    // Check button states when not playing
    expect(screen.getByText('Play')).toBeEnabled();
    expect(screen.getByText('Stop')).toBeDisabled();
  });

  // Test case 5: Empty morse code handling
  test('disables play button when morse code is empty', () => {
    render(
      <ControlsSection 
        morseCode="" 
        disabled={false}
        speed={100}
        pitch={550}
        volume={80}
        onSpeedChange={() => {}}
        onPitchChange={() => {}}
        onVolumeChange={() => {}}
        onPlay={() => {}}
        onStop={() => {}}
        onSettingsClick={() => {}}
      />
    );
    
    const playButton = screen.getByText('Play');
    expect(playButton).toBeDisabled();
  });

  // Test case 6: Slider range validation
  test('enforces slider value ranges', () => {
    render(
      <ControlsSection 
        morseCode="..." 
        disabled={false}
        speed={100}
        pitch={550}
        volume={80}
        onSpeedChange={() => {}}
        onPitchChange={() => {}}
        onVolumeChange={() => {}}
        onPlay={() => {}}
        onStop={() => {}}
        onSettingsClick={() => {}}
      />
    );
    
    const sliders = screen.getAllByRole('slider');
    const [speedSlider, pitchSlider, volumeSlider] = sliders;
    
    // Check speed slider range
    expect(speedSlider).toHaveAttribute('min', '50');
    expect(speedSlider).toHaveAttribute('max', '200');
    
    // Check pitch slider range
    expect(pitchSlider).toHaveAttribute('min', '200');
    expect(pitchSlider).toHaveAttribute('max', '1000');
    
    // Check volume slider range
    expect(volumeSlider).toHaveAttribute('min', '0');
    expect(volumeSlider).toHaveAttribute('max', '100');
  });

  // Test case 7: Disabled state handling
  test('disables all controls when disabled prop is true', () => {
    render(
      <ControlsSection 
        morseCode="..." 
        disabled={true}
        speed={100}
        pitch={550}
        volume={80}
        onSpeedChange={() => {}}
        onPitchChange={() => {}}
        onVolumeChange={() => {}}
        onPlay={() => {}}
        onStop={() => {}}
        onSettingsClick={() => {}}
      />
    );
    
    // Check if all sliders are disabled
    const sliders = screen.getAllByRole('slider');
    sliders.forEach(slider => {
      expect(slider).toBeDisabled();
    });
    
    // Check if buttons are disabled
    expect(screen.getByText('Play')).toBeDisabled();
    expect(screen.getByText('Stop')).toBeDisabled();
  });
});

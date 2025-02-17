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
    render(<ControlsSection morseCode="..." />);
    
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
    render(<ControlsSection morseCode="..." />);
    
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
    render(<ControlsSection morseCode="..." />);
    
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
    
    render(<ControlsSection morseCode="..." />);
    
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
    
    render(<ControlsSection morseCode="..." />);
    
    // Check button states when not playing
    expect(screen.getByText('Play')).toBeEnabled();
    expect(screen.getByText('Stop')).toBeDisabled();
  });

  // Test case 5: Empty morse code handling
  test('disables play button when morse code is empty', () => {
    render(<ControlsSection morseCode="" />);
    
    const playButton = screen.getByText('Play');
    expect(playButton).toBeDisabled();
  });

  // Test case 6: Slider range validation
  test('enforces slider value ranges', () => {
    render(<ControlsSection morseCode="..." />);
    
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
});import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ControlsSection from '../components/ControlsSection';

describe('ControlsSection', () => {
  const defaultProps = {
    speed: 20,
    pitch: 550,
    volume: 80,
    onSpeedChange: jest.fn(),
    onPitchChange: jest.fn(),
    onVolumeChange: jest.fn(),
    onPlay: jest.fn(),
    onStop: jest.fn(),
    onSettingsClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render single Stop button', () => {
    render(<ControlsSection {...defaultProps} />);
    const stopButton = screen.getByTestId('stop-button');
    expect(stopButton).toBeInTheDocument();
    expect(screen.getAllByTestId('stop-button')).toHaveLength(1);
  });

  describe('slider controls', () => {
    it('should render sliders with correct initial values', () => {
      render(<ControlsSection {...defaultProps} />);
      
      const speedSlider = screen.getByTestId('speed-slider');
      const pitchSlider = screen.getByTestId('pitch-slider');
      const volumeSlider = screen.getByTestId('volume-slider');

      expect(speedSlider).toHaveAttribute('aria-valuenow', '20');
      expect(pitchSlider).toHaveAttribute('aria-valuenow', '550');
      expect(volumeSlider).toHaveAttribute('aria-valuenow', '80');
    });

    it('should call onChange handlers when sliders are adjusted', () => {
      render(<ControlsSection {...defaultProps} />);
      
      const speedSlider = screen.getByTestId('speed-slider');
      const pitchSlider = screen.getByTestId('pitch-slider');
      const volumeSlider = screen.getByTestId('volume-slider');

      fireEvent.change(speedSlider, { target: { value: 30 } });
      fireEvent.change(pitchSlider, { target: { value: 600 } });
      fireEvent.change(volumeSlider, { target: { value: 90 } });

      expect(defaultProps.onSpeedChange).toHaveBeenCalledWith(30);
      expect(defaultProps.onPitchChange).toHaveBeenCalledWith(600);
      expect(defaultProps.onVolumeChange).toHaveBeenCalledWith(90);
    });
  });

  describe('button click handlers', () => {
    it('should call appropriate handlers when buttons are clicked', () => {
      render(<ControlsSection {...defaultProps} />);
      
      const playButton = screen.getByTestId('play-button');
      const stopButton = screen.getByTestId('stop-button');
      const settingsButton = screen.getByTestId('settings-button');

      fireEvent.click(playButton);
      fireEvent.click(stopButton);
      fireEvent.click(settingsButton);

      expect(defaultProps.onPlay).toHaveBeenCalledTimes(1);
      expect(defaultProps.onStop).toHaveBeenCalledTimes(1);
      expect(defaultProps.onSettingsClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('should have accessible slider controls', () => {
      render(<ControlsSection {...defaultProps} />);
      
      const speedSlider = screen.getByTestId('speed-slider');
      const pitchSlider = screen.getByTestId('pitch-slider');
      const volumeSlider = screen.getByTestId('volume-slider');

      expect(speedSlider).toHaveAttribute('role', 'slider');
      expect(pitchSlider).toHaveAttribute('role', 'slider');
      expect(volumeSlider).toHaveAttribute('role', 'slider');
    });

    it('should have accessible button controls', () => {
      render(<ControlsSection {...defaultProps} />);
      
      const playButton = screen.getByTestId('play-button');
      const stopButton = screen.getByTestId('stop-button');
      const settingsButton = screen.getByTestId('settings-button');

      expect(playButton).toHaveAttribute('role', 'button');
      expect(stopButton).toHaveAttribute('role', 'button');
      expect(settingsButton).toHaveAttribute('role', 'button');
    });

    it('should maintain proper tab order', () => {
      render(<ControlsSection {...defaultProps} />);
      
      const controls = screen.getAllByRole('button');
      expect(controls).toHaveLength(3);
      
      controls.forEach(control => {
        expect(control).toHaveAttribute('tabindex', '0');
      });
    });
  });
});

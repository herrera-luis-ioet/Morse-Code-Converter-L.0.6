import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OutputSection from '../components/OutputSection';

describe('OutputSection', () => {
  const defaultProps = {
    value: '',
  };

  test('renders with empty output area and playback controls', () => {
    render(<OutputSection {...defaultProps} />);
    
    expect(screen.getByText('Output:')).toBeInTheDocument();
    const outputElement = screen.getByPlaceholderText('Translated message');
    expect(outputElement).toBeInTheDocument();
    expect(outputElement).toHaveValue('');
    expect(outputElement).toHaveAttribute('readOnly');

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });

  test('displays provided value correctly', () => {
    const props = {
      value: '... --- ...',
    };
    
    render(<OutputSection {...props} />);
    
    const outputElement = screen.getByPlaceholderText('Translated message');
    expect(outputElement).toHaveValue('... --- ...');
  });

  test('renders playback controls with correct styling', () => {
    render(<OutputSection {...defaultProps} />);
    
    const buttons = screen.getAllByRole('button');
    const [playButton, pauseButton, stopButton, settingsButton] = buttons;

    // Test button styling
    [playButton, pauseButton, stopButton, settingsButton].forEach(button => {
      expect(button).toHaveStyle({
        width: '120px',
        height: '114px',
        background: '#000000',
        borderRadius: '30px',
      });
    });
  });

  test('applies correct responsive layout', () => {
    const { container } = render(<OutputSection {...defaultProps} />);
    
    const outputBox = container.firstChild;
    expect(outputBox).toHaveStyle({
      background: '#ffffff',
      border: '2px solid #000000',
      borderRadius: '30px',
      padding: '20px',
      margin: '20px 0',
      height: '464px',
      marginTop: '60px',
    });

    const controlsStack = screen.getByRole('group');
    expect(controlsStack).toHaveStyle({
      marginTop: '20px',
    });
  });

  test('applies correct font styling to output text', () => {
    render(<OutputSection {...defaultProps} />);
    
    const outputElement = screen.getByPlaceholderText('Translated message');
    expect(outputElement).toHaveStyle({
      fontSize: '28px',
      fontFamily: '"JetBrains Mono", monospace',
    });
  });

  test('maintains readOnly state', () => {
    render(<OutputSection value="test" />);
    
    const outputElement = screen.getByPlaceholderText('Translated message');
    expect(outputElement).toHaveAttribute('readOnly');
    expect(outputElement).not.toHaveAttribute('aria-readonly', 'false');
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the correct header text', () => {
    render(<App />);
    expect(screen.getByText('Morse Code Converter')).toBeInTheDocument();
  });

  it('has the correct main layout structure', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toHaveClass('App-header');
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders within StrictMode without warnings', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('has the correct CSS classes applied', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass('App');
  });
});
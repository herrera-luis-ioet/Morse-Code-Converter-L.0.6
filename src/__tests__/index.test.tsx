import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from '../App';

// Mock ReactDOM
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

// Mock reportWebVitals
jest.mock('../reportWebVitals', () => jest.fn());

describe('Application Entry Point', () => {
  const mockRoot = document.createElement('div');
  mockRoot.id = 'root';

  beforeEach(() => {
    document.body.appendChild(mockRoot);
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.removeChild(mockRoot);
  });

  it('should create React root with the correct element', () => {
    // Import index to trigger the code
    require('../index');

    expect(ReactDOM.createRoot).toHaveBeenCalledTimes(1);
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(mockRoot);
  });

  it('should mount App component within StrictMode', () => {
    // Import index to trigger the code
    require('../index');

    const mockRender = (ReactDOM.createRoot as jest.Mock).mock.results[0].value.render;
    
    expect(mockRender).toHaveBeenCalledTimes(1);
    const renderCall = mockRender.mock.calls[0][0];
    
    // Verify StrictMode is used
    expect(renderCall.type).toBe(React.StrictMode);
    
    // Verify App is the child of StrictMode
    expect(renderCall.props.children.type).toBe(App);
  });

  it('should handle errors gracefully', () => {
    // Mock console.error to prevent error output in tests
    const originalError = console.error;
    console.error = jest.fn();

    // Mock createRoot to throw an error
    (ReactDOM.createRoot as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    try {
      require('../index');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Test error');
    }

    // Restore console.error
    console.error = originalError;
  });

  it('should call reportWebVitals', () => {
    const reportWebVitals = require('../reportWebVitals');
    require('../index');

    expect(reportWebVitals).toHaveBeenCalled();
  });
});
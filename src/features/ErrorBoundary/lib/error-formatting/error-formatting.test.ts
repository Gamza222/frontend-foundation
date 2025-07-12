/** @file Tests for user-facing and developer-facing error formatting. */

import {
  formatErrorForDeveloper,
  formatErrorForLogging,
  formatErrorForNotification,
  formatErrorForUser,
} from './error-formatting';
import { classifyError } from '../error-classification/error-classification';
import { ErrorCategory } from '../../model/types';

describe('formatErrorForUser', () => {
  it('should return a generic message for network errors', () => {
    const error = classifyError(new Error('Failed to fetch'));
    expect(formatErrorForUser(error)).toBe(
      'A network connection issue occurred. Please check your internet and try again.'
    );
  });

  it('should return a refresh message for chunk loading errors', () => {
    const error = classifyError(new Error('Loading chunk 123 failed'));
    expect(formatErrorForUser(error)).toBe(
      'An application update is available. Please refresh the page.'
    );
  });

  it('should pass through user-friendly validation messages', () => {
    const error = classifyError(new Error('Invalid email format'));
    expect(formatErrorForUser(error)).toBe('Invalid email format');
  });

  it('should return a generic message for unknown and runtime errors', () => {
    const runtimeError = classifyError(new Error('x is not a function'));
    const unknownError = classifyError(new Error('Something weird happened'));
    const expected = 'An unexpected error occurred. Please try again or contact support.';
    expect(formatErrorForUser(runtimeError)).toBe(expected);
    expect(formatErrorForUser(unknownError)).toBe(expected);
  });
});

describe('formatErrorForDeveloper', () => {
  it('should format a complete error with all technical details', () => {
    const error = classifyError(new Error('Test Message'), {
      componentStack: 'at MyComponent (app.js:123:1)',
    });
    // Manually add stack for consistent testing
    error.stack = 'Error: Test Message at app.js:1:1';

    const formatted = formatErrorForDeveloper(error);

    expect(formatted).toContain(`ID: ${error.id}`);
    expect(formatted).toContain(`Category: ${error.category}`);
    expect(formatted).toContain(`Severity: ${error.severity}`);
    expect(formatted).toContain('Timestamp:');
    expect(formatted).toContain('Message: Test Message');
    expect(formatted).toContain('Component Stack: at MyComponent (app.js:123:1)');
    expect(formatted).toContain('Stack: Error: Test Message at app.js:1:1');
  });
});

describe('formatErrorForLogging', () => {
  it('should create a structured, one-line summary for logs', () => {
    const error = classifyError(new Error('Network request failed'), {
      componentStack: 'UserLogin',
    });
    const expected = `network:high [UserLogin] - Network request failed`;
    expect(formatErrorForLogging(error)).toBe(expected);
  });
});

describe('formatErrorForNotification', () => {
  it('should create short, actionable messages for UI notifications', () => {
    const networkError = classifyError(new Error('Connection failed'));
    const chunkError = classifyError(new Error('Chunk failed'));
    const validationError = classifyError(new Error('Invalid input'));

    expect(formatErrorForNotification(networkError)).toBe(
      'Connection failed. Check network and retry.'
    );
    expect(formatErrorForNotification(chunkError)).toBe('App update needed. Please refresh.');
    expect(formatErrorForNotification(validationError)).toBe('Invalid input');
  });
});

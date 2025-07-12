/** @file Tests for the error classification utility. */

import { classifyError } from './error-classification';
import { ErrorCategory, ErrorSeverity, ErrorRecoveryOptions } from '../../model/types';

// Mock the uuid import to return a consistent value for snapshots
jest.mock('uuid', () => ({
  v4: () => 'mock-uuid-1234',
}));

describe('classifyError', () => {
  // Test Case: Network Error
  it('should correctly classify a network error as high severity and recoverable by RETRY', () => {
    const networkError = new Error('Failed to fetch resource from server');
    const classified = classifyError(networkError);

    expect(classified.id).toBe('mock-uuid-1234');
    expect(classified.category).toBe(ErrorCategory.NETWORK);
    expect(classified.severity).toBe(ErrorSeverity.HIGH);
    expect(classified.isRecoverable).toBe(ErrorRecoveryOptions.RETRY);
    expect(classified.shouldReport).toBe(true);
    expect(classified.originalError).toBe(networkError);
  });

  // Test Case: Chunk Loading Error
  it('should correctly classify a chunk loading error as critical and recoverable by RELOAD', () => {
    const chunkError = new Error('Loading chunk 1234 failed');
    const classified = classifyError(chunkError);

    expect(classified.category).toBe(ErrorCategory.CHUNK_LOADING);
    expect(classified.severity).toBe(ErrorSeverity.CRITICAL);
    expect(classified.isRecoverable).toBe(ErrorRecoveryOptions.RELOAD);
    expect(classified.shouldReport).toBe(true);
  });

  // Test Case: Runtime Error
  it('should correctly classify a runtime error as high severity and not recoverable', () => {
    const runtimeError = new TypeError("Cannot read properties of undefined (reading 'x')");
    const classified = classifyError(runtimeError);

    expect(classified.category).toBe(ErrorCategory.RUNTIME);
    expect(classified.severity).toBe(ErrorSeverity.HIGH);
    expect(classified.isRecoverable).toBe(null);
    expect(classified.shouldReport).toBe(true);
  });

  // Test Case: Validation Error
  it('should correctly classify a validation error as low severity, not recoverable, and not reported', () => {
    const validationError = new Error('Invalid email format');
    const classified = classifyError(validationError);

    expect(classified.category).toBe(ErrorCategory.VALIDATION);
    expect(classified.severity).toBe(ErrorSeverity.LOW);
    expect(classified.isRecoverable).toBe(null);
    expect(classified.shouldReport).toBe(false);
  });

  // Test Case: Permission Error
  it('should correctly classify a permission error as medium severity and not recoverable', () => {
    const permissionError = new Error('Forbidden: Access Denied');
    const classified = classifyError(permissionError);

    expect(classified.category).toBe(ErrorCategory.PERMISSION);
    expect(classified.severity).toBe(ErrorSeverity.MEDIUM);
    expect(classified.isRecoverable).toBe(null);
    expect(classified.shouldReport).toBe(true);
  });

  // Test Case: Unknown Error
  it('should classify an unknown error as high severity and not recoverable', () => {
    const unknownError = new Error('Something strange happened');
    const classified = classifyError(unknownError);

    expect(classified.category).toBe(ErrorCategory.UNKNOWN);
    expect(classified.severity).toBe(ErrorSeverity.HIGH);
    expect(classified.isRecoverable).toBe(null);
    expect(classified.shouldReport).toBe(true);
  });

  // Test Case: Non-Error Thrown
  it('should handle cases where a non-Error object is thrown', () => {
    const nonErrorObject = { message: 'This is not an error instance' };
    const classified = classifyError(nonErrorObject);

    expect(classified.name).toBe('Error');
    expect(classified.message).toBe('An unknown non-error value was thrown');
    expect(classified.originalError?.cause).toBe(nonErrorObject);
    expect(classified.category).toBe(ErrorCategory.UNKNOWN);
  });

  // Test Case: Context Passing
  it('should correctly apply context properties to the classified error', () => {
    const error = new Error('Network timeout');
    const context = {
      componentStack: 'at MyComponent (MyComponent.tsx:10)',
      statusCode: 504,
      endpoint: '/api/data',
      metadata: { customId: 'xyz-789' },
    };
    const classified = classifyError(error, context);

    expect(classified.category).toBe(ErrorCategory.NETWORK);
    expect(classified.componentStack).toBe(context.componentStack);
    expect(classified.statusCode).toBe(context.statusCode);
    expect(classified.endpoint).toBe(context.endpoint);
    expect(classified.metadata).toEqual(context.metadata);
  });
});

/** @file Defines core error interfaces for the error boundary system. */

import {
  ErrorCategory,
  ErrorRecoveryOptions,
  ErrorSeverity,
} from '../error-classification/error-classification.types';

/**
 * The primary, enhanced error object with rich context for handling and reporting.
 * This single interface is used for all error types to keep the system simple.
 */

export interface ClassifiedError {
  // Core error details
  id: string;
  message: string;
  name: string;
  stack?: string | undefined;
  originalError?: Error | undefined;

  // Classification
  category: ErrorCategory;
  severity: ErrorSeverity;

  // Context
  timestamp: Date;
  componentStack?: string | undefined;
  metadata?: Record<string, any> | undefined;

  // Network-specific context (optional)
  statusCode?: number | undefined;
  endpoint?: string | undefined;

  // Recovery & Reporting
  isRecoverable: ErrorRecoveryOptions | null;
  shouldReport: boolean;
}

/** A simple, pluggable interface for any error reporting service. */
export interface ErrorReporter {
  report: (error: ClassifiedError) => void;
}

/** Props passed to an error fallback component. */
export interface ErrorFallbackProps {
  error: ClassifiedError;
  resetErrorBoundary: () => void;
}

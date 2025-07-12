/** @file Exports all public types for the ErrorBoundary feature. */

export {
  ErrorSeverity,
  ErrorCategory,
  ErrorRecoveryOptions,
} from './error-classification/error-classification.types';

export type {
  ClassifiedError,
  ErrorFallbackProps,
  ErrorReporter,
} from './error-contracts/error-contracts.types';

/** @file Exports all public utilities for the ErrorBoundary feature. */

export {
  classifyError,
  type ClassificationContext,
} from './error-classification/error-classification';

export {
  formatErrorForUser,
  formatErrorForDeveloper,
  formatErrorForLogging,
  formatErrorForNotification,
} from './error-formatting/error-formatting';

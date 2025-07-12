/** @file Defines the primary function for classifying raw errors into rich, structured error objects. */

import { v4 as uuidv4 } from 'uuid';
import {
  ErrorCategory,
  ErrorSeverity,
  ClassifiedError,
  ErrorRecoveryOptions,
} from '../../model/types';

// Optional context that can be provided when classifying an error.
export interface ClassificationContext {
  componentStack?: string;
  statusCode?: number;
  endpoint?: string;
  metadata?: Record<string, any>;
}

/**
 * Predefined patterns for classifying errors based on their message.
 * More specific patterns should be listed before general ones.
 */
const ERROR_PATTERNS: Readonly<Record<ErrorCategory, RegExp[]>> = {
  [ErrorCategory.NETWORK]: [/network/i, /fetch/i, /timeout/i, /cors/i, /server/i, /connection/i],
  [ErrorCategory.CHUNK_LOADING]: [/loading chunk/i, /dynamic import/i, /chunk/i],
  [ErrorCategory.PERMISSION]: [/unauthorized/i, /forbidden/i, /access.*denied/i],
  [ErrorCategory.VALIDATION]: [/validation/i, /invalid/i, /required/i],
  [ErrorCategory.RUNTIME]: [/cannot read/i, /not a function/i, /referenceerror/i, /typeerror/i],
  [ErrorCategory.UNKNOWN]: [], // UNKNOWN is the fallback
};

/**
 * Classifies a raw error, enhances it with rich context, and returns a structured object.
 * This is the central function for processing all errors in the system.
 *
 * @param rawError The raw Error object or an unknown throwable.
 * @param context Optional additional context for more accurate classification.
 * @returns A ClassifiedError object.
 */
export function classifyError(
  rawError: unknown,
  context: ClassificationContext = {}
): ClassifiedError {
  const error =
    rawError instanceof Error
      ? rawError
      : new Error('An unknown non-error value was thrown', { cause: rawError });

  const category = determineCategory(error.message);
  const severity = determineSeverity(category);

  return {
    // Core Details
    id: uuidv4(),
    message: error.message,
    name: error.name,
    stack: error.stack,
    originalError: error,

    // Classification
    category,
    severity,

    // Context
    timestamp: new Date(),
    componentStack: context.componentStack,
    statusCode: context.statusCode,
    endpoint: context.endpoint,
    metadata: context.metadata,

    // Recovery & Reporting
    isRecoverable: determineRecoveryAction(category),
    shouldReport: shouldReport(category, severity),
  };
}

// --- Helper Functions (Internal to this module) ---

function determineCategory(message: string): ErrorCategory {
  for (const [category, patterns] of Object.entries(ERROR_PATTERNS)) {
    if (patterns.some((pattern) => pattern.test(message))) {
      return category as ErrorCategory;
    }
  }
  return ErrorCategory.UNKNOWN;
}

function determineSeverity(category: ErrorCategory): ErrorSeverity {
  switch (category) {
    case ErrorCategory.CHUNK_LOADING:
      return ErrorSeverity.CRITICAL;
    case ErrorCategory.NETWORK:
    case ErrorCategory.RUNTIME:
      return ErrorSeverity.HIGH;
    case ErrorCategory.PERMISSION:
      return ErrorSeverity.MEDIUM;
    case ErrorCategory.VALIDATION:
      return ErrorSeverity.LOW;
    default:
      return ErrorSeverity.HIGH;
  }
}

function determineRecoveryAction(category: ErrorCategory): ErrorRecoveryOptions | null {
  switch (category) {
    case ErrorCategory.NETWORK:
      return ErrorRecoveryOptions.RETRY;
    case ErrorCategory.CHUNK_LOADING:
      return ErrorRecoveryOptions.RELOAD;
    default:
      return null;
  }
}

function shouldReport(category: ErrorCategory, severity: ErrorSeverity): boolean {
  // Do not report client-side validation errors by default
  if (category === ErrorCategory.VALIDATION) {
    return false;
  }
  // Report all other significant errors
  return [ErrorSeverity.CRITICAL, ErrorSeverity.HIGH, ErrorSeverity.MEDIUM].includes(severity);
}

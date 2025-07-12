/** @file Defines functions for formatting errors for user and developer consumption. */

import { ErrorCategory, type ClassifiedError } from '../../model/types';

/** Formats an error for display to users, hiding technical details. */
export function formatErrorForUser(error: ClassifiedError): string {
  switch (error.category) {
    case ErrorCategory.NETWORK:
      return 'A network connection issue occurred. Please check your internet and try again.';
    case ErrorCategory.CHUNK_LOADING:
      return 'An application update is available. Please refresh the page.';
    case ErrorCategory.PERMISSION:
      return "You don't have permission for this action. Contact support if this is a mistake.";
    case ErrorCategory.VALIDATION:
      return error.message; // Validation messages are typically user-friendly.
    case ErrorCategory.RUNTIME:
    case ErrorCategory.UNKNOWN:
    default:
      return 'An unexpected error occurred. Please try again or contact support.';
  }
}

/** Formats an error with full technical details for developers or logging. */
export function formatErrorForDeveloper(error: ClassifiedError): string {
  const details = [
    `ID: ${error.id}`,
    `Category: ${error.category}`,
    `Severity: ${error.severity}`,
    `Timestamp: ${error.timestamp.toISOString()}`,
    `Message: ${error.message}`,
  ];

  if (error.componentStack) details.push(`Component Stack: ${error.componentStack}`);
  if (error.stack) details.push(`Stack: ${error.stack}`);

  return details.join('\n');
}

/**
 * Formats an error message for logging purposes
 *
 * This function creates a one-line summary suitable for log files:
 * - Includes category, severity, and component information
 * - Uses structured format for easy parsing by log aggregators
 * - Truncates long messages to keep logs readable
 */
export function formatErrorForLogging(error: ClassifiedError): string {
  const component = error.componentStack ? ` [${error.componentStack}]` : '';
  const prefix = `${error.category}:${error.severity}${component} - `;

  // Target total length: 150 characters
  const maxTotalLength = 150;
  const maxMessageLength = maxTotalLength - prefix.length - 3; // Reserve 3 for "..."

  const truncatedMessage =
    error.message.length > maxMessageLength
      ? `${error.message.substring(0, maxMessageLength)}...`
      : error.message;

  return `${prefix}${truncatedMessage}`;
}

/**
 * Formats an error for display in notifications or alerts
 *
 * This function creates short, notification-friendly messages:
 * - Keeps messages under 80 characters when possible
 * - Uses action-oriented language
 * - Appropriate for toast notifications, alert dialogs, etc.
 */
export function formatErrorForNotification(error: ClassifiedError): string {
  switch (error.category) {
    case ErrorCategory.NETWORK:
      return 'Connection failed. Check network and retry.';

    case ErrorCategory.CHUNK_LOADING:
      return 'App update needed. Please refresh.';

    case ErrorCategory.PERMISSION:
      return 'Access denied. Contact support.';

    case ErrorCategory.VALIDATION:
      // Keep validation messages short for notifications
      return error.message.length > 60 ? `${error.message.substring(0, 56)}...` : error.message;

    case ErrorCategory.RUNTIME:
    case ErrorCategory.UNKNOWN:
    default:
      return 'Something went wrong. Please retry.';
  }
}

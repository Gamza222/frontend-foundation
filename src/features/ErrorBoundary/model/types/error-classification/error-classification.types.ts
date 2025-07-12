/** @file Defines enums for error classification and categorization. */

export enum ErrorSeverity {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum ErrorCategory {
  NETWORK = 'network',
  CHUNK_LOADING = 'chunk_loading',
  RUNTIME = 'runtime',
  PERMISSION = 'permission',
  VALIDATION = 'validation',
  UNKNOWN = 'unknown',
}

export enum ErrorRecoveryOptions {
  RETRY = 'retry',
  RELOAD = 'reload',
}

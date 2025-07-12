# 🛡️ Error Handling System Guide

## 📋 Overview

Comprehensive error handling system using React Error Boundaries, specialized error components, and consistent error management patterns across our FSD architecture.

> **Core Principle**: Graceful degradation with informative feedback and recovery options for users.

## 🚀 Quick Start

### **Basic Error Boundary Usage**

```typescript
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { UserProfile } from '@features/user/UserProfile';

function App() {
  return (
    <ErrorBoundary>
      <UserProfile userId="123" />
    </ErrorBoundary>
  );
}
```

### **With Custom Fallback**

```typescript
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary
      fallback={({ error, retry }) => (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>{error.message}</p>
          <button onClick={retry}>Try Again</button>
        </div>
      )}
    >
      <UserProfile userId="123" />
    </ErrorBoundary>
  );
}
```

## 🧩 Core Error Boundary Components

### **Universal Error Boundary**

```typescript
// shared/ui/ErrorBoundary/ErrorBoundary.tsx
import * as React from 'react';

interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  errorBoundaryStack?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: Error;
    errorInfo: ErrorInfo | null;
    retry: () => void;
    canRetry: boolean;
  }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  maxRetries?: number;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const info: ErrorInfo = {
      componentStack: errorInfo.componentStack,
      errorBoundary: errorInfo.errorBoundary,
      errorBoundaryStack: errorInfo.errorBoundaryStack,
    };

    this.setState({ errorInfo: info });
    this.props.onError?.(error, info);

    // Log to error reporting service
    this.logErrorToService(error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    if (hasError && resetOnPropsChange) {
      const hasResetKeyChanged = resetKeys?.some(
        (key, idx) => key !== prevProps.resetKeys?.[idx]
      );

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // Integration with error reporting service (e.g., Sentry)
    console.error('Error Boundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
  };

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    });
  };

  handleRetry = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount < maxRetries) {
      this.setState(
        (prevState) => ({
          hasError: false,
          error: null,
          errorInfo: null,
          retryCount: prevState.retryCount + 1,
        }),
        () => {
          // Auto-reset retry count after successful render
          this.resetTimeoutId = window.setTimeout(() => {
            this.setState({ retryCount: 0 });
          }, 10000);
        }
      );
    }
  };

  render() {
    const { hasError, error, errorInfo, retryCount } = this.state;
    const { children, fallback: Fallback, maxRetries = 3 } = this.props;

    if (hasError && error) {
      const canRetry = retryCount < maxRetries;

      if (Fallback) {
        return (
          <Fallback
            error={error}
            errorInfo={errorInfo}
            retry={this.handleRetry}
            canRetry={canRetry}
          />
        );
      }

      // Default fallback UI
      return (
        <div className="error-boundary-fallback">
          <h2>Oops! Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Error details</summary>
            {error.toString()}
            <br />
            {errorInfo?.componentStack}
          </details>
          {canRetry && (
            <button onClick={this.handleRetry}>
              Try again ({maxRetries - retryCount} attempts left)
            </button>
          )}
        </div>
      );
    }

    return children;
  }
}
```

### **Suspense-Specific Error Boundary**

```typescript
// shared/ui/SuspenseErrorBoundary/SuspenseErrorBoundary.tsx
import * as React from 'react';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

interface SuspenseErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: Error;
    retry: () => void;
    isNetworkError: boolean;
  }>;
  onError?: (error: Error) => void;
  maxRetries?: number;
}

function isNetworkError(error: Error): boolean {
  return (
    error.message.includes('fetch') ||
    error.message.includes('network') ||
    error.message.includes('NetworkError') ||
    error.name === 'TypeError' && error.message.includes('Failed to fetch')
  );
}

export function SuspenseErrorBoundary({
  children,
  fallback: CustomFallback,
  onError,
  maxRetries = 3,
}: SuspenseErrorBoundaryProps) {
  const DefaultFallback = React.useCallback(
    ({ error, retry }: { error: Error; retry: () => void }) => {
      const networkError = isNetworkError(error);

      return (
        <div className="suspense-error-fallback">
          <div className="error-icon">⚠️</div>
          <h3>
            {networkError ? 'Connection Problem' : 'Loading Error'}
          </h3>
          <p>
            {networkError
              ? 'Please check your internet connection and try again.'
              : 'Something went wrong while loading this content.'}
          </p>
          <button onClick={retry} className="retry-button">
            Try Again
          </button>
          <details className="error-details">
            <summary>Technical details</summary>
            <code>{error.message}</code>
          </details>
        </div>
      );
    },
    []
  );

  const handleError = React.useCallback(
    (error: Error) => {
      onError?.(error);

      // Log network errors differently
      if (isNetworkError(error)) {
        console.warn('Network error in Suspense component:', error.message);
      } else {
        console.error('Suspense component error:', error);
      }
    },
    [onError]
  );

  const FallbackComponent = CustomFallback || DefaultFallback;

  return (
    <ErrorBoundary
      fallback={({ error, retry }) => (
        <FallbackComponent
          error={error}
          retry={retry}
          isNetworkError={isNetworkError(error)}
        />
      )}
      onError={handleError}
      maxRetries={maxRetries}
    >
      {children}
    </ErrorBoundary>
  );
}
```

### **Page-Level Error Boundary**

```typescript
// shared/ui/PageErrorBoundary/PageErrorBoundary.tsx
import * as React from 'react';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

interface PageErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error) => void;
}

export function PageErrorBoundary({ children, onError }: PageErrorBoundaryProps) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      handleGoHome();
    }
  };

  return (
    <ErrorBoundary
      fallback={({ error, retry, canRetry }) => (
        <div className="page-error-boundary">
          <div className="error-content">
            <div className="error-icon">💥</div>
            <h1>Page Error</h1>
            <p>
              We're sorry, but something went wrong with this page.
            </p>

            <div className="error-actions">
              {canRetry && (
                <button onClick={retry} className="primary-button">
                  Try Again
                </button>
              )}
              <button onClick={handleRefresh} className="secondary-button">
                Refresh Page
              </button>
              <button onClick={handleGoBack} className="secondary-button">
                Go Back
              </button>
              <button onClick={handleGoHome} className="secondary-button">
                Go Home
              </button>
            </div>

            <details className="error-details">
              <summary>Error Information</summary>
              <pre>{error.stack}</pre>
            </details>
          </div>
        </div>
      )}
      onError={onError}
      maxRetries={2}
    >
      {children}
    </ErrorBoundary>
  );
}
```

## 🎯 Error Handling Hook

### **useErrorHandler Hook**

```typescript
// shared/lib/errors/useErrorHandler.ts
import { useCallback } from 'react';

interface ErrorHandlerOptions {
  onError?: (error: Error) => void;
  throwOnError?: boolean;
  logError?: boolean;
}

interface ErrorHandler {
  handleError: (error: Error, context?: string) => void;
  handleAsyncError: (promise: Promise<any>, context?: string) => Promise<any>;
}

export function useErrorHandler(options: ErrorHandlerOptions = {}): ErrorHandler {
  const { onError, throwOnError = false, logError = true } = options;

  const handleError = useCallback(
    (error: Error, context?: string) => {
      if (logError) {
        console.error(`Error${context ? ` in ${context}` : ''}:`, error);
      }

      onError?.(error);

      if (throwOnError) {
        throw error;
      }
    },
    [onError, throwOnError, logError]
  );

  const handleAsyncError = useCallback(
    async (promise: Promise<any>, context?: string) => {
      try {
        return await promise;
      } catch (error) {
        handleError(error as Error, context);
        throw error; // Re-throw for Suspense to catch
      }
    },
    [handleError]
  );

  return {
    handleError,
    handleAsyncError,
  };
}

// Usage example
function UserProfile({ userId }: { userId: string }) {
  const { handleAsyncError } = useErrorHandler({
    onError: (error) => {
      // Send to error reporting service
      console.error('User profile error:', error);
    },
  });

  const fetchUser = useCallback(async () => {
    return handleAsyncError(
      fetch(`/api/users/${userId}`).then((res) => res.json()),
      'user profile fetch'
    );
  }, [userId, handleAsyncError]);

  // Use with Suspense resource or effect
}
```

## 🔧 Error Utilities

### **Error Classification**

```typescript
// shared/lib/errors/errorUtils.ts
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN',
}

export interface ClassifiedError extends Error {
  type: ErrorType;
  code?: string;
  statusCode?: number;
  context?: string;
}

export function classifyError(error: Error): ClassifiedError {
  const classifiedError = error as ClassifiedError;

  // Network errors
  if (
    error.message.includes('fetch') ||
    error.message.includes('NetworkError') ||
    (error.name === 'TypeError' && error.message.includes('Failed to fetch'))
  ) {
    classifiedError.type = ErrorType.NETWORK;
    return classifiedError;
  }

  // HTTP errors (if using a fetch wrapper that includes status)
  if ('statusCode' in error) {
    const statusCode = (error as any).statusCode;
    if (statusCode === 401) {
      classifiedError.type = ErrorType.AUTHENTICATION;
    } else if (statusCode === 403) {
      classifiedError.type = ErrorType.AUTHORIZATION;
    } else if (statusCode === 404) {
      classifiedError.type = ErrorType.NOT_FOUND;
    } else if (statusCode >= 400 && statusCode < 500) {
      classifiedError.type = ErrorType.CLIENT;
    } else if (statusCode >= 500) {
      classifiedError.type = ErrorType.SERVER;
    }
    classifiedError.statusCode = statusCode;
    return classifiedError;
  }

  // Validation errors
  if (
    error.message.includes('validation') ||
    error.message.includes('invalid') ||
    error.name === 'ValidationError'
  ) {
    classifiedError.type = ErrorType.VALIDATION;
    return classifiedError;
  }

  // Default to unknown
  classifiedError.type = ErrorType.UNKNOWN;
  return classifiedError;
}

export function getErrorMessage(error: ClassifiedError): string {
  switch (error.type) {
    case ErrorType.NETWORK:
      return 'Please check your internet connection and try again.';
    case ErrorType.AUTHENTICATION:
      return 'Please log in to continue.';
    case ErrorType.AUTHORIZATION:
      return "You don't have permission to access this resource.";
    case ErrorType.NOT_FOUND:
      return 'The requested resource was not found.';
    case ErrorType.VALIDATION:
      return 'Please check your input and try again.';
    case ErrorType.SERVER:
      return 'Server error. Please try again later.';
    case ErrorType.CLIENT:
      return 'There was a problem with your request.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
}

export function shouldRetry(error: ClassifiedError): boolean {
  switch (error.type) {
    case ErrorType.NETWORK:
    case ErrorType.SERVER:
      return true;
    case ErrorType.AUTHENTICATION:
    case ErrorType.AUTHORIZATION:
    case ErrorType.NOT_FOUND:
    case ErrorType.VALIDATION:
      return false;
    default:
      return true; // When in doubt, allow retry
  }
}
```

### **Error Logging Service**

```typescript
// shared/lib/errors/errorLogger.ts
interface ErrorLogEntry {
  error: Error;
  timestamp: string;
  userAgent: string;
  url: string;
  userId?: string;
  context?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

class ErrorLogger {
  private logs: ErrorLogEntry[] = [];
  private endpoint: string = '/api/errors';

  logError(error: Error, context?: string, severity: ErrorLogEntry['severity'] = 'medium') {
    const entry: ErrorLogEntry = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } as Error,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      context,
      severity,
    };

    this.logs.push(entry);
    this.sendToServer(entry);
  }

  private async sendToServer(entry: ErrorLogEntry) {
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    } catch (sendError) {
      console.warn('Failed to send error log to server:', sendError);
      // Store locally for retry
      this.storeLocally(entry);
    }
  }

  private storeLocally(entry: ErrorLogEntry) {
    try {
      const stored = localStorage.getItem('errorLogs') || '[]';
      const logs = JSON.parse(stored);
      logs.push(entry);
      localStorage.setItem('errorLogs', JSON.stringify(logs));
    } catch (storageError) {
      console.warn('Failed to store error log locally:', storageError);
    }
  }

  async retryFailedLogs() {
    try {
      const stored = localStorage.getItem('errorLogs');
      if (stored) {
        const logs = JSON.parse(stored);
        for (const log of logs) {
          await this.sendToServer(log);
        }
        localStorage.removeItem('errorLogs');
      }
    } catch (retryError) {
      console.warn('Failed to retry error logs:', retryError);
    }
  }
}

export const errorLogger = new ErrorLogger();
```

## 📱 Layer-Specific Error Handling

### **Page-Level Error Handling**

```typescript
// pages/user/UserPage.tsx
import * as React from 'react';
import { PageErrorBoundary } from '@shared/ui/PageErrorBoundary';
import { UserProfileWidget } from '@widgets/UserProfile';

export function UserPage({ userId }: { userId: string }) {
  const handlePageError = (error: Error) => {
    errorLogger.logError(error, `UserPage-${userId}`, 'high');
  };

  return (
    <PageErrorBoundary onError={handlePageError}>
      <div className="user-page">
        <h1>User Profile</h1>
        <UserProfileWidget userId={userId} />
      </div>
    </PageErrorBoundary>
  );
}
```

### **Feature-Level Error Handling**

```typescript
// features/user/EditProfile/EditProfile.tsx
import * as React from 'react';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { useErrorHandler } from '@shared/lib/errors/useErrorHandler';

export function EditProfile({ userId }: { userId: string }) {
  const { handleError } = useErrorHandler({
    onError: (error) => {
      errorLogger.logError(error, 'EditProfile', 'medium');
    },
  });

  const handleSubmit = async (data: UserData) => {
    try {
      await updateUser(userId, data);
    } catch (error) {
      handleError(error as Error, 'profile update');
    }
  };

  return (
    <ErrorBoundary
      fallback={({ error, retry }) => (
        <div className="edit-profile-error">
          <p>Failed to load profile editor: {error.message}</p>
          <button onClick={retry}>Try Again</button>
        </div>
      )}
    >
      <form onSubmit={handleSubmit}>
        {/* Form content */}
      </form>
    </ErrorBoundary>
  );
}
```

## 🧪 Testing Error Boundaries

### **Error Boundary Testing Utilities**

```typescript
// __tests__/utils/errorBoundaryTestUtils.tsx
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

// Component that throws an error
export function ThrowError({ shouldThrow = true, message = 'Test error' }) {
  if (shouldThrow) {
    throw new Error(message);
  }
  return <div>No error</div>;
}

// Test helper for error boundary testing
export function renderWithErrorBoundary(
  ui: React.ReactElement,
  errorBoundaryProps = {}
) {
  const onError = jest.fn();

  const result = render(
    <ErrorBoundary onError={onError} {...errorBoundaryProps}>
      {ui}
    </ErrorBoundary>
  );

  return {
    ...result,
    onError,
  };
}

// Example test
describe('ErrorBoundary', () => {
  it('catches and displays errors', () => {
    const { onError } = renderWithErrorBoundary(
      <ThrowError shouldThrow={true} message="Test error message" />
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Test error message',
      }),
      expect.any(Object)
    );
  });

  it('allows retry after error', async () => {
    const { onError, rerender } = renderWithErrorBoundary(
      <ThrowError shouldThrow={true} />
    );

    expect(screen.getByText(/try again/i)).toBeInTheDocument();

    // Click retry (this would reset the error boundary)
    const retryButton = screen.getByText(/try again/i);
    fireEvent.click(retryButton);

    // Simulate component no longer throwing
    rerender(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });
});
```

## 🎯 Best Practices

### **✅ DO**

- Wrap each major UI section with appropriate error boundaries
- Provide meaningful error messages and recovery options
- Log errors with sufficient context for debugging
- Test both error and recovery scenarios
- Use specialized error boundaries for different contexts (Page, Suspense, etc.)
- Classify errors to provide appropriate user feedback
- Implement retry mechanisms for transient errors

### **❌ DON'T**

- Wrap every single component with error boundaries
- Show technical error details to end users
- Ignore error logging and monitoring
- Use error boundaries as a replacement for proper error handling
- Let errors bubble up without context
- Implement retry for errors that won't benefit from it
- Forget to test error scenarios

---

**📅 Last Updated**: Documentation restructure completion  
**🔄 Next Review**: After error monitoring service integration  
**📖 Related Docs**:

- [Suspense Guide](./suspense-guide.md)
- [Testing Workflow](../../development/testing-guide.md)
- [Performance Guidelines](../../development/performance.md)

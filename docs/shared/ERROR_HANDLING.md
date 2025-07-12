# 🚨 Error Handling & Error Boundaries

## 📋 Overview

Our error handling system provides comprehensive error boundaries and utilities for handling different types of errors in React applications, with specialized components for Suspense integration.

## 🛡️ Error Boundary Components

### **ErrorBoundary**

Universal error boundary that catches all JavaScript errors in component trees:

```typescript
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong!</div>}
      onError={(error, errorInfo) => {
        console.error('Error caught:', error, errorInfo);
        // Send to error tracking service
      }}
    >
      <MyComponent />
    </ErrorBoundary>
  );
}
```

**Props:**

- `fallback` - React element or component to show when error occurs
- `onError` - Callback function called when error is caught
- `children` - Components to wrap

### **SuspenseErrorBoundary**

Specialized error boundary for Suspense components with retry functionality:

```typescript
import { SuspenseErrorBoundary } from '@shared/ui/ErrorBoundary';
import { Suspense } from 'react';

function App() {
  return (
    <SuspenseErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </SuspenseErrorBoundary>
  );
}
```

**Features:**

- Specialized for Suspense-related errors
- Built-in retry mechanism
- Network error detection
- Automatic fallback UI
- Error reporting integration

### **PageErrorBoundary**

Full-page error boundary with navigation options:

```typescript
import { PageErrorBoundary } from '@shared/ui/ErrorBoundary';

function App() {
  return (
    <PageErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </PageErrorBoundary>
  );
}
```

**Features:**

- Full-page error UI
- Navigation options (Home, Back, Refresh)
- Error details toggle
- Accessibility support
- Keyboard navigation

## 🪝 Error Handling Hook

### **useErrorHandler**

Consistent error handling throughout the application:

```typescript
import { useErrorHandler } from '@shared/ui/ErrorBoundary';

function MyComponent() {
  const { handleError, clearError, hasError, error } = useErrorHandler();

  const fetchData = async () => {
    try {
      const data = await api.getData();
      return data;
    } catch (error) {
      handleError(error, {
        component: 'MyComponent',
        operation: 'fetchData'
      });
    }
  };

  if (hasError) {
    return (
      <div>
        <p>Error: {error?.message}</p>
        <button onClick={clearError}>Try Again</button>
      </div>
    );
  }

  return <div>Component content</div>;
}
```

**API:**

- `handleError(error, context?)` - Handle error with optional context
- `clearError()` - Clear current error state
- `hasError` - Boolean indicating if there's an active error
- `error` - Current error object

## 🔧 Error Utilities

### **Error Detection**

```typescript
import { isNetworkError, getErrorMessage, shouldRetry } from '@shared/ui/ErrorBoundary';

// Check if error is network-related
if (isNetworkError(error)) {
  // Handle network error specifically
}

// Get user-friendly error message
const message = getErrorMessage(error);

// Check if error should trigger retry
if (shouldRetry(error)) {
  // Attempt retry
}
```

### **Error Reporting**

```typescript
import { reportError, logError } from '@shared/ui/ErrorBoundary';

// Report error to external service
reportError(error, {
  userId: user.id,
  component: 'UserProfile',
  additionalContext: { action: 'updateProfile' },
});

// Log error locally
logError(error, 'Failed to update user profile');
```

## 🎯 Error Boundary Patterns

### **1. Page-Level Error Handling**

```typescript
import { PageErrorBoundary } from '@shared/ui/ErrorBoundary';
import { PageSuspenseWrapper } from '@shared/ui/SuspenseWrapper';

function AppPage() {
  return (
    <PageErrorBoundary>
      <PageSuspenseWrapper>
        <PageContent />
      </PageSuspenseWrapper>
    </PageErrorBoundary>
  );
}
```

### **2. Component-Level Error Handling**

```typescript
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

function UserCard({ userId }) {
  return (
    <ErrorBoundary
      fallback={<UserCardError userId={userId} />}
      onError={(error) => reportError(error, { userId })}
    >
      <UserProfile userId={userId} />
    </ErrorBoundary>
  );
}
```

### **3. Feature-Level Error Handling**

```typescript
import { SuspenseErrorBoundary } from '@shared/ui/ErrorBoundary';

function ShoppingCart() {
  return (
    <SuspenseErrorBoundary
      fallback={<CartError />}
      onRetry={() => window.location.reload()}
    >
      <Suspense fallback={<CartSkeleton />}>
        <CartItems />
      </Suspense>
    </SuspenseErrorBoundary>
  );
}
```

## 🎨 Custom Error Components

### **Creating Custom Fallbacks**

```typescript
import { ErrorFallbackProps } from '@shared/ui/ErrorBoundary';

function CustomErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>Error: {error.message}</p>
      <button onClick={resetError}>
        Try again
      </button>
      <button onClick={() => window.location.href = '/'}>
        Go home
      </button>
    </div>
  );
}

// Usage
<ErrorBoundary fallback={CustomErrorFallback}>
  <MyComponent />
</ErrorBoundary>
```

### **Error-Specific Fallbacks**

```typescript
function NetworkErrorFallback({ resetError }: ErrorFallbackProps) {
  return (
    <div className="network-error">
      <h3>Connection Problem</h3>
      <p>Please check your internet connection</p>
      <button onClick={resetError}>Retry</button>
    </div>
  );
}

function ValidationErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <div className="validation-error">
      <h3>Invalid Data</h3>
      <p>{error.message}</p>
    </div>
  );
}
```

## 🧪 Testing Error Boundaries

### **Testing Error Scenarios**

```typescript
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

const ThrowError = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No Error</div>;
};

test('catches and displays errors', () => {
  const onError = jest.fn();

  render(
    <ErrorBoundary onError={onError}>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  expect(onError).toHaveBeenCalled();
});

test('recovers from errors', () => {
  const { rerender } = render(
    <ErrorBoundary>
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  );

  expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();

  rerender(
    <ErrorBoundary>
      <ThrowError shouldThrow={false} />
    </ErrorBoundary>
  );

  expect(screen.getByText('No Error')).toBeInTheDocument();
});
```

### **Testing Network Errors**

```typescript
import { SuspenseErrorBoundary } from '@shared/ui/ErrorBoundary';

test('handles network errors in Suspense', async () => {
  const NetworkComponent = () => {
    throw new Error('Network request failed');
  };

  render(
    <SuspenseErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <NetworkComponent />
      </Suspense>
    </SuspenseErrorBoundary>
  );

  expect(screen.getByText('Network Error')).toBeInTheDocument();
  expect(screen.getByText('Retry')).toBeInTheDocument();
});
```

### **Testing Error Hook**

```typescript
import { renderHook, act } from '@testing-library/react';
import { useErrorHandler } from '@shared/ui/ErrorBoundary';

test('useErrorHandler manages error state', () => {
  const { result } = renderHook(() => useErrorHandler());

  expect(result.current.hasError).toBe(false);

  act(() => {
    result.current.handleError(new Error('Test error'));
  });

  expect(result.current.hasError).toBe(true);
  expect(result.current.error?.message).toBe('Test error');

  act(() => {
    result.current.clearError();
  });

  expect(result.current.hasError).toBe(false);
});
```

## 📊 Error Monitoring Integration

### **Sentry Integration**

```typescript
import * as Sentry from '@sentry/react';

function App() {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <div>
          <p>Something went wrong: {error.message}</p>
          <button onClick={resetError}>Try again</button>
        </div>
      )}
    >
      <MyApp />
    </Sentry.ErrorBoundary>
  );
}
```

### **Custom Error Reporting**

```typescript
// In error boundary onError callback
const reportError = (error: Error, errorInfo: ErrorInfo) => {
  // Send to error tracking service
  fetch('/api/errors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }),
  });
};
```

## 🎯 Best Practices

### **1. Error Boundary Placement**

```typescript
// ✅ CORRECT - Multiple levels of error boundaries
function App() {
  return (
    <PageErrorBoundary>           {/* App-level errors */}
      <Router>
        <Routes>
          <Route path="/dashboard" element={
            <ErrorBoundary>       {/* Route-level errors */}
              <Dashboard />
            </ErrorBoundary>
          } />
        </Routes>
      </Router>
    </PageErrorBoundary>
  );
}

// ❌ WRONG - Single error boundary for everything
function App() {
  return (
    <ErrorBoundary>
      <EntireApp />
    </ErrorBoundary>
  );
}
```

### **2. Meaningful Error Messages**

```typescript
// ✅ CORRECT - User-friendly messages
const getErrorMessage = (error: Error) => {
  if (error.message.includes('Network')) {
    return 'Connection problem. Please check your internet.';
  }
  if (error.message.includes('401')) {
    return 'Please log in to continue.';
  }
  return 'Something went wrong. Please try again.';
};

// ❌ WRONG - Technical error messages
function ErrorFallback({ error }: ErrorFallbackProps) {
  return <div>{error.stack}</div>; // Too technical for users
}
```

### **3. Error Context**

```typescript
// ✅ CORRECT - Provide context
handleError(error, {
  component: 'UserProfile',
  action: 'updateEmail',
  userId: user.id,
  timestamp: Date.now(),
});

// ❌ WRONG - No context
handleError(error);
```

## 📚 Import Reference

```typescript
// Error Boundary Components
import { ErrorBoundary, SuspenseErrorBoundary, PageErrorBoundary } from '@shared/ui/ErrorBoundary';

// Error Hook
import { useErrorHandler } from '@shared/ui/ErrorBoundary';

// Error Utilities
import {
  isNetworkError,
  getErrorMessage,
  shouldRetry,
  reportError,
  logError,
} from '@shared/ui/ErrorBoundary';

// Types
import type { ErrorBoundaryProps, ErrorFallbackProps, ErrorInfo } from '@shared/ui/ErrorBoundary';
```

This error handling system provides robust error management with user-friendly fallbacks, retry mechanisms, and comprehensive error reporting capabilities.

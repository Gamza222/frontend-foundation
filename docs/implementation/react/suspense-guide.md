# ⚡ React 18 Suspense Implementation Guide

## 📋 Overview

Complete guide to implementing React 18 Suspense patterns in our FSD architecture. This covers basic Suspense usage, advanced patterns, error handling, and concurrent features.

> **Key Principle**: Suspense enables declarative loading states and better user experience through progressive enhancement.

## 🚀 Quick Start

### **Basic Suspense Wrapper**

```typescript
import { Suspense } from 'react';
import { LoadingFallback } from '@shared/ui/LoadingFallback';
import { UserProfile } from '@features/user/UserProfile';

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <UserProfile userId="123" />
    </Suspense>
  );
}
```

### **With Error Boundary**

```typescript
import { Suspense } from 'react';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { LoadingFallback } from '@shared/ui/LoadingFallback';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <UserProfile userId="123" />
      </Suspense>
    </ErrorBoundary>
  );
}
```

## 🧩 Core Components

### **SuspenseWrapper Component**

```typescript
// shared/ui/SuspenseWrapper/SuspenseWrapper.tsx
import * as React from 'react';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { LoadingFallback } from '@shared/ui/LoadingFallback';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ComponentType<any>;
  onError?: (error: Error) => void;
}

export function SuspenseWrapper({
  children,
  fallback = <LoadingFallback />,
  errorFallback,
  onError,
}: SuspenseWrapperProps) {
  return (
    <ErrorBoundary fallback={errorFallback} onError={onError}>
      <React.Suspense fallback={fallback}>
        {children}
      </React.Suspense>
    </ErrorBoundary>
  );
}
```

### **Lazy Component Loading**

```typescript
// shared/lib/suspense/lazyWithRetry.ts
import { lazy } from 'react';

interface LazyComponentOptions {
  retries?: number;
  delay?: number;
}

export function lazyWithRetry<T extends React.ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>,
  options: LazyComponentOptions = {}
) {
  const { retries = 3, delay = 1000 } = options;

  return lazy(() => {
    return new Promise<{ default: T }>((resolve, reject) => {
      let attempts = 0;

      const attemptLoad = () => {
        attempts++;
        componentImport()
          .then(resolve)
          .catch((error) => {
            if (attempts < retries) {
              setTimeout(attemptLoad, delay * attempts);
            } else {
              reject(error);
            }
          });
      };

      attemptLoad();
    });
  });
}

// Usage
const LazyUserDashboard = lazyWithRetry(() => import('@pages/user/UserDashboard'), {
  retries: 3,
  delay: 1000,
});
```

## 🔄 Advanced Patterns

### **Resource Pattern for Data Fetching**

```typescript
// shared/lib/suspense/createSuspenseResource.ts
interface SuspenseResource<T> {
  read(): T;
  preload?: () => void;
}

interface ResourceOptions<T> {
  onError?: (error: Error) => void;
  transform?: (data: any) => T;
}

export function createSuspenseResource<T>(
  fetcher: () => Promise<T>,
  options: ResourceOptions<T> = {}
): SuspenseResource<T> {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let suspender: Promise<void>;

  const load = () => {
    suspender = fetcher()
      .then((data) => {
        status = 'success';
        result = options.transform ? options.transform(data) : data;
      })
      .catch((error) => {
        status = 'error';
        result = error;
        options.onError?.(error);
      });
  };

  // Start loading immediately
  load();

  return {
    read(): T {
      if (status === 'pending') {
        throw suspender;
      }
      if (status === 'error') {
        throw result;
      }
      return result;
    },
    preload: load,
  };
}

// Usage
const userResource = createSuspenseResource(
  () => fetch('/api/user/123').then(res => res.json()),
  {
    transform: (data) => ({ ...data, fullName: `${data.firstName} ${data.lastName}` }),
    onError: (error) => console.error('Failed to load user:', error),
  }
);

function UserProfile() {
  const user = userResource.read(); // Will suspend if loading
  return <div>{user.fullName}</div>;
}
```

### **Mutable Suspense Resource**

```typescript
// shared/lib/suspense/createMutableSuspenseResource.ts
interface MutableSuspenseResource<T> extends SuspenseResource<T> {
  refresh: () => void;
  invalidate: () => void;
}

export function createMutableSuspenseResource<T>(
  fetcher: () => Promise<T>,
  options: ResourceOptions<T> = {}
): MutableSuspenseResource<T> {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let suspender: Promise<void>;

  const load = () => {
    status = 'pending';
    suspender = fetcher()
      .then((data) => {
        status = 'success';
        result = options.transform ? options.transform(data) : data;
      })
      .catch((error) => {
        status = 'error';
        result = error;
        options.onError?.(error);
      });
    return suspender;
  };

  // Start loading immediately
  load();

  return {
    read(): T {
      if (status === 'pending') {
        throw suspender;
      }
      if (status === 'error') {
        throw result;
      }
      return result;
    },
    refresh: () => {
      load();
    },
    invalidate: () => {
      status = 'pending';
    },
    preload: load,
  };
}
```

## ⚛️ React 18 Concurrent Features

### **Transition for Non-Urgent Updates**

```typescript
// shared/lib/suspense/withTransition.ts
import { startTransition, useTransition } from 'react';

export function withTransition<T extends (...args: any[]) => void>(
  callback: T
): [T, boolean] {
  const [isPending, startTransitionWrapper] = useTransition();

  const wrappedCallback = ((...args: any[]) => {
    startTransition(() => {
      callback(...args);
    });
  }) as T;

  return [wrappedCallback, isPending];
}

// Usage in component
function SearchResults() {
  const [query, setQuery] = useState('');
  const [setQueryWithTransition, isPending] = withTransition(setQuery);

  return (
    <div>
      <input
        onChange={(e) => setQueryWithTransition(e.target.value)}
        placeholder="Search..."
      />
      <Suspense fallback={<div>Loading results...</div>}>
        <SearchResultsList query={query} />
      </Suspense>
      {isPending && <div>Updating...</div>}
    </div>
  );
}
```

### **Deferred Values for Performance**

```typescript
// shared/lib/suspense/useDeferredComputation.ts
import { useDeferredValue, useMemo } from 'react';

export function useDeferredComputation<T, R>(
  value: T,
  computeFn: (value: T) => R,
  deps?: React.DependencyList
): R {
  const deferredValue = useDeferredValue(value);

  return useMemo(
    () => computeFn(deferredValue),
    [deferredValue, ...(deps || [])]
  );
}

// Usage
function ExpensiveList({ items }: { items: string[] }) {
  const filteredItems = useDeferredComputation(
    items,
    (items) => items.filter(item => item.includes('important')),
    [items]
  );

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
```

### **Optimistic Updates**

```typescript
// shared/lib/suspense/createOptimisticUpdate.ts
import { useOptimistic, useTransition } from 'react';

interface OptimisticState<T> {
  data: T;
  optimisticUpdate: (updater: T | ((prev: T) => T)) => void;
  isPending: boolean;
}

export function createOptimisticUpdate<T>(
  initialData: T,
  updateFn: (data: T) => Promise<T>
): OptimisticState<T> {
  const [isPending, startTransition] = useTransition();
  const [optimisticData, addOptimistic] = useOptimistic(
    initialData,
    (state: T, optimisticValue: T) => optimisticValue
  );

  const optimisticUpdate = (updater: T | ((prev: T) => T)) => {
    const newData =
      typeof updater === 'function' ? (updater as (prev: T) => T)(optimisticData) : updater;

    addOptimistic(newData);

    startTransition(async () => {
      try {
        await updateFn(newData);
      } catch (error) {
        // Revert optimistic update on error
        addOptimistic(initialData);
        throw error;
      }
    });
  };

  return {
    data: optimisticData,
    optimisticUpdate,
    isPending,
  };
}
```

## 🔧 Utility Functions

### **withDelay Utility**

```typescript
// shared/lib/suspense/withDelay.ts
export function withDelay<T>(promise: Promise<T>, delay: number = 300): Promise<T> {
  return Promise.all([promise, new Promise((resolve) => setTimeout(resolve, delay))]).then(
    ([result]) => result
  );
}

// Usage
const delayedData = createSuspenseResource(() =>
  withDelay(
    fetch('/api/data').then((res) => res.json()),
    500
  )
);
```

### **Suspense Cache**

```typescript
// shared/lib/suspense/createSuspenseCache.ts
interface CacheEntry<T> {
  resource: SuspenseResource<T>;
  timestamp: number;
}

export function createSuspenseCache<T>(ttl: number = 300000) { // 5 minutes default
  const cache = new Map<string, CacheEntry<T>>();

  return {
    get(key: string, fetcher: () => Promise<T>): SuspenseResource<T> {
      const now = Date.now();
      const entry = cache.get(key);

      if (entry && now - entry.timestamp < ttl) {
        return entry.resource;
      }

      const resource = createSuspenseResource(fetcher);
      cache.set(key, { resource, timestamp: now });
      return resource;
    },

    invalidate(key?: string) {
      if (key) {
        cache.delete(key);
      } else {
        cache.clear();
      }
    },

    preload(key: string, fetcher: () => Promise<T>) {
      const resource = this.get(key, fetcher);
      resource.preload?.();
    },
  };
}

// Usage
const userCache = createSuspenseCache<User>(600000); // 10 minutes

function UserProfile({ userId }: { userId: string }) {
  const userResource = userCache.get(
    `user-${userId}`,
    () => fetch(`/api/users/${userId}`).then(res => res.json())
  );

  const user = userResource.read();
  return <div>{user.name}</div>;
}
```

## 🎯 Error Handling Integration

### **Specialized Error Boundaries**

```typescript
// shared/ui/SuspenseErrorBoundary/SuspenseErrorBoundary.tsx
import * as React from 'react';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

interface SuspenseErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error) => void;
  maxRetries?: number;
}

export function SuspenseErrorBoundary({
  children,
  fallback: FallbackComponent,
  onError,
  maxRetries = 3,
}: SuspenseErrorBoundaryProps) {
  const [retryCount, setRetryCount] = React.useState(0);
  const [key, setKey] = React.useState(0);

  const handleRetry = React.useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount(count => count + 1);
      setKey(k => k + 1); // Force re-render
    }
  }, [retryCount, maxRetries]);

  const handleError = React.useCallback((error: Error) => {
    onError?.(error);
  }, [onError]);

  return (
    <ErrorBoundary
      key={key}
      fallback={FallbackComponent ?
        ({ error }) => <FallbackComponent error={error} retry={handleRetry} /> :
        undefined
      }
      onError={handleError}
    >
      {children}
    </ErrorBoundary>
  );
}
```

## 📱 Real-World Usage Examples

### **Feature-Level Suspense**

```typescript
// features/user/UserDashboard/UserDashboard.tsx
import * as React from 'react';
import { SuspenseWrapper } from '@shared/ui/SuspenseWrapper';
import { UserProfile } from '@entities/user/ui/UserProfile';
import { UserActivity } from '@entities/user/ui/UserActivity';
import { LoadingFallback } from '@shared/ui/LoadingFallback';

export function UserDashboard({ userId }: { userId: string }) {
  return (
    <div className="user-dashboard">
      <SuspenseWrapper
        fallback={<LoadingFallback message="Loading profile..." />}
        errorFallback={({ error, retry }) => (
          <div>
            <p>Failed to load profile: {error.message}</p>
            <button onClick={retry}>Retry</button>
          </div>
        )}
      >
        <UserProfile userId={userId} />
      </SuspenseWrapper>

      <SuspenseWrapper
        fallback={<LoadingFallback message="Loading activity..." />}
      >
        <UserActivity userId={userId} />
      </SuspenseWrapper>
    </div>
  );
}
```

### **Widget-Level Composition**

```typescript
// widgets/UserOverview/UserOverviewWidget.tsx
import * as React from 'react';
import { SuspenseWrapper } from '@shared/ui/SuspenseWrapper';
import { UserDashboard } from '@features/user/UserDashboard';
import { UserNotifications } from '@features/notifications/UserNotifications';

export function UserOverviewWidget({ userId }: { userId: string }) {
  return (
    <div className="user-overview">
      <SuspenseWrapper>
        <UserDashboard userId={userId} />
      </SuspenseWrapper>

      <SuspenseWrapper>
        <UserNotifications userId={userId} />
      </SuspenseWrapper>
    </div>
  );
}
```

## 🧪 Testing Suspense Components

### **Testing with Act and Async Utilities**

```typescript
// __tests__/UserProfile.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { SuspenseWrapper } from '@shared/ui/SuspenseWrapper';
import { UserProfile } from '../UserProfile';

const mockUserData = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
};

// Mock the API
jest.mock('@shared/api', () => ({
  apiRequest: jest.fn(),
}));

describe('UserProfile with Suspense', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', async () => {
    const mockApiRequest = require('@shared/api').apiRequest;
    mockApiRequest.mockReturnValue(
      new Promise(resolve => {
        setTimeout(() => resolve(mockUserData), 100);
      })
    );

    render(
      <SuspenseWrapper fallback={<div>Loading user...</div>}>
        <UserProfile userId="123" />
      </SuspenseWrapper>
    );

    expect(screen.getByText('Loading user...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('handles errors with error boundary', async () => {
    const mockApiRequest = require('@shared/api').apiRequest;
    mockApiRequest.mockRejectedValue(new Error('Network error'));

    const onError = jest.fn();

    render(
      <SuspenseWrapper
        fallback={<div>Loading...</div>}
        onError={onError}
        errorFallback={({ error, retry }) => (
          <div>
            <p>Error: {error.message}</p>
            <button onClick={retry}>Retry</button>
          </div>
        )}
      >
        <UserProfile userId="123" />
      </SuspenseWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });

    expect(onError).toHaveBeenCalledWith(expect.any(Error));
  });
});
```

## 📊 Performance Monitoring

### **Suspense Performance Metrics**

```typescript
// shared/lib/suspense/performance.ts
interface SuspenseMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  component: string;
}

const suspenseMetrics = new Map<string, SuspenseMetrics>();

export function trackSuspensePerformance(componentName: string) {
  return {
    start: () => {
      suspenseMetrics.set(componentName, {
        startTime: performance.now(),
        component: componentName,
      });
    },

    end: () => {
      const metric = suspenseMetrics.get(componentName);
      if (metric) {
        const endTime = performance.now();
        const duration = endTime - metric.startTime;

        suspenseMetrics.set(componentName, {
          ...metric,
          endTime,
          duration,
        });

        // Log slow loads
        if (duration > 3000) {
          console.warn(`Slow Suspense load: ${componentName} took ${duration}ms`);
        }
      }
    },

    getMetrics: () => suspenseMetrics.get(componentName),
  };
}
```

## 🔄 Migration Guide

### **From useEffect to Suspense**

```typescript
// ❌ OLD WAY - useEffect with loading states
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  return <div>{user.name}</div>;
}

// ✅ NEW WAY - Suspense resource pattern
const userResource = createSuspenseResource(() =>
  fetch('/api/users/123').then(res => res.json())
);

function UserProfile() {
  const user = userResource.read(); // Suspends automatically
  return <div>{user.name}</div>;
}

// Usage with Suspense wrapper
function App() {
  return (
    <SuspenseWrapper>
      <UserProfile />
    </SuspenseWrapper>
  );
}
```

## 🎯 Best Practices

### **✅ DO**

- Wrap Suspense boundaries around logical UI sections
- Use Error Boundaries with all Suspense components
- Implement retry mechanisms for failed loads
- Cache resources to avoid unnecessary re-fetching
- Use transitions for non-urgent updates
- Test both loading and error states

### **❌ DON'T**

- Put Suspense boundaries around every individual component
- Ignore error handling with Suspense
- Use Suspense for CPU-intensive operations (use useDeferredValue instead)
- Create resources inside render functions
- Forget to handle promise rejections in resources

---

**📅 Last Updated**: Documentation restructure completion  
**🔄 Next Review**: After React concurrent features implementation  
**📖 Related Docs**:

- [Error Handling Guide](./error-handling.md)
- [Testing Workflow](../../development/testing-guide.md)
- [Performance Guidelines](../../development/performance.md)

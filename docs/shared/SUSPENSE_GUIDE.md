# ⚡ React 18 Suspense Implementation Guide

## 📋 Overview

This guide covers our comprehensive React 18 Suspense implementation, including basic utilities, advanced patterns, error boundaries, and concurrent features.

## 🎯 What's Implemented

### **✅ Core Suspense Components**

- **SuspenseWrapper** - Basic Suspense wrapper with fallback
- **PageSuspenseWrapper** - Page-level Suspense with enhanced fallbacks
- **ComponentSuspenseWrapper** - Component-level Suspense for small components

### **✅ Advanced Utilities**

- **lazyWithRetry** - Lazy loading with automatic retry on failure
- **lazyWithPreload** - Lazy loading with preloading capability
- **withSuspense** - HOC to wrap components with Suspense
- **withDelay** - Add minimum loading delay for better UX

### **✅ Error Boundaries**

- **ErrorBoundary** - Universal error boundary with fallback UI
- **SuspenseErrorBoundary** - Specialized for Suspense with retry logic
- **PageErrorBoundary** - Full-page error handling with navigation
- **useErrorHandler** - Hook for consistent error handling

### **✅ Suspense Resources**

- **createSuspenseResource** - Resource pattern for data fetching
- **createMutableSuspenseResource** - Refreshable resources
- **Resource pattern** - Read/throw pattern for Suspense integration

### **✅ React 18 Concurrent Features**

- **withTransition** - Wrap actions with startTransition
- **useDeferredComputation** - Defer expensive computations
- **createOptimisticUpdate** - Optimistic UI updates
- **createStreamResource** - Streaming data resources

## 🧩 Basic Suspense Components

### **SuspenseWrapper**

Basic Suspense wrapper for any component:

```typescript
import { SuspenseWrapper } from '@shared/ui/SuspenseWrapper';

function MyApp() {
  return (
    <SuspenseWrapper fallback={<div>Loading...</div>}>
      <LazyComponent />
    </SuspenseWrapper>
  );
}
```

### **PageSuspenseWrapper**

Enhanced Suspense wrapper for page-level components:

```typescript
import { PageSuspenseWrapper } from '@shared/ui/SuspenseWrapper';

function App() {
  return (
    <PageSuspenseWrapper>
      <LazyPage />
    </PageSuspenseWrapper>
  );
}
```

### **ComponentSuspenseWrapper**

Minimal Suspense wrapper for small components:

```typescript
import { ComponentSuspenseWrapper } from '@shared/ui/SuspenseWrapper';

function UserCard() {
  return (
    <ComponentSuspenseWrapper>
      <LazyUserAvatar />
    </ComponentSuspenseWrapper>
  );
}
```

## 🔄 Lazy Loading Utilities

### **lazyWithRetry**

Lazy load components with automatic retry on failure:

```typescript
import { lazyWithRetry } from '@shared/lib/suspense';

// Basic usage
const LazyComponent = lazyWithRetry(() => import('./HeavyComponent'));

// With custom retry count
const LazyComponentWithRetry = lazyWithRetry(
  () => import('./HeavyComponent'),
  { retries: 5 }
);

// Usage in JSX
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### **lazyWithPreload**

Lazy load with preloading capability:

```typescript
import { lazyWithPreload } from '@shared/lib/suspense';

const LazyComponent = lazyWithPreload(() => import('./HeavyComponent'));

function App() {
  // Preload on hover or other interactions
  const handlePreload = () => {
    LazyComponent.preload();
  };

  return (
    <div>
      <button onMouseEnter={handlePreload}>
        Hover to preload
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

## 🎨 Higher-Order Components

### **withSuspense**

HOC to automatically wrap components with Suspense:

```typescript
import { withSuspense } from '@shared/lib/suspense';

const LazyComponent = lazy(() => import('./MyComponent'));

// Wrap with default fallback
const SuspensifiedComponent = withSuspense(LazyComponent);

// Custom fallback
const CustomSuspenseComponent = withSuspense(
  LazyComponent,
  <div>Custom loading...</div>
);

// Usage
function App() {
  return <SuspensifiedComponent />;
}
```

### **withDelay**

Add minimum loading delay for better UX:

```typescript
import { withDelay } from '@shared/lib/suspense';

// Add 300ms minimum delay
const delayedPromise = withDelay(import('./Component'), 300);

const LazyComponent = lazy(() => delayedPromise);
```

## 🚨 Error Boundaries

### **ErrorBoundary**

Universal error boundary for any errors:

```typescript
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong!</div>}
      onError={(error, errorInfo) => {
        console.error('Error caught:', error, errorInfo);
      }}
    >
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### **SuspenseErrorBoundary**

Specialized error boundary for Suspense components with retry:

```typescript
import { SuspenseErrorBoundary } from '@shared/ui/ErrorBoundary';

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
        </Routes>
      </Router>
    </PageErrorBoundary>
  );
}
```

### **useErrorHandler Hook**

Consistent error handling throughout the app:

```typescript
import { useErrorHandler } from '@shared/ui/ErrorBoundary';

function MyComponent() {
  const { handleError, clearError, hasError } = useErrorHandler();

  const fetchData = async () => {
    try {
      const data = await api.getData();
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  if (hasError) {
    return <div>Error occurred! <button onClick={clearError}>Retry</button></div>;
  }

  return <div>Component content</div>;
}
```

## 📊 Suspense Resources

### **createSuspenseResource**

Resource pattern for data fetching:

```typescript
import { createSuspenseResource } from '@shared/lib/suspense';

// Create resource from promise
const userPromise = fetch('/api/user').then(res => res.json());
const userResource = createSuspenseResource(userPromise);

function UserProfile() {
  // This will suspend if data isn't ready
  const user = userResource.read();

  return <div>User: {user.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile />
    </Suspense>
  );
}
```

### **createMutableSuspenseResource**

Refreshable resources:

```typescript
import { createMutableSuspenseResource } from '@shared/lib/suspense';

const userResource = createMutableSuspenseResource(
  () => fetch('/api/user').then(res => res.json())
);

function UserProfile() {
  const user = userResource.read();

  const handleRefresh = () => {
    userResource.refresh(); // This will re-suspend and refetch
  };

  return (
    <div>
      <div>User: {user.name}</div>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}
```

## ⚡ React 18 Concurrent Features

### **withTransition**

Wrap actions with startTransition for non-urgent updates:

```typescript
import { withTransition } from '@shared/lib/suspense';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Wrap search with transition
  const handleSearch = withTransition((newQuery: string) => {
    setQuery(newQuery);
    // This update is marked as non-urgent
    setResults(searchResults(newQuery));
  });

  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      <SearchResults results={results} />
    </div>
  );
}
```

### **useDeferredComputation**

Defer expensive computations:

```typescript
import { useDeferredComputation } from '@shared/lib/suspense';

function ExpensiveList({ items }) {
  // Expensive computation is deferred
  const expensiveResults = useDeferredComputation(
    () => items.map(item => expensiveTransform(item)),
    [items]
  );

  return (
    <div>
      {expensiveResults.map(result => (
        <div key={result.id}>{result.name}</div>
      ))}
    </div>
  );
}
```

### **createOptimisticUpdate**

Optimistic UI updates:

```typescript
import { createOptimisticUpdate } from '@shared/lib/suspense';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const optimisticUpdate = createOptimisticUpdate(
    todos,
    setTodos,
    (currentTodos, optimisticTodo) => [...currentTodos, optimisticTodo]
  );

  const addTodo = async (text: string) => {
    const newTodo = { id: Date.now(), text, completed: false };

    // Show optimistic update immediately
    optimisticUpdate(newTodo);

    try {
      const savedTodo = await api.createTodo(newTodo);
      setTodos(current => [...current, savedTodo]);
    } catch (error) {
      // Optimistic update will be reverted automatically
      console.error('Failed to create todo:', error);
    }
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
}
```

### **createStreamResource**

Streaming data resources:

```typescript
import { createStreamResource } from '@shared/lib/suspense';

const messagesResource = createStreamResource(
  async function* () {
    const eventSource = new EventSource('/api/messages/stream');

    while (true) {
      const message = await new Promise(resolve => {
        eventSource.onmessage = (event) => resolve(JSON.parse(event.data));
      });

      yield message;
    }
  }
);

function MessageStream() {
  const messages = messagesResource.read();

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>{message.text}</div>
      ))}
    </div>
  );
}
```

## 🎯 Practical Usage Patterns

### **1. Page-Level Suspense**

```typescript
import { PageSuspenseWrapper } from '@shared/ui/SuspenseWrapper';
import { PageErrorBoundary } from '@shared/ui/ErrorBoundary';

function AppPage() {
  return (
    <PageErrorBoundary>
      <PageSuspenseWrapper>
        <LazyPageContent />
      </PageSuspenseWrapper>
    </PageErrorBoundary>
  );
}
```

### **2. Component-Level Suspense**

```typescript
import { ComponentSuspenseWrapper } from '@shared/ui/SuspenseWrapper';
import { SuspenseErrorBoundary } from '@shared/ui/ErrorBoundary';

function UserCard() {
  return (
    <SuspenseErrorBoundary>
      <ComponentSuspenseWrapper>
        <LazyUserAvatar />
      </ComponentSuspenseWrapper>
    </SuspenseErrorBoundary>
  );
}
```

### **3. Data Fetching with Resources**

```typescript
import { createSuspenseResource } from '@shared/lib/suspense';
import { SuspenseErrorBoundary } from '@shared/ui/ErrorBoundary';

const dataResource = createSuspenseResource(
  fetch('/api/data').then(res => res.json())
);

function DataComponent() {
  const data = dataResource.read();
  return <div>{data.content}</div>;
}

function App() {
  return (
    <SuspenseErrorBoundary>
      <Suspense fallback={<div>Loading data...</div>}>
        <DataComponent />
      </Suspense>
    </SuspenseErrorBoundary>
  );
}
```

## 🧪 Testing Suspense Components

### **Testing Lazy Components**

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { Suspense } from 'react';

test('lazy component loads correctly', async () => {
  const LazyComponent = lazy(() =>
    Promise.resolve({
      default: () => <div>Lazy Content</div>
    })
  );

  render(
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Lazy Content')).toBeInTheDocument();
  });
});
```

### **Testing Error Boundaries**

```typescript
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test error');
};

test('error boundary catches errors', () => {
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
});
```

### **Testing Suspense Resources**

```typescript
import { createSuspenseResource } from '@shared/lib/suspense';

test('suspense resource works correctly', async () => {
  const promise = Promise.resolve({ name: 'John' });
  const resource = createSuspenseResource(promise);

  const Component = () => {
    const data = resource.read();
    return <div>{data.name}</div>;
  };

  render(
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

## 🎨 Best Practices

### **1. Always Use Error Boundaries**

```typescript
// ✅ CORRECT - Wrap Suspense with error boundary
<SuspenseErrorBoundary>
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
</SuspenseErrorBoundary>

// ❌ WRONG - Suspense without error boundary
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### **2. Use Appropriate Fallbacks**

```typescript
// ✅ CORRECT - Meaningful fallbacks
<Suspense fallback={<UserCardSkeleton />}>
  <UserCard />
</Suspense>

// ❌ WRONG - Generic fallback for specific component
<Suspense fallback={<div>Loading...</div>}>
  <UserCard />
</Suspense>
```

### **3. Preload When Appropriate**

```typescript
// ✅ CORRECT - Preload on user intent
const LazyRoute = lazyWithPreload(() => import('./Route'));

<Link
  to="/route"
  onMouseEnter={() => LazyRoute.preload()}
>
  Go to Route
</Link>
```

### **4. Handle Errors Gracefully**

```typescript
// ✅ CORRECT - Specific error handling
<SuspenseErrorBoundary
  fallback={<UserLoadError />}
  onRetry={() => window.location.reload()}
>
  <UserProfile />
</SuspenseErrorBoundary>
```

## 📚 Import Reference

```typescript
// Components
import {
  SuspenseWrapper,
  PageSuspenseWrapper,
  ComponentSuspenseWrapper,
} from '@shared/ui/SuspenseWrapper';

// Error Boundaries
import {
  ErrorBoundary,
  SuspenseErrorBoundary,
  PageErrorBoundary,
  useErrorHandler,
} from '@shared/ui/ErrorBoundary';

// Utilities
import { lazyWithRetry, lazyWithPreload, withSuspense, withDelay } from '@shared/lib/suspense';

// Resources
import { createSuspenseResource, createMutableSuspenseResource } from '@shared/lib/suspense';

// Concurrent Features
import {
  withTransition,
  useDeferredComputation,
  createOptimisticUpdate,
  createStreamResource,
} from '@shared/lib/suspense';
```

This comprehensive Suspense implementation provides a solid foundation for building performant React 18 applications with proper loading states, error handling, and concurrent features.

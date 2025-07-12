# 🧪 Testing Workflow & Strategy

## 📋 Overview

This document outlines our comprehensive testing strategy, covering unit tests, integration tests, component testing, and testing patterns for our React 18 + Next.js 15 application using Feature-Sliced Design architecture.

## 🎯 Testing Philosophy

### **Testing Pyramid**

```
    🔺 E2E Tests (Few)
   ⬜⬜⬜ Integration Tests (Some)
  ⬜⬜⬜⬜⬜ Unit Tests (Many)
```

- **Unit Tests (70%)**: Fast, isolated tests for individual functions and components
- **Integration Tests (20%)**: Tests for component interactions and API integration
- **E2E Tests (10%)**: Full user workflow tests

### **Core Principles**

1. **Test Behavior, Not Implementation** - Focus on what the code does, not how
2. **Write Tests First** - TDD/BDD approach for critical features
3. **Maintainable Tests** - Tests should be easy to understand and maintain
4. **Fast Feedback** - Tests should run quickly in development
5. **Confidence Over Coverage** - Aim for meaningful tests, not just high coverage

## 🏗️ Testing Architecture

### **Layer-Specific Testing Patterns**

#### **Shared Layer Testing**

```typescript
// ✅ Shared utilities testing
describe('formatDate', () => {
  it('should format date correctly', () => {
    expect(formatDate('2024-01-01')).toBe('Jan 1, 2024');
  });
});

// ✅ UI component testing
describe('Button', () => {
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

#### **Entities Layer Testing**

```typescript
// ✅ Entity model testing
describe('User entity', () => {
  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      expect(User.validateEmail('test@example.com')).toBe(true);
    });
  });
});

// ✅ Entity API testing
describe('UserAPI', () => {
  it('should fetch user data', async () => {
    const userData = await UserAPI.getUser('123');
    expect(userData).toMatchObject({
      id: '123',
      email: expect.any(String),
    });
  });
});
```

#### **Features Layer Testing**

```typescript
// ✅ Feature component testing
describe('LoginFeature', () => {
  it('should handle successful login', async () => {
    render(<LoginFeature />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });
});
```

#### **Pages Layer Testing**

```typescript
// ✅ Page component testing
describe('HomePage', () => {
  it('should render main content sections', () => {
    render(<HomePage />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('features-section')).toBeInTheDocument();
  });
});
```

## 🔧 Testing Setup & Configuration

### **Test Output Analysis Workflow**

**For AI Development Workflow**: Always create test output files when running tests to analyze results immediately.

```bash
# Pattern: Run tests and save output to file
npx jest --config ./config/jest/jest.config.ts [test-file] --verbose > test_results.txt 2>&1

# Then read the file to analyze:
# 1. Are tests passing/failing?
# 2. If failing, is the issue with:
#    - Test logic (poorly written test)
#    - Implementation logic (actual code issue)
# 3. Clean up the output file after analysis
```

**Analysis Framework**:

1. **Read test results** - Check pass/fail status and error messages
2. **Identify failure source**:
   - **Test Issue**: Wrong assertions, missing mocks, incorrect expectations
   - **Code Issue**: Logic errors, missing functions, wrong return values
3. **Fix appropriately**:
   - If test issue: Update test logic to match intended behavior
   - If code issue: Fix implementation to meet requirements
4. **Clean up** - Delete test output file after analysis

**Example Workflow**:

```typescript
// 1. Run test with output
npx jest error-formatting.test.ts --verbose > test_results.txt 2>&1

// 2. Read file and analyze
// ❌ FAIL: expect(result).toBe('expected') received 'actual'
// Analysis: Test expects specific string, code produces different string

// 3. Determine source:
// - Is 'expected' the correct behavior? → Fix code
// - Is 'actual' the correct behavior? → Fix test

// 4. Fix and re-run
// 5. Delete test_results.txt
```

### **Jest Configuration**

Our Jest setup is modular and follows FSD principles:

```typescript
// config/jest/jest.config.ts
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.ts'],
  moduleNameMapping: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}',
  ],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/*.stories.{ts,tsx}'],
};
```

### **Test Environment Setup**

```typescript
// config/jest/setupTests.ts
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure testing library
configure({ testIdAttribute: 'data-testid' });

// Mock Next.js features
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock intersections observer
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}));
```

## 🧪 Testing Patterns & Best Practices

### **Component Testing Pattern**

```typescript
// ✅ Complete component test example
describe('UserProfile', () => {
  const defaultProps = {
    user: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    },
    onEdit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render user information', () => {
    render(<UserProfile {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', () => {
    render(<UserProfile {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    expect(defaultProps.onEdit).toHaveBeenCalledWith('1');
  });

  it('should handle loading state', () => {
    render(<UserProfile {...defaultProps} user={null} />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
```

### **Hook Testing Pattern**

```typescript
// ✅ Custom hook testing
describe('useAuth', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should handle login', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toBeTruthy();
  });
});
```

### **API Testing Pattern**

```typescript
// ✅ API function testing
describe('userAPI', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch user successfully', async () => {
    const mockUser = { id: '1', name: 'John' };
    fetchMock.mockResponseOnce(JSON.stringify(mockUser));

    const user = await userAPI.getUser('1');

    expect(user).toEqual(mockUser);
    expect(fetchMock).toHaveBeenCalledWith('/api/users/1');
  });

  it('should handle API errors', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    await expect(userAPI.getUser('1')).rejects.toThrow('Network error');
  });
});
```

## 🎭 Testing React 18 Features

### **Suspense Testing**

```typescript
// ✅ Testing Suspense components
describe('SuspenseWrapper', () => {
  it('should show fallback while loading', async () => {
    const LazyComponent = lazy(() =>
      new Promise(resolve =>
        setTimeout(() => resolve({ default: () => <div>Loaded</div> }), 100)
      )
    );

    render(
      <SuspenseWrapper fallback={<div>Loading...</div>}>
        <LazyComponent />
      </SuspenseWrapper>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Loaded')).toBeInTheDocument();
    });
  });
});
```

### **Error Boundary Testing**

````typescript
// ✅ Testing Error Boundaries
describe('ErrorBoundary', () => {
  const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) {
      throw new Error('Test error');
    }
    return <div>No error</div>;
  };

  it('should catch and display error', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('should render children when no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });
});

## 🎭 **Centralized Mocking Strategy**

To ensure consistency and avoid code duplication in our tests, we use a centralized directory for reusable mocks.

**Location**: `config/jest/mocks/`

### **Core Principle: Don't Repeat Yourself**

Before writing any new mock, you **MUST** check the existing mocks. Reinventing the wheel is a critical error that leads to inconsistent test behavior and maintenance nightmares.

1.  **Consult the Inventory**: The first step is always to check the [**Available Mocks** document](../../reference/available-mocks.md) for a list of all reusable mocks.
2.  **Use Existing Mocks**: If a suitable mock exists, import it and use it. Many common browser APIs are already mocked globally.
3.  **Create Reusable Mocks**: If you need a new mock that could be used in more than one test file, add it to the `config/jest/mocks/` directory, following the existing structure, and document it in the "Available Mocks" guide.

### **When is an Inline Mock Acceptable?**

While the strong preference is for centralized mocks, there are rare exceptions. A simple, one-off mock that is highly specific to a single test suite may be defined inline.

**Example**: Mocking the `uuid` library to return a static value for snapshot testing.
```typescript
// In some_feature.test.ts
jest.mock('uuid', () => ({
  v4: () => 'mock-uuid-for-testing',
}));
````

This is acceptable because creating a shared mock for this would offer little value and might be less clear than the inline definition. Use your judgment, but default to the centralized approach.

## 🚀 Advanced Testing Patterns

### **Integration Testing**

```typescript
// ✅ Feature integration testing
describe('Authentication Flow', () => {
  it('should complete full login flow', async () => {
    render(<App />);

    // Navigate to login
    fireEvent.click(screen.getByRole('link', { name: /sign in/i }));
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();

    // Fill out form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Verify redirect to dashboard
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
    });
  });
});
```

### **Performance Testing**

```typescript
// ✅ Performance testing
describe('Performance', () => {
  it('should render large lists efficiently', () => {
    const items = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}` }));

    const start = performance.now();
    render(<VirtualizedList items={items} />);
    const end = performance.now();

    expect(end - start).toBeLessThan(100); // Should render in less than 100ms
  });
});
```

## 📊 Coverage & Quality Metrics

### **Coverage Targets**

- **Shared Layer**: 95%+ coverage (utilities, UI components)
- **Entities Layer**: 90%+ coverage (business logic)
- **Features Layer**: 85%+ coverage (user interactions)
- **Pages Layer**: 70%+ coverage (integration points)

### **Quality Gates**

```json
{
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    },
    "./src/shared/": {
      "branches": 95,
      "functions": 95,
      "lines": 95,
      "statements": 95
    }
  }
}
```

## 🔍 Testing Commands

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test -- UserProfile.test.tsx

# Run tests for specific layer
npm run test -- src/shared/

# Update snapshots
npm run test -- --updateSnapshot

# Run tests in CI mode
npm run test:ci
```

## 🎯 Testing Checklist

### **Before Committing**

- [ ] All tests pass locally
- [ ] New features have corresponding tests
- [ ] Coverage meets layer-specific thresholds
- [ ] No console errors or warnings in tests
- [ ] Tests follow established patterns

### **Code Review**

- [ ] Tests cover happy path and edge cases
- [ ] Test names are descriptive and clear
- [ ] No implementation details leaked in tests
- [ ] Proper use of testing utilities and patterns
- [ ] Performance considerations for large test suites

---

**Last Updated**: After Suspense integration completion  
**Next Review**: After state management implementation

# Development Workflow

This guide covers the development workflow, best practices, and tools for working with the Fumo foundation.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** 9+
- **Git**
- **VS Code** (recommended)

### Development Setup

```bash
# Clone repository
git clone https://github.com/Gamza222/fumo.git
cd fumo

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

## 🔄 Git Workflow

### Branch Strategy

We use **Git Flow** with the following branches:

- **`main`** - Production-ready code
- **`develop`** - Integration branch for features
- **`feature/*`** - Individual features
- **`hotfix/*`** - Critical bug fixes

### Development Flow

```bash
# 1. Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication

# 2. Work on feature
# ... make changes ...
git add .
git commit -m "feat: add user authentication form"

# 3. Push feature branch
git push -u origin feature/user-authentication

# 4. Create Pull Request
# ... via GitHub UI ...

# 5. Merge to develop
git checkout develop
git merge feature/user-authentication
git push origin develop

# 6. Deploy to production
git checkout main
git merge develop
git push origin main
```

### Commit Convention

We follow **Conventional Commits**:

```bash
# Feature
git commit -m "feat: add user authentication"

# Bug fix
git commit -m "fix: resolve login validation issue"

# Documentation
git commit -m "docs: update API documentation"

# Refactoring
git commit -m "refactor: simplify auth service"

# Performance
git commit -m "perf: optimize image loading"

# Breaking change
git commit -m "feat!: change API response format"
```

## 🏗️ FSD Development

### Creating New Features

#### 1. Feature Structure

```
src/features/user-auth/
├── index.ts           # Public API
├── ui/                # UI components
│   ├── LoginForm.tsx
│   ├── LoginForm.module.scss
│   └── LoginForm.test.tsx
├── lib/               # Business logic
│   ├── useAuth.ts
│   └── authUtils.ts
├── model/             # Types and state
│   ├── types.ts
│   └── store.ts
└── api/               # API integration
    └── authApi.ts
```

#### 2. Component Generator

```bash
# Generate new feature
npm run generate:component UserAuth features ui "User authentication feature"

# Generate shared component
npm run generate:component Button shared ui "Button component"

# Generate infrastructure service
npm run generate:component AuthService infrastructure lib "Authentication service"
```

#### 3. FSD Validation

```bash
# Validate architecture
npm run validate:fsd

# Output: ✅ FSD Validation Passed - No violations found
```

### Import Rules

```tsx
// ✅ Correct imports (following FSD layers)
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/entities/user";
import { LoginForm } from "@/features/user-auth";

// ❌ Incorrect imports (violating FSD rules)
import { Button } from "@/features/user-auth/ui/Button"; // Wrong layer
import { useAuth } from "@/features/user-auth"; // Missing entity layer
```

## 🧪 Testing Strategy

### Test Structure

```
ComponentName/
├── Component.tsx
├── Component.test.tsx
├── Component.stories.tsx
└── Component.module.scss
```

### Writing Tests

#### Component Tests

```tsx
// Button.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  test("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  test("applies variant class", () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("primary");
  });

  test("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### Hook Tests

```tsx
// useAuth.test.ts
import { renderHook } from "@testing-library/react";
import { useAuth } from "./useAuth";

describe("useAuth", () => {
  test("returns initial state", () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  test("handles login", async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login("test@example.com", "password");
    });

    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

#### Integration Tests

```tsx
// LoginForm.integration.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm Integration", () => {
  test("completes login flow", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:ci

# Run specific test file
npm test Button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="Button"
```

## 🎨 Styling Guidelines

### CSS Modules

```scss
// Button.module.scss
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.primary {
  background-color: var(--color-primary);
  color: white;

  &:hover:not(:disabled) {
    background-color: var(--color-primary-dark);
  }
}
```

### CVA Integration

```tsx
// Button.tsx
import { cva } from "class-variance-authority";
import styles from "./Button.module.scss";

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      danger: styles.danger,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
```

### Design Tokens

```scss
// design-tokens/colors.scss
:root {
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-secondary: #6b7280;
  --color-danger: #ef4444;
  --color-success: #10b981;
  --color-warning: #f59e0b;
}

// design-tokens/spacing.scss
:root {
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}
```

## 📚 Storybook Development

### Creating Stories

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Shared/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    loading: true,
  },
};
```

### Running Storybook

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## 🛠️ Development Tools

### Debug Panel

The debug panel automatically appears in development mode:

```tsx
// Automatically enabled in development
<DebugPanel />
```

**Features:**

- Real-time state inspection
- Performance metrics
- Error tracking
- Network monitoring

### Performance Monitor

```tsx
import { PerformanceMonitor } from "@/shared/lib/dev-tools";

// Position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
<PerformanceMonitor position="top-right" />;
```

**Features:**

- Live performance dashboard
- Memory usage tracking
- Render performance
- Custom metrics

### Component Generator

```bash
# Generate new components
npm run generate:component ComponentName layer type "Description"

# Examples:
npm run generate:component UserCard widgets ui "User card widget"
npm run generate:component AuthService infrastructure lib "Authentication service"
```

### FSD Validator

```bash
# Validate architecture
npm run validate:fsd

# Output: ✅ FSD Validation Passed - No violations found
```

## 🔧 Code Quality

### ESLint Configuration

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

### TypeScript

```bash
# Check types
npm run type-check
```

### Prettier

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

## 📦 Build Process

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Build Analysis

```bash
# Analyze bundle size
npm run build -- --analyze
```

## 🚀 Deployment

### Environment Variables

```env
# .env.local (development)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Fumo
NEXT_PUBLIC_APP_VERSION=1.0.0

# .env.production (production)
NEXT_PUBLIC_API_URL=https://api.fumo.com
NEXT_PUBLIC_APP_NAME=Fumo
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### Build Optimization

```javascript
// next.config.js
module.exports = {
  // Enable compression
  compress: true,

  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
  },

  // Bundle analyzer
  ...(process.env.ANALYZE === "true" && {
    webpack: (config) => {
      config.plugins.push(new BundleAnalyzerPlugin());
      return config;
    },
  }),
};
```

## 🐛 Debugging

### Common Issues

**Module not found:**

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

**TypeScript errors:**

```bash
# Check types
npm run type-check
```

**Port already in use:**

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Debug Tools

```tsx
// Use debug panel in development
import { DebugPanel } from "@/shared/lib/dev-tools";

// Use performance monitor
import { PerformanceMonitor } from "@/shared/lib/dev-tools";

// Use React DevTools
// Install: https://chrome.google.com/webstore/detail/react-developer-tools
```

## 📚 Best Practices

### Component Design

1. **Single Responsibility** - Each component should have one clear purpose
2. **Composition over Inheritance** - Build complex components from simple ones
3. **Props Interface** - Use TypeScript interfaces for clear prop contracts
4. **Default Props** - Provide sensible defaults for optional props

### Code Organization

1. **FSD Structure** - Follow Feature-Sliced Design principles
2. **Import Rules** - Respect layer boundaries and dependencies
3. **File Naming** - Use consistent naming conventions
4. **Documentation** - Document complex logic and APIs

### Performance

1. **Code Splitting** - Use dynamic imports for large components
2. **Memoization** - Use React.memo, useMemo, useCallback appropriately
3. **Bundle Size** - Monitor and optimize bundle size
4. **Image Optimization** - Use Next.js Image component

---

**Next:** Learn about [Deployment](../deployment/README.md) and production setup!

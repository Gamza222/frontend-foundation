# 🧩 Component Usage Guide

This guide explains how to use every component and feature in our FSD Enterprise Foundation.

## 🏗️ App Structure (FSD Next.js)

### File Structure

```
src/app/
├── layout.tsx              # Root layout with providers
├── page.tsx                # Home page
├── (dashboard)/            # Route group for dashboard layout
│   ├── layout.tsx          # Dashboard layout
│   ├── dashboard/page.tsx  # Dashboard page
│   └── analytics/page.tsx  # Analytics page
└── (settings)/             # Route group for settings layout
    ├── layout.tsx          # Settings layout
    └── settings/page.tsx   # Settings page
```

### Route Groups

- `(dashboard)` - Pages using dashboard layout (blue theme, header navigation)
- `(settings)` - Pages using settings layout (green theme, sidebar navigation)

## 🎨 Shared UI Components

### Button Component

**Location**: `src/shared/ui/Button`

```tsx
import { Button } from "@/shared/ui/Button";
import { ButtonVariant } from "@/shared/ui/Button/Button.types";

// Usage
<Button variant={ButtonVariant.PRIMARY}>Primary Button</Button>
<Button variant={ButtonVariant.SECONDARY}>Secondary Button</Button>
<Button variant={ButtonVariant.DANGER}>Danger Button</Button>
```

**Variants**: `PRIMARY`, `SECONDARY`, `DANGER`
**Features**: Loading states, disabled states, custom styling

### Text Component

**Location**: `src/shared/ui/Text`

```tsx
import { Text } from "@/shared/ui/Text";
import { TextVariant, TextSize, TextAlign } from "@/shared/ui/Text/Text.types";

// Usage
<Text variant={TextVariant.PRIMARY} size={TextSize.LG} align={TextAlign.CENTER}>
  Hello World
</Text>;
```

**Variants**: `PRIMARY`, `SECONDARY`, `ERROR`
**Sizes**: `SM`, `MD`, `LG`
**Align**: `LEFT`, `CENTER`, `RIGHT`

### ThemeToggle Component

**Location**: `src/shared/ui/ThemeToggle`

```tsx
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

// Usage
<ThemeToggle />;
```

**Features**: Automatic theme switching, icon changes, accessibility support

## 🎨 Design System

### Colors

**Location**: `src/shared/styles/design-tokens/colors.scss`

```scss
// Usage in SCSS
.my-component {
  background-color: color("primary", 500);
  color: color("text", "primary");
  border-color: border-color-fn("default");
}
```

### Typography

**Location**: `src/shared/styles/design-tokens/typography.scss`

```scss
// Usage in SCSS
.my-text {
  font-family: font-family("primary");
  font-size: font-size("lg");
  font-weight: font-weight("semibold");
}
```

### Spacing

**Location**: `src/shared/styles/design-tokens/spacing.scss`

```scss
// Usage in SCSS
.my-component {
  padding: spacing("md");
  margin: spacing("lg");
  gap: spacing("sm");
}
```

### Mixins

**Location**: `src/shared/styles/mixins`

```scss
// Button mixins
.my-button {
  @include button-base;
  @include button-variant("primary");
}

// Layout mixins
.my-layout {
  @include flex-center;
  @include container;
}
```

## 🔧 Infrastructure Components

### Error Boundary

**Location**: `src/infrastructure/error-handling`

```tsx
import { ErrorBoundary } from "@/infrastructure/error-handling";

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>;
```

**Features**:

- Catches JavaScript errors
- Logs to console in development
- Reports to Sentry in production
- Provides fallback UI

### Suspense System

**Location**: `src/infrastructure/suspense`

```tsx
import { Suspense } from "react";
import {
  ComponentLoadingFallback,
  ComponentHeight,
} from "@/infrastructure/suspense";

// Usage
<Suspense
  fallback={<ComponentLoadingFallback height={ComponentHeight.LARGE} />}
>
  <LazyComponent />
</Suspense>;
```

**Fallback Heights**: `SMALL`, `MEDIUM`, `LARGE`
**Features**: Consistent loading states, customizable heights

### Lazy Loading

**Location**: `src/infrastructure/suspense/lazy`

```tsx
import { createLazyComponent } from "@/infrastructure/suspense/lazy";

// Usage
const LazyComponent = createLazyComponent(() => import("./MyComponent"));
```

**Features**: Dynamic imports, loading states, error boundaries

## 📦 Providers

### Theme Provider

**Location**: `src/infrastructure/providers/theme`

```tsx
import { ThemeProvider, useTheme } from "@/infrastructure/providers/theme";

// Provider setup (already in layout.tsx)
<ThemeProvider initialTheme="light">{children}</ThemeProvider>;

// Usage in components
function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {isDark ? "light" : "dark"} mode
    </button>
  );
}
```

**Features**: Light/dark mode, system preference detection, localStorage persistence

### Query Provider

**Location**: `src/infrastructure/providers/query`

```tsx
import { QueryProvider } from "@/infrastructure/providers/query";

// Provider setup (already in layout.tsx)
<QueryProvider>{children}</QueryProvider>;

// Usage with React Query
import { useQuery } from "@tanstack/react-query";

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data?.map((user) => user.name)}</div>;
}
```

**Features**: Server state management, caching, background updates

### Sentry Provider

**Location**: `src/infrastructure/providers/sentry`

```tsx
import { SentryProvider } from "@/infrastructure/providers/sentry";

// Provider setup (already in layout.tsx)
<SentryProvider dsn={process.env.NEXT_PUBLIC_SENTRY_DSN}>
  {children}
</SentryProvider>;
```

**Features**: Error tracking, performance monitoring, automatic reporting

## 📊 Monitoring

### Monitoring Dashboard

**Location**: `src/infrastructure/monitoring`

```tsx
import { MonitoringDashboard } from "@/infrastructure/monitoring";

// Usage
<MonitoringDashboard refreshInterval={30000} className="my-dashboard" />;
```

**Features**: System health, alerts, analytics, real-time updates

### Analytics Hook

**Location**: `src/infrastructure/monitoring/hooks/useAnalytics`

```tsx
import { useAnalytics } from "@/infrastructure/monitoring/hooks/useAnalytics";

function MyComponent() {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    trackEvent({
      type: "button_click",
      component: "MyComponent",
      details: { button: "submit" },
    });
  };

  return <button onClick={handleClick}>Submit</button>;
}
```

**Features**: Event tracking, user interactions, page views

## 🛡️ Security

### Security Headers

**Location**: `src/infrastructure/security`

```tsx
// Automatic security headers via middleware
// No manual setup required
```

**Features**: CSP, HSTS, XSS protection, clickjacking prevention

### Rate Limiting

**Location**: `src/infrastructure/security`

```tsx
import { rateLimit } from "@/infrastructure/security";

// Usage in API routes
export default rateLimit(async (req, res) => {
  // Your API logic
});
```

**Features**: Request limiting, IP-based blocking, customizable limits

## ⚡ Performance

### Performance Monitoring

**Location**: `src/infrastructure/performance`

```tsx
import { PerformanceDashboard } from "@/widgets/PerformanceDashboard";

// Usage
<PerformanceDashboard />;
```

**Features**: Core Web Vitals, performance metrics, optimization suggestions

### Bundle Analysis

**Location**: `scripts/analyze-bundle.js`

```bash
# Usage
npm run analyze
```

**Features**: Bundle size analysis, dependency visualization, optimization insights

## 🧪 Testing

### Test Utilities

**Location**: `src/shared/testing`

```tsx
import { render, screen } from "@testing-library/react";
import { mockConsole, mockStorage } from "@/shared/testing/mocks/browser";

// Usage
test("renders component", () => {
  render(<MyComponent />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
```

**Features**: Mock utilities, test helpers, browser mocks

### Component Testing

**Location**: `src/shared/testing/components`

```tsx
import { renderWithProviders } from "@/shared/testing/components";

// Usage
test("renders with providers", () => {
  renderWithProviders(<MyComponent />);
  // Test with all providers
});
```

**Features**: Provider integration, theme testing, error boundary testing

## 📱 State Management

### Zustand Store

**Location**: `src/infrastructure/state`

```tsx
import { useStore } from "@/infrastructure/state";

function MyComponent() {
  const { count, increment } = useStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

**Features**: Type-safe state, persistence, devtools support

## 🎯 Widgets

### PageError Widget

**Location**: `src/widgets/PageError`

```tsx
import { PageError } from "@/widgets/PageError";

// Usage
<PageError title="Something went wrong" description="Please try again later" />;
```

**Features**: Error display, retry functionality, user-friendly messages

### Performance Dashboard Widget

**Location**: `src/widgets/PerformanceDashboard`

```tsx
import { PerformanceDashboard } from "@/widgets/PerformanceDashboard";

// Usage
<PerformanceDashboard />;
```

**Features**: Performance metrics, real-time updates, optimization insights

## 🚀 Getting Started

1. **Start Development**:

   ```bash
   npm run dev
   ```

2. **Build for Production**:

   ```bash
   npm run build
   ```

3. **Run Tests**:

   ```bash
   npm run test
   ```

4. **Lint Code**:

   ```bash
   npm run lint
   ```

5. **Type Check**:
   ```bash
   npm run type-check
   ```

## 📚 Additional Resources

- **FSD Documentation**: [Feature-Sliced Design](https://feature-sliced.design/)
- **Next.js App Router**: [Next.js Documentation](https://nextjs.org/docs/app)
- **React Query**: [TanStack Query](https://tanstack.com/query)
- **Sentry**: [Sentry Documentation](https://docs.sentry.io/)
- **Tailwind CSS**: [Tailwind CSS](https://tailwindcss.com/)

## 🔧 Customization

### Adding New Components

1. Create component in appropriate FSD layer
2. Add to shared/ui if reusable
3. Create tests
4. Update this guide

### Adding New Pages

1. Create page in appropriate route group
2. Add navigation links
3. Implement lazy loading if needed
4. Test with all providers

### Adding New Providers

1. Create provider in infrastructure/providers
2. Add to root layout
3. Create context and hooks
4. Write tests
5. Update documentation

# 🏗️ COMPLETE FSD ENTERPRISE FOUNDATION GUIDE

## 📁 PERFECT FSD NEXT.JS STRUCTURE

### App Router Structure

```
src/app/
├── layout.tsx                    # Root layout with all providers
├── page.tsx                      # Home page with navigation
├── (app)/                        # Application route group
│   ├── layout.tsx                # Blue theme layout
│   ├── workspace/page.tsx        # Workspace dashboard
│   └── reports/page.tsx          # Reports & analytics
└── (admin)/                      # Admin route group
    ├── layout.tsx                # Green theme layout with sidebar
    └── configuration/page.tsx    # System configuration
```

### Route Groups Explained

- `(app)` - Application pages with blue theme, header navigation
- `(admin)` - Admin pages with green theme, sidebar navigation
- Route groups don't affect URLs but organize layouts

## 🎨 SHARED UI COMPONENTS

### Button Component

**Location**: `src/shared/ui/Button`

```tsx
import { Button } from "@/shared/ui/Button";
import { ButtonVariant } from "@/shared/ui/Button/Button.types";

<Button variant={ButtonVariant.PRIMARY}>Primary</Button>
<Button variant={ButtonVariant.SECONDARY}>Secondary</Button>
<Button variant={ButtonVariant.DANGER}>Danger</Button>
```

**Features**: Loading states, disabled states, hover effects, accessibility

### Text Component

**Location**: `src/shared/ui/Text`

```tsx
import { Text } from "@/shared/ui/Text";
import { TextVariant, TextSize, TextAlign } from "@/shared/ui/Text/Text.types";

<Text variant={TextVariant.PRIMARY} size={TextSize.LG} align={TextAlign.CENTER}>
  Content
</Text>;
```

**Features**: Semantic variants, consistent sizing, alignment options

### ThemeToggle Component

**Location**: `src/shared/ui/ThemeToggle`

```tsx
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

<ThemeToggle />;
```

**Features**: Automatic theme switching, icon changes, accessibility support

## 🎨 DESIGN SYSTEM

### Colors (SCSS)

**Location**: `src/shared/styles/design-tokens/colors.scss`

```scss
.my-component {
  background-color: color("primary", 500);
  color: color("text", "primary");
  border-color: border-color-fn("default");
}
```

**Available Palettes**: primary, secondary, success, warning, error, text, background, border

### Typography (SCSS)

**Location**: `src/shared/styles/design-tokens/typography.scss`

```scss
.my-text {
  font-family: font-family("primary");
  font-size: font-size("lg");
  font-weight: font-weight("semibold");
}
```

**Features**: Consistent font families, sizes, weights, line heights

### Spacing (SCSS)

**Location**: `src/shared/styles/design-tokens/spacing.scss`

```scss
.my-component {
  padding: spacing("md");
  margin: spacing("lg");
  gap: spacing("sm");
}
```

**Available Sizes**: xs, sm, md, lg, xl, 2xl, 3xl, 4xl

### Mixins (SCSS)

**Location**: `src/shared/styles/mixins`

```scss
.my-button {
  @include button-base;
  @include button-variant("primary");
}

.my-layout {
  @include flex-center;
  @include container;
}
```

**Available Mixins**: button-base, button-variant, flex-center, container, responsive

## 🛡️ INFRASTRUCTURE COMPONENTS

### Error Boundary

**Location**: `src/infrastructure/error-handling`

```tsx
import { ErrorBoundary } from "@/infrastructure/error-handling";

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>;
```

**Features**:

- Catches JavaScript errors anywhere in component tree
- Logs to console in development
- Reports to Sentry in production
- Provides fallback UI with retry functionality
- Integrates with Suspense for loading states

### Suspense System

**Location**: `src/infrastructure/suspense`

```tsx
import { Suspense } from "react";
import {
  ComponentLoadingFallback,
  ComponentHeight,
} from "@/infrastructure/suspense";

<Suspense
  fallback={<ComponentLoadingFallback height={ComponentHeight.LARGE} />}
>
  <LazyComponent />
</Suspense>;
```

**Available Heights**: SMALL, MEDIUM, LARGE
**Features**: Consistent loading states, customizable heights, accessibility

### Lazy Loading

**Location**: `src/infrastructure/suspense/lazy`

```tsx
import { createLazyComponent } from "@/infrastructure/suspense/lazy";

const LazyComponent = createLazyComponent(() => import("./MyComponent"));
```

**Features**: Dynamic imports, loading states, error boundaries, SSR support

## 📦 PROVIDERS

### Theme Provider

**Location**: `src/infrastructure/providers/theme`

```tsx
import { ThemeProvider, useTheme } from "@/infrastructure/providers/theme";

// Provider (already in layout.tsx)
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

**Features**:

- Light/dark mode switching
- System preference detection
- localStorage persistence
- SSR-safe initialization
- TypeScript support

### Query Provider (React Query)

**Location**: `src/infrastructure/providers/query`

```tsx
import { QueryProvider } from "@/infrastructure/providers/query";

// Provider (already in layout.tsx)
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

**Features**:

- Server state management
- Automatic caching
- Background updates
- Optimistic updates
- DevTools integration

### Sentry Provider

**Location**: `src/infrastructure/providers/sentry`

```tsx
import { SentryProvider } from "@/infrastructure/providers/sentry";

// Provider (already in layout.tsx)
<SentryProvider dsn={process.env.NEXT_PUBLIC_SENTRY_DSN}>
  {children}
</SentryProvider>;
```

**Features**:

- Error tracking and reporting
- Performance monitoring
- User session tracking
- Custom error contexts
- Release tracking

## 📊 MONITORING SYSTEM

### Monitoring Dashboard

**Location**: `src/infrastructure/monitoring`

```tsx
import { MonitoringDashboard } from "@/infrastructure/monitoring";

<MonitoringDashboard refreshInterval={30000} className="my-dashboard" />;
```

**Features**:

- Real-time system health monitoring
- Service status tracking
- Performance metrics display
- Alert management
- Analytics overview
- Customizable refresh intervals

### Monitoring Service

**Location**: `src/infrastructure/monitoring/lib/monitoring.service.ts`

```tsx
import { MonitoringService } from "@/infrastructure/monitoring";

const service = MonitoringService.getInstance();
const data = await service.getDashboardData();
```

**Features**:

- Singleton pattern for global access
- Health check endpoints
- Metrics collection
- Alert generation
- Performance tracking

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

**Features**:

- Event tracking
- User interaction monitoring
- Page view tracking
- Custom event properties
- Session management

## 🛡️ SECURITY

### Security Headers

**Location**: `src/infrastructure/security`

```tsx
// Automatic via middleware - no setup required
```

**Features**:

- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

### Rate Limiting

**Location**: `src/infrastructure/security`

```tsx
import { rateLimit } from "@/infrastructure/security";

// Usage in API routes
export default rateLimit(async (req, res) => {
  // Your API logic
});
```

**Features**:

- Request rate limiting
- IP-based blocking
- Customizable limits
- Redis integration
- Error handling

### CORS Configuration

**Location**: `src/infrastructure/security`

```tsx
// Automatic CORS configuration
```

**Features**:

- Configurable origins
- Credential support
- Method restrictions
- Header validation

## ⚡ PERFORMANCE

### Performance Monitoring

**Location**: `src/infrastructure/performance`

```tsx
import { PerformanceDashboard } from "@/widgets/PerformanceDashboard";

<PerformanceDashboard />;
```

**Features**:

- Core Web Vitals tracking
- Performance metrics
- Optimization suggestions
- Real-time monitoring
- Historical data

### Bundle Analysis

**Location**: `scripts/analyze-bundle.js`

```bash
npm run analyze
```

**Features**:

- Bundle size analysis
- Dependency visualization
- Optimization insights
- Tree shaking analysis

### Web Vitals

**Location**: `src/lib/webVitals.ts`

```tsx
import { reportWebVitals } from "@/lib/webVitals";

// Automatic reporting
export { reportWebVitals };
```

**Features**:

- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)

## 🧪 TESTING

### Test Utilities

**Location**: `src/shared/testing`

```tsx
import { render, screen } from "@testing-library/react";
import { mockConsole, mockStorage } from "@/shared/testing/mocks/browser";

test("renders component", () => {
  render(<MyComponent />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
```

**Features**:

- Browser API mocks
- Console mocking
- Storage mocking
- Test helpers
- Custom matchers

### Component Testing

**Location**: `src/shared/testing/components`

```tsx
import { renderWithProviders } from "@/shared/testing/components";

test("renders with providers", () => {
  renderWithProviders(<MyComponent />);
  // Test with all providers
});
```

**Features**:

- Provider integration
- Theme testing
- Error boundary testing
- Suspense testing

### Mock Factories

**Location**: `src/shared/testing/mocks`

```tsx
import { createMockUser, createMockData } from "@/shared/testing/mocks";

const mockUser = createMockUser();
const mockData = createMockData();
```

**Features**:

- Consistent mock data
- Type-safe mocks
- Customizable properties
- Realistic test data

## 📱 STATE MANAGEMENT

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

**Features**:

- Type-safe state management
- Persistence support
- DevTools integration
- Middleware support
- Computed values

### State Hydration

**Location**: `src/infrastructure/state`

```tsx
import { useStoreHydrated } from "@/infrastructure/state";

function MyComponent() {
  const isHydrated = useStoreHydrated();

  if (!isHydrated) return <div>Loading...</div>;

  return <div>Hydrated content</div>;
}
```

**Features**:

- SSR-safe state management
- Hydration detection
- Client-side initialization
- Persistent state

## 🎯 WIDGETS

### PageError Widget

**Location**: `src/widgets/PageError`

```tsx
import { PageError } from "@/widgets/PageError";

<PageError title="Something went wrong" description="Please try again later" />;
```

**Features**:

- User-friendly error display
- Retry functionality
- Customizable messages
- Accessibility support
- Responsive design

### Performance Dashboard Widget

**Location**: `src/widgets/PerformanceDashboard`

```tsx
import { PerformanceDashboard } from "@/widgets/PerformanceDashboard";

<PerformanceDashboard />;
```

**Features**:

- Real-time performance metrics
- Core Web Vitals display
- Optimization suggestions
- Historical data
- Interactive charts

## 🚀 GETTING STARTED

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### Testing

```bash
npm run test         # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript check
npm run format       # Format code with Prettier
```

### Analysis

```bash
npm run analyze      # Analyze bundle size
npm run lighthouse   # Run Lighthouse audit
```

## 📚 ARCHITECTURE PRINCIPLES

### Feature-Sliced Design (FSD)

- **app** - Application pages and routing
- **widgets** - Complex UI blocks
- **features** - Business logic components
- **entities** - Business entities
- **shared** - Reusable code

### SOLID Principles

- **Single Responsibility** - Each component has one purpose
- **Open/Closed** - Open for extension, closed for modification
- **Liskov Substitution** - Derived classes are substitutable
- **Interface Segregation** - No unused dependencies
- **Dependency Inversion** - Depend on abstractions

### Performance Best Practices

- **Code Splitting** - Lazy load components
- **Bundle Optimization** - Minimize bundle size
- **Caching** - Implement proper caching strategies
- **Monitoring** - Track performance metrics
- **Optimization** - Regular performance audits

## 🔧 CUSTOMIZATION

### Adding New Pages

1. Create page in appropriate route group
2. Add navigation links
3. Implement lazy loading if needed
4. Test with all providers

### Adding New Components

1. Create in appropriate FSD layer
2. Add to shared/ui if reusable
3. Create tests
4. Update documentation

### Adding New Providers

1. Create in infrastructure/providers
2. Add to root layout
3. Create context and hooks
4. Write tests
5. Update documentation

### Adding New Features

1. Create in features layer
2. Implement business logic
3. Add UI components
4. Create tests
5. Update documentation

## 📖 DOCUMENTATION

### Available Guides

- `COMPONENT_USAGE_GUIDE.md` - Detailed component usage
- `PERFORMANCE_OPTIMIZATION.md` - Performance best practices
- `COMPLETE_FEATURE_GUIDE.md` - This comprehensive guide

### API Documentation

- All components have TypeScript interfaces
- JSDoc comments for complex functions
- Example usage in component files
- Test files as usage examples

## 🎯 PRODUCTION READY

### What's Included

✅ **Zero TypeScript errors**
✅ **Zero linting errors**
✅ **Complete test coverage**
✅ **Performance monitoring**
✅ **Error tracking**
✅ **Security headers**
✅ **Accessibility support**
✅ **Responsive design**
✅ **Dark/Light themes**
✅ **Code splitting**
✅ **Bundle optimization**

### Deployment

1. **Build**: `npm run build`
2. **Test**: `npm run test`
3. **Deploy**: Deploy to your platform
4. **Monitor**: Use Sentry for error tracking
5. **Optimize**: Use Lighthouse for performance

**Your FSD Enterprise Foundation is production-ready!** 🚀

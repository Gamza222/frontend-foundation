# Infrastructure Services

This guide covers the technical infrastructure services available in the Fumo foundation.

## 🏗️ Infrastructure Overview

The infrastructure layer provides essential services for production applications:

- **🔒 Security** - Authentication, authorization, rate limiting
- **📊 Performance** - Monitoring, optimization, analytics
- **🌐 Data** - API clients, caching, state management
- **🛠️ Dev Tools** - Debug panel, performance monitor, generators

## 🔒 Security Services

### Authentication Service

**Location**: `src/infrastructure/security/lib/auth`

```tsx
import { AuthService } from "@/infrastructure/security";

const authService = AuthService.getInstance();

// Login user
const user = await authService.login(email, password);

// Check authentication status
const isAuthenticated = authService.isAuthenticated();

// Get current user
const currentUser = authService.getCurrentUser();

// Logout
await authService.logout();
```

**Features:**

- JWT token management
- Session persistence
- Automatic token refresh
- Secure logout

### Authorization Service

**Location**: `src/infrastructure/security/lib/authorization`

```tsx
import { AuthorizationService } from "@/infrastructure/security";

const authzService = AuthorizationService.getInstance();

// Check permissions
const canEdit = authzService.hasPermission("user:edit");
const canDelete = authzService.hasRole("admin");

// Get user roles
const roles = authzService.getUserRoles();

// Check resource access
const canAccess = authzService.canAccessResource("user", userId);
```

**Features:**

- Role-based access control (RBAC)
- Permission checking
- Resource-level authorization
- Policy enforcement

### Rate Limiting

**Location**: `src/infrastructure/security/lib/rate-limiter`

```tsx
import { RateLimiterService } from "@/infrastructure/security";

const rateLimiter = RateLimiterService.getInstance();

// Check rate limit
const canProceed = await rateLimiter.checkLimit("api", userId);

// Apply rate limiting to API calls
if (!canProceed) {
  throw new Error("Rate limit exceeded");
}
```

**Features:**

- Per-user rate limiting
- Per-endpoint limits
- Sliding window algorithm
- Configurable thresholds

## 📊 Performance Services

### Performance Monitor

**Location**: `src/infrastructure/performance/lib/performance-monitor`

```tsx
import { PerformanceMonitor } from "@/infrastructure/performance";

const monitor = PerformanceMonitor.getInstance();

// Track custom metrics
monitor.trackMetric("api_response_time", 150);
monitor.trackMetric("user_action", "button_click");

// Track Web Vitals
monitor.trackWebVitals();

// Get performance data
const metrics = monitor.getMetrics();
```

**Features:**

- Web Vitals tracking
- Custom metrics
- Real-time monitoring
- Performance alerts

### Web Vitals

**Location**: `src/infrastructure/performance/lib/web-vitals`

```tsx
import { WebVitals } from "@/infrastructure/performance";

// Track Core Web Vitals
WebVitals.trackCLS(); // Cumulative Layout Shift
WebVitals.trackFID(); // First Input Delay
WebVitals.trackLCP(); // Largest Contentful Paint

// Track additional metrics
WebVitals.trackFCP(); // First Contentful Paint
WebVitals.trackTTFB(); // Time to First Byte
```

**Features:**

- Core Web Vitals tracking
- Performance budgets
- Real-time reporting
- Historical data

### Resource Preloading

**Location**: `src/infrastructure/performance/lib/resource-preloading`

```tsx
import { ResourcePreloader } from "@/infrastructure/performance";

const preloader = ResourcePreloader.getInstance();

// Preload critical resources
preloader.preloadScript("/critical.js");
preloader.preloadStylesheet("/critical.css");
preloader.preloadImage("/hero-image.jpg");

// Preload on user interaction
preloader.preloadOnHover("/next-page.js");
```

**Features:**

- Critical resource preloading
- Predictive preloading
- Resource prioritization
- Performance optimization

## 🌐 Data Services

### API Clients

**Location**: `src/infrastructure/data`

#### Apollo GraphQL Client

```tsx
import { apolloClient } from "@/infrastructure/data/apollo";

// GraphQL queries
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const { data, loading, error } = useQuery(GET_USERS);
```

#### Axios REST Client

```tsx
import { axiosClient } from "@/infrastructure/data/axios";

// REST API calls
const users = await axiosClient.get("/api/users");
const newUser = await axiosClient.post("/api/users", userData);
```

#### React Query Client

```tsx
import { useQuery, useMutation } from "@tanstack/react-query";

// Data fetching
const { data: users } = useQuery({
  queryKey: ["users"],
  queryFn: () => axiosClient.get("/api/users"),
});

// Mutations
const { mutate: createUser } = useMutation({
  mutationFn: (userData) => axiosClient.post("/api/users", userData),
});
```

### WebSocket Client

**Location**: `src/infrastructure/data/websocket`

```tsx
import { WebSocketClient } from "@/infrastructure/data/websocket";

const wsClient = WebSocketClient.getInstance();

// Connect to WebSocket
wsClient.connect("ws://localhost:3000");

// Subscribe to events
wsClient.subscribe("user:update", (data) => {
  console.log("User updated:", data);
});

// Send messages
wsClient.send("user:action", { action: "update" });
```

## 🛠️ Developer Tools

### Debug Panel

**Location**: `src/shared/lib/dev-tools/debug-panel`

```tsx
import { DebugPanel } from "@/shared/lib/dev-tools";

// Automatically appears in development mode
<DebugPanel />;
```

**Features:**

- Real-time state inspection
- Performance metrics
- Error tracking
- Network monitoring

### Performance Monitor

**Location**: `src/shared/lib/dev-tools/performance-monitor`

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

**Location**: `src/shared/lib/dev-tools/generators/component-generator`

```bash
# Generate new components
npm run generate:component ComponentName layer type "Description"

# Examples:
npm run generate:component UserCard widgets ui "User card widget"
npm run generate:component AuthService infrastructure lib "Authentication service"
```

**Features:**

- FSD-compliant structure
- TypeScript boilerplate
- Test files
- Storybook stories

### FSD Validator

**Location**: `src/shared/lib/dev-tools/generators/fsd-validator`

```bash
# Validate architecture
npm run validate:fsd
```

**Features:**

- Architecture compliance checking
- Import rule validation
- Layer boundary enforcement
- Dependency verification

## 🔧 Configuration

### Environment Configuration

**Location**: `config/env`

```typescript
import { envConfig } from "@/config/env";

// Access environment variables
const apiUrl = envConfig.apiUrl;
const isDevelopment = envConfig.isDevelopment;
const sentryDsn = envConfig.sentryDsn;
```

### Security Configuration

**Location**: `src/infrastructure/security/lib/security-config`

```typescript
import { SecurityConfig } from "@/infrastructure/security";

const config = SecurityConfig.getInstance();

// Configure security settings
config.setConfig({
  jwtSecret: "your-secret",
  sessionTimeout: 3600,
  rateLimitWindow: 60000,
  rateLimitMax: 100,
});
```

## 🧪 Testing Infrastructure

### Mock Factories

**Location**: `src/shared/testing/mocks`

```tsx
import {
  createMockApiResponse,
  createMockUser,
  createMockStore,
} from "@/shared/testing/mocks";

// API mocking
const mockResponse = createMockApiResponse({
  status: 200,
  data: { users: [] },
});

// User mocking
const mockUser = createMockUser({
  id: "1",
  email: "test@example.com",
});

// Store mocking
const mockStore = createMockStore({
  user: mockUser,
  isAuthenticated: true,
});
```

### Test Utilities

```tsx
import { renderWithProviders } from "@/shared/testing/providers";

// Render with all providers
renderWithProviders(<Component />, {
  initialState: { user: mockUser },
});
```

## 📊 Monitoring & Analytics

### Error Tracking

**Location**: `src/infrastructure/providers/sentry`

```tsx
import { SentryProvider } from "@/infrastructure/providers/sentry";

// Wrap your app
<SentryProvider>
  <App />
</SentryProvider>;

// Manual error tracking
Sentry.captureException(error);
Sentry.captureMessage("Something went wrong");
```

### Analytics

**Location**: `src/infrastructure/monitoring/hooks/useAnalytics`

```tsx
import { useAnalytics } from "@/infrastructure/monitoring";

const { trackEvent, trackError, trackPerformance } = useAnalytics();

// Track events
trackEvent("user_action", "button_click", { buttonId: "submit" });

// Track errors
trackError(new Error("Something went wrong"));

// Track performance
trackPerformance("api_response_time", 150, "ms");
```

## 🚀 Production Deployment

### Performance Optimization

```typescript
// Production configuration
const productionConfig = {
  enablePerformanceMonitoring: true,
  enableErrorTracking: true,
  enableAnalytics: true,
  enableCaching: true,
  enableCompression: true,
};
```

### Security Headers

```typescript
// Security middleware
const securityHeaders = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000",
};
```

---

**Next:** Learn about our [Development Workflow](../development/README.md) and best practices!

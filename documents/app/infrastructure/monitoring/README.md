# Monitoring Infrastructure

Real-time monitoring system for application health, analytics, and performance metrics.

## 📊 Components

### MonitoringDashboard

Comprehensive dashboard displaying system health, alerts, and analytics.

```tsx
import { MonitoringDashboard } from "@/infrastructure/monitoring";

<MonitoringDashboard refreshInterval={30000} className="my-dashboard" />;
```

### MonitoringService

Centralized service for health checks and metrics collection.

```tsx
import { MonitoringService } from "@/infrastructure/monitoring";

const monitoringService = MonitoringService.getInstance();
const health = await monitoringService.getSystemHealth();
```

### useAnalytics Hook

React hook for tracking user interactions and events.

```tsx
import { useAnalytics } from "@/infrastructure/monitoring";

function MyComponent() {
  const { trackEvent, trackPageView } = useAnalytics();

  const handleClick = () => {
    trackEvent("button_clicked", { component: "MyComponent" });
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

## 🏥 Health Monitoring

### System Health Status

- **HEALTHY**: All systems operational
- **DEGRADED**: Some systems experiencing issues
- **UNHEALTHY**: Critical systems failing
- **UNKNOWN**: Unable to determine status

### Service Monitoring

Tracks individual service health:

- Response times
- Error rates
- Availability status
- Performance metrics

### Alert Levels

- **INFO**: Informational alerts
- **WARNING**: Non-critical issues
- **ERROR**: Critical errors
- **CRITICAL**: System-threatening issues

## 📈 Analytics Tracking

### Event Tracking

```tsx
const { trackEvent } = useAnalytics();

// Track user interactions
trackEvent("user_action", {
  action: "button_click",
  component: "header",
  value: "navigation",
});

// Track page views
trackEvent("page_view", {
  page: "/dashboard",
  title: "Dashboard",
});
```

### Performance Metrics

- **Page Load Times**: Core Web Vitals tracking
- **User Interactions**: Click tracking and heatmaps
- **Error Rates**: JavaScript error monitoring
- **API Performance**: Request/response timing

## 🔧 Configuration

### Environment Setup

```tsx
// Configure monitoring in your app
import { MonitoringService } from "@/infrastructure/monitoring";

MonitoringService.configure({
  environment: "production",
  apiEndpoint: "https://api.example.com/monitoring",
  sampleRate: 1.0,
  enableAnalytics: true,
});
```

### Dashboard Configuration

```tsx
<MonitoringDashboard
  refreshInterval={30000} // 30 seconds
  showAnalytics={true}
  showAlerts={true}
  showHealthMetrics={true}
  className="monitoring-dashboard"
/>
```

## 📁 Structure

```
monitoring/
├── ui/
│   ├── MonitoringDashboard.tsx      # Main dashboard component
│   ├── MonitoringDashboard.test.tsx # Tests
│   └── MonitoringDashboard.stories.tsx # Storybook stories
├── lib/
│   ├── monitoring.service.ts        # Core monitoring service
│   └── monitoring.service.test.ts   # Service tests
├── hooks/
│   └── useAnalytics/
│       ├── useAnalytics.ts          # Analytics hook
│       └── useAnalytics.test.ts     # Hook tests
├── types/
│   └── monitoring.types.ts          # TypeScript definitions
└── index.ts                         # Exports
```

## 🚀 Usage Examples

### Basic Dashboard

```tsx
import { MonitoringDashboard } from "@/infrastructure/monitoring";

function AdminPanel() {
  return (
    <div>
      <h1>System Monitoring</h1>
      <MonitoringDashboard />
    </div>
  );
}
```

### Custom Health Checks

```tsx
import { MonitoringService } from "@/infrastructure/monitoring";

async function checkDatabaseHealth() {
  const service = MonitoringService.getInstance();

  try {
    await service.checkHealth("database");
    return { status: "HEALTHY", responseTime: 50 };
  } catch (error) {
    return { status: "UNHEALTHY", error: error.message };
  }
}
```

### Analytics Integration

```tsx
function ProductPage() {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent("page_view", {
      page: "product",
      productId: "123",
    });
  }, [trackEvent]);

  const handlePurchase = () => {
    trackEvent("purchase", {
      productId: "123",
      value: 99.99,
      currency: "USD",
    });
  };

  return (
    <div>
      <h1>Product Page</h1>
      <button onClick={handlePurchase}>Buy Now</button>
    </div>
  );
}
```

## 🧪 Testing

```tsx
// Test monitoring dashboard
import { render, screen } from "@testing-library/react";
import { MonitoringDashboard } from "@/infrastructure/monitoring";

test("renders monitoring dashboard", () => {
  render(<MonitoringDashboard />);
  expect(screen.getByText("System Monitoring")).toBeInTheDocument();
});

// Test analytics hook
import { renderHook } from "@testing-library/react";
import { useAnalytics } from "@/infrastructure/monitoring";

test("tracks events correctly", () => {
  const { result } = renderHook(() => useAnalytics());

  result.current.trackEvent("test_event", { value: 123 });
  // Assert event was tracked
});
```

## 📝 Best Practices

1. **Dashboard Placement**: Use monitoring dashboard in admin/development areas only
2. **Performance**: Use appropriate refresh intervals to avoid overwhelming the system
3. **Privacy**: Ensure analytics tracking complies with privacy regulations
4. **Error Handling**: Always handle monitoring service failures gracefully
5. **Testing**: Mock monitoring services in tests to avoid side effects

## 🔍 Monitoring Data

### Health Metrics

- System uptime and availability
- Service response times
- Error rates and types
- Resource utilization

### User Analytics

- Page views and navigation patterns
- User interactions and engagement
- Feature usage statistics
- Conversion funnels

### Performance Data

- Core Web Vitals (LCP, FID, CLS)
- API response times
- Database query performance
- Frontend rendering metrics

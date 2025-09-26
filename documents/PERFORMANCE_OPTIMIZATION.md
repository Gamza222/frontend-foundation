# 🚀 Performance Optimization Guide

## Code Splitting & Lazy Loading

### 1. Dynamic Imports for Pages

Instead of importing all pages at once, use dynamic imports to load them only when needed:

```tsx
// ❌ Bad - loads all pages immediately
import Page1 from "./page1/page";
import Page2 from "./page2/page";
import Page3 from "./page3/page";

// ✅ Good - loads pages only when needed
import dynamic from "next/dynamic";

const Page1 = dynamic(() => import("./page1/page"), {
  loading: () => <div>Loading Page 1...</div>,
  ssr: false, // Optional: disable SSR for this component
});

const Page2 = dynamic(() => import("./page2/page"), {
  loading: () => <div>Loading Page 2...</div>,
});

const Page3 = dynamic(() => import("./page3/page"), {
  loading: () => <div>Loading Page 3...</div>,
});
```

### 2. Component-Level Code Splitting

Split large components into separate chunks:

```tsx
// components/LazyDashboard.tsx
import dynamic from "next/dynamic";

// Load heavy dashboard only when needed
export const LazyDashboard = dynamic(() => import("./Dashboard"), {
  loading: () => <div>Loading Dashboard...</div>,
  ssr: false,
});

// components/LazyCharts.tsx
export const LazyCharts = dynamic(() => import("./Charts"), {
  loading: () => <div>Loading Charts...</div>,
});
```

### 3. Route-Based Code Splitting

Create separate chunks for different routes:

```tsx
// pages/_app.tsx
import dynamic from "next/dynamic";

// Lazy load different layouts
const AdminLayout = dynamic(() => import("../layouts/AdminLayout"));
const UserLayout = dynamic(() => import("../layouts/UserLayout"));
const PublicLayout = dynamic(() => import("../layouts/PublicLayout"));

export default function App({ Component, pageProps, router }) {
  const getLayout = () => {
    if (router.pathname.startsWith("/admin")) return AdminLayout;
    if (router.pathname.startsWith("/user")) return UserLayout;
    return PublicLayout;
  };

  const Layout = getLayout();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

### 4. Library Splitting

Split large libraries into separate chunks:

```tsx
// utils/chartLoader.ts
export const loadChartLibrary = () => {
  return import("chart.js").then((module) => module.default);
};

// utils/mapLoader.ts
export const loadMapLibrary = () => {
  return import("leaflet").then((module) => module.default);
};

// Usage in components
const ChartComponent = dynamic(() => import("./ChartComponent"), {
  loading: () => <div>Loading Chart...</div>,
});
```

### 5. Preloading Critical Routes

Preload important routes for faster navigation:

```tsx
// components/Navigation.tsx
import Link from "next/link";
import { useRouter } from "next/router";

export function Navigation() {
  const router = useRouter();

  const handleMouseEnter = (href: string) => {
    // Preload route on hover
    router.prefetch(href);
  };

  return (
    <nav>
      <Link
        href="/dashboard"
        onMouseEnter={() => handleMouseEnter("/dashboard")}
      >
        Dashboard
      </Link>
      <Link
        href="/analytics"
        onMouseEnter={() => handleMouseEnter("/analytics")}
      >
        Analytics
      </Link>
    </nav>
  );
}
```

### 6. Bundle Analysis

Analyze your bundle to identify optimization opportunities:

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your Next.js config
});

# Run analysis
ANALYZE=true npm run build
```

### 7. Image Optimization

Optimize images for better performance:

```tsx
import Image from "next/image";

// ✅ Optimized image loading
export function OptimizedImage() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero Image"
      width={800}
      height={600}
      priority // Load immediately for above-the-fold images
      placeholder="blur" // Show blur while loading
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}

// Lazy load images below the fold
export function LazyImage() {
  return (
    <Image
      src="/gallery-image.jpg"
      alt="Gallery Image"
      width={400}
      height={300}
      loading="lazy" // Default for images below the fold
    />
  );
}
```

### 8. Webpack Configuration

Optimize webpack for better chunk splitting:

```js
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};
```

## Performance Monitoring

### 1. Core Web Vitals

Monitor Core Web Vitals for performance:

```tsx
// lib/webVitals.ts
export function reportWebVitals(metric: any) {
  // Send to analytics
  if (metric.label === "web-vital") {
    console.log(metric);
    // Send to your analytics service
  }
}

// pages/_app.tsx
import { reportWebVitals } from "../lib/webVitals";

export { reportWebVitals };
```

### 2. Performance Dashboard

Use the built-in performance monitoring:

```tsx
import { PerformanceDashboard } from "@/widgets/PerformanceDashboard";

export function App() {
  return (
    <div>
      <PerformanceDashboard />
    </div>
  );
}
```

## Best Practices

1. **Lazy Load Everything**: Use dynamic imports for non-critical components
2. **Prefetch Important Routes**: Preload routes users are likely to visit
3. **Optimize Images**: Use Next.js Image component with proper sizing
4. **Monitor Bundle Size**: Regularly analyze your bundle for optimization opportunities
5. **Use Suspense**: Wrap lazy components in Suspense for better UX
6. **Split by Route**: Create separate chunks for different application sections
7. **Cache Strategically**: Use appropriate caching strategies for different content types

## Expected Performance Gains

- **Initial Bundle Size**: 30-50% reduction
- **First Contentful Paint**: 20-40% improvement
- **Time to Interactive**: 25-45% improvement
- **Navigation Speed**: 50-70% faster route transitions

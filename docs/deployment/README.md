# Deployment Guide

This guide covers deploying the Fumo foundation to production environments.

## 🚀 Deployment Overview

The Fumo foundation is designed for production deployment with:

- **Next.js** static export or server deployment
- **Docker** containerization support
- **CI/CD** pipeline configuration
- **Environment** management
- **Monitoring** and error tracking

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.fumo.com
      - NEXT_PUBLIC_APP_NAME=Fumo
      - NEXT_PUBLIC_APP_VERSION=1.0.0
    volumes:
      - ./.env.production:/app/.env.local
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
```

### Build and Run

```bash
# Build Docker image
docker build -t fumo-app .

# Run container
docker run -p 3000:3000 fumo-app

# Using Docker Compose
docker-compose up -d
```

## ☁️ Cloud Deployment

### Vercel (Recommended)

1. **Connect Repository**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository

2. **Configure Environment Variables**

   ```env
   NEXT_PUBLIC_API_URL=https://api.fumo.com
   NEXT_PUBLIC_APP_NAME=Fumo
   NEXT_PUBLIC_APP_VERSION=1.0.0
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
   ```

3. **Deploy**
   - Vercel automatically deploys on every push to `main`
   - Preview deployments for pull requests

### Netlify

1. **Build Settings**

   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = ".next"

   [build.environment]
     NODE_VERSION = "18"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Environment Variables**
   - Set in Netlify dashboard
   - Or use `.env.production` file

### AWS Amplify

1. **Connect Repository**

   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
   - Connect your GitHub repository

2. **Build Settings**
   ```yaml
   # amplify.yml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - "**/*"
     cache:
       paths:
         - node_modules/**/*
   ```

## 🔧 Environment Configuration

### Environment Files

```env
# .env.production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.fumo.com
NEXT_PUBLIC_APP_NAME=Fumo
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/fumo

# Authentication
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

# Monitoring
SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project
```

### Environment Validation

```typescript
// config/env/validation.ts
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string(),
  NEXT_PUBLIC_APP_VERSION: z.string(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

export const env = envSchema.parse(process.env);
```

## 🚀 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - run: npm ci
      - run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  stage: test
  image: node:${NODE_VERSION}-alpine
  script:
    - npm ci
    - npm run lint
    - npm run type-check
    - npm test
  cache:
    paths:
      - node_modules/

build:
  stage: build
  image: node:${NODE_VERSION}-alpine
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .next/
    expire_in: 1 hour

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache curl
    - curl -X POST "$DEPLOY_WEBHOOK_URL"
  only:
    - main
```

## 📊 Monitoring & Analytics

### Sentry Integration

```typescript
// src/infrastructure/providers/sentry/sentry.tsx
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  debug: false,
});
```

### Performance Monitoring

```typescript
// src/infrastructure/performance/lib/performance-monitor.ts
import { PerformanceMonitor } from "./performance-monitor";

const monitor = PerformanceMonitor.getInstance();

// Track custom metrics
monitor.trackMetric("page_load_time", performance.now());

// Track Web Vitals
monitor.trackWebVitals();
```

### Analytics

```typescript
// src/infrastructure/monitoring/hooks/useAnalytics.ts
import { useAnalytics } from "@/infrastructure/monitoring";

const { trackEvent, trackError, trackPerformance } = useAnalytics();

// Track user interactions
trackEvent("user_action", "button_click", { buttonId: "submit" });

// Track errors
trackError(new Error("Something went wrong"));

// Track performance
trackPerformance("api_response_time", 150, "ms");
```

## 🔒 Security Configuration

### Security Headers

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};
```

### Rate Limiting

```typescript
// src/infrastructure/security/lib/rate-limiter.ts
import { RateLimiterService } from "./rate-limiter.service";

const rateLimiter = RateLimiterService.getInstance();

// Apply rate limiting
const canProceed = await rateLimiter.checkLimit("api", userId);
if (!canProceed) {
  throw new Error("Rate limit exceeded");
}
```

## 🚀 Performance Optimization

### Build Optimization

```typescript
// next.config.js
module.exports = {
  // Enable compression
  compress: true,

  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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

### Caching Strategy

```typescript
// src/infrastructure/performance/lib/http-cache.ts
import { HttpCache } from "./http-cache";

const cache = HttpCache.getInstance();

// Cache API responses
const cachedResponse = await cache.get("/api/users");
if (!cachedResponse) {
  const response = await fetch("/api/users");
  await cache.set("/api/users", response, 300); // 5 minutes
}
```

## 🔧 Production Checklist

### Pre-Deployment

- [ ] **Environment Variables** - All required env vars set
- [ ] **Database** - Database migrations applied
- [ ] **SSL Certificate** - HTTPS configured
- [ ] **Domain** - Domain configured and DNS updated
- [ ] **Monitoring** - Sentry and analytics configured
- [ ] **Security** - Security headers and rate limiting enabled
- [ ] **Performance** - Bundle size optimized
- [ ] **Testing** - All tests passing

### Post-Deployment

- [ ] **Health Check** - Application responding correctly
- [ ] **Monitoring** - Error tracking and performance monitoring active
- [ ] **Analytics** - User analytics tracking
- [ ] **Security** - Security headers and HTTPS working
- [ ] **Performance** - Core Web Vitals within acceptable ranges
- [ ] **Backup** - Database backups configured

## 🆘 Troubleshooting

### Common Issues

**Build Failures:**

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Environment Variables:**

```bash
# Check environment variables
echo $NEXT_PUBLIC_API_URL
```

**Performance Issues:**

```bash
# Analyze bundle size
npm run build -- --analyze
```

### Monitoring

- **Sentry** - Error tracking and performance monitoring
- **Analytics** - User behavior and conversion tracking
- **Logs** - Application logs and debugging information
- **Metrics** - Performance metrics and system health

---

**Congratulations!** Your Fumo application is now deployed to production! 🎉

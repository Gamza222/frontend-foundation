# 🛠️ Technology Stack & Dependencies

> **Moved from**: `docs/TECH_STACK.md`  
> **Location**: `docs/reference/tech-stack.md`

## 📋 Overview

This document outlines the complete technology stack, dependencies, and tooling choices for our React 18 + Next.js 15 application built with Feature-Sliced Design architecture.

## 🎯 Core Framework & Runtime

### **Frontend Framework**

- **Next.js 15.x** - React framework with App Router
- **React 18.x** - UI library with concurrent features
- **TypeScript 5.x** - Type-safe JavaScript

### **Runtime Environment**

- **Node.js >=18.0.0** - JavaScript runtime
- **npm/yarn/pnpm** - Package manager

## 🏗️ Architecture & Patterns

### **Architecture**

- **Feature-Sliced Design (FSD)** - Scalable frontend architecture
- **Logic Component Structure (LCS)** - Component organization pattern
- **App Router** - Next.js routing system

### **State Management**

- **Zustand** - Lightweight state management _(planned)_
- **Apollo Client** - GraphQL client with caching _(planned)_
- **React Context** - Built-in state sharing

## 🎨 Styling & UI

### **Styling System**

- **Tailwind CSS** - Utility-first CSS framework _(planned)_
- **SCSS/Sass** - Enhanced CSS with variables and nesting _(planned)_
- **CSS Modules** - Scoped styling _(available)_

### **Design System**

- **Custom Component Library** - Built with Storybook _(in development)_
- **Design Tokens** - Consistent design variables _(planned)_

## 🧪 Testing Infrastructure

### **Testing Frameworks**

- **Jest 29.x** - JavaScript testing framework
- **React Testing Library** - React component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers
- **@testing-library/user-event** - User interaction simulation

### **Advanced Testing**

- **Playwright** - End-to-end testing _(configured, not implemented)_
- **Storybook Test Runner** - Visual testing _(available)_
- **MSW (Mock Service Worker)** - API mocking _(configured)_

### **Testing Configuration**

```typescript
// Current Jest setup
{
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": ["<rootDir>/config/jest/setupTests.ts"],
  "moduleNameMapping": {
    // FSD layer aliases
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@widgets/(.*)$": "<rootDir>/src/widgets/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1"
  }
}
```

## 🔧 Development Tools

### **Code Quality**

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

### **TypeScript Configuration**

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@app/*": ["./src/app/*"],
      "@pages/*": ["./src/pages/*"],
      "@widgets/*": ["./src/widgets/*"],
      "@features/*": ["./src/features/*"],
      "@entities/*": ["./src/entities/*"],
      "@shared/*": ["./src/shared/*"]
    }
  }
}
```

### **Development Experience**

- **Storybook 8.x** - Component development environment
- **Hot Module Replacement** - Fast development refresh
- **Source Maps** - Debugging support

## 📚 Documentation & Visualization

### **Documentation Tools**

- **Storybook** - Component documentation
- **Markdown** - Project documentation
- **TypeScript JSDoc** - Code documentation

### **Storybook Addons**

```json
{
  "@storybook/addon-docs": "Component documentation",
  "@storybook/addon-a11y": "Accessibility testing",
  "@storybook/addon-viewport": "Responsive testing",
  "@storybook/addon-actions": "Event logging",
  "@storybook/addon-controls": "Component controls"
}
```

## 🚀 React 18 Features Implementation

### **Suspense System** ✅

- **SuspenseWrapper** - Basic Suspense wrapper
- **PageSuspenseWrapper** - Page-level Suspense
- **ComponentSuspenseWrapper** - Component-level Suspense
- **lazyWithRetry** - Retry failed lazy imports
- **lazyWithPreload** - Preload lazy components
- **withSuspense** - HOC for Suspense wrapping
- **withDelay** - Add minimum loading time

### **Error Boundaries** ✅

- **ErrorBoundary** - General error boundary
- **SuspenseErrorBoundary** - Suspense-specific error handling
- **PageErrorBoundary** - Page-level error boundary _(in development)_
- **useErrorHandler** - Error handling hook

### **Advanced Suspense Patterns** ✅

- **createSuspenseResource** - Resource pattern for data fetching
- **createMutableSuspenseResource** - Refreshable resources
- **Suspense resources with caching** - Built-in caching support

### **Concurrent Features** ✅

- **withTransition** - Transition wrapper utility
- **useDeferredComputation** - Defer expensive computations
- **createOptimisticUpdate** - Optimistic updates
- **createStreamResource** - Streaming data support

## 📦 Key Dependencies

### **Production Dependencies**

```json
{
  "next": "^15.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "typescript": "^5.0.0"
}
```

### **Development Dependencies**

```json
{
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0",
  "@types/node": "^20.0.0",
  "eslint": "^8.0.0",
  "eslint-config-next": "^15.0.0",
  "prettier": "^3.0.0",
  "jest": "^29.0.0",
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.0.0",
  "husky": "^8.0.0",
  "lint-staged": "^15.0.0"
}
```

### **Storybook Dependencies**

```json
{
  "@storybook/react": "^8.0.0",
  "@storybook/react-webpack5": "^8.0.0",
  "@storybook/addon-docs": "^8.0.0",
  "@storybook/addon-a11y": "^8.0.0",
  "@storybook/addon-viewport": "^8.0.0"
}
```

## 🔮 Planned Additions

### **State Management** (Sprint 3)

```json
{
  "zustand": "^4.0.0",
  "@apollo/client": "^3.8.0",
  "@apollo/experimental-nextjs-app-support": "^0.4.0",
  "graphql": "^16.0.0"
}
```

### **Styling System** (Sprint 3)

```json
{
  "tailwindcss": "^3.0.0",
  "sass": "^1.60.0",
  "autoprefixer": "^10.0.0",
  "postcss": "^8.0.0"
}
```

### **Enhanced Testing** (Sprint 4)

```json
{
  "playwright": "^1.40.0",
  "@playwright/test": "^1.40.0",
  "chromatic": "^7.0.0"
}
```

### **Build & Deployment** (Sprint 5)

```json
{
  "webpack-bundle-analyzer": "^4.0.0",
  "@sentry/nextjs": "^7.0.0",
  "sharp": "^0.32.0"
}
```

## 📊 Bundle Analysis

### **Current Bundle Size** (Estimated)

- **Main Bundle**: ~150KB (gzipped)
- **React + Next.js**: ~45KB (gzipped)
- **Application Code**: ~30KB (gzipped)
- **Suspense/Error System**: ~15KB (gzipped)
- **Testing Infrastructure**: Development only

### **Performance Targets**

- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Total Bundle Size**: <500KB (gzipped)
- **JavaScript Execution Time**: <100ms

## 🔍 Tool Configuration Files

### **Package.json Scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "type-check": "tsc --noEmit"
  }
}
```

### **Configuration Files Present**

- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Jest testing configuration
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `.storybook/main.ts` - Storybook configuration
- `tailwind.config.js` - Tailwind CSS configuration _(planned)_

## 🎯 Decision Rationale

### **Why Next.js 15?**

- App Router stability and performance
- Built-in TypeScript support
- Excellent developer experience
- Server Components and Streaming
- Comprehensive documentation

### **Why Feature-Sliced Design?**

- Clear separation of concerns
- Scalable architecture
- Predictable file structure
- Excellent for team collaboration
- Enforces good practices

### **Why React 18?**

- Concurrent features for better UX
- Suspense for data fetching
- Automatic batching
- Improved hydration
- Future-proof technology

### **Why TypeScript?**

- Type safety and error prevention
- Excellent IDE support
- Better refactoring capabilities
- Self-documenting code
- Industry standard

## 📈 Upgrade Strategy

### **Continuous Updates**

- **Next.js**: Minor version updates monthly
- **React**: Stable release adoption
- **Dependencies**: Security updates weekly
- **TypeScript**: Latest stable version

### **Major Version Strategy**

- Evaluate new features and breaking changes
- Test in development environment
- Gradual rollout with feature flags
- Comprehensive testing before production

---

**Last Updated**: Documentation restructuring completion  
**Next Review**: After state management implementation

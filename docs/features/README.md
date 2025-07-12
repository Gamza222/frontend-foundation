# ⚡ Features Documentation

## 📋 Overview

This section documents all business logic features in our application. Features are complex components that provide specific functionality and can be used across multiple pages and widgets.

> **Features vs Components**: Features contain business logic and complex functionality, while shared UI components are simple, reusable elements.

## 🏗️ **Feature Organization (FSD Structure)**

Each feature follows the same FSD structure for consistency:

```
src/features/FeatureName/
├── README.md           # Feature documentation (like this one)
├── index.ts            # Public API exports
├── ui/                # UI Components segment
│   ├── ComponentA/    # Feature-specific components
│   └── ComponentB/
├── model/             # Business Logic segment
│   ├── types/         # Domain types
│   ├── hooks/         # Business logic hooks
│   └── stores/        # State management
├── lib/               # Utilities segment
│   └── utils.ts       # Feature-specific utilities
├── api/               # API segment (if needed)
│   └── api.ts         # External communication
└── config/            # Configuration segment
    └── config.ts      # Feature settings
```

## 📚 **Available Features**

### **✅ Ready Features**

#### **🔄 SuspenseWrapper** (`@features/SuspenseWrapper`)

- **Purpose**: React Suspense boundaries with error handling
- **Status**: ✅ Production ready
- **Documentation**: [SuspenseWrapper README](../../src/features/SuspenseWrapper/README.md)
- **Components**: SuspenseWrapper, ComponentSuspenseWrapper, PageSuspenseWrapper

```typescript
import { SuspenseWrapper } from '@features/SuspenseWrapper';

<SuspenseWrapper fallback={<Loading />}>
  <MyComponent />
</SuspenseWrapper>
```

### **🚧 In Progress Features**

#### **🚨 ErrorBoundary** (`@features/ErrorBoundary`)

- **Purpose**: Comprehensive error catching, classification, and recovery
- **Status**: 🚧 Types and utilities complete, UI components in progress
- **Documentation**: [ErrorBoundary README](../../src/features/ErrorBoundary/README.md)
- **Available**: Error types, classification, enhancement utilities
- **TODO**: UI components, hooks, reporting system

```typescript
import { enhanceError, createNetworkError } from '@features/ErrorBoundary/model';

// Current capabilities
const enhanced = enhanceError(new Error('API failed'));
const networkError = createNetworkError(error, { statusCode: 500 });
```

## 🎯 **Feature Documentation Standards**

Each feature MUST have:

### **1. Feature README** (`src/features/FeatureName/README.md`)

- **Overview**: What the feature does
- **Architecture**: FSD structure explanation
- **API Reference**: All public functions/components
- **Usage Examples**: Real-world code examples
- **Status**: What's complete vs in progress
- **Troubleshooting**: Common issues and solutions

### **2. Component Documentation**

- **Props interfaces**: TypeScript definitions
- **Usage examples**: Code snippets
- **When to use**: Clear guidance
- **Related components**: Cross-references

### **3. Testing Documentation**

- **Test examples**: How to test the feature
- **Mock data**: Available test utilities
- **Coverage**: What's tested

## 🔧 **How to Use Features**

### **Import Strategy**

```typescript
// ✅ Correct - Import from feature model
import { ErrorCategory, enhanceError } from '@features/ErrorBoundary/model';
import { SuspenseWrapper } from '@features/SuspenseWrapper';

// ❌ Wrong - Don't import from internal segments
import { ErrorCategory } from '@features/ErrorBoundary/model/types';
import { enhanceError } from '@features/ErrorBoundary/lib/error-utils';
```

### **Dependency Rules**

- **Features can use**: `@shared`, `@entities`
- **Features cannot use**: other `@features`, `@widgets`, `@pages`
- **Features provide**: Public APIs for widgets and pages

### **Public API Pattern**

Each feature exports its public API through `index.ts`:

```typescript
// src/features/FeatureName/index.ts
export * from './model'; // Types, hooks, stores
export * from './ui'; // UI components
export * from './lib'; // Utilities (if needed by consumers)
// Note: api/ and config/ are usually internal only
```

## 📖 **Feature Development Workflow**

### **1. Planning Phase**

- Define feature scope and requirements
- Design FSD structure
- Plan public API

### **2. Implementation Phase**

- Start with types (`model/types/`)
- Build utilities (`lib/`)
- Create business logic (`model/`)
- Build UI components (`ui/`)
- Add configuration (`config/`)
- Integration tests

### **3. Documentation Phase**

- Write feature README
- Document all public APIs
- Add usage examples
- Update available components list

### **4. Integration Phase**

- Test in widgets/pages
- Performance testing
- Accessibility audit
- Final documentation review

## 🎯 **Best Practices**

### **Feature Scope**

- **Single Responsibility**: Each feature has one clear purpose
- **Self-Contained**: Minimal dependencies on other features
- **Reusable**: Can be used in multiple contexts

### **API Design**

- **Intuitive**: Easy to understand function names
- **TypeScript First**: Full type safety
- **Consistent**: Follow established patterns
- **Documented**: Every public function has examples

### **Performance**

- **Lazy Loading**: Components should support code splitting
- **Tree Shaking**: Proper exports for unused code elimination
- **Memory Management**: Clean up resources properly

## 📚 **Related Documentation**

- [Available Components Reference](../reference/available-components.md)
- [FSD Architecture Guide](../architecture/fsd-architecture.md)
- [Reusability Guide](../development/reusability-guide.md)
- [How to Document](../HOW_TO_DOCUMENT.md)

---

## 🔄 **Maintenance**

This documentation should be updated when:

- New features are added
- Feature status changes
- API changes significantly
- New patterns are established

**Last Updated**: ErrorBoundary types and utilities implementation  
**Next Update**: After ErrorBoundary UI components are complete

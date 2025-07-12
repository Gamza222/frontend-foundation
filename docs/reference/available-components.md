# 🧩 Available Components & Features

## 📋 Overview

This document provides a complete inventory of all components and features available in our application. Use this as your **first stop** before creating new components to avoid duplication.

> **Rule**: Always check this list before building anything new!

---

## 🎨 **Shared UI Components** (`@shared/ui`)

Components that can be used anywhere in the application. These are simple, focused UI elements without business logic.

| Component                    | Status       | Location                                  | Import                                                                           | Use Case                   |
| ---------------------------- | ------------ | ----------------------------------------- | -------------------------------------------------------------------------------- | -------------------------- |
| **Button**                   | ✅ **Ready** | `src/shared/ui/Button/`                   | `import { Button } from '@shared/ui/Button'`                                     | Actions, forms, navigation |
| **Text**                     | ✅ **Ready** | `src/shared/ui/Text/`                     | `import { Text } from '@shared/ui/Text'`                                         | Displaying text            |
| **ComponentLoadingFallback** | ✅ **Ready** | `src/shared/ui/ComponentLoadingFallback/` | `import { ComponentLoadingFallback } from '@shared/ui/ComponentLoadingFallback'` | Component loading states   |
| **PageLoadingFallback**      | ✅ **Ready** | `src/shared/ui/PageLoadingFallback/`      | `import { PageLoadingFallback } from '@shared/ui/PageLoadingFallback'`           | Full-page loading screens  |
| **DefaultSuspenseFallback**  | ✅ **Ready** | `src/shared/ui/DefaultSuspenseFallback/`  | `import { DefaultSuspenseFallback } from '@shared/ui/DefaultSuspenseFallback'`   | React Suspense fallbacks   |

**Documentation**: [UI Components Guide](../components/ui-components/README.md)

---

## ⚡ **Features** (`@features`)

Business logic features that provide specific functionality. These can be used across multiple pages and widgets.

### **Error Handling**

| Feature                  | Status             | Location                      | Import                                          | Use Case                                 |
| ------------------------ | ------------------ | ----------------------------- | ----------------------------------------------- | ---------------------------------------- |
| **ErrorBoundary System** | 🚧 **In Progress** | `src/features/ErrorBoundary/` | `import { ... } from '@features/ErrorBoundary'` | Error catching, classification, recovery |

**What's Available Now**:

- ✅ **Error Types**: 8 categories, 4 severity levels, 6 recovery strategies
- ✅ **Error Classification**: Automatic categorization via pattern matching
- ✅ **Error Enhancement**: Transform basic JS errors into rich ErrorInfo
- ✅ **Specialized Creators**: Category-specific error creators
- ✅ **Error Formatting**: User-friendly and developer-friendly formatters
- 🚧 **UI Components**: ErrorBoundary, SuspenseErrorBoundary (TODO)
- 🚧 **Error Hooks**: useErrorHandler, useErrorBoundary (TODO)

**Documentation**: [ErrorBoundary Feature README](../../src/features/ErrorBoundary/README.md)

**Quick Usage**:

```typescript
import { ErrorCategory, enhanceError, createNetworkError } from '@features/ErrorBoundary/model';

// Enhance basic error
const enhanced = enhanceError(new Error('API failed'), {
  component: 'UserProfile',
});

// Create specialized error
const networkError = createNetworkError(
  new Error('API timeout'),
  { statusCode: 500, endpoint: '/api/users' },
  { component: 'UserList' }
);
```

### **Suspense Integration**

| Feature                    | Status       | Location                        | Import                                            | Use Case                                |
| -------------------------- | ------------ | ------------------------------- | ------------------------------------------------- | --------------------------------------- |
| **SuspenseWrapper System** | ✅ **Ready** | `src/features/SuspenseWrapper/` | `import { ... } from '@features/SuspenseWrapper'` | Suspense boundaries with error handling |

**What's Available**:

- ✅ **SuspenseWrapper**: Universal suspense boundary
- ✅ **ComponentSuspenseWrapper**: Component-level suspense
- ✅ **PageSuspenseWrapper**: Page-level suspense

**Documentation**: [SuspenseWrapper Feature README](../../src/features/SuspenseWrapper/README.md)

---

## 🧩 **Entities** (`@entities`)

Core business entities and their basic operations.

| Entity                    | Status | Location | Import | Use Case |
| ------------------------- | ------ | -------- | ------ | -------- |
| _No entities created yet_ | -      | -        | -      | -        |

---

## 🔧 **Shared Utilities** (`@shared/lib`)

Utility functions and helpers that can be used throughout the application.

### **Utilities**

| Utility            | Status       | Location                           | Import                                                      | Use Case                      |
| ------------------ | ------------ | ---------------------------------- | ----------------------------------------------------------- | ----------------------------- |
| **classNames**     | ✅ **Ready** | `src/shared/lib/utils/classNames/` | `import { classNames } from '@shared/lib/utils/classNames'` | Dynamic CSS class composition |
| **Suspense Utils** | ✅ **Ready** | `src/shared/lib/suspense/`         | `import { ... } from '@shared/lib/suspense'`                | Suspense-related utilities    |

### **Suspense Utilities**

| Function                   | Status       | Use Case                    |
| -------------------------- | ------------ | --------------------------- |
| **lazyWithRetry**          | ✅ **Ready** | Retry failed lazy imports   |
| **lazyWithPreload**        | ✅ **Ready** | Preload lazy components     |
| **withSuspense**           | ✅ **Ready** | HOC for Suspense boundaries |
| **withDelay**              | ✅ **Ready** | Delay component loading     |
| **createSuspenseResource** | ✅ **Ready** | Create Suspense resources   |

**Documentation**: [Suspense Utils README](../../src/shared/lib/suspense/README.md)

---

## 📱 **Pages** (`@pages`)

Page-level components for routing.

| Page         | Status       | Location          | Import                                   | Use Case              |
| ------------ | ------------ | ----------------- | ---------------------------------------- | --------------------- |
| **MainPage** | ✅ **Ready** | `src/pages/main/` | `import { MainPage } from '@pages/main'` | Application home page |

---

## 🧩 **Widgets** (`@widgets`)

Composite UI blocks that combine features and entities.

| Widget                   | Status | Location | Import | Use Case |
| ------------------------ | ------ | -------- | ------ | -------- |
| _No widgets created yet_ | -      | -        | -      | -        |

---

## 🎯 **How to Use This Document**

### **Before Creating New Components**

1. **Search this document** for existing components
2. **Check the status** - is it ready or in progress?
3. **Review the documentation** links for details
4. **Consider extending** existing components vs creating new ones

### **When Adding New Components**

1. **Add entry to this document** with status and links
2. **Create proper documentation** following our templates
3. **Update related reference docs** (patterns, utilities, etc.)
4. **Cross-link documentation** appropriately

### **Status Definitions**

- ✅ **Ready**: Production-ready, fully tested, documented
- 🚧 **In Progress**: Currently being built, some parts may be usable
- ⏸️ **Planned**: Designed but not started
- ❌ **Deprecated**: No longer recommended for use

---

## 📚 **Related Documentation**

- [UI Components Guide](../components/ui-components/README.md)
- [Reusability Guide](../development/reusability-guide.md)
- [FSD Architecture](../architecture/fsd-architecture.md)
- [How to Document](../HOW_TO_DOCUMENT.md)

---

## 🔄 **Maintenance**

This document should be updated whenever:

- New components/features are added
- Components change status (ready → deprecated, etc.)
- Major functionality is added/removed
- Documentation links change

**Last Updated**: Error Boundary types and utilities implementation  
**Next Update**: After Error Boundary UI components are complete

# Shared UI Components

This document outlines all the ready-to-use UI components available in `src/shared/ui/`. All components are production-ready with comprehensive tests, TypeScript support, and SCSS styling.

## 🚀 Quick Start

```tsx
// Import any component directly
import { Button, ButtonVariant, ButtonSize } from '@/shared/ui/Button/Button';
import { ComponentLoadingFallback } from '@/shared/ui/ComponentLoadingFallback/ComponentLoadingFallback';
```

## 📋 Available Components

| Component                    | Status       | Use Case                           | Test Coverage    |
| ---------------------------- | ------------ | ---------------------------------- | ---------------- |
| **Button**                   | ✅ **Ready** | Primary actions, forms, navigation | ✅ Comprehensive |
| **ComponentLoadingFallback** | ✅ **Ready** | Component-level loading states     | ✅ Comprehensive |
| **PageLoadingFallback**      | ✅ **Ready** | Full-page loading screens          | ✅ Comprehensive |
| **DefaultSuspenseFallback**  | ✅ **Ready** | React Suspense fallbacks           | ✅ Comprehensive |

---

## 🔘 Button Component

### Overview

A fully-featured button component with variants, sizes, and loading states.

### Props Interface

```tsx
interface ButtonProps {
  variant?: ButtonVariant; // primary | secondary
  size?: ButtonSize; // sm | md | lg
  fullWidth?: boolean; // Make button full width
  loading?: boolean; // Show loading spinner
  disabled?: boolean; // Disable button
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  onClick?: (event: MouseEvent) => void;
}
```

### Usage Examples

```tsx
// Basic button
<Button>Click me</Button>

// Primary button with size
<Button variant={ButtonVariant.PRIMARY} size={ButtonSize.LG}>
  Large Primary
</Button>

// Secondary button
<Button variant={ButtonVariant.SECONDARY}>
  Secondary Action
</Button>

// Loading state
<Button loading>
  Processing...
</Button>

// Form submit
<Button type="submit" fullWidth>
  Submit Form
</Button>

// With custom styling
<Button className="my-custom-class">
  Custom Styled
</Button>
```

### When to Use

- ✅ **Primary actions**: Submit forms, confirm dialogs
- ✅ **Secondary actions**: Cancel, back, alternative options
- ✅ **Navigation**: Links that look like buttons
- ✅ **Loading states**: Show progress during async operations

---

## ⏳ ComponentLoadingFallback

### Overview

Loading indicator for component-level loading states with customizable height and spinner size.

### Props Interface

```tsx
interface ComponentLoadingFallbackProps {
  height?: ComponentHeight; // small | medium | large
  text?: string; // Loading message
  className?: string; // Additional styling
  spinnerSize?: ComponentSpinnerSize; // tiny | small | medium
}
```

### Usage Examples

```tsx
// Basic component loading
<ComponentLoadingFallback />

// Custom message and height
<ComponentLoadingFallback
  text="Loading user data..."
  height={ComponentHeight.LARGE}
/>

// Small loading indicator
<ComponentLoadingFallback
  height={ComponentHeight.SMALL}
  spinnerSize={ComponentSpinnerSize.TINY}
  text="Loading..."
/>

// With React Suspense
<Suspense fallback={<ComponentLoadingFallback text="Loading component..." />}>
  <MyComponent />
</Suspense>
```

### When to Use

- ✅ **Component loading**: When a specific component is loading data
- ✅ **Card placeholders**: Loading states for cards/widgets
- ✅ **Form sections**: When part of a form is loading
- ✅ **Data tables**: Loading rows or specific sections

---

## 📄 PageLoadingFallback

### Overview

Full-page loading screen with skeleton elements and background options.

### Props Interface

```tsx
interface PageLoadingFallbackProps {
  text?: string; // Loading message
  showSkeleton?: boolean; // Show skeleton elements
  bgColor?: PageLoadingBgColor; // gradient | solid | transparent
}
```

### Usage Examples

```tsx
// Basic page loading
<PageLoadingFallback />

// Custom message with skeleton
<PageLoadingFallback
  text="Loading dashboard..."
  showSkeleton={true}
  bgColor={PageLoadingBgColor.GRADIENT}
/>

// Minimal page loading
<PageLoadingFallback
  text="Please wait..."
  showSkeleton={false}
  bgColor={PageLoadingBgColor.TRANSPARENT}
/>

// With Next.js App Router
export default function Loading() {
  return <PageLoadingFallback text="Loading page..." />;
}
```

### When to Use

- ✅ **Initial page load**: When the entire page is loading
- ✅ **Route transitions**: Between page navigation
- ✅ **App initialization**: When app is starting up
- ✅ **Large data loading**: When loading significant amounts of data

---

## 🔄 DefaultSuspenseFallback

### Overview

Minimal loading indicator designed specifically for React Suspense boundaries.

### Props Interface

```tsx
interface DefaultSuspenseFallbackProps {
  minHeight?: MinHeight; // minimal | compact | spacious
  spinnerSize?: SpinnerSize; // small | medium | large
  className?: string; // Additional styling
}
```

### Usage Examples

```tsx
// Basic suspense fallback
<DefaultSuspenseFallback />

// Custom height and spinner
<DefaultSuspenseFallback
  minHeight={MinHeight.SPACIOUS}
  spinnerSize={SpinnerSize.LARGE}
/>

// With React Suspense
<Suspense fallback={<DefaultSuspenseFallback />}>
  <LazyComponent />
</Suspense>

// In error boundaries
<SuspenseErrorBoundary fallback={<DefaultSuspenseFallback />}>
  <MyAsyncComponent />
</SuspenseErrorBoundary>
```

### When to Use

- ✅ **React Suspense**: Default fallback for suspense boundaries
- ✅ **Lazy loading**: When components are being loaded dynamically
- ✅ **Code splitting**: During chunk loading
- ✅ **Generic loading**: When you need a simple, unobtrusive loader

---

## 🎨 Styling System

All components use a **hybrid styling approach**:

### Tailwind CSS

- **Base utilities**: Layout, spacing, colors
- **Responsive design**: Mobile-first approach
- **State modifiers**: Hover, focus, disabled states

### SCSS Modules

- **Component-specific styles**: Custom animations, gradients
- **Enhanced styling**: Advanced visual effects
- **CSS isolation**: Scoped component styles

### classNames Utility

All components use the `classNames` utility for dynamic class composition:

```tsx
import { classNames } from '@/shared/lib/utils/classNames/classNames';

// Combines Tailwind, SCSS modules, and conditional classes
const buttonClasses = classNames(
  'inline-flex items-center justify-center', // Tailwind base
  {
    'w-full': fullWidth, // Conditional Tailwind
    'opacity-50': disabled, // State-based classes
  },
  [styles.button, styles.primary] // SCSS modules
);
```

---

## 🧪 Testing

All components have **comprehensive test coverage** including:

- ✅ **Rendering tests**: Default and custom props
- ✅ **Variant tests**: All sizes, colors, states
- ✅ **Interaction tests**: Click events, keyboard navigation
- ✅ **Accessibility tests**: ARIA attributes, screen reader support
- ✅ **Integration tests**: SCSS modules and Tailwind classes

Run component tests:

```bash
# Test all UI components
npm test src/shared/ui/

# Test specific component
npm test src/shared/ui/Button/Button.test.tsx
```

---

## 📦 Creating a Barrel Export (Optional)

To simplify imports, you can create an index file:

```tsx
// src/shared/ui/index.ts
export { Button, ButtonVariant, ButtonSize } from './Button/Button';
export {
  ComponentLoadingFallback,
  ComponentHeight,
  ComponentSpinnerSize,
} from './ComponentLoadingFallback/ComponentLoadingFallback';
export { PageLoadingFallback, PageLoadingBgColor } from './PageLoadingFallback/PageLoadingFallback';
export {
  DefaultSuspenseFallback,
  SpinnerSize,
  MinHeight,
} from './DefaultSuspenseFallback/DefaultSuspenseFallback';
```

Then import everything from one place:

```tsx
import { Button, ComponentLoadingFallback } from '@/shared/ui';
```

---

## 🚀 Best Practices

### Component Selection Guide

```tsx
// ✅ Use Button for actions
<Button onClick={handleSubmit}>Submit</Button>

// ✅ Use ComponentLoadingFallback for parts of the UI
<Suspense fallback={<ComponentLoadingFallback />}>
  <UserProfile />
</Suspense>

// ✅ Use PageLoadingFallback for full page loads
export default function Loading() {
  return <PageLoadingFallback text="Loading dashboard..." />;
}

// ✅ Use DefaultSuspenseFallback for generic suspense
<Suspense fallback={<DefaultSuspenseFallback />}>
  <LazyRoute />
</Suspense>
```

### Performance Tips

- **Import directly** from component files for better tree-shaking
- **Use appropriate loading states** based on content type
- **Combine with error boundaries** for robust UX
- **Test with real data** to ensure proper loading behavior

---

## 🔗 Related Documentation

- [classNames Utility](../../../src/shared/lib/utils/classNames/README.md)
- [Suspense Integration Guide](../../implementation/react/suspense-guide.md)
- [Error Handling Patterns](../../implementation/react/error-handling.md)
- [Component Testing Guide](../../development/testing-workflow.md)

---

**🎉 All components are production-ready and battle-tested!**

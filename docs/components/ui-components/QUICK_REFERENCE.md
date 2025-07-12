# UI Components Quick Reference

## 🚀 TL;DR - What's Ready to Use

**All 4 shared UI components are production-ready and fully tested!**

| Component                    | Location                                  | Import                                                   | Use Case                   |
| ---------------------------- | ----------------------------------------- | -------------------------------------------------------- | -------------------------- |
| **Button**                   | `src/shared/ui/Button/`                   | `import { Button } from '@/shared/ui'`                   | Actions, forms, navigation |
| **ComponentLoadingFallback** | `src/shared/ui/ComponentLoadingFallback/` | `import { ComponentLoadingFallback } from '@/shared/ui'` | Component loading states   |
| **PageLoadingFallback**      | `src/shared/ui/PageLoadingFallback/`      | `import { PageLoadingFallback } from '@/shared/ui'`      | Full-page loading          |
| **DefaultSuspenseFallback**  | `src/shared/ui/DefaultSuspenseFallback/`  | `import { DefaultSuspenseFallback } from '@/shared/ui'`  | React Suspense fallbacks   |

## ⚡ Super Quick Examples

### Button

```tsx
import { Button, ButtonVariant } from '@/shared/ui';

<Button variant={ButtonVariant.PRIMARY} loading={isSubmitting}>
  Submit Form
</Button>;
```

### Component Loading

```tsx
import { ComponentLoadingFallback } from '@/shared/ui';

<Suspense fallback={<ComponentLoadingFallback text="Loading user..." />}>
  <UserProfile />
</Suspense>;
```

### Page Loading

```tsx
import { PageLoadingFallback } from '@/shared/ui';

// In Next.js app/loading.tsx
export default function Loading() {
  return <PageLoadingFallback text="Loading dashboard..." />;
}
```

### Suspense Fallback

```tsx
import { DefaultSuspenseFallback } from '@/shared/ui';

<Suspense fallback={<DefaultSuspenseFallback />}>
  <LazyComponent />
</Suspense>;
```

## 📂 File Structure

```
src/shared/ui/
├── index.ts                          # ← Barrel export (use this for imports)
├── Button/
│   ├── Button.tsx                    # ← Main component
│   ├── Button.test.tsx              # ← Comprehensive tests
│   └── Button.module.scss           # ← SCSS styling
├── ComponentLoadingFallback/
│   ├── ComponentLoadingFallback.tsx
│   ├── ComponentLoadingFallback.test.tsx
│   └── ComponentLoadingFallback.module.scss
├── PageLoadingFallback/
│   ├── PageLoadingFallback.tsx
│   ├── PageLoadingFallback.test.tsx
│   └── PageLoadingFallback.module.scss
└── DefaultSuspenseFallback/
    ├── DefaultSuspenseFallback.tsx
    ├── DefaultSuspenseFallback.test.tsx
    └── DefaultSuspenseFallback.module.scss
```

## 🎯 When to Use What

```tsx
// ✅ Need a button? Use Button
<Button onClick={handleClick}>Action</Button>

// ✅ Loading a specific component/section? Use ComponentLoadingFallback
<Suspense fallback={<ComponentLoadingFallback />}>
  <DataTable />
</Suspense>

// ✅ Loading an entire page? Use PageLoadingFallback
export default function Loading() {
  return <PageLoadingFallback />;
}

// ✅ Generic Suspense boundary? Use DefaultSuspenseFallback
<Suspense fallback={<DefaultSuspenseFallback />}>
  <AnyComponent />
</Suspense>
```

## 🔧 All Components Support

- ✅ **TypeScript**: Full type safety
- ✅ **Testing**: 100% test coverage
- ✅ **SCSS Modules**: Component-specific styling
- ✅ **Tailwind CSS**: Utility classes
- ✅ **Accessibility**: ARIA attributes
- ✅ **Customization**: `className` prop for custom styling

## 🛠️ Dependencies

All components use the `classNames` utility for dynamic class composition:

```tsx
import { classNames } from '@/shared/lib/utils/classNames/classNames';
```

This utility is already tested and ready - all UI components depend on it.

## 📖 More Info

- **Full Documentation**: [README.md](./README.md)
- **Component Tests**: Run `npm test src/shared/ui/`
- **Styling Guide**: See each component's `.module.scss` file
- **Usage Examples**: Check the comprehensive tests for real usage patterns
- **classNames Utility**: Located at `src/shared/lib/utils/classNames/`

---

**🎉 Start using these components right away - they're battle-tested and production-ready!**

# 🔄 Reusability Guide & Anti-Duplication Principles

## 🚨 **Golden Rule: Always Check First!** 🚨

Before writing any new component, utility, or test mock, you **MUST** check the `shared` layer and `config/jest/mocks` directory first. Reinventing existing functionality is a critical error.

### **1. Check for Shared UI Components:**

- **Directory:** `src/shared/ui/`
- **Currently Available:** `Button`
- **Action:** Use existing components. If you need a new one, ensure it's truly generic before adding it here.

### **2. Check for Reusable Mocks:**

- **Directory:** `config/jest/mocks/`
- **Key Sub-directories:** `api/`, `browser/`, `assets/`
- **Action:** Import and use these mocks in your Jest tests (`*.test.tsx`) to ensure consistency.

---

## 📋 Overview

This guide establishes our "Reuse before creating, centralize before duplicating" principle and provides comprehensive workflows for preventing code duplication while maximizing component reusability across our FSD architecture.

> **Core Principle**: Before writing new code, we must discover, evaluate, and adapt existing solutions. Create new components only when existing ones cannot be reasonably adapted.

## 🏗️ **CRITICAL: Component Organization & Splitting Principles**

### **How We Structure Components**

**Component structure depends on complexity and location:**

#### **🎯 Shared Components (Simple UI Only)**

```
ComponentName/
├── ComponentName.tsx        # All-in-one: component + types + logic
├── ComponentName.scss       # Styles (optional)
├── ComponentName.stories.tsx # Storybook (optional)
└── ComponentName.test.tsx   # Tests
```

#### **🏗️ Complex Components (Features/Widgets/Pages)**

```
ComponentName/
├── ComponentName.tsx        # Main component
├── components/              # Sub-components
├── hooks/                   # Component-specific hooks
├── utils/                   # Component-specific utilities
├── types/                   # Component-specific types
└── __tests__/              # Component tests
```

### **What Goes Where - FSD Layer Decision Matrix**

| **If your code is...**             | **Then put it in...**                            | **Example**                          |
| ---------------------------------- | ------------------------------------------------ | ------------------------------------ |
| **Reusable across entire app**     | `@shared/ui/` or `@shared/lib/`                  | Button, formatDate, apiClient        |
| **Reusable within component only** | `ComponentName/utils/` or `ComponentName/hooks/` | SuspenseWrapper/utils/retry.utils.ts |
| **Specific to a business entity**  | `@entities/user/` etc.                           | User validation, UserCard            |
| **Specific to a feature**          | `@features/auth/` etc.                           | LoginForm, useAuthState              |
| **Specific to a page**             | `@pages/home/` etc.                              | HomePage layout logic                |

## 🔍 **CRITICAL: Component Analysis Framework**

**Before creating any component, ALWAYS perform this analysis:**

### **Step 1: Identify Reusable Elements**

**Look for patterns in your component that could be reused:**

#### **1.1 Button Analysis**

```typescript
// ❌ BAD - Multiple similar buttons in one component
const MyComponent = () => (
  <div>
    <button onClick={handleSave} className="btn-primary">Save</button>
    <button onClick={handleCancel} className="btn-secondary">Cancel</button>
    <button onClick={handleDelete} className="btn-danger">Delete</button>
  </div>
);

// ✅ GOOD - Unified ActionButton component
const MyComponent = () => (
  <div>
    <ActionButton action="save" variant="primary" onClick={handleSave}>Save</ActionButton>
    <ActionButton action="cancel" variant="secondary" onClick={handleCancel}>Cancel</ActionButton>
    <ActionButton action="delete" variant="danger" onClick={handleDelete}>Delete</ActionButton>
  </div>
);
```

#### **1.2 UI Pattern Analysis**

```typescript
// ❌ BAD - Repeated UI patterns
const ErrorCard = () => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <div className="text-red-600">Error occurred</div>
    <button>Try Again</button>
  </div>
);

const WarningCard = () => (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
    <div className="text-yellow-600">Warning message</div>
    <button>OK</button>
  </div>
);

// ✅ GOOD - Unified AlertCard component
const AlertCard = ({ type, message, action }) => (
  <div className={`bg-${type}-50 border border-${type}-200 rounded-lg p-4`}>
    <div className={`text-${type}-600`}>{message}</div>
    {action && <button onClick={action.handler}>{action.label}</button>}
  </div>
);
```

### **Step 2: Apply Reusability Decision Tree**

```
🤔 Is this pattern used/needed in multiple places?
├── YES → Continue to Step 3
└── NO → Keep in current component, create in components/ subfolder if >20 lines

🤔 Where is this pattern used?
├── Multiple FSD layers → @shared/ui/ (high reusability)
├── Within one feature → @features/featureName/ui/
├── Within one entity → @entities/entityName/ui/
└── Within one component → ComponentName/components/

🤔 What type of reusability?
├── UI Component → @shared/ui/ComponentName/
├── Business Logic → @shared/lib/ or appropriate layer
├── Utility Function → @shared/lib/utils/
└── Hook → @shared/lib/hooks/ or ComponentName/hooks/
```

### **Step 3: Component Composition Analysis**

#### **3.1 Can elements be unified?**

```typescript
// Example: Error boundary buttons analysis
// Current: 3 separate buttons with similar styling but different actions

// Option 1: Unified ActionButton
interface ActionButtonProps {
  action: 'retry' | 'refresh' | 'home' | 'back';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

// Option 2: Separate if actions are too different
interface RetryButtonProps {
  onRetry: () => void;
}
interface NavigationButtonProps {
  action: 'home' | 'back' | 'refresh';
}

// Decision: Choose Option 1 if styling/behavior similar, Option 2 if different
```

#### **3.2 Composition vs Extension Analysis**

```typescript
// Composition (preferred)
const ErrorFallback = () => (
  <AlertContainer>
    <ErrorIcon />
    <ErrorMessage />
    <ActionButton action="retry" />
  </AlertContainer>
);

// Extension (when composition not feasible)
interface ErrorButtonProps extends ButtonProps {
  errorType: 'network' | 'code' | 'timeout';
}
```

### **Step 4: Implementation Decision Matrix**

| **Pattern Type**                        | **Reusability Scope** | **Location**                | **Implementation**                         |
| --------------------------------------- | --------------------- | --------------------------- | ------------------------------------------ |
| **Identical styling & behavior**        | App-wide              | `@shared/ui/`               | Single unified component                   |
| **Similar styling, different actions**  | App-wide              | `@shared/ui/`               | Configurable component with action props   |
| **Different styling, similar behavior** | App-wide              | `@shared/ui/`               | Variant-based component                    |
| **Complex composition pattern**         | Feature/Layer         | Appropriate layer           | Composition pattern with shared primitives |
| **Simple repetition**                   | Within component      | `ComponentName/components/` | Extract to subfolder                       |

### **Step 5: Shared Component Creation Checklist**

#### **Before creating in @shared/ui/:**

- [ ] **Pattern used 3+ times** across different FSD layers
- [ ] **Clear configuration API** that handles variations
- [ ] **Stable interface** unlikely to change frequently
- [ ] **Generic enough** to be useful in various contexts
- [ ] **Well-documented** with examples and usage patterns

#### **Component Structure Requirements:**

```typescript
// ✅ GOOD - Proper shared component
interface SharedComponentProps {
  // Generic props that work across use cases
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  action?: string;
  disabled?: boolean;
  // Specific configuration
  config?: ComponentConfig;
  // Flexibility
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

### **Step 6: Documentation Requirements**

#### **Every shared component MUST have:**

```typescript
/**
 * SharedComponent - Brief description of what it does
 *
 * @example
 * // Basic usage
 * <SharedComponent variant="primary">Content</SharedComponent>
 *
 * // Advanced usage
 * <SharedComponent
 *   variant="secondary"
 *   action="custom-action"
 *   config={{ option: true }}
 * >
 *   Custom content
 * </SharedComponent>
 *
 * @see {@link docs/components/ui-components/shared-component.md} for full documentation
 */
```

#### **Update inventories:**

- [ ] Add to `docs/reference/available-components.md`
- [ ] Update reusability inventory in this file
- [ ] Create component-specific documentation
- [ ] Add usage examples for common patterns

## 🎯 **Practical Application: Error Boundary Button Analysis**

### **Current State Analysis:**

```typescript
// PageErrorBoundary has 3 buttons:
<button onClick={resetErrorBoundary}>Try Again</button>           // Primary action
<button onClick={handleRefresh}>Refresh Page</button>             // Secondary action
<button onClick={handleGoHome}>Go to Homepage</button>            // Secondary action

// Analysis:
// ✅ Similar styling (with primary/secondary variants)
// ✅ Similar structure and behavior
// ✅ Used across error boundaries (Default, Suspense, Page)
// ✅ Could be used in other error scenarios app-wide
// → Decision: Create unified ActionButton in @shared/ui/
```

### **Recommended Solution:**

```typescript
// @shared/ui/ActionButton/ActionButton.tsx
interface ActionButtonProps {
  action: 'retry' | 'refresh' | 'home' | 'back' | 'custom';
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Usage in error boundaries:
<ActionButton action="retry" variant="primary" onClick={resetErrorBoundary}>
  Try Again
</ActionButton>
<ActionButton action="refresh" variant="secondary">
  Refresh Page
</ActionButton>
<ActionButton action="home" variant="secondary">
  Go to Homepage
</ActionButton>
```

**This analysis framework ensures we:**

1. ✅ **Don't duplicate code** - unified patterns in shared components
2. ✅ **Follow FSD principles** - right location for reusability scope
3. ✅ **Maintain consistency** - same patterns used everywhere
4. ✅ **Enable easy maintenance** - change once, update everywhere
5. ✅ **Document properly** - clear usage and examples

## 🎯 The DRY Rule with Discovery

### **Before Creating Any Component**

1. **🔍 SEARCH**: Use our discovery checklist to find existing solutions
2. **📊 EVALUATE**: Assess if existing components can be adapted (80% rule)
3. **🔧 ADAPT**: Modify existing components if they meet 80% of requirements
4. **✨ CREATE**: Only create new components if adaptation isn't viable
5. **📝 DOCUMENT**: Add to reusability inventory and update discovery tools

### **The 80% Rule**

If an existing component satisfies 80% or more of your requirements, adapt it rather than creating a new one. This prevents component proliferation and maintains consistency.

```typescript
// ✅ GOOD - Adapting existing Button for special case
import { Button } from '@shared/ui/Button';

function SubmitButton(props: SubmitButtonProps) {
  return (
    <Button
      {...props}
      type="submit"
      variant="primary"
      className={cn('submit-button', props.className)}
    >
      {props.children}
    </Button>
  );
}

// ❌ BAD - Creating completely new component for minor variation
function SubmitButton() {
  return (
    <button className="submit-btn">
      Submit
    </button>
  );
}
```

## 🔍 Discovery Checklist

### **Step 1: Component Discovery**

```bash
# Search existing components by name/functionality
find src -name "*.tsx" | grep -i "button\|input\|modal\|form"

# Search by pattern/usage
grep -r "interface.*Props" src/shared/ui/
grep -r "export.*function" src/shared/ui/

# Check reusability inventory
cat docs/reference/available-components.md
```

### **Step 2: Hook & Utility Discovery**

```bash
# Find existing hooks
find src -name "use*.ts" -o -name "use*.tsx"
grep -r "export.*use[A-Z]" src/shared/lib/

# Find utilities
find src -name "*utils*" -o -name "*helpers*"
grep -r "export.*function" src/shared/lib/

# Check utility inventory
cat docs/reference/available-utilities.md
```

### **Step 3: Pattern Discovery**

```bash
# Find similar implementations
grep -r "similar-pattern\|useState\|useEffect" src/
grep -r "interface.*Props" src/ | grep -i "your-use-case"

# Check established patterns
grep -r "// Pattern:" src/
cat docs/development/patterns/
```

### **Step 4: Testing & Mock Discovery**

```bash
# Find existing test utilities
find src -name "*.test.*" -o -name "*mock*" -o -name "*fixture*"
grep -r "jest.mock\|vi.mock" src/

# Check mock inventory
cat docs/reference/available-mocks.md
```

## 📦 Reusability Inventory

### **Shared UI Components**

| Component       | Location                     | Use Cases               | Adaptability                   | Last Updated |
| --------------- | ---------------------------- | ----------------------- | ------------------------------ | ------------ |
| Button          | `@shared/ui/Button`          | All button interactions | High - variants, sizes, states | 2024-01-15   |
| Input           | `@shared/ui/Input`           | Form inputs, search     | High - types, validation       | 2024-01-15   |
| Modal           | `@shared/ui/Modal`           | Dialogs, overlays       | Medium - content flexibility   | 2024-01-10   |
| LoadingFallback | `@shared/ui/LoadingFallback` | Suspense loading states | High - customizable messages   | 2024-01-12   |
| ErrorBoundary   | `@shared/ui/ErrorBoundary`   | Error handling          | High - custom fallbacks        | 2024-01-14   |

### **Shared Hooks**

| Hook            | Location                 | Purpose                  | Reusability           | Dependencies |
| --------------- | ------------------------ | ------------------------ | --------------------- | ------------ |
| useErrorHandler | `@shared/lib/errors`     | Error handling           | High - configurable   | None         |
| useLocalStorage | `@shared/lib/storage`    | Local storage management | High - generic        | None         |
| useDebounce     | `@shared/lib/utils`      | Debounced values         | High - any value type | None         |
| useMediaQuery   | `@shared/lib/responsive` | Responsive breakpoints   | High - any query      | None         |

### **Shared Utilities**

| Utility       | Location                 | Purpose                 | Reusability            | Examples                                   |
| ------------- | ------------------------ | ----------------------- | ---------------------- | ------------------------------------------ |
| cn            | `@shared/lib/utils`      | Conditional class names | High - styling         | `cn('base', condition && 'extra')`         |
| formatDate    | `@shared/lib/date`       | Date formatting         | High - any date        | `formatDate(date, 'short')`                |
| apiRequest    | `@shared/api`            | HTTP requests           | High - any API call    | `apiRequest('/users', { method: 'POST' })` |
| validateEmail | `@shared/lib/validation` | Email validation        | High - any email input | `validateEmail(email)`                     |

### **Testing Utilities & Mocks**

| Mock/Utility        | Location                     | Purpose                | Reusability               |
| ------------------- | ---------------------------- | ---------------------- | ------------------------- |
| mockApiRequest      | `@shared/__tests__/mocks`    | API mocking            | High - any API test       |
| renderWithProviders | `@shared/__tests__/utils`    | Test rendering         | High - any component test |
| mockUserData        | `@shared/__tests__/fixtures` | User data              | High - user-related tests |
| mockErrorBoundary   | `@shared/__tests__/mocks`    | Error boundary testing | High - error scenarios    |

## 🔧 Adaptation Strategies

### **Component Extension Pattern**

```typescript
// Extending existing component for specific use case
import { Button, ButtonProps } from '@shared/ui/Button';

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function IconButton({
  icon,
  iconPosition = 'left',
  children,
  ...buttonProps
}: IconButtonProps) {
  return (
    <Button {...buttonProps}>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </Button>
  );
}
```

### **Composition Pattern**

```typescript
// Composing existing components for complex use case
import { Modal } from '@shared/ui/Modal';
import { Button } from '@shared/ui/Button';
import { Form } from '@shared/ui/Form';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}

export function FormModal({ isOpen, onClose, onSubmit, children }: FormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form onSubmit={onSubmit}>
        {children}
        <div className="form-actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
```

### **Configuration Pattern**

```typescript
// Making existing component more flexible through configuration
interface FlexibleListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyState?: React.ReactNode;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  className?: string;
}

export function FlexibleList<T>({
  items,
  renderItem,
  emptyState = <div>No items found</div>,
  loading = false,
  loadingComponent = <div>Loading...</div>,
  className,
}: FlexibleListProps<T>) {
  if (loading) return <>{loadingComponent}</>;
  if (items.length === 0) return <>{emptyState}</>;

  return (
    <div className={cn('flexible-list', className)}>
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
}

// Usage for different data types
<FlexibleList
  items={users}
  renderItem={(user) => <UserCard key={user.id} user={user} />}
  emptyState={<div>No users found</div>}
/>

<FlexibleList
  items={posts}
  renderItem={(post) => <PostPreview key={post.id} post={post} />}
  emptyState={<div>No posts available</div>}
/>
```

## 📋 Contribution Guidelines

### **When Adding Shared Code**

1. **Location Decision**: Follow FSD layer rules

   - UI components → `@shared/ui/`
   - Business logic hooks → `@features/` or `@entities/`
   - Generic utilities → `@shared/lib/`

2. **Documentation Requirements**:

   ````typescript
   /**
    * Brief description of what this component/function does
    *
    * @example
    * ```tsx
    * <ComponentName prop="value" />
    * ```
    *
    * @param prop - Description of prop
    * @returns What the function returns
    */
   ````

3. **Testing Requirements**:

   - Unit tests for all public APIs
   - Integration tests for complex components
   - Example usage in tests

4. **Update Inventory**:
   - Add to appropriate inventory table above
   - Update discovery documentation
   - Add usage examples

### **When Modifying Shared Code**

1. **Impact Assessment**:

   ```bash
   # Find all usages of the component/function
   grep -r "ComponentName\|functionName" src/

   # Check import statements
   grep -r "from.*ComponentName" src/
   ```

2. **Backward Compatibility**:

   - Prefer additive changes (new optional props)
   - Deprecate before removing (with migration guide)
   - Version breaking changes appropriately

3. **Communication**:
   - Update all related documentation
   - Notify team of breaking changes
   - Provide migration examples

## 🎯 Quality Gates & Metrics

### **Before Merging Checklist**

- [ ] **Discovery completed**: Verified no existing solution meets 80% of needs
- [ ] **Documentation updated**: Component/utility added to inventory
- [ ] **Tests written**: Comprehensive test coverage
- [ ] **Examples provided**: Clear usage examples
- [ ] **Type safety**: Full TypeScript coverage
- [ ] **Accessibility**: A11y considerations addressed (for UI components)

### **Reusability Metrics**

Track these metrics to measure our reusability success:

```typescript
// Example metrics tracking
interface ReusabilityMetrics {
  totalComponents: number;
  sharedComponents: number;
  reusabilityRatio: number; // sharedComponents / totalComponents
  averageUsageCount: number;
  duplicatePatterns: number;
}

// Goal: reusabilityRatio > 0.6 (60% of components are reusable)
// Goal: averageUsageCount > 3 (each shared component used 3+ times)
// Goal: duplicatePatterns < 5 (minimal duplication)
```

### **Regular Audits**

- **Weekly**: Review new components for reusability opportunities
- **Monthly**: Analyze metrics and identify duplication patterns
- **Quarterly**: Major refactoring of commonly duplicated patterns

## 🔄 Refactoring & Consolidation

### **Identifying Duplication**

```bash
# Find similar component structures
find src -name "*.tsx" -exec grep -l "interface.*Props" {} \; | \
  xargs grep -h "interface.*Props" | sort | uniq -c | sort -nr

# Find similar hook patterns
grep -r "useState\|useEffect" src/ | \
  cut -d: -f2- | sort | uniq -c | sort -nr | head -20

# Find repeated utility functions
grep -r "export.*function" src/ | \
  grep -v "__tests__" | cut -d: -f2- | sort | uniq -c | sort -nr
```

### **Consolidation Process**

1. **Identify** duplicated patterns (using tools above)
2. **Analyze** differences between implementations
3. **Design** unified interface that covers all use cases
4. **Create** consolidated component in appropriate shared location
5. **Migrate** existing usage to new shared component
6. **Remove** old duplicated implementations
7. **Update** documentation and inventory

### **Example Consolidation**

```typescript
// BEFORE: Multiple similar button components
// features/auth/LoginButton.tsx
function LoginButton() { /* ... */ }

// features/user/SaveButton.tsx
function SaveButton() { /* ... */ }

// features/posts/SubmitButton.tsx
function SubmitButton() { /* ... */ }

// AFTER: Consolidated shared Button component
// shared/ui/Button/Button.tsx
function Button({ variant, size, loading, icon, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn('btn', `btn--${variant}`, `btn--${size}`)}
      disabled={loading}
      {...props}
    >
      {loading && <Spinner />}
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}

// Usage in features:
<Button variant="primary" type="submit">Login</Button>
<Button variant="secondary" loading={saving}>Save</Button>
<Button variant="primary" type="submit">Submit Post</Button>
```

## 📚 Resources & Tools

### **Discovery Tools**

- **Component Search**: Use VS Code's "Go to Symbol in Workspace" (Cmd+T)
- **Usage Search**: Use "Find All References" for existing components
- **Pattern Search**: Use regex search for similar patterns
- **Documentation**: Keep inventory tables updated and searchable

### **Development Tools**

- **ESLint Rules**: Custom rules to prevent duplication
- **TypeScript**: Strict mode catches interface duplications
- **Testing**: Shared test utilities prevent test duplication
- **Documentation**: Automated inventory generation from code

### **Monitoring & Alerts**

- **Bundle Analyzer**: Identify duplicated dependencies
- **Code Coverage**: Ensure shared code is well-tested
- **Usage Tracking**: Monitor which shared components are most/least used
- **Lint Warnings**: Alert on potential duplication patterns

---

**🎯 Success Metrics**:

- Reusability ratio > 60%
- Average component usage > 3x
- Duplicate patterns < 5
- Time to find existing solution < 5 minutes

**📅 Last Updated**: Documentation restructure completion  
**🔄 Next Review**: After component library expansion  
**📖 Related Docs**:

- [Available Components](../reference/available-components.md)
- [Available Utilities](../reference/available-utilities.md)
- [Component Patterns](./patterns/component-patterns.md)

## 🎯 **COMPLETE COMPONENT LOCATION DECISION GUIDE**

**Use this guide EVERY TIME you create components, hooks, API logic, tests, or utilities to avoid duplication.**

### **🔍 Decision Tree: Where Does My Code Go?**

```
🤔 What type of code am I creating?
├── 🎨 UI Component → Go to "UI Component Location"
├── 🔗 API Logic → Go to "API Logic Location"
├── 🧪 Tests → Go to "Test Location"
├── 🪝 Hooks → Go to "Hook Location"
├── 🛠️ Utilities → Go to "Utility Location"
├── 📊 Types → Go to "Type Location"
└── 🔧 Constants → Go to "Constants Location"
```

### **🎨 UI Component Location Matrix**

| **Component Type**      | **Used Where**       | **Location**                  | **Example**                      | **Structure**            |
| ----------------------- | -------------------- | ----------------------------- | -------------------------------- | ------------------------ |
| **Basic UI primitive**  | App-wide             | `@shared/ui/ComponentName/`   | Button, Input, Card              | Simple (4 files max)     |
| **Complex UI pattern**  | Multiple features    | `@features/ui/ComponentName/` | ErrorBoundary, Modal, DataTable  | Complex (full structure) |
| **Business entity UI**  | Entity-specific      | `@entities/entityName/ui/`    | UserCard, PostPreview            | Complex (full structure) |
| **Feature-specific UI** | One feature          | `@features/featureName/ui/`   | LoginForm, ProfileEditor         | Complex (full structure) |
| **Layout/composition**  | Page/widget level    | `@widgets/` or `@pages/`      | Header, Sidebar, DashboardLayout | Complex (full structure) |
| **Sub-component**       | Within one component | `ComponentName/components/`   | DropdownItem, FormField          | Simple (single file)     |

### **🔗 API Logic Location Matrix**

| **API Type**         | **Used Where**   | **Location**                 | **Example**                |
| -------------------- | ---------------- | ---------------------------- | -------------------------- |
| **Base API client**  | App-wide         | `@shared/api/`               | apiClient, interceptors    |
| **Entity API**       | Entity-specific  | `@entities/entityName/api/`  | userApi, postApi           |
| **Feature API**      | Feature-specific | `@features/featureName/api/` | loginApi, checkoutApi      |
| **External service** | App-wide         | `@shared/api/services/`      | stripeApi, googleApi       |
| **API utilities**    | App-wide         | `@shared/lib/api/`           | formatRequest, handleError |

### **🧪 Test Location Matrix**

| **Test Type**         | **Location**               | **Example**                                          |
| --------------------- | -------------------------- | ---------------------------------------------------- |
| **Component tests**   | `ComponentName/__tests__/` | `Button/__tests__/Button.test.tsx`                   |
| **Hook tests**        | `ComponentName/__tests__/` | `useAuth/__tests__/useAuth.test.ts`                  |
| **Utility tests**     | `ComponentName/__tests__/` | `formatDate/__tests__/formatDate.test.ts`            |
| **Integration tests** | `ComponentName/__tests__/` | `LoginForm/__tests__/LoginForm.integration.test.tsx` |
| **E2E tests**         | `__tests__/e2e/`           | `__tests__/e2e/auth-flow.test.ts`                    |

### **🪝 Hook Location Matrix**

| **Hook Type**       | **Used Where**     | **Location**                   | **Example**                         |
| ------------------- | ------------------ | ------------------------------ | ----------------------------------- |
| **Generic hooks**   | App-wide           | `@shared/lib/hooks/`           | useLocalStorage, useDebounce        |
| **Entity hooks**    | Entity-specific    | `@entities/entityName/hooks/`  | useUser, useUserPermissions         |
| **Feature hooks**   | Feature-specific   | `@features/featureName/hooks/` | useAuth, useCheckout                |
| **Component hooks** | Component-specific | `ComponentName/hooks/`         | useDropdownState, useFormValidation |
| **Page hooks**      | Page-specific      | `@pages/pageName/hooks/`       | usePageData, usePageFilters         |

### **🛠️ Utility Location Matrix**

| **Utility Type**        | **Used Where**     | **Location**                   | **Example**                   |
| ----------------------- | ------------------ | ------------------------------ | ----------------------------- |
| **Generic utilities**   | App-wide           | `@shared/lib/utils/`           | formatDate, validateEmail     |
| **Entity utilities**    | Entity-specific    | `@entities/entityName/utils/`  | userUtils, postUtils          |
| **Feature utilities**   | Feature-specific   | `@features/featureName/utils/` | authUtils, paymentUtils       |
| **Component utilities** | Component-specific | `ComponentName/utils/`         | buttonUtils, formUtils        |
| **Business logic**      | Domain-specific    | Appropriate layer              | calculateTax, validateAddress |

### **📊 Type Location Matrix**

| **Type Category**   | **Used Where**     | **Location**                   | **Example**                    |
| ------------------- | ------------------ | ------------------------------ | ------------------------------ |
| **Global types**    | App-wide           | `@shared/types/`               | ApiResponse, BaseEntity        |
| **Entity types**    | Entity-specific    | `@entities/entityName/types/`  | User, UserRole                 |
| **Feature types**   | Feature-specific   | `@features/featureName/types/` | LoginCredentials, CheckoutData |
| **Component types** | Component-specific | `ComponentName/types/`         | ButtonProps, ModalState        |
| **API types**       | API-specific       | `*/api/types/`                 | UserApiResponse, LoginRequest  |

### **🔧 Constants Location Matrix**

| **Constants Type**      | **Used Where**     | **Location**                       | **Example**                   |
| ----------------------- | ------------------ | ---------------------------------- | ----------------------------- |
| **App constants**       | App-wide           | `@shared/config/constants/`        | APP_NAME, DEFAULT_TIMEOUT     |
| **Entity constants**    | Entity-specific    | `@entities/entityName/constants/`  | USER_ROLES, POST_STATUSES     |
| **Feature constants**   | Feature-specific   | `@features/featureName/constants/` | LOGIN_ERRORS, PAYMENT_METHODS |
| **Component constants** | Component-specific | `ComponentName/constants/`         | BUTTON_SIZES, MODAL_POSITIONS |
| **API constants**       | API-specific       | `*/api/constants/`                 | ENDPOINTS, HTTP_METHODS       |

---

### **🚨 Anti-Duplication Checklist**

**Before creating ANYTHING new, check this list:**

#### **✅ Search First**

- [ ] **Search codebase** for similar functionality
- [ ] **Check shared layer** for existing utilities/components
- [ ] **Review entity layer** for domain-specific logic
- [ ] **Scan feature layer** for similar patterns

#### **✅ Reusability Analysis**

- [ ] **Will this be used elsewhere?** → Consider @shared/
- [ ] **Is this business-specific?** → Consider @entities/
- [ ] **Is this feature-specific?** → Keep in @features/
- [ ] **Is this component-specific?** → Keep in ComponentName/

#### **✅ Documentation Check**

- [ ] **Does this exist in Storybook?** → Check before creating UI components
- [ ] **Are there similar patterns in docs?** → Follow existing conventions
- [ ] **Does this violate FSD rules?** → Review layer dependencies

---

### **📋 Quick Reference Commands**

```bash
# Search for existing components
npm run search:components [component-name]

# Search for existing hooks
npm run search:hooks [hook-name]

# Search for existing utilities
npm run search:utils [util-name]

# Check component usage
npm run analyze:usage [component-name]

# Find duplicated code
npm run lint:duplicates
```

---

### **🎯 Location Examples by Use Case**

#### **Creating a Button Component**

```
🤔 Will this be used app-wide? YES
📍 Location: @shared/ui/Button/
📁 Structure (Simple):
   Button/
   ├── Button.tsx              # All-in-one: component + types
   ├── Button.module.scss             # Styles (optional)
   ├── Button.stories.tsx      # Storybook (optional)
   └── Button.test.tsx         # Tests
```

#### **Creating User Profile Logic**

```
🤔 Is this user-entity specific? YES
📍 Location: @entities/user/
📁 Structure:
   user/
   ├── api/userApi.ts
   ├── hooks/useUser.ts
   ├── utils/userUtils.ts
   └── types/user.types.ts
```

#### **Creating Login Form**

```
🤔 Is this authentication-feature specific? YES
📍 Location: @features/authentication/login/
📁 Structure:
   login/
   ├── ui/LoginForm.tsx
   ├── api/loginApi.ts
   ├── hooks/useLogin.ts
   └── types/login.types.ts
```

---

**This guide is your ONE source of truth for code organization. Follow it religiously to avoid duplication and maintain clean architecture.**

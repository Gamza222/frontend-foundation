# Architecture Overview

Fumo is built using **Feature-Sliced Design (FSD)**, a methodology for organizing frontend applications with clear layer separation and unidirectional dependencies.

## 🏗️ FSD Principles

### Layer Hierarchy

```
app/           # Application layer (Next.js pages)
├── pages/     # Route components
├── providers/ # Global providers
└── styles/    # Global styles

pages/         # Page layer
├── HomePage/  # Individual pages
└── AboutPage/

widgets/       # Widget layer
├── Header/    # Complex UI blocks
├── Sidebar/   # Composed of features
└── Footer/

features/      # Feature layer
├── auth/      # Business features
├── profile/   # User interactions
└── search/

entities/      # Entity layer
├── user/      # Business entities
├── product/   # Domain models
└── order/

shared/        # Shared layer
├── ui/        # Reusable components
├── lib/       # Utilities
└── api/       # API layer

infrastructure/ # Infrastructure layer
├── data/      # Data sources
├── security/  # Security services
└── monitoring/ # Monitoring tools
```

### Dependency Rules

- **App** → **Pages** → **Widgets** → **Features** → **Entities** → **Shared** → **Infrastructure**
- **No circular dependencies**
- **No imports from higher layers**

## 🎯 Layer Responsibilities

### App Layer (`src/app/`)

Next.js App Router pages and global configuration.

```tsx
// src/app/page.tsx
import { HomePage } from "@/pages/HomePage";

export default function App() {
  return <HomePage />;
}
```

**Responsibilities:**

- Route definitions
- Global providers
- Layout components
- Environment configuration

### Pages Layer (`src/pages/`)

Page-level components that compose widgets and features.

```tsx
// src/pages/HomePage/HomePage.tsx
import { Header } from "@/widgets/Header";
import { ProductList } from "@/features/product-list";

export const HomePage = () => (
  <div>
    <Header />
    <ProductList />
  </div>
);
```

**Responsibilities:**

- Page composition
- Route-specific logic
- Data fetching coordination

### Widgets Layer (`src/widgets/`)

Complex UI blocks composed of multiple features.

```tsx
// src/widgets/Header/Header.tsx
import { Logo } from "@/shared/ui/Logo";
import { Navigation } from "@/features/navigation";
import { UserMenu } from "@/features/user-menu";

export const Header = () => (
  <header>
    <Logo />
    <Navigation />
    <UserMenu />
  </header>
);
```

**Responsibilities:**

- Complex UI composition
- Cross-feature integration
- Layout components

### Features Layer (`src/features/`)

Business features and user interactions.

```tsx
// src/features/auth/AuthForm.tsx
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useAuth } from "@/entities/user";

export const AuthForm = () => {
  const { login } = useAuth();

  return (
    <form onSubmit={login}>
      <Input name="email" />
      <Input name="password" type="password" />
      <Button type="submit">Login</Button>
    </form>
  );
};
```

**Responsibilities:**

- User interactions
- Business logic
- Feature-specific components

### Entities Layer (`src/entities/`)

Business entities and domain models.

```tsx
// src/entities/user/User.tsx
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// src/entities/user/useUser.ts
export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  return { user, setUser };
};
```

**Responsibilities:**

- Domain models
- Business rules
- Entity-specific hooks

### Shared Layer (`src/shared/`)

Reusable components and utilities.

```tsx
// src/shared/ui/Button/Button.tsx
import { cva } from "class-variance-authority";

const buttonVariants = cva({
  base: "px-4 py-2 rounded",
  variants: {
    variant: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-500 text-white",
    },
  },
});

export const Button = ({ variant, ...props }) => (
  <button className={buttonVariants({ variant })} {...props} />
);
```

**Responsibilities:**

- Reusable UI components
- Utility functions
- Common types
- API clients

### Infrastructure Layer (`src/infrastructure/`)

Technical infrastructure and external integrations.

```tsx
// src/infrastructure/data/api.ts
export class ApiClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json();
  }
}
```

**Responsibilities:**

- External API integration
- Data persistence
- Security services
- Monitoring tools

## 🔄 Data Flow

### Unidirectional Data Flow

```
User Action → Feature → Entity → Infrastructure → API
     ↓
UI Update ← Widget ← Page ← App
```

### Example: User Login

1. **User clicks login button** (Feature)
2. **AuthForm calls useAuth.login()** (Entity)
3. **useAuth calls AuthService.login()** (Infrastructure)
4. **AuthService makes API call** (Infrastructure)
5. **Success response updates user state** (Entity)
6. **UI re-renders with user data** (Feature → Widget → Page)

## 🎨 Styling Architecture

### CSS Modules + CVA

```tsx
// Component styles
import styles from "./Button.module.scss";
import { cva } from "class-variance-authority";

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
  },
});
```

### Design System

- **Design Tokens**: Colors, spacing, typography
- **Component Variants**: Consistent styling patterns
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG AA compliance

## 🧪 Testing Strategy

### Layer-Specific Testing

```tsx
// Feature testing
import { render, screen } from "@testing-library/react";
import { AuthForm } from "@/features/auth";

test("renders login form", () => {
  render(<AuthForm />);
  expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
});

// Entity testing
import { useUser } from "@/entities/user";

test("manages user state", () => {
  const { result } = renderHook(() => useUser());
  expect(result.current.user).toBeNull();
});
```

### Testing Pyramid

- **Unit Tests**: Components, utilities, hooks
- **Integration Tests**: Features, widgets
- **E2E Tests**: Critical user flows

## 📦 Module Structure

### Standard Module Structure

```
FeatureName/
├── index.ts           # Public API
├── ui/                # UI components
│   ├── Component.tsx
│   ├── Component.module.scss
│   └── Component.test.tsx
├── lib/               # Business logic
│   ├── hooks.ts
│   └── utils.ts
├── model/             # Types and state
│   ├── types.ts
│   └── store.ts
└── api/               # API integration
    └── api.ts
```

### Import Rules

```tsx
// ✅ Correct imports
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/entities/user";
import { AuthForm } from "@/features/auth";

// ❌ Incorrect imports
import { Button } from "@/features/auth/ui/Button"; // Wrong layer
import { useAuth } from "@/features/auth"; // Missing entity layer
```

## 🚀 Benefits of FSD

### Scalability

- **Clear boundaries** between different parts of the application
- **Predictable structure** for new team members
- **Easy refactoring** with clear dependencies

### Maintainability

- **Single responsibility** for each layer
- **Reduced coupling** between features
- **Easier testing** with isolated concerns

### Developer Experience

- **Intuitive navigation** through the codebase
- **Consistent patterns** across all features
- **Clear separation** of concerns

## 📚 Further Reading

- [Feature-Sliced Design](https://feature-sliced.design/) - Official FSD documentation
- [Components Guide](../components/README.md) - UI components and utilities
- [Development Workflow](../development/README.md) - Development best practices

---

**Next:** Learn about our [Components](../components/README.md) and how to use them effectively!

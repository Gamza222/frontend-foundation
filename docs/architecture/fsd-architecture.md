# 🏗️ Feature-Sliced Design Architecture

## 📋 Overview

This document outlines our Feature-Sliced Design (FSD) architecture implementation, providing a comprehensive guide to how we structure our React application for maximum maintainability, scalability, and developer experience.

> **Core Principle**: Each layer has a specific responsibility and can only depend on layers below it.

## 🎯 FSD Layer Structure

### **📱 Pages Layer** (`src/pages/`)

**Purpose**: Route-based application pages  
**Responsibility**: Compose widgets and handle routing logic  
**Can Import From**: widgets, features, entities, shared  
**Cannot Import From**: other pages

```typescript
// ✅ CORRECT
import { UserProfileWidget } from '@widgets/UserProfile';
import { AuthFeature } from '@features/auth';

// ❌ WRONG
import { HomePage } from '@pages/home';
```

**Structure**:

```
pages/
├── home/
│   ├── index.ts
│   ├── HomePage.tsx
│   └── __tests__/
├── profile/
│   ├── index.ts
│   ├── ProfilePage.tsx
│   └── __tests__/
└── not-found/
    ├── index.ts
    ├── NotFoundPage.tsx
    └── __tests__/
```

---

### **🧩 Widgets Layer** (`src/widgets/`)

**Purpose**: Composite UI blocks that combine features and entities  
**Responsibility**: Layout and composition of complex UI sections  
**Can Import From**: features, entities, shared  
**Cannot Import From**: pages, other widgets

```typescript
// ✅ CORRECT
import { UserCard } from '@entities/user';
import { EditProfileFeature } from '@features/profile';

// ❌ WRONG
import { HeaderWidget } from '@widgets/header';
```

**Examples**:

- UserProfileWidget
- NavigationWidget
- DashboardWidget
- SidebarWidget

---

### **⚡ Features Layer** (`src/features/`)

**Purpose**: Business logic and user interaction flows  
**Responsibility**: Implement specific user actions and business processes  
**Can Import From**: entities, shared  
**Cannot Import From**: pages, widgets, other features

```typescript
// ✅ CORRECT
import { User } from '@entities/user';
import { apiClient } from '@shared/api';

// ❌ WRONG
import { LoginFeature } from '@features/auth';
```

**Examples**:

- auth/login
- auth/logout
- profile/edit-user
- notifications/send-notification

---

### **🎯 Entities Layer** (`src/entities/`)

**Purpose**: Core business entities and their basic operations  
**Responsibility**: Data models, basic CRUD operations, entity-specific components  
**Can Import From**: shared  
**Cannot Import From**: pages, widgets, features, other entities

```typescript
// ✅ CORRECT
import { apiRequest } from '@shared/api';
import { Button } from '@shared/ui/Button';

// ❌ WRONG
import { User } from '@entities/user';
```

**Examples**:

- user
- post
- comment
- organization

---

### **🔧 Shared Layer** (`src/shared/`)

**Purpose**: Reusable code shared across the entire application  
**Responsibility**: Common utilities, UI components, constants, helpers  
**Can Import From**: Only external libraries and Node.js modules  
**Cannot Import From**: Any application layer

**Segments**:

- `ui/` - Reusable UI components
- `lib/` - Utilities and helpers
- `api/` - API client configuration
- `config/` - Application configuration
- `constants/` - Application constants

---

## 🎨 Logic Component Structure (LCS)

### **Component Organization Pattern**

Every component follows the same internal structure:

```
ComponentName/
├── index.ts                 # Single export point
├── ComponentName.tsx        # Main component implementation
├── hooks/                   # Component-specific hooks
│   ├── useComponentData.ts
│   └── useComponentLogic.ts
├── utils/                   # Component-specific utilities
│   ├── transformData.ts
│   └── validateInput.ts
├── types/                   # Component-specific types
│   ├── ComponentProps.ts
│   └── ComponentData.ts
└── __tests__/              # Component tests
    ├── Component.test.tsx
    ├── hooks.test.ts
    └── utils.test.ts
```

### **Index File Pattern**

```typescript
// ComponentName/index.ts
export { ComponentName } from './ComponentName';
export type { ComponentProps } from './types/ComponentProps';

// Export hooks and utilities only if they're meant to be public
export { useComponentData } from './hooks/useComponentData';
export { transformData } from './utils/transformData';
```

### **Import Strategy**

```typescript
// ✅ CORRECT - Direct imports to components
import { Button } from '@shared/ui/Button';
import { useAuth } from '@features/auth/hooks/useAuth';
import { User } from '@entities/user/types/User';

// ❌ WRONG - Layer index imports
import { Button } from '@shared/ui';
import { useAuth } from '@features/auth';
import { User } from '@entities/user';
```

---

## 📁 Layer-Specific Patterns

### **Pages Layer Patterns**

```typescript
// pages/home/HomePage.tsx
import * as React from 'react';
import { PageLayout } from '@shared/ui/PageLayout';
import { HeroWidget } from '@widgets/Hero';
import { FeaturesWidget } from '@widgets/Features';

export function HomePage() {
  return (
    <PageLayout title="Home" description="Application home page">
      <HeroWidget />
      <FeaturesWidget />
    </PageLayout>
  );
}
```

### **Widgets Layer Patterns**

```typescript
// widgets/UserProfile/UserProfileWidget.tsx
import * as React from 'react';
import { UserCard } from '@entities/user/ui/UserCard';
import { EditProfileFeature } from '@features/profile/EditProfile';
import { useUserProfile } from './hooks/useUserProfile';

export function UserProfileWidget() {
  const { user, isLoading } = useUserProfile();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="user-profile-widget">
      <UserCard user={user} />
      <EditProfileFeature userId={user.id} />
    </div>
  );
}
```

### **Features Layer Patterns**

```typescript
// features/auth/LoginFeature/LoginFeature.tsx
import * as React from 'react';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { useLogin } from './hooks/useLogin';

export function LoginFeature() {
  const { credentials, setCredentials, login, isLoading } = useLogin();

  return (
    <form onSubmit={login}>
      <Input
        value={credentials.email}
        onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Email"
      />
      <Input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
        placeholder="Password"
      />
      <Button type="submit" loading={isLoading}>
        Login
      </Button>
    </form>
  );
}
```

### **Entities Layer Patterns**

```typescript
// entities/user/api/userApi.ts
import { apiRequest } from '@shared/api';
import type { User, CreateUserData } from '../types/User';

export const userApi = {
  getUser: (id: string): Promise<User> => apiRequest(`/users/${id}`),

  createUser: (data: CreateUserData): Promise<User> =>
    apiRequest('/users', { method: 'POST', body: data }),

  updateUser: (id: string, data: Partial<User>): Promise<User> =>
    apiRequest(`/users/${id}`, { method: 'PUT', body: data }),
};
```

### **Shared Layer Patterns**

```typescript
// shared/ui/Button/Button.tsx
import * as React from 'react';
import { cn } from '@shared/lib/utils';
import type { ButtonProps } from './types/ButtonProps';

export function Button({
  variant = 'primary',
  size = 'medium',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

---

## 🚀 Best Practices

### **Dependency Management**

1. **Follow the dependency flow**: pages → widgets → features → entities → shared
2. **No circular dependencies**: Never import from the same or higher layers
3. **Explicit imports**: Always import directly from component folders
4. **Public API**: Only export what's meant to be consumed by other layers

### **Component Design**

1. **Single Responsibility**: Each component has one clear purpose
2. **Composition over Inheritance**: Prefer composition patterns
3. **Props Interface**: Always define TypeScript interfaces for props
4. **Default Exports**: Use named exports for better tree-shaking

### **File Organization**

1. **Consistent Structure**: Every component follows LCS pattern
2. **Co-location**: Keep related files together
3. **Test Proximity**: Tests live next to the code they test
4. **Clear Naming**: File names should be descriptive and consistent

### **Cross-Layer Communication**

```typescript
// ✅ CORRECT - Widget using feature and entity
function UserDashboardWidget() {
  const user = useUser(); // from entities/user
  return (
    <div>
      <UserProfile user={user} />
      <EditUserFeature userId={user.id} />
    </div>
  );
}

// ✅ CORRECT - Feature using entity
function EditUserFeature({ userId }: { userId: string }) {
  const { user, updateUser } = useUser(userId); // from entities/user
  // Feature-specific logic here
}

// ❌ WRONG - Entity depending on feature
function User() {
  const editFeature = useEditUserFeature(); // ❌ Cannot import from features
}
```

---

## 🔧 Development Workflow

### **Creating New Components**

1. **Determine Layer**: Decide which FSD layer the component belongs to
2. **Create Structure**: Follow LCS pattern for folder organization
3. **Implement Component**: Write the main component following patterns
4. **Add Types**: Define TypeScript interfaces and types
5. **Write Tests**: Create comprehensive test coverage
6. **Document**: Add to component documentation if public API

### **Refactoring Components**

1. **Check Dependencies**: Ensure no layer violations after changes
2. **Update Imports**: Verify all imports still follow direct import strategy
3. **Test Impact**: Run tests to verify no breaking changes
4. **Update Documentation**: Reflect changes in relevant documentation

### **Adding New Features**

1. **Feature Planning**: Define the feature scope and requirements
2. **Entity Assessment**: Determine if new entities are needed
3. **UI Components**: Identify shared UI components required
4. **Integration Planning**: Plan how feature integrates with existing widgets
5. **Testing Strategy**: Define testing approach for the feature

---

## 📊 Architecture Validation

### **Dependency Rules Checking**

```bash
# Tool for checking FSD dependency violations
npm run check-dependencies

# Manual verification of imports
grep -r "from '@features" src/entities/  # Should return no results
grep -r "from '@widgets" src/features/   # Should return no results
```

### **Layer Health Metrics**

- **Circular Dependencies**: 0 (automated check)
- **Cross-Layer Violations**: 0 (automated check)
- **Component Complexity**: <200 lines per component
- **Test Coverage**: >90% for business logic

### **Code Quality Gates**

- All imports follow direct import strategy
- No layer index files exist
- All public APIs have TypeScript definitions
- All components follow LCS structure

---

## 🎯 Migration Strategy

### **From Traditional Structure**

1. **Identify Components**: Catalog existing components by responsibility
2. **Map to Layers**: Assign each component to appropriate FSD layer
3. **Restructure Gradually**: Move components layer by layer
4. **Update Imports**: Change all imports to direct import strategy
5. **Validate**: Run dependency checks and tests

### **Adding FSD to Existing Project**

1. **Create Layer Structure**: Set up FSD folder structure
2. **Move Shared Code First**: Start with utilities and common components
3. **Extract Entities**: Move data models and basic operations
4. **Identify Features**: Extract business logic into feature components
5. **Compose Widgets**: Create composite components from features
6. **Restructure Pages**: Update pages to use widgets and features

---

**📅 Last Updated**: Architecture documentation restructure  
**🔄 Next Review**: After layer-specific documentation completion  
**📖 Related Docs**:

- [File Structure Guide](./file-structure.md)
- [Tech Stack Decisions](../planning/decisions.md)
- [Layer Documentation](./layers/)

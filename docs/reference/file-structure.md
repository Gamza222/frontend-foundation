# 📁 File Structure & Organization Guide

> **Moved from**: `docs/FILE_STRUCTURE.md`  
> **Location**: `docs/reference/file-structure.md`

## 📋 Overview

This document provides a comprehensive guide to the file and folder structure of our Feature-Sliced Design (FSD) based React application, including naming conventions, organization patterns, and best practices.

## 🎯 Project Root Structure

```
abstract-team/
├── 📁 .storybook/          # Storybook configuration
├── 📁 .next/               # Next.js build output (auto-generated)
├── 📁 config/              # Configuration files and setup
│   ├── 📁 jest/            # Jest testing configuration
│   └── 📁 storybook/       # Storybook setup files
├── 📁 docs/                # Project documentation
│   ├── 📁 architecture/    # Architecture documentation
│   ├── 📁 development/     # Development guides
│   ├── 📁 implementation/  # Implementation guides
│   ├── 📁 planning/        # Project planning docs
│   ├── 📁 reference/       # Reference documentation
│   └── README.md           # Documentation index
├── 📁 public/              # Static assets
├── 📁 src/                 # Source code (FSD structure)
│   ├── 📁 app/             # Application layer
│   ├── 📁 pages/           # Pages layer
│   ├── 📁 widgets/         # Widgets layer
│   ├── 📁 features/        # Features layer
│   ├── 📁 entities/        # Entities layer
│   └── 📁 shared/          # Shared layer
├── 📄 package.json         # Dependencies and scripts
├── 📄 tsconfig.json        # TypeScript configuration
├── 📄 next.config.js       # Next.js configuration
├── 📄 jest.config.js       # Jest configuration entry
├── 📄 .eslintrc.json       # ESLint configuration
├── 📄 .prettierrc          # Prettier configuration
├── 📄 .gitignore           # Git ignore rules
└── 📄 README.md            # Project overview
```

## 🏗️ FSD Layer Structure

### **Application Layer** (`src/app/`)

**Purpose**: Application initialization, global providers, routing setup

```
src/app/
├── 📄 layout.tsx           # Root layout component
├── 📄 page.tsx             # Home page component
├── 📄 loading.tsx          # Global loading UI
├── 📄 error.tsx            # Global error UI
├── 📄 not-found.tsx        # 404 page
├── 📄 global-error.tsx     # Global error boundary
├── 📁 globals.css          # Global styles
├── 📁 providers/           # Application providers
│   ├── 📄 index.ts         # Combined providers export
│   ├── 📁 theme/           # Theme provider logic
│   ├── 📁 store/           # Store provider logic
│   └── 📁 auth/            # Auth provider logic
└── 📁 (routes)/            # Route groups
    ├── 📁 dashboard/       # Dashboard route group
    ├── 📁 auth/            # Authentication routes
    └── 📁 profile/         # Profile routes
```

### **Pages Layer** (`src/pages/`)

**Purpose**: Page components and page-specific logic

```
src/pages/
├── 📁 home/
│   ├── 📄 index.ts         # Export point
│   ├── 📄 HomePage.tsx     # Main page component
│   ├── 📁 ui/              # Page UI components
│   ├── 📁 model/           # Page state/logic
│   └── 📁 __tests__/       # Page tests
├── 📁 dashboard/
│   ├── 📄 index.ts
│   ├── 📄 DashboardPage.tsx
│   ├── 📁 ui/
│   ├── 📁 model/
│   └── 📁 __tests__/
└── 📁 profile/
    ├── 📄 index.ts
    ├── 📄 ProfilePage.tsx
    ├── 📁 ui/
    ├── 📁 model/
    └── 📁 __tests__/
```

### **Widgets Layer** (`src/widgets/`)

**Purpose**: Composite UI blocks that combine features and entities

```
src/widgets/
├── 📁 Header/
│   ├── 📄 index.ts         # Export point
│   ├── 📄 Header.tsx       # Main widget component
│   ├── 📁 ui/              # Widget UI components
│   │   ├── 📄 Navigation.tsx
│   │   ├── 📄 UserMenu.tsx
│   │   └── 📄 Logo.tsx
│   ├── 📁 model/           # Widget state/logic
│   │   ├── 📄 useHeader.ts
│   │   └── 📄 header.types.ts
│   └── 📁 __tests__/       # Widget tests
├── 📁 Sidebar/
│   ├── 📄 index.ts
│   ├── 📄 Sidebar.tsx
│   ├── 📁 ui/
│   ├── 📁 model/
│   └── 📁 __tests__/
└── 📁 Footer/
    ├── 📄 index.ts
    ├── 📄 Footer.tsx
    ├── 📁 ui/
    ├── 📁 model/
    └── 📁 __tests__/
```

### **Features Layer** (`src/features/`)

**Purpose**: Business features and user interaction flows

```
src/features/
├── 📁 authentication/
│   ├── 📁 login/
│   │   ├── 📄 index.ts     # Export point
│   │   ├── 📄 LoginForm.tsx
│   │   ├── 📁 ui/          # Feature UI components
│   │   ├── 📁 model/       # Feature state/logic
│   │   ├── 📁 api/         # Feature API calls
│   │   └── 📁 __tests__/   # Feature tests
│   ├── 📁 logout/
│   │   ├── 📄 index.ts
│   │   ├── 📄 LogoutButton.tsx
│   │   ├── 📁 model/
│   │   └── 📁 __tests__/
│   └── 📁 registration/
│       ├── 📄 index.ts
│       ├── 📄 RegistrationForm.tsx
│       ├── 📁 ui/
│       ├── 📁 model/
│       ├── 📁 api/
│       └── 📁 __tests__/
├── 📁 profile/
│   ├── 📁 edit-profile/
│   ├── 📁 view-profile/
│   └── 📁 delete-profile/
└── 📁 notifications/
    ├── 📁 send-notification/
    ├── 📁 view-notifications/
    └── 📁 notification-settings/
```

### **Entities Layer** (`src/entities/`)

**Purpose**: Business entities and core data models

```
src/entities/
├── 📁 user/
│   ├── 📄 index.ts         # Export point
│   ├── 📁 model/           # Entity model and logic
│   │   ├── 📄 user.types.ts
│   │   ├── 📄 user.store.ts
│   │   ├── 📄 user.utils.ts
│   │   └── 📄 user.constants.ts
│   ├── 📁 api/             # Entity API methods
│   │   ├── 📄 userApi.ts
│   │   └── 📄 userQueries.ts
│   ├── 📁 ui/              # Basic entity UI components
│   │   ├── 📄 UserCard.tsx
│   │   ├── 📄 UserAvatar.tsx
│   │   └── 📄 UserBadge.tsx
│   └── 📁 __tests__/       # Entity tests
├── 📁 session/
│   ├── 📄 index.ts
│   ├── 📁 model/
│   ├── 📁 api/
│   └── 📁 __tests__/
├── 📁 post/
│   ├── 📄 index.ts
│   ├── 📁 model/
│   ├── 📁 api/
│   ├── 📁 ui/
│   └── 📁 __tests__/
└── 📁 organization/
    ├── 📄 index.ts
    ├── 📁 model/
    ├── 📁 api/
    ├── 📁 ui/
    └── 📁 __tests__/
```

### **Shared Layer** (`src/shared/`)

**Purpose**: Reusable code, utilities, and components used across the application

```
src/shared/
├── 📁 ui/                  # Simple UI components only (max 4 files each)
│   ├── 📁 Button/
│   │   ├── 📄 Button.tsx   # All-in-one: component + types
│   │   ├── 📄 Button.scss  # Styles (optional)
│   │   ├── 📄 Button.stories.tsx # Storybook (optional)
│   │   └── 📄 Button.test.tsx    # Tests
│   ├── 📁 Input/
│   ├── 📁 Card/
│   └── 📁 Icon/
├── 📁 lib/                 # Utilities and helpers
│   ├── 📁 utils/
│   │   ├── 📄 index.ts
│   │   ├── 📄 formatters.ts
│   │   ├── 📄 validators.ts
│   │   └── 📄 helpers.ts
│   ├── 📁 hooks/
│   │   ├── 📄 index.ts
│   │   ├── 📄 useLocalStorage.ts
│   │   ├── 📄 useDebounce.ts
│   │   └── 📄 useApi.ts
│   ├── 📁 react/           # React-specific utilities
│   │   ├── 📁 suspense/    # Suspense utilities
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📁 wrappers/
│   │   │   ├── 📁 utilities/
│   │   │   ├── 📁 fallbacks/
│   │   │   └── 📁 __tests__/
│   │   └── 📁 error-boundary/
│   │       ├── 📄 index.ts
│   │       ├── 📁 boundaries/
│   │       ├── 📁 hooks/
│   │       ├── 📁 utils/
│   │       └── 📁 __tests__/
│   └── 📁 contexts/
├── 📁 api/                 # Base API configuration
│   ├── 📄 index.ts
│   ├── 📄 client.ts
│   ├── 📄 types.ts
│   ├── 📄 interceptors.ts
│   └── 📁 __tests__/
├── 📁 config/              # Configuration and constants
│   ├── 📁 env/
│   │   ├── 📄 index.ts
│   │   ├── 📄 env.types.ts
│   │   └── 📄 env.validation.ts
│   ├── 📁 constants/
│   │   ├── 📄 index.ts
│   │   ├── 📄 app.constants.ts
│   │   └── 📄 api.constants.ts
│   └── 📁 theme/
│       ├── 📄 index.ts
│       ├── 📄 theme.types.ts
│       └── 📄 theme.config.ts
├── 📁 types/               # Common TypeScript types
│   ├── 📄 index.ts
│   ├── 📄 common.types.ts
│   ├── 📄 api.types.ts
│   └── 📄 ui.types.ts
└── 📁 assets/              # Static assets
    ├── 📁 images/
    ├── 📁 icons/
    ├── 📁 fonts/
    └── 📁 styles/
```

## 🎨 Logic Component Structure (LCS)

Every component follows the same internal organization pattern:

```
ComponentName/
├── 📄 index.ts             # Single export point
├── 📄 ComponentName.tsx    # Main component implementation
├── 📁 hooks/               # Component-specific hooks (if any)
│   ├── 📄 useComponentData.ts
│   └── 📄 useComponentLogic.ts
├── 📁 utils/               # Component-specific utilities (if any)
│   ├── 📄 transformData.ts
│   └── 📄 validateInput.ts
├── 📁 types/               # Component-specific types (if any)
│   ├── 📄 ComponentProps.ts
│   └── 📄 ComponentData.ts
├── 📄 ComponentName.stories.tsx # Storybook stories (UI components)
├── 📄 ComponentName.module.scss # Styles (if using CSS modules)
└── 📁 __tests__/           # Component tests
    ├── 📄 ComponentName.test.tsx
    ├── 📄 hooks.test.ts
    └── 📄 utils.test.ts
```

## 📝 Naming Conventions

### **Files and Folders**

- **Components**: PascalCase (`UserProfile.tsx`, `LoginForm.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useAuth.ts`, `useUserData.ts`)
- **Utilities**: camelCase (`formatDate.ts`, `validateEmail.ts`)
- **Types**: camelCase with '.types' suffix (`user.types.ts`, `api.types.ts`)
- **Constants**: camelCase with '.constants' suffix (`app.constants.ts`)
- **Folders**: kebab-case (`user-profile/`, `login-form/`)
- **Test files**: Same as source + `.test` or `.spec` (`Button.test.tsx`)
- **Story files**: Same as component + `.stories` (`Button.stories.tsx`)

### **Import/Export Patterns**

```typescript
// ✅ CORRECT - Direct component imports
import { Button } from '@shared/ui/Button';
import { UserCard } from '@entities/user/ui/UserCard';
import { useAuth } from '@features/authentication/login/hooks/useAuth';

// ❌ WRONG - Layer index imports (we don't use these)
import { Button } from '@shared/ui';
import { UserCard } from '@entities/user';
import { useAuth } from '@features/authentication';
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

## 🔧 Configuration Files Structure

### **Config Directory** (`config/`)

```
config/
├── 📁 jest/
│   ├── 📄 jest.config.ts   # Jest configuration
│   ├── 📄 setupTests.ts    # Test environment setup
│   └── 📁 mocks/           # Test mocks
│       ├── 📄 next.mock.ts
│       ├── 📄 router.mock.ts
│       └── 📄 api.mock.ts
└── 📁 storybook/
    ├── 📄 main.ts          # Storybook main config
    ├── 📄 preview.ts       # Storybook preview config
    └── 📄 webpack.config.ts # Custom webpack config
```

### **Documentation Structure** (`docs/`)

```
docs/
├── 📄 README.md            # Documentation index
├── 📁 architecture/        # Architecture documentation
│   ├── 📄 fsd-architecture.md
│   └── 📁 layers/
│       ├── 📄 pages-layer.md
│       ├── 📄 features-layer.md
│       ├── 📄 entities-layer.md
│       ├── 📄 widgets-layer.md
│       └── 📄 shared-layer.md
├── 📁 development/         # Development guides
│   ├── 📄 reusability-guide.md
│   ├── 📄 testing-workflow.md
│   └── 📁 patterns/
│       ├── 📄 component-patterns.md
│       ├── 📄 hook-patterns.md
│       └── 📄 state-patterns.md
├── 📁 implementation/      # Implementation guides
│   ├── 📁 react/
│   │   ├── 📄 suspense-guide.md
│   │   └── 📄 error-handling.md
│   ├── 📁 state-management/
│   ├── 📁 styling/
│   └── 📁 testing/
├── 📁 planning/            # Project planning
│   ├── 📄 tasks.md
│   ├── 📄 roadmap.md
│   └── 📄 decisions.md
├── 📁 reference/           # Reference documentation
│   ├── 📄 tech-stack.md
│   └── 📄 file-structure.md
└── 📄 HOW_TO_DOCUMENT.md   # Meta-documentation guide
```

## 🎯 Best Practices

### **File Organization**

1. **Single Responsibility**: Each file should have one clear purpose
2. **Consistent Naming**: Follow established naming conventions
3. **Logical Grouping**: Group related files together
4. **Clear Hierarchies**: Use folder structure to show relationships
5. **Index Files**: Use index.ts for clean imports (Logic Component level only)

### **Import Organization**

```typescript
// ✅ Import order example
// 1. External libraries
import React from 'react';
import { NextPage } from 'next';

// 2. Internal imports (by layer hierarchy)
import { Layout } from '@widgets/Layout';
import { UserProfile } from '@features/profile/view-profile';
import { User } from '@entities/user';
import { Button } from '@shared/ui/Button';
import { formatDate } from '@shared/lib/utils';

// 3. Relative imports
import { useLocalState } from './hooks/useLocalState';
import { ComponentProps } from './types/ComponentProps';
```

### **Testing File Organization**

```
Component/
├── Component.tsx
├── Component.stories.tsx
└── __tests__/
    ├── Component.test.tsx      # Component tests
    ├── Component.integration.test.tsx # Integration tests
    ├── hooks.test.ts           # Hook tests
    └── utils.test.ts           # Utility tests
```

## 🚨 Common Anti-Patterns to Avoid

### **❌ Wrong File Structure**

```
// DON'T create layer indexes
src/shared/index.ts         # ❌ Layer index
src/features/index.ts       # ❌ Layer index

// DON'T mix concerns in file names
UserProfileLoginForm.tsx    # ❌ Too specific/mixed concerns
utils.ts                   # ❌ Too generic

// DON'T create deep nested structures without purpose
src/shared/ui/components/forms/inputs/text/TextInput.tsx # ❌ Too deep
```

### **✅ Correct File Structure**

```
// DO use Logic Component Structure
src/shared/ui/Button/index.ts           # ✅ Component index
src/features/authentication/login/      # ✅ Clear feature separation

// DO use clear, descriptive names
LoginForm.tsx                          # ✅ Clear purpose
formatDate.ts                          # ✅ Specific utility

// DO keep reasonable depth
src/shared/ui/Button/Button.tsx        # ✅ Reasonable structure
```

## 📊 File Structure Metrics

### **Target Metrics**

- **Maximum folder depth**: 4-5 levels
- **Files per folder**: 3-10 files (excluding **tests**)
- **Component size**: <300 lines
- **Index file size**: <20 lines
- **Test coverage**: >80% for shared, >70% for features

### **Monitoring Tools**

```bash
# Check file structure compliance
npm run lint:structure

# Analyze component complexity
npm run analyze:components

# Check import patterns
npm run lint:imports

# Generate structure documentation
npm run docs:structure
```

---

**Last Updated**: Documentation restructuring completion  
**Next Review**: After next architecture changes

# Abstract Team Frontend Foundation

A robust, scalable frontend foundation built with **Feature-Sliced Design (FSD)**, **Next.js 15**, **TypeScript**, **GraphQL**, **Jest**, and **Storybook**.

## 🏗️ Architecture Overview

This project follows **Feature-Sliced Design** methodology with a strict file structure system that emphasizes:

- **Single responsibility** - Each file has one clear purpose
- **Logical organization** - Deep nesting by component relationships
- **Reusability clarity** - Clear distinction between shared and feature-specific code

## 📁 File Structure System

### Core Principle: Single Index Pattern

Each logic component has **ONLY ONE index.ts in its root** that exports everything needed externally. All implementation details are organized in subfolders by logical purpose.

### Two-Approach System

**🔄 Approach 1: Reusable Components** → Place in `shared/` layers

- UI components used across multiple features
- Utility functions used in different parts of the app
- Business logic that's domain-agnostic

**🎯 Approach 2: Feature-Specific Components** → Keep in feature/page folder

- Components tightly coupled to specific feature
- Business logic specific to one domain
- Implementation details that won't be reused

### Deep Nesting by Logical Purpose

Create nested folder structures that mirror component relationships:

```
src/shared/ui/Spinner/
├── index.ts                    # exports { Spinner }
├── components/
│   └── Spinner.tsx
├── picture/                    # Spinner needs picture
│   ├── SpinnerImage.tsx
│   ├── eyes/                   # Picture needs eyes
│   │   ├── EyeComponent.tsx
│   │   └── EyeAnimation.tsx
│   └── background/             # Picture needs background
│       └── BackgroundLayer.tsx
├── animations/                 # Spinner needs animations
│   ├── RotateAnimation.ts
│   └── FadeAnimation.ts
└── __tests__/
    └── Spinner.test.tsx
```

**Key Principles:**

- **Nest as deep as needed** - if eyes need pupils, create `eyes/pupils/` folder
- **Organize by logical relationships** - related functionality stays together
- **Each level serves a purpose** - don't create unnecessary nesting
- **Maintain single index.ts** - only at the root component level

### Universal Rules

✅ **DO:**

- **ONLY ONE index.ts** exists in the root of each logic component
- **ROOT CONTAINS ONLY index.ts** - all other files go in subfolders
- **USE SUBFOLDERS** to organize files by logical purpose
- **NEST AS DEEP AS NEEDED** - create folder hierarchies that match logical relationships

❌ **DON'T:**

- **NO index.ts FILES** in any subfolders
- **NO LAYER INDEXES** (no ui/index.ts, lib/index.ts, etc.)
- **NO GLOBAL INDEXES** (no shared/index.ts)

### Import Strategy

```typescript
// ✅ CORRECT - Direct path to logic component
import { SuspenseWrapper } from '@shared/ui/SuspenseWrapper';
import { lazyWithRetry } from '@shared/lib/suspense';
import { Button } from '@shared/ui/Button';

// ❌ WRONG - No layer indexes or global indexes
import { SuspenseWrapper } from '@shared/ui'; // NO
import { SuspenseWrapper } from '@shared'; // NO
```

## 🧪 Testing & Mocking System

### Jest Configuration Structure

Our Jest setup is modular and reusable:

```
config/jest/
├── jest.config.ts              # Main Jest configuration
├── config/lib/                 # Modular configuration
│   ├── base.config.ts          # Base Jest settings
│   ├── coverage.config.ts      # Coverage configuration
│   └── paths.config.ts         # Path mapping
├── setup/                      # Setup files
│   ├── index.ts               # Main setup file
│   └── global/setup.ts        # Global setup
└── mocks/                     # 🎯 CENTRALIZED MOCKS (REUSE THESE!)
    ├── api/                   # API mocks
    ├── browser/               # Browser API mocks
    │   ├── index.ts
    │   └── lib/
    │       ├── media/         # IntersectionObserver, matchMedia
    │       ├── storage/       # localStorage, sessionStorage
    │       └── navigator/     # Navigator API
    └── assets/                # Asset mocks (images, SVGs, files)
```

### 🎯 Testing Best Practices

#### ✅ DO: Use Existing Mocks

```typescript
// ✅ CORRECT - Use existing mocks from config/jest/mocks/
import { createStorageMock, IntersectionObserverMock } from '@/config/jest/mocks/browser';

describe('Component', () => {
  it('uses localStorage', () => {
    const storageMock = createStorageMock();
    // Use the centralized mock
  });
});
```

#### ❌ DON'T: Create Duplicate Mocks

```typescript
// ❌ WRONG - Don't create local mocks when centralized ones exist
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  // ... duplicating existing storage mock
};
```

#### ✅ DO: Add New Mocks to Central Location

When you need a new mock:

1. **Add to `config/jest/mocks/`** - Don't create in your test file
2. **Export from appropriate index** - Make it reusable
3. **Follow the existing pattern** - Use factory functions when possible

```typescript
// config/jest/mocks/browser/lib/clipboard/clipboard.mock.ts
export const createClipboardMock = () => ({
  writeText: jest.fn(),
  readText: jest.fn(),
});

// config/jest/mocks/browser/index.ts
export { createClipboardMock } from './lib/clipboard/clipboard.mock';
```

### Available Mocks

**Browser APIs:**

- `createStorageMock()` - localStorage/sessionStorage
- `IntersectionObserverMock` - IntersectionObserver
- `createMatchMedia()` - window.matchMedia
- `navigatorMock` - Navigator API
- `createLocationMock()` - window.location

**Assets:**

- Image imports → `Image.mock.tsx`
- SVG imports → `Svg.mock.tsx`
- File imports → `file.mock.ts`

## 🚀 Technology Stack

**Core Framework:**

- **Next.js 15.x** - React framework with App Router
- **TypeScript 5.x** - Type safety and developer experience
- **React 18** - Latest React features including Suspense

**Data & State:**

- **GraphQL** - API layer with type generation
- **Apollo Client** - GraphQL client with caching
- **Zustand** - Lightweight state management

**Styling:**

- **Tailwind CSS** - Utility-first CSS framework
- **SCSS** - Enhanced CSS with variables and mixins
- **CSS Modules** - Scoped styling

**Testing:**

- **Jest** - Testing framework with extensive mocking
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - DOM testing matchers

**Documentation:**

- **Storybook 9.x** - Component documentation and testing
- **@storybook/addon-a11y** - Accessibility testing
- **@storybook/addon-docs** - Automated documentation

**Code Quality:**

- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality gates

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Testing
npm test                # Run tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format code with Prettier
npm run type-check      # Run TypeScript checks

# Documentation
npm run storybook       # Start Storybook
npm run build-storybook # Build Storybook

# Version Management
npm run version:patch   # Patch version (bug fixes)
npm run version:minor   # Minor version (new features)
npm run version:major   # Major version (breaking changes)
```

## 🏁 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Run tests:**

   ```bash
   npm test
   ```

4. **Start Storybook:**
   ```bash
   npm run storybook
   ```

## 🔧 Configuration Files

- **`next.config.js`** - Next.js configuration
- **`tailwind.config.ts`** - Tailwind CSS configuration
- **`tsconfig.json`** - TypeScript configuration with FSD path aliases
- **`config/jest/`** - Modular Jest configuration
- **`.storybook/`** - Storybook configuration
- **`.eslintrc.js`** - ESLint configuration
- **`.prettierrc`** - Prettier configuration

## 📋 Development Guidelines

### When to Use Shared vs Feature-Specific

**Use `shared/` when:**

- Component is used in 2+ different features
- Utility function has general purpose
- Business logic is domain-agnostic

**Keep in feature folder when:**

- Component is tightly coupled to one feature
- Logic is domain-specific
- Unlikely to be reused elsewhere

### File Naming Conventions

- **Components:** PascalCase (`Button.tsx`, `UserCard.tsx`)
- **Utilities:** camelCase (`formatDate.ts`, `apiHelpers.ts`)
- **Types:** PascalCase with `.types.ts` suffix (`User.types.ts`)
- **Tests:** Same name with `.test.tsx/.ts` suffix
- **Mocks:** Same name with `.mock.tsx/.ts` suffix

### Git Workflow

1. Create feature branch from `main`
2. Make changes following file structure principles
3. Write tests using existing mocks when possible
4. Run quality checks: `npm run lint && npm test`
5. Create pull request
6. After review, merge to `main`

## 🎯 Project Status

This is a **foundation project** designed to be:

- **Scalable** - Can grow from small to enterprise-level
- **Maintainable** - Clear structure and separation of concerns
- **Developer-friendly** - Excellent DX with TypeScript, testing, and documentation
- **Production-ready** - Includes all necessary tooling and best practices

## 📝 License

[License details to be added]

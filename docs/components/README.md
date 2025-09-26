# Components Guide

This guide covers all UI components and utilities available in the Fumo foundation.

## 🎨 UI Components

### Button Component

A versatile button component with multiple variants and states.

**Location**: `src/shared/ui/Button`

```tsx
import { Button } from '@/shared/ui/Button';
import { ButtonVariant, ButtonSize } from '@/shared/ui/Button/Button.types';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant={ButtonVariant.PRIMARY}>Primary</Button>
<Button variant={ButtonVariant.SECONDARY}>Secondary</Button>
<Button variant={ButtonVariant.DANGER}>Danger</Button>

// With sizes
<Button size={ButtonSize.SM}>Small</Button>
<Button size={ButtonSize.MD}>Medium</Button>
<Button size={ButtonSize.LG}>Large</Button>

// With states
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>

// With icons
<Button icon={<Icon />}>With Icon</Button>
```

**Props:**

| Prop        | Type            | Default     | Description             |
| ----------- | --------------- | ----------- | ----------------------- |
| `variant`   | `ButtonVariant` | `PRIMARY`   | Button style variant    |
| `size`      | `ButtonSize`    | `MD`        | Button size             |
| `loading`   | `boolean`       | `false`     | Shows loading spinner   |
| `disabled`  | `boolean`       | `false`     | Disables the button     |
| `fullWidth` | `boolean`       | `false`     | Makes button full width |
| `icon`      | `ReactNode`     | `undefined` | Icon to display         |

**Variants:**

- `PRIMARY` - Blue background, white text
- `SECONDARY` - Gray background, white text
- `DANGER` - Red background, white text

**Sizes:**

- `SM` - Small padding and font
- `MD` - Medium padding and font
- `LG` - Large padding and font

### Text Component

A semantic text component with typography variants.

**Location**: `src/shared/ui/Text`

```tsx
import { Text } from '@/shared/ui/Text';
import { TextVariant, TextSize, TextAlign } from '@/shared/ui/Text/Text.types';

// Basic usage
<Text>Hello World</Text>

// With variants
<Text variant={TextVariant.PRIMARY}>Primary text</Text>
<Text variant={TextVariant.SECONDARY}>Secondary text</Text>
<Text variant={TextVariant.ERROR}>Error text</Text>

// With sizes
<Text size={TextSize.SM}>Small text</Text>
<Text size={TextSize.MD}>Medium text</Text>
<Text size={TextSize.LG}>Large text</Text>

// With alignment
<Text align={TextAlign.LEFT}>Left aligned</Text>
<Text align={TextAlign.CENTER}>Center aligned</Text>
<Text align={TextAlign.RIGHT}>Right aligned</Text>

// As different HTML elements
<Text as="h1">Heading 1</Text>
<Text as="h2">Heading 2</Text>
<Text as="p">Paragraph</Text>
<Text as="span">Inline text</Text>
```

**Props:**

| Prop      | Type                          | Default   | Description            |
| --------- | ----------------------------- | --------- | ---------------------- |
| `variant` | `TextVariant`                 | `PRIMARY` | Text color variant     |
| `size`    | `TextSize`                    | `MD`      | Text size              |
| `align`   | `TextAlign`                   | `LEFT`    | Text alignment         |
| `as`      | `keyof JSX.IntrinsicElements` | `'p'`     | HTML element to render |

**Variants:**

- `PRIMARY` - Default text color
- `SECONDARY` - Muted text color
- `ERROR` - Error/red text color

**Sizes:**

- `SM` - Small font size
- `MD` - Medium font size
- `LG` - Large font size

## 🛠️ Utilities

### classNames Utility

A utility for conditionally joining CSS class names.

**Location**: `src/shared/lib/utils/classNames`

```tsx
import { classNames } from "@/shared/lib/utils/classNames";

// Basic usage
classNames("foo", "bar"); // 'foo bar'

// With conditions
classNames("foo", { bar: true, baz: false }); // 'foo bar'

// With arrays
classNames(["foo", "bar"]); // 'foo bar'

// Complex example
classNames("base-class", { active: isActive, disabled: isDisabled }, [
  "additional-class",
  className,
]);
```

### CVA (Class Variance Authority)

Type-safe component variants using CVA.

**Location**: `src/shared/lib/utils/cva`

```tsx
import { cva } from "class-variance-authority";

const buttonVariants = cva({
  base: "px-4 py-2 rounded font-medium",
  variants: {
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-500 text-white hover:bg-gray-600",
      danger: "bg-red-500 text-white hover:bg-red-600",
    },
    size: {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

// Usage
const buttonClass = buttonVariants({ variant: "primary", size: "lg" });
```

## 🎨 Styling System

### CSS Modules

Each component has its own CSS module for scoped styling.

```scss
// Button.module.scss
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.primary {
  background-color: #3b82f6;
  color: white;

  &:hover:not(:disabled) {
    background-color: #2563eb;
  }
}

.loading {
  position: relative;

  .spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
```

### Design Tokens

Consistent design tokens for colors, spacing, and typography.

```scss
// design-tokens/colors.scss
:root {
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --color-danger: #ef4444;
  --color-success: #10b981;
  --color-warning: #f59e0b;
}

// design-tokens/spacing.scss
:root {
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}
```

## 🧪 Testing Components

### Component Testing

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "@/shared/ui/Button";

test("renders button with text", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole("button")).toHaveTextContent("Click me");
});

test("applies variant class", () => {
  render(<Button variant={ButtonVariant.PRIMARY}>Primary</Button>);
  expect(screen.getByRole("button")).toHaveClass("primary");
});

test("shows loading state", () => {
  render(<Button loading>Loading</Button>);
  expect(screen.getByRole("button")).toHaveClass("loading");
  expect(screen.getByRole("button")).toBeDisabled();
});
```

### Accessibility Testing

```tsx
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "@/shared/ui/Button";

expect.extend(toHaveNoViolations);

test("button has no accessibility violations", async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 📚 Storybook Stories

### Button Stories

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Shared/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    loading: true,
  },
};
```

## 🎯 Best Practices

### Component Design

1. **Single Responsibility**: Each component should have one clear purpose
2. **Composition over Inheritance**: Build complex components from simple ones
3. **Props Interface**: Use TypeScript interfaces for clear prop contracts
4. **Default Props**: Provide sensible defaults for optional props

### Styling Guidelines

1. **CSS Modules**: Use scoped styles to avoid conflicts
2. **Design Tokens**: Use consistent design tokens for colors and spacing
3. **Responsive Design**: Mobile-first approach with breakpoints
4. **Accessibility**: Ensure proper contrast ratios and focus states

### Testing Strategy

1. **Unit Tests**: Test component behavior and props
2. **Accessibility Tests**: Ensure WCAG compliance
3. **Visual Tests**: Use Storybook for visual regression testing
4. **Integration Tests**: Test component interactions

## 🚀 Creating New Components

### Component Generator

Use the built-in generator to create new components:

```bash
npm run generate:component ComponentName shared ui "Description"
```

This creates:

- Component file with TypeScript
- CSS module file
- Test file
- Storybook story
- Type definitions

### Manual Creation

1. Create component directory: `src/shared/ui/NewComponent/`
2. Add component file: `NewComponent.tsx`
3. Add styles: `NewComponent.module.scss`
4. Add types: `NewComponent.types.ts`
5. Add tests: `NewComponent.test.tsx`
6. Add story: `NewComponent.stories.tsx`
7. Export from index: `index.ts`

---

**Next:** Learn about our [Infrastructure](../infrastructure/README.md) services and how to use them!

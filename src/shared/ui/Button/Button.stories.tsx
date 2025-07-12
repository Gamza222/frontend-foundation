import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonVariant, ButtonSize } from './Button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(ButtonVariant),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(ButtonSize),
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    size: ButtonSize.MD,
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    size: ButtonSize.MD,
    children: 'Secondary Button',
  },
};

export const Small: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    size: ButtonSize.SM,
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    size: ButtonSize.LG,
    children: 'Large Button',
  },
};

export const Loading: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    size: ButtonSize.MD,
    loading: true,
    children: 'Loading Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    size: ButtonSize.MD,
    disabled: true,
    children: 'Disabled Button',
  },
};

export const FullWidth: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    size: ButtonSize.MD,
    fullWidth: true,
    children: 'Full Width Button',
  },
};

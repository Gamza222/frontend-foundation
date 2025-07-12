import type { Meta, StoryObj } from '@storybook/react';
import { Text, TextVariant } from './Text';

const meta: Meta<typeof Text> = {
  title: 'shared/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(TextVariant),
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'p', 'span'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    as: 'p',
    variant: TextVariant.PRIMARY,
    children: 'This is the primary text style.',
  },
};

export const Secondary: Story = {
  args: {
    as: 'p',
    variant: TextVariant.SECONDARY,
    children: 'This is the secondary text style, often used for subtitles or captions.',
  },
};

export const Error: Story = {
  args: {
    as: 'span',
    variant: TextVariant.ERROR,
    children: 'This text is for displaying error messages.',
  },
};

export const Heading: Story = {
  args: {
    as: 'h1',
    variant: TextVariant.PRIMARY,
    children: 'This is an H1 Heading',
  },
};

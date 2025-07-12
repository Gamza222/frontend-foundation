import { cva } from '@/shared/lib/utils/cva/cva';
import styles from './Button.module.scss';
import { ButtonSize, ButtonVariant } from './Button.types';

export const buttonVariants = cva({
  base: ['inline-flex items-center justify-center rounded-md font-medium transition-colors'],
  variants: {
    variant: {
      [ButtonVariant.PRIMARY]: `${styles.primary ?? ''} border-transparent text-white bg-blue-600 hover:bg-blue-700`,
      [ButtonVariant.SECONDARY]: `${styles.secondary ?? ''} border-gray-300 text-gray-700 bg-white hover:bg-gray-50`,
    },
    size: {
      [ButtonSize.SM]: 'h-9 px-3',
      [ButtonSize.MD]: 'h-10 py-2 px-4',
      [ButtonSize.LG]: 'h-11 px-8',
    },
    hasIcon: {
      true: 'gap-2',
    },
  },
  compoundVariants: [
    {
      size: ButtonSize.SM,
      hasIcon: 'true',
      className: 'px-2',
    },
    {
      size: ButtonSize.MD,
      hasIcon: 'true',
      className: 'px-3',
    },
    {
      size: ButtonSize.LG,
      hasIcon: 'true',
      className: 'px-6',
    },
  ],
  defaultVariants: {
    variant: ButtonVariant.PRIMARY,
    size: ButtonSize.MD,
  },
});

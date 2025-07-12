import { cva } from '@/shared/lib/utils/cva/cva';
import styles from './Text.module.scss';
import { TextAlign, TextSize, TextVariant } from './Text.types';

export const textVariants = cva({
  base: '',
  variants: {
    variant: {
      [TextVariant.PRIMARY]: styles.primary ?? '',
      [TextVariant.SECONDARY]: styles.secondary ?? '',
      [TextVariant.ERROR]: styles.error ?? '',
    },
    align: {
      [TextAlign.LEFT]: 'text-left',
      [TextAlign.CENTER]: 'text-center',
      [TextAlign.RIGHT]: 'text-right',
    },
    size: {
      [TextSize.SM]: 'text-sm',
      [TextSize.MD]: 'text-base',
      [TextSize.LG]: 'text-lg',
    },
  },
  defaultVariants: {
    variant: TextVariant.PRIMARY,
    size: TextSize.MD,
    align: TextAlign.LEFT,
  },
});

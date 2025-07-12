import React from 'react';
import styles from './Text.module.scss';
import { classNames } from '@/shared/lib/utils/classNames/classNames';
import { textVariants } from './Text.variants';
import { TextProps } from './Text.types';

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  variant,
  align,
  size,
  children,
  className,
  ...props
}) => {
  const classes = classNames(styles.text ?? '', {}, [
    ...textVariants({ variant, align, size }),
    className,
  ]);

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

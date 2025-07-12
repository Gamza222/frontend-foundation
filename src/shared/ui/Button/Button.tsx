import React from 'react';
import styles from './Button.module.scss';
import { classNames } from '@/shared/lib/utils/classNames/classNames';
import { buttonVariants } from './Button.variants';
import { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant,
    size,
    fullWidth = false,
    loading = false,
    disabled = false,
    type = 'button',
    children,
    className,
    icon,
    ...restProps
  } = props;

  const finalClasses = classNames(
    styles.button ?? '',
    {
      'w-full': fullWidth,
      'opacity-50 cursor-not-allowed': disabled || loading,
      [styles.loading ?? '']: loading,
    },
    [...buttonVariants({ variant, size, hasIcon: !!icon }), className]
  );

  return (
    <button
      ref={ref}
      type={type}
      className={finalClasses}
      disabled={disabled || loading}
      {...restProps}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon}
      {children && <span>{children}</span>}
    </button>
  );
});

Button.displayName = 'Button';

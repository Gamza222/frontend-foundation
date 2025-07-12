import { classNames } from '@/shared/lib/utils/classNames/classNames';
import styles from './DefaultSuspenseFallback.module.scss';

export enum SpinnerSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum MinHeight {
  MINIMAL = 'minimal',
  COMPACT = 'compact',
  SPACIOUS = 'spacious',
}

export interface DefaultSuspenseFallbackProps {
  minHeight?: MinHeight;
  spinnerSize?: SpinnerSize;
  className?: string;
}

export const DefaultSuspenseFallback = ({
  minHeight = MinHeight.COMPACT,
  spinnerSize = SpinnerSize.MEDIUM,
  className = '',
}: DefaultSuspenseFallbackProps) => {
  // Tailwind size classes for spinners
  const tailwindSizeClasses = {
    [SpinnerSize.SMALL]: 'h-6 w-6',
    [SpinnerSize.MEDIUM]: 'h-8 w-8',
    [SpinnerSize.LARGE]: 'h-12 w-12',
  };

  // Combine SCSS module classes
  const scssClasses = [styles.suspenseFallback, styles[minHeight]].filter(Boolean).join(' ');

  const containerClasses = classNames(
    // Base Tailwind utilities
    'flex items-center justify-center',
    {},
    [scssClasses, className]
  );

  const spinnerClasses = classNames(
    // Base Tailwind utilities
    'animate-spin rounded-full border-b-2 border-blue-600',
    {},
    [
      // SCSS module classes
      styles.spinner,
      styles[spinnerSize],
      // Tailwind size classes
      tailwindSizeClasses[spinnerSize],
    ]
  );

  return (
    <div className={containerClasses}>
      <div className={spinnerClasses}></div>
    </div>
  );
};

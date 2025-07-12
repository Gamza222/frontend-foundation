import { classNames } from '@/shared/lib/utils/classNames/classNames';
import styles from './ComponentLoadingFallback.module.scss';

export enum ComponentHeight {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum ComponentSpinnerSize {
  TINY = 'tiny',
  SMALL = 'small',
  MEDIUM = 'medium',
}

export interface ComponentLoadingFallbackProps {
  height?: ComponentHeight;
  text?: string;
  className?: string;
  spinnerSize?: ComponentSpinnerSize;
}

export const ComponentLoadingFallback = ({
  height = ComponentHeight.MEDIUM,
  text = 'Loading...',
  className = '',
  spinnerSize = ComponentSpinnerSize.SMALL,
}: ComponentLoadingFallbackProps) => {
  // Tailwind size classes for spinners
  const tailwindSizeClasses = {
    [ComponentSpinnerSize.TINY]: 'h-3 w-3',
    [ComponentSpinnerSize.SMALL]: 'h-4 w-4',
    [ComponentSpinnerSize.MEDIUM]: 'h-6 w-6',
  };

  // Combine SCSS module classes
  const scssClasses = [styles.componentLoading, styles[height]].filter(Boolean).join(' ');

  const containerClasses = classNames(
    // Base Tailwind utilities
    'flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200',
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
      <div className="flex items-center space-x-2">
        <div className={spinnerClasses}></div>
        <span className={classNames('text-sm text-gray-500', {}, [styles.message])}>{text}</span>
      </div>
    </div>
  );
};

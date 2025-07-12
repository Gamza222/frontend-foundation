import { classNames } from '@/shared/lib/utils/classNames/classNames';
import styles from './PageLoadingFallback.module.scss';

export enum PageLoadingBgColor {
  GRADIENT = 'gradient',
  SOLID = 'solid',
  TRANSPARENT = 'transparent',
}

export interface PageLoadingFallbackProps {
  text?: string;
  showSkeleton?: boolean;
  bgColor?: PageLoadingBgColor;
}

export const PageLoadingFallback = ({
  text = 'Loading...',
  showSkeleton = true,
  bgColor = PageLoadingBgColor.SOLID,
}: PageLoadingFallbackProps) => {
  // Combine SCSS module classes
  const scssClasses = [styles.pageLoading, styles[bgColor]].filter(Boolean).join(' ');

  const containerClasses = classNames(
    // Base Tailwind utilities
    'flex flex-col items-center justify-center min-h-screen',
    {},
    [scssClasses]
  );

  return (
    <div className={containerClasses}>
      <div className={classNames('flex flex-col items-center', {}, [styles.content])}>
        {/* Enhanced loading spinner with SCSS styling */}
        <div
          className={classNames(
            'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600',
            {},
            [styles.spinner]
          )}
        ></div>

        {/* Loading text with SCSS styling */}
        <div className={classNames('text-gray-600 text-lg font-medium', {}, [styles.message])}>
          {text}
        </div>

        {/* Loading skeleton bars with enhanced styling */}
        {showSkeleton && (
          <div className="space-y-2 w-64">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        )}
      </div>
    </div>
  );
};

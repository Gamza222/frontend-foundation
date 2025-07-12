import * as React from 'react';
import './button.css';

interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

const getSizeClasses = (size: string) => {
  switch (size) {
    case 'small':
      return 'px-4 py-2 text-sm';
    case 'large':
      return 'px-6 py-3 text-lg';
    default:
      return 'px-5 py-2.5 text-base';
  }
};

/** Primary UI component for user interaction */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  const mode = primary
    ? 'bg-blue-500 text-white'
    : 'bg-transparent text-blue-500 border border-blue-500';

  return (
    <button
      type="button"
      className={['font-semibold rounded cursor-pointer border-0', getSizeClasses(size), mode].join(
        ' '
      )}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

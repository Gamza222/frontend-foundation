import * as _React from 'react';
import { SvgMockPropsInterface } from '../types/types';

export const SvgMock: React.FC<SvgMockPropsInterface> = ({ children, ...rest }) => (
  <svg data-testid="svg-mock" {...rest}>
    {children || 'Mock SVG'}
  </svg>
);

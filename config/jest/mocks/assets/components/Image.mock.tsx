import * as _React from 'react';
import { ImageMockPropsInterface } from '../types/types';

export const ImageMock: React.FC<ImageMockPropsInterface> = ({ src, alt, ...props }) => (
  <div data-testid="image-mock" data-src={src} data-alt={alt} {...props}>
    Mock Image: {alt}
  </div>
);

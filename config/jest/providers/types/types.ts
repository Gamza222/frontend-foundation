import type { NextRouter } from 'next/router';
import type { ReactNode } from 'react';

export interface TestWrapperPropsInterface {
  children: ReactNode;
  router?: Partial<NextRouter>;
}

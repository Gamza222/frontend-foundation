import type { Config } from '@jest/types';
import { resolve } from 'path';

export const baseConfig: Config.InitialOptions = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: [resolve(__dirname, '../../setup/index.ts')],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testRegex: '.*\\.test\\.(ts|tsx)$',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        // TypeScript configuration for Jest
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          skipLibCheck: true,
          strict: false, // Less strict for tests
          noImplicitAny: false, // Allow implicit any in tests
          noUnusedLocals: false, // Allow unused locals in tests
          noUnusedParameters: false, // Allow unused parameters in tests
          exactOptionalPropertyTypes: false, // Less strict for tests
          noImplicitReturns: false, // Allow implicit returns in tests
          noFallthroughCasesInSwitch: false, // Allow fallthrough in tests
          noUncheckedIndexedAccess: false, // Allow unchecked indexed access in tests
          noImplicitOverride: false, // Allow implicit overrides in tests
        },
        useESM: false,
      },
    ],
  },
  globalSetup: '<rootDir>/config/jest/setup/global/setup.ts',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',

    // Handle image imports
    '\\.(jpg|jpeg|png|gif|webp)$': '<rootDir>/config/jest/mocks/assets/components/Image.mock.tsx',

    // Handle SVG imports
    '\\.svg$': '<rootDir>/config/jest/mocks/assets/components/Svg.mock.tsx',

    // Handle other assets like fonts, videos, etc.
    '\\.(woff|woff2|eot|ttf|otf|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/mocks/assets/lib/file.mock.ts',

    // Path aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
  },
  verbose: true,
  // Additional Jest configuration for better TypeScript support
  preset: 'ts-jest',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};

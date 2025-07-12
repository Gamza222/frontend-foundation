/**
 * Global test setup for Jest
 */

// =================================================================
// JEST GLOBAL SETUP
//
// This file is executed before each test file.
// Use this for global mocks, polyfills, or any other setup
// that needs to be universally available across all tests.
// =================================================================

// This file should contain only logic that runs in a pure Node.js environment
// before the test framework is set up. For mocks that depend on the JSDOM
// environment or Jest's globals (like `expect`), use the `setupFilesAfterEnv`
// script instead.

const setupGlobalTests = (): void => {
  // Suppress specific console warnings in tests
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Each child in a list should have a unique "key" prop')
    ) {
      return;
    }
    originalWarn(...args);
  };
};

export default setupGlobalTests;

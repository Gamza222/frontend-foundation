import { NavigatorMockInterface } from '../../types/types';

export const navigatorMock: NavigatorMockInterface = {
  clipboard: {
    writeText: jest.fn(),
    readText: jest.fn(),
  },
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
};

// Allows properties to be modified in tests
Object.defineProperty(window, 'navigator', {
  value: navigatorMock,
  writable: true,
});

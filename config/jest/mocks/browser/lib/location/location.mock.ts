import { LocationMockInterface } from '../../types/types';

const createLocationMock = (initialUrl: string = 'http://localhost/'): LocationMockInterface => {
  const url = new URL(initialUrl);

  const locationMock: LocationMockInterface = {
    ...url,
    assign: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    ancestorOrigins: {
      length: 0,
      contains: () => false,
      item: () => null,
      [Symbol.iterator]: jest.fn(),
    },
    toString: () => url.toString(),
  };

  // Allows properties to be modified in tests
  Object.defineProperty(window, 'location', {
    value: locationMock,
    writable: true,
  });

  return locationMock;
};

// Initialize the global mock
createLocationMock();

export { createLocationMock };

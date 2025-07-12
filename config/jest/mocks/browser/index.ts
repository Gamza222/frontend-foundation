// Mock Implementations
export { IntersectionObserverMock } from './lib/media/intersection-observer.mock';
export { StorageMock } from './lib/storage/storage.mock';
export { navigatorMock } from './lib/navigator/navigator.mock';

// Mock Factory Functions
export { createMatchMedia } from './lib/media/match-media.mock';
export { createStorageMock } from './lib/storage/storage.mock';
export { createLocationMock } from './lib/location/location.mock';

// Mock Interfaces
export type {
  MediaQueryMockInterface,
  IntersectionObserverMockInterface,
  IntersectionObserverOptionsInterface,
  StorageMockInterface,
  LocationMockInterface,
  NavigatorMockInterface,
} from './types/types';

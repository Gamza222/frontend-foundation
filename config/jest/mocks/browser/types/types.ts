// Media Query Types
export interface MediaQueryMockInterface {
  matches: boolean;
  media: string;
  onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => void) | null;
  addListener: (callback: (event: MediaQueryListEvent) => void) => void;
  removeListener: (callback: (event: MediaQueryListEvent) => void) => void;
}

// Intersection Observer Types
export interface IntersectionObserverMockInterface {
  observe: (target: Element) => void;
  unobserve: (target: Element) => void;
  disconnect: () => void;
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  takeRecords: () => IntersectionObserverEntry[];
}

export interface IntersectionObserverOptionsInterface {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

// Storage Types
export interface StorageMockInterface {
  readonly length: number;
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
  key(index: number): string | null;
}

// Location Types
export interface LocationMockInterface extends Location {
  assign: jest.Mock;
  replace: jest.Mock;
  reload: jest.Mock;
  ancestorOrigins: DOMStringList;
}

// Navigator Types
export interface NavigatorMockInterface {
  readonly clipboard: {
    writeText: jest.Mock;
    readText: jest.Mock;
  };
  readonly userAgent: string;
}

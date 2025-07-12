import {
  IntersectionObserverMockInterface,
  IntersectionObserverOptionsInterface,
} from '../../types/types';

export class IntersectionObserverMock implements IntersectionObserverMockInterface {
  private targets = new Set<Element>();
  private callback: IntersectionObserverCallback;

  constructor(
    callback: IntersectionObserverCallback,
    private options: IntersectionObserverOptionsInterface = {}
  ) {
    this.callback = callback;
    this.root = options.root ?? null;
    this.rootMargin = options.rootMargin ?? '0px';
    this.thresholds = Array.isArray(options.threshold)
      ? options.threshold
      : [options.threshold ?? 0];
  }

  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;

  observe(target: Element): void {
    this.targets.add(target);
  }

  unobserve(target: Element): void {
    this.targets.delete(target);
  }

  disconnect(): void {
    this.targets.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  // Test helper to simulate intersection
  simulateIntersection(entries: IntersectionObserverEntry[]): void {
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

// Replace global IntersectionObserver
global.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;

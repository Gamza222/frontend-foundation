import { MediaQueryMockInterface } from '../../types/types';

class MatchMediaMock implements MediaQueryMockInterface {
  private listeners: ((event: MediaQueryListEvent) => void)[] = [];

  constructor(
    public matches: boolean = false,
    public media: string = ''
  ) {
    this.onchange = null;
  }

  onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => void) | null;

  addListener(callback: (event: MediaQueryListEvent) => void): void {
    this.listeners.push(callback);
  }

  removeListener(callback: (event: MediaQueryListEvent) => void): void {
    const index = this.listeners.indexOf(callback);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  // Test helper to simulate media query change
  setMatches(matches: boolean): void {
    this.matches = matches;
    const event = new MediaQueryListEvent('change', { matches, media: this.media });

    this.listeners.forEach((listener) => listener(event));
    if (this.onchange) {
      this.onchange.call(this as unknown as MediaQueryList, event);
    }
  }
}

export const createMatchMedia = (
  matches: boolean = false
): ((query: string) => MediaQueryMockInterface) => {
  return (query: string): MediaQueryMockInterface => new MatchMediaMock(matches, query);
};

// Replace window.matchMedia
window.matchMedia = createMatchMedia(false) as unknown as (query: string) => MediaQueryList;

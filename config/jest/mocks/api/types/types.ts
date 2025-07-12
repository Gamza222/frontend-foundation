// GraphQL Request Types
export type GraphQLRequest = {
  query: string;
  variables?: Record<string, unknown> | undefined;
};

export type GraphQLMutationRequest = {
  mutation: string;
  variables?: Record<string, unknown> | undefined;
};

export type GraphQLCacheRequest<T> = {
  query: string;
  variables?: Record<string, unknown> | undefined;
  data?: T;
};

// GraphQL Operation Types
export interface GraphQLMockOperationInterface {
  request: {
    query: string;
    variables?: Record<string, unknown>;
  };
  result?: GraphQLMockResponseInterface;
  error?: Error; // Network errors
  delay?: number; // Simulate network delay
}

// Response Types
export interface GraphQLMockResponseInterface<T = unknown> {
  data?: T;
  errors?: GraphQLErrorInterface[];
  loading?: boolean;
  networkStatus?: number;
}

// Error Types
export interface GraphQLErrorInterface {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: Record<string, unknown>;
}

// WebSocket Types
export interface WebSocketMockMessageInterface {
  type: 'subscription' | 'next' | 'error' | 'complete';
  payload?: unknown;
  id?: string;
}

export interface WebSocketMockInstanceInterface {
  addEventListener(type: string, handler: (event: MessageEvent) => void): void;
  removeEventListener(type: string, handler: (event: MessageEvent) => void): void;
  send(data: string): void;
  close(): void;
  mockMessage(message: WebSocketMockMessageInterface): void;
}

// Cache Types
export interface GraphQLMockCacheInterface {
  readQuery: <T>(options: GraphQLRequest) => T | null;
  writeQuery: <T>(options: GraphQLCacheRequest<T> & { data: T }) => void;
}

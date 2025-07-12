// Mock Implementations
export { GraphQLClientMock, graphQLClient } from './lib/graphql/GraphQLClient.mock';
export { WebSocketMock } from './lib/websocket/WebSocket.mock';

// Mock Factory Functions
export { createWebSocketMock } from './lib/websocket/WebSocket.mock';

// Type Aliases & Interfaces
export type {
  GraphQLRequest,
  GraphQLMutationRequest,
  GraphQLCacheRequest,
  GraphQLMockOperationInterface,
  GraphQLMockResponseInterface,
  GraphQLErrorInterface,
  WebSocketMockMessageInterface,
  WebSocketMockInstanceInterface,
  GraphQLMockCacheInterface,
} from './types/types';

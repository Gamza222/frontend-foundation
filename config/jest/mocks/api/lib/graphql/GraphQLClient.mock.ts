import {
  GraphQLCacheRequest,
  GraphQLMockCacheInterface,
  GraphQLMockOperationInterface,
  GraphQLMockResponseInterface,
  GraphQLMutationRequest,
  GraphQLRequest,
  WebSocketMockMessageInterface,
} from '../../types/types';

export class GraphQLClientMock implements GraphQLMockCacheInterface {
  private mocks: GraphQLMockOperationInterface[] = [];
  private cache: Map<string, unknown> = new Map();
  private subscriptions: Map<string, (message: WebSocketMockMessageInterface) => void> = new Map();

  // Query operations
  async query<T>(request: GraphQLRequest): Promise<GraphQLMockResponseInterface<T>> {
    return this.executeOperation<T>('query', request);
  }

  // Mutation operations
  async mutate<T>(request: GraphQLMutationRequest): Promise<GraphQLMockResponseInterface<T>> {
    const operationRequest: GraphQLRequest = {
      query: request.mutation,
      variables: request.variables,
    };
    return this.executeOperation<T>('mutation', operationRequest);
  }

  // Subscription operations
  subscribe(
    request: GraphQLRequest,
    callback: (message: WebSocketMockMessageInterface) => void
  ): () => void {
    const id = JSON.stringify(request);
    this.subscriptions.set(id, callback);
    return () => this.subscriptions.delete(id);
  }

  // Cache operations
  readQuery<T>(options: GraphQLRequest): T | null {
    const key = this.getCacheKey(options);
    return (this.cache.get(key) as T) || null;
  }

  writeQuery<T>(options: GraphQLCacheRequest<T> & { data: T }): void {
    const key = this.getCacheKey(options);
    this.cache.set(key, options.data);
  }

  // Mock management
  addMock(mock: GraphQLMockOperationInterface): void {
    this.mocks.push(mock);
  }

  clearMocks(): void {
    this.mocks = [];
    this.cache.clear();
    this.subscriptions.clear();
  }

  // Trigger subscription update
  triggerSubscription(request: GraphQLRequest, message: WebSocketMockMessageInterface): void {
    const id = JSON.stringify(request);
    const callback = this.subscriptions.get(id);
    if (callback) callback(message);
  }

  private async executeOperation<T>(
    type: 'query' | 'mutation',
    request: GraphQLRequest
  ): Promise<GraphQLMockResponseInterface<T>> {
    const mock = this.findMock(request);

    if (!mock) {
      throw new Error(`No mock found for GraphQL ${type}`);
    }

    if (mock.error) {
      throw mock.error;
    }

    if (mock.delay) {
      await new Promise((resolve) => setTimeout(resolve, mock.delay));
    }

    // Update cache for queries
    if (type === 'query' && mock.result?.data) {
      const cacheOptions: GraphQLCacheRequest<T> & { data: T } = {
        query: request.query,
        variables: request.variables,
        data: mock.result.data as T,
      };
      this.writeQuery<T>(cacheOptions);
    }

    return (mock.result as GraphQLMockResponseInterface<T>) || { data: null };
  }

  private findMock(request: GraphQLRequest): GraphQLMockOperationInterface | undefined {
    return this.mocks.find(
      (mock) =>
        mock.request.query === request.query &&
        JSON.stringify(mock.request.variables) === JSON.stringify(request.variables)
    );
  }

  private getCacheKey(options: GraphQLRequest): string {
    return JSON.stringify({ query: options.query, variables: options.variables });
  }
}

export const graphQLClient = new GraphQLClientMock();

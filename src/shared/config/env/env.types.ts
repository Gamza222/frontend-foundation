/**
 * Environment-specific type definitions for Next.js
 */

/** Represents the runtime environment of the application */
export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

/** Type definition for process.env */
export interface ProcessEnv {
  NODE_ENV: Environment;
  PORT?: string;
  NEXT_PUBLIC_API_URL?: string;
  NEXT_PUBLIC_WS_URL?: string;
}

/** Runtime environment configuration */
export interface EnvConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  port: number;
  apiUrl: string;
  wsUrl: string;
}

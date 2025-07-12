import { Environment } from './env.types';
import { envConfig } from './env.validation';

/**
 * Get environment variable with type safety
 * @param key - Environment variable key
 * @param defaultValue - Default value if not found
 * @returns Environment variable value or default
 */
export const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value || defaultValue || '';
};

/**
 * Check if running in production environment
 * @returns true if production environment
 */
export const isProduction = (): boolean => {
  return envConfig.isProduction;
};

/**
 * Check if running in development environment
 * @returns true if development environment
 */
export const isDevelopment = (): boolean => {
  return envConfig.isDevelopment;
};

/**
 * Check if running in test environment
 * @returns true if test environment
 */
export const isTest = (): boolean => {
  return envConfig.isTest;
};

/**
 * Get current environment
 * @returns Current environment enum value
 */
export const getCurrentEnvironment = (): Environment => {
  if (envConfig.isProduction) return Environment.Production;
  if (envConfig.isTest) return Environment.Test;
  return Environment.Development;
};

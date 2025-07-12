import { EnvConfig, Environment } from './env.types';

/** Environment variable defaults */
export const ENV_DEFAULTS = {
  PORT: 3000,
  NODE_ENV: Environment.Development,
  API_URL: 'http://localhost:8080',
  WS_URL: 'ws://localhost:8080',
} as const;

/**
 * Environment configuration implementation
 */
class EnvironmentConfig implements EnvConfig {
  public readonly isDevelopment: boolean;
  public readonly isProduction: boolean;
  public readonly isTest: boolean;
  public readonly port: number;
  public readonly apiUrl: string;
  public readonly wsUrl: string;

  constructor() {
    // Get environment or use default
    const nodeEnv = process.env.NODE_ENV || ENV_DEFAULTS.NODE_ENV;

    // Set single environment state
    this.isDevelopment = nodeEnv === Environment.Development;
    this.isProduction = nodeEnv === Environment.Production;
    this.isTest = nodeEnv === Environment.Test;

    // Ensure we have a valid environment
    if (!this.isDevelopment && !this.isProduction && !this.isTest) {
      throw new Error(
        `Invalid NODE_ENV: ${nodeEnv}. Must be one of: development, production, test`
      );
    }

    // Get API configuration with defaults
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || ENV_DEFAULTS.API_URL;
    this.wsUrl = process.env.NEXT_PUBLIC_WS_URL || ENV_DEFAULTS.WS_URL;

    // Get server configuration with default
    this.port = Number(process.env.PORT) || ENV_DEFAULTS.PORT;
  }

  /**
   * Validates the configuration values themselves
   * This is different from environment validation - this checks if the values we got are usable
   * @throws {Error} If configuration values are invalid
   */
  public validate(): void {
    // Check if URLs are valid
    try {
      new URL(this.apiUrl);
    } catch {
      throw new Error(`Invalid API URL: ${this.apiUrl}`);
    }

    try {
      new URL(this.wsUrl);
    } catch {
      throw new Error(`Invalid WebSocket URL: ${this.wsUrl}`);
    }

    // Check if port is valid
    if (this.port < 0 || this.port > 65535) {
      throw new Error(`Invalid port number: ${this.port}`);
    }
  }
}

export const envConfig = new EnvironmentConfig();

/**
 * Validates environment configuration at startup
 * @throws {Error} If configuration is invalid
 */
export const validateEnv = (): void => {
  envConfig.validate();
};

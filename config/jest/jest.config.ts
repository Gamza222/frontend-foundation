// This is the main entry point for Jest's configuration.
// And it combines all the modular configuration files into a single object.

import { baseConfig, coverageConfig, pathsConfig } from './config';

const jestConfig = {
  ...baseConfig,
  ...coverageConfig,
  ...pathsConfig,
};

export default jestConfig;

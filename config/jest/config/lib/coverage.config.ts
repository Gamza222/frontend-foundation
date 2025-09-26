import type { Config } from "@jest/types";

export const coverageConfig: Config.InitialOptions = {
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "!src/**/*.types.ts",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 30,
      lines: 60,
      statements: 60,
    },
  },
};

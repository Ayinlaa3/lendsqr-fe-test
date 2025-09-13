import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // Support absolute imports if you ever re-enable aliases
    "^@/(.*)$": "<rootDir>/src/$1",
    // Mock CSS/SCSS imports
    "\\.(css|scss)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }]
  }
};

export default config;

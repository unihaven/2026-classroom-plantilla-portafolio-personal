/**
 * Jest Configuration for Portfolio 2025
 * 
 * This file configures Jest for testing a Next.js application with TypeScript.
 * It uses next/jest to handle Next.js-specific configuration automatically.
 */

import nextJest from 'next/jest.js';

// Create a Jest configuration with Next.js integration
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Custom Jest configuration
/** @type {import('jest').Config} */
const config = {
  // Setup files to run before tests
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',         // Common Jest setup
    '<rootDir>/src/__tests__/setup.ts' // Project-specific setup and mocks
  ],
  
  // Use jsdom for browser-like environment
  testEnvironment: 'jest-environment-jsdom',
  
  // Resolve module path aliases (matching Next.js and tsconfig paths)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // Directories to exclude from test coverage reports
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
    // Use ts-jest for TypeScript files with custom tsconfig
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }]
  },
  
  // Optional additional settings (uncomment as needed)
  // testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],  // Pattern for test files
  // verbose: true,                                   // Display individual test results
  // collectCoverage: false,                          // Don't collect coverage by default
  // collectCoverageFrom: ['src/**/*.{ts,tsx}'],      // Files to collect coverage from
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);


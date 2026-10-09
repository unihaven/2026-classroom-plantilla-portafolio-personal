/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Global Jest Test Setup
 *
 * This file runs before all tests and configures:
 * 1. Global mocks for Next.js components (Image, Link)
 * 2. Internationalization mocks (next-intl)
 * 3. Common testing utilities and global variables
 *
 * All mocks defined here are available to all test files.
 */

import "@testing-library/jest-dom";
import React from "react";

// =====================================================================
// Global Mocks and Configuration
// =====================================================================

// =====================================================================
// Global Mocks and Configuration
// =====================================================================

// Properly mock React for global access
global.React = React;

/**
 * Mock: Next.js Image Component
 *
 * Replaces Next.js Image with a standard img element for testing.
 * Handles the 'unoptimized' boolean prop by converting it to a string.
 * Adds a data-testid attribute for easier testing.
 */
jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage(props: any) {
    // Filter out the unoptimized prop or convert boolean props to strings
    const { unoptimized, ...filteredProps } = props;
    const imgProps = {
      ...filteredProps,
      // If unoptimized is present, convert it to a string
      ...(unoptimized !== undefined
        ? { unoptimized: unoptimized.toString() }
        : {}),
    };

    return React.createElement("img", {
      src: props.src || "",
      alt: props.alt || "",
      width: props.width || 100,
      height: props.height || 100,
      className: props.className || "",
      "data-testid": "mock-image",
      ...imgProps,
    });
  },
}));

/**
 * Mock: Next.js Link Component
 *
 * Replaces Next.js Link with a standard anchor element for testing.
 * Preserves the href, className, target, and other props.
 * Adds a data-testid attribute for easier testing.
 */
jest.mock("next/link", () => ({
  __esModule: true,
  default: function MockLink(props: any) {
    return React.createElement(
      "a",
      {
        href: props.href || "#",
        className: props.className || "",
        target: props.target,
        "data-testid": "mock-link",
        ...props,
      },
      props.children,
    );
  },
}));

/**
 * Mock: Internationalization (next-intl)
 *
 * Provides simplified mock implementations for:
 * - useTranslations: Returns a function that formats "{key} translation"
 * - useLocale: Always returns "en" locale
 */
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `${key} translation`,
  useLocale: () => "en",
}));

// =====================================================================
// Validation Tests
// =====================================================================

/**
 * Basic tests to ensure the setup is working correctly.
 * Also prevents "empty test suite" errors when running the setup file directly.
 */
describe("Setup file tests", () => {
  test("React global is properly set", () => {
    expect(global.React).toBeDefined();
    expect(global.React).toBe(React);
  });
});

import React, { ReactElement } from "react";
import {
  render as testingLibraryRender,
  RenderOptions,
} from "@testing-library/react";
import "@testing-library/jest-dom";

/**
 * Common type for mock components props.
 * Used for mocking components like Link, Button, etc.
 * Includes common props and allows for additional props.
 */
export type MockComponentProps = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

/**
 * Type definition for Next.js Image component mock props.
 * Includes all required Image component props and additional flexibility.
 */
export type MockImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  unoptimized?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

// Interface for custom render options with providers
// Using type alias instead of empty interface to avoid typescript-eslint/no-empty-object-type error
type CustomRenderOptions = Omit<RenderOptions, "wrapper">;

/**
 * Custom render function that wraps components with necessary providers
 *
 * This function extends React Testing Library's render function to:
 * 1. Automatically include any needed providers (ThemeProvider, etc.)
 * 2. Simplify test setup with consistent provider wrapping
 * 3. Allow for additional options to be passed to the render function
 *
 * @param ui - The React component to render
 * @param options - Optional render options (excluding wrapper)
 * @returns The rendered component with all testing utilities
 */
function render(ui: ReactElement, options?: CustomRenderOptions) {
  return testingLibraryRender(ui, {
    // Wrap components with providers here if needed
    ...options,
  });
}

/**
 * Sets up common mocks for testing components
 *
 * Use this function in beforeEach or beforeAll to configure mocks that aren't
 * already set up in the global setup.ts file. This allows for more specific
 * mock implementations in individual test files.
 */
export const setupMocks = () => {
  // Mock next/image
  jest.mock("next/image", () => ({
    __esModule: true,
    default: ({
      src,
      alt,
      className,
      width,
      height,
      unoptimized,
      ...rest
    }: MockImageProps) => {
      const imgProps = {
        ...rest,
        // Convert boolean props to strings
        ...(unoptimized !== undefined
          ? { unoptimized: unoptimized.toString() }
          : {}),
      };

      return React.createElement("img", {
        src,
        alt,
        className,
        width,
        height,
        "data-testid": "mock-image",
        ...imgProps,
      });
    },
  }));

  // Mock next/link
  jest.mock("next/link", () => ({
    __esModule: true,
    default: ({ href, children, className, ...rest }: MockComponentProps) =>
      React.createElement(
        "a",
        { href, className, "data-testid": "mock-link", ...rest },
        children,
      ),
  }));

  // Mock translators
  jest.mock("next-intl", () => ({
    useTranslations: () => {
      // Create a mock translator function
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const translator = (key: string, values?: Record<string, any>) => {
        if (values) {
          return `${key} translation with values: ${JSON.stringify(values)}`;
        }
        return `${key} translation`;
      };
      return translator;
    },
  }));
};

// Add a simple test to avoid the empty test suite error
describe("Test utilities", () => {
  test("Render function is properly exported", () => {
    expect(render).toBeDefined();
    expect(typeof render).toBe("function");
  });
});

// Re-export everything from testing-library
export * from "@testing-library/react";
export { render };

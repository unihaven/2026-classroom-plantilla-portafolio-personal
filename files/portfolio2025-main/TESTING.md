# Testing Documentation

This document provides details about the testing setup and practices for the Portfolio 2025 project.

## Testing Stack

- **Jest**: Testing framework
- **React Testing Library**: For testing React components
- **ts-jest**: TypeScript support for Jest
- **jest-environment-jsdom**: DOM environment for Jest

## Testing File Structure

```
src/
└── __tests__/
    ├── components/       # UI component tests
    ├── hooks/            # Hook tests
    ├── mocks/            # Mock implementations
    │   ├── commonMocks.ts      # Common component mocks
    │   └── nextThemesMock.ts   # next-themes mocks
    ├── utils/            # Utility function tests
    ├── setup.ts          # Global test setup
    ├── test-utils.tsx    # Testing utilities
    └── run-all-tests.js  # Script to run all tests sequentially
```

## Configuration Files

- **jest.config.mjs**: Main Jest configuration
- **jest.setup.js**: Setup file for Jest
- **tsconfig.jest.json**: TypeScript configuration for Jest

## Testing Utilities

### `test-utils.tsx`

Contains common test utilities:

- `render`: Custom render function that wraps components with necessary providers
- `setupMocks`: Function to set up common mocks for tests
- Re-exports from testing-library

### Mock Types

```typescript
// Common type for mock components props
export type MockComponentProps = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  [key: string]: any;
};

// Type for the Image component props
export type MockImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  unoptimized?: boolean;
  [key: string]: any;
};
```

## Common Mocks

### Next.js Components

```typescript
// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, className, width, height, unoptimized, ...rest }) => {
    const imgProps = {
      ...rest,
      ...(unoptimized !== undefined ? { unoptimized: unoptimized.toString() } : {})
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
  default: ({ href, children, className, ...rest }) => 
    React.createElement(
      "a",
      { href, className, "data-testid": "mock-link", ...rest },
      children
    )
}));
```

### Internationalization

```typescript
// Mock translators
jest.mock("next-intl", () => ({
  useTranslations: () => {
    const translator = (key, values) => {
      if (values) {
        return `${key} translation with values: ${JSON.stringify(values)}`;
      }
      return `${key} translation`;
    };
    return translator;
  },
}));
```

## Writing Component Tests

### Basic Component Test Template

```tsx
import React from "react";
import { render, screen } from "@/src/__tests__/test-utils";
import { ComponentName } from "@/components/component-name";

describe("ComponentName", () => {
  it("renders correctly", () => {
    render(<ComponentName prop1="value" />);
    
    // Assert component renders expected elements
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });
  
  it("handles user interactions", () => {
    const mockFn = jest.fn();
    render(<ComponentName onClick={mockFn} />);
    
    // Trigger user interaction
    const button = screen.getByRole("button");
    button.click();
    
    // Assert the expected behavior
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
```

### Testing with Props

```tsx
it("renders with different props", () => {
  const { rerender } = render(
    <ComponentName variant="primary" disabled={false} />
  );
  
  // Assert component rendered with initial props
  expect(screen.getByRole("button")).toHaveClass("primary");
  expect(screen.getByRole("button")).not.toBeDisabled();
  
  // Re-render with different props
  rerender(<ComponentName variant="secondary" disabled={true} />);
  
  // Assert component re-rendered with new props
  expect(screen.getByRole("button")).toHaveClass("secondary");
  expect(screen.getByRole("button")).toBeDisabled();
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Run all tests sequentially (useful for CI)
npm run test:all
```

## Best Practices

1. **Use data-testid attributes**: Use `data-testid` attributes for elements that don't have accessible roles or text.

2. **Test behavior, not implementation**: Focus on testing component behavior from a user's perspective.

3. **Avoid testing library internals**: Don't test the behavior of third-party libraries.

4. **Keep mocks minimal**: Only mock what's necessary for the test.

5. **Test edge cases**: Make sure to test error states, loading states, and edge cases.

6. **Use proper assertions**: Use the most appropriate assertion for each test case.

7. **Isolate tests**: Each test should be independent and not rely on the state of other tests.

8. **Follow the AAA pattern**:
   - Arrange: Set up the test data and environment
   - Act: Perform the action being tested
   - Assert: Verify the result is as expected

## Common Testing Patterns

### Testing Conditional Rendering

```tsx
it("renders loading state when isLoading is true", () => {
  render(<ComponentName isLoading={true} />);
  expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  expect(screen.queryByText("Content")).not.toBeInTheDocument();
});

it("renders content when isLoading is false", () => {
  render(<ComponentName isLoading={false} />);
  expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  expect(screen.getByText("Content")).toBeInTheDocument();
});
```

### Testing Form Interactions

```tsx
it("updates input value on change", () => {
  render(<FormComponent />);
  const input = screen.getByLabelText("Email");
  
  fireEvent.change(input, { target: { value: "test@example.com" } });
  
  expect(input).toHaveValue("test@example.com");
});

it("submits the form with input values", () => {
  const handleSubmit = jest.fn();
  render(<FormComponent onSubmit={handleSubmit} />);
  
  const emailInput = screen.getByLabelText("Email");
  const submitButton = screen.getByRole("button", { name: "Submit" });
  
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.click(submitButton);
  
  expect(handleSubmit).toHaveBeenCalledWith(
    expect.objectContaining({ email: "test@example.com" })
  );
});
```

### Testing Async Operations

```tsx
it("fetches and displays data", async () => {
  // Mock the API response
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => ({ data: "Test Data" }),
  });
  
  render(<DataFetchingComponent />);
  
  // Assert loading state is shown initially
  expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  
  // Wait for the data to be displayed
  await waitFor(() => {
    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });
  
  // Assert data is displayed correctly
  expect(screen.getByText("Test Data")).toBeInTheDocument();
});
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Playground](https://testing-playground.com/) - A tool to help find and suggest queries for Testing Library

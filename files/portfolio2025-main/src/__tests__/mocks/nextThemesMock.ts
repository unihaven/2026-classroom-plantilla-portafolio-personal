/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

let mockTheme = "light";
let mockSetTheme = jest.fn();

export const mockNextThemes = () => {
  jest.mock("next-themes", () => ({
    ThemeProvider: function MockThemeProvider({ children, ...props }: any) {
      return React.createElement(
        "div",
        {
          "data-testid": "theme-provider",
          "data-props": JSON.stringify(props),
        },
        children,
      );
    },
    useTheme: () => ({
      theme: mockTheme,
      setTheme: mockSetTheme,
    }),
    __setMockTheme: (theme: string, setThemeFn = jest.fn()) => {
      mockTheme = theme;
      mockSetTheme = setThemeFn;
    },
  }));
};

export const resetThemeMock = () => {
  mockTheme = "light";
  mockSetTheme = jest.fn();
};

// Helper function to update the mock theme state
export const setMockTheme = (theme: string, setThemeFn = jest.fn()) => {
  mockTheme = theme;
  mockSetTheme = setThemeFn;
};

// Add a simple test to avoid the empty test suite error
describe("Next Themes Mock", () => {
  test("Mock functions are properly defined", () => {
    expect(mockNextThemes).toBeDefined();
    expect(resetThemeMock).toBeDefined();
    expect(setMockTheme).toBeDefined();
    expect(typeof mockTheme).toBe("string");
    expect(typeof mockSetTheme).toBe("function");
  });
});

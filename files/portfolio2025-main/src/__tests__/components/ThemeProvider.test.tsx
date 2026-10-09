import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@/components/theme-provider";

// Mock next-themes
jest.mock("next-themes", () => ({
  ThemeProvider: function MockThemeProvider({
    children,
    ...props
  }: {
    children: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) {
    return (
      <div data-testid="theme-provider" data-props={JSON.stringify(props)}>
        {children}
      </div>
    );
  },
}));

describe("ThemeProvider Component", () => {
  test("passes props to next-themes ThemeProvider", () => {
    const { getByTestId } = render(
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
      >
        <div>Child Component</div>
      </ThemeProvider>,
    );

    const provider = getByTestId("theme-provider");
    const props = JSON.parse(provider.getAttribute("data-props") || "{}");

    expect(props.attribute).toBe("class");
    expect(props.defaultTheme).toBe("light");
    expect(props.enableSystem).toBe(false);
  });

  test("renders children", () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>,
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });
});

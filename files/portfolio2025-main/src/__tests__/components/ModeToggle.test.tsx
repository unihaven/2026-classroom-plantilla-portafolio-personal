import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ModeToggle } from "@/components/mode-toggle";

// Mock the dependencies
jest.mock("next-themes", () => {
  let mockTheme = "light";
  let mockSetTheme = jest.fn();

  return {
    useTheme: () => ({
      theme: mockTheme,
      setTheme: mockSetTheme,
    }),
    __setMockTheme: (theme: string, setThemeFn = jest.fn()) => {
      mockTheme = theme;
      mockSetTheme = setThemeFn;
    },
  };
});

jest.mock("lucide-react", () => ({
  MoonIcon: () => <span data-testid="moon-icon">Moon</span>,
  SunIcon: () => <span data-testid="sun-icon">Sun</span>,
}));

jest.mock("@/components/ui/button", () => ({
  Button: function MockButton({
    onClick,
    children,
    className,
    variant,
    size,
    type,
  }: {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    variant?: string;
    size?: string;
    type?: "button" | "submit" | "reset" | undefined;
  }) {
    return (
      <button
        onClick={onClick}
        className={className}
        data-variant={variant}
        data-size={size}
        type={type}
        data-testid="mode-toggle-button"
      >
        {children}
      </button>
    );
  },
}));

describe("ModeToggle Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with correct button attributes", () => {
    render(<ModeToggle />);

    const button = screen.getByTestId("mode-toggle-button");
    expect(button).toHaveAttribute("data-variant", "ghost");
    expect(button).toHaveAttribute("data-size", "icon");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute(
      "class",
      expect.stringContaining("hover:cursor-pointer"),
    );
  });

  test("renders sun icon in light mode", () => {
    // Reset mock with light theme
    jest.requireMock("next-themes").__setMockTheme("light");

    render(<ModeToggle />);
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  test("clicking the button toggles the theme", () => {
    const setThemeMock = jest.fn();

    // Update the mock to expose setTheme
    jest.requireMock("next-themes").__setMockTheme("light", setThemeMock);

    render(<ModeToggle />);

    const button = screen.getByTestId("mode-toggle-button");
    fireEvent.click(button);

    // Should toggle from light to dark
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  test("clicking the button in dark mode toggles to light mode", () => {
    const setThemeMock = jest.fn();

    // Update the mock to simulate dark mode
    jest.requireMock("next-themes").__setMockTheme("dark", setThemeMock);

    render(<ModeToggle />);

    const button = screen.getByTestId("mode-toggle-button");
    fireEvent.click(button);

    // Should toggle from dark to light
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });
});

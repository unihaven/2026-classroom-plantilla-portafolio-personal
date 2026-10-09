/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

// Common React component mocks
export const mockNextImage = () => {
  jest.mock("next/image", () => ({
    __esModule: true,
    default: function MockImage({
      src,
      alt,
      className,
      width = 16,
      height = 16,
      ...rest
    }: {
      src: string;
      alt: string;
      className?: string;
      width?: number | string;
      height?: number | string;
      [key: string]: any;
    }) {
      return React.createElement("img", {
        src,
        alt,
        className,
        width,
        height,
        "data-testid": "mock-image",
        ...rest,
      });
    },
  }));
};

export const mockNextLink = () => {
  jest.mock("next/link", () => ({
    __esModule: true,
    default: function MockLink({
      href,
      children,
      className,
      ...rest
    }: {
      href: string;
      children: React.ReactNode;
      className?: string;
      [key: string]: any;
    }) {
      return React.createElement(
        "a",
        { href, className, "data-testid": "nav-link", ...rest },
        children,
      );
    },
  }));
};

export const mockNextIntl = () => {
  jest.mock("next-intl", () => ({
    useTranslations: () => {
      return (key: string, values?: Record<string, any>) => {
        if (values) {
          return `${key} translation with values: ${JSON.stringify(values)}`;
        }
        return `${key} translation`;
      };
    },
  }));
};

// Mock UI components
export const mockDockComponents = () => {
  jest.mock("@/components/magicui/dock", () => ({
    Dock: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => {
      return React.createElement(
        "div",
        { "data-testid": "dock", className },
        children,
      );
    },
    DockIcon: ({ children }: { children: React.ReactNode }) => {
      return React.createElement(
        "div",
        { "data-testid": "dock-icon" },
        children,
      );
    },
  }));
};

export const mockModeToggle = () => {
  jest.mock("@/components/mode-toggle", () => ({
    ModeToggle: () => {
      return React.createElement(
        "div",
        { "data-testid": "mode-toggle" },
        "Theme Toggle",
      );
    },
  }));
};

export const mockButtonVariants = () => {
  jest.mock("@/components/ui/button", () => ({
    buttonVariants: jest.fn(() => "button-class"),
  }));
};

export const mockSeparator = () => {
  jest.mock("@/components/ui/separator", () => ({
    Separator: ({
      orientation,
      className,
    }: {
      orientation?: "horizontal" | "vertical";
      className?: string;
    }) => {
      return React.createElement("div", {
        "data-testid": "separator",
        "data-orientation": orientation,
        className,
      });
    },
  }));
};

export const mockTooltip = () => {
  jest.mock("@/components/ui/tooltip", () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => {
      return React.createElement("div", { "data-testid": "tooltip" }, children);
    },
    TooltipTrigger: ({
      asChild,
      children,
    }: {
      asChild?: boolean;
      children: React.ReactNode;
    }) => {
      return React.createElement(
        "div",
        {
          "data-testid": "tooltip-trigger",
          "data-aschild": asChild ? "true" : "false",
        },
        children,
      );
    },
    TooltipContent: ({ children }: { children: React.ReactNode }) => {
      return React.createElement(
        "div",
        { "data-testid": "tooltip-content" },
        children,
      );
    },
  }));
};

// Add a simple test to avoid the empty test suite error
describe("Common mocks", () => {
  test("Mock functions are properly defined", () => {
    expect(mockNextImage).toBeDefined();
    expect(mockNextLink).toBeDefined();
    expect(mockNextIntl).toBeDefined();
    expect(mockDockComponents).toBeDefined();
    expect(mockModeToggle).toBeDefined();
    expect(mockButtonVariants).toBeDefined();
    expect(mockSeparator).toBeDefined();
    expect(mockTooltip).toBeDefined();
  });
});

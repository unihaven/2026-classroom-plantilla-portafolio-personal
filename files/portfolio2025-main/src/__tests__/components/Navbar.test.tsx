import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/navbar";

// Mock dependencies
jest.mock("next-intl", () => ({
  useTranslations: () => {
    // Create a mock translator function
    const translator = (key: string) => `${key} translation`;
    return translator;
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: function MockLink({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <a href={href} className={className} data-testid="nav-link">
        {children}
      </a>
    );
  },
}));

// Mock components
jest.mock("@/components/magicui/dock", () => ({
  Dock: function MockDock({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <div data-testid="dock" className={className}>
        {children}
      </div>
    );
  },
  DockIcon: function MockDockIcon({ children }: { children: React.ReactNode }) {
    return <div data-testid="dock-icon">{children}</div>;
  },
}));

jest.mock("@/components/mode-toggle", () => ({
  ModeToggle: function MockModeToggle() {
    return <div data-testid="mode-toggle">Theme Toggle</div>;
  },
}));

jest.mock("@/components/ui/button", () => ({
  buttonVariants: jest.fn(() => "button-class"),
}));

jest.mock("@/components/ui/separator", () => ({
  Separator: function MockSeparator({
    orientation,
    className,
  }: {
    orientation?: "horizontal" | "vertical";
    className?: string;
  }) {
    return (
      <div
        data-testid="separator"
        data-orientation={orientation}
        className={className}
      ></div>
    );
  },
}));

jest.mock("@/components/ui/tooltip", () => ({
  Tooltip: function MockTooltip({ children }: { children: React.ReactNode }) {
    return <div data-testid="tooltip">{children}</div>;
  },
  TooltipTrigger: function MockTooltipTrigger({
    asChild,
    children,
  }: {
    asChild?: boolean;
    children: React.ReactNode;
  }) {
    return (
      <div
        data-testid="tooltip-trigger"
        data-aschild={asChild ? "true" : "false"}
      >
        {children}
      </div>
    );
  },
  TooltipContent: function MockTooltipContent({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid="tooltip-content">{children}</div>;
  },
}));

// Mock DATA from resume
jest.mock("@/data/resume", () => ({
  DATA: {
    navbar: [
      { href: "#hero", icon: () => <span>Home Icon</span> },
      { href: "#about", icon: () => <span>About Icon</span> },
      { href: "#projects", icon: () => <span>Projects Icon</span> },
    ],
  },
}));

describe("Navbar Component", () => {
  test("renders the navbar with a dock", () => {
    render(<Navbar />);
    expect(screen.getByTestId("dock")).toBeInTheDocument();
  });

  test("renders the correct number of navigation items", () => {
    render(<Navbar />);

    // There should be 3 navigation items + 1 for the mode toggle
    const dockIcons = screen.getAllByTestId("dock-icon");
    expect(dockIcons).toHaveLength(4);
  });

  test("renders links with correct hrefs", () => {
    render(<Navbar />);

    const links = screen.getAllByTestId("nav-link");
    expect(links[0]).toHaveAttribute("href", "#hero");
    expect(links[1]).toHaveAttribute("href", "#about");
    expect(links[2]).toHaveAttribute("href", "#projects");
  });

  test("renders the theme toggle", () => {
    render(<Navbar />);
    expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
  });

  test("renders tooltips for each navigation item", () => {
    render(<Navbar />);

    const tooltips = screen.getAllByTestId("tooltip");
    // Each nav item should have a tooltip (3 items + 1 for theme toggle)
    expect(tooltips).toHaveLength(4);
  });

  test("renders a separator before the theme toggle", () => {
    render(<Navbar />);

    const separator = screen.getByTestId("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("data-orientation", "vertical");
  });
});

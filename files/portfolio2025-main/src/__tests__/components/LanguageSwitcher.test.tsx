import React from "react";
import { render, screen } from "@testing-library/react";
import { LanguageSwitcher } from "@/components/language-switcher";

// Mock the components LanguageSwitcher depends on
jest.mock("next/link", () => ({
  __esModule: true,
  default: function MockLink({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <a href={href} data-testid="language-link">
        {children}
      </a>
    );
  },
}));

jest.mock("lucide-react", () => ({
  Languages: function MockLanguages() {
    return <span data-testid="languages-icon">Languages Icon</span>;
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
      <div data-testid="tooltip-trigger" data-aschild={asChild}>
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

describe("LanguageSwitcher Component", () => {
  test("renders with English as current locale", () => {
    render(<LanguageSwitcher currentLocale="en" />);

    // Check that link points to Spanish locale
    const link = screen.getByTestId("language-link");
    expect(link).toHaveAttribute("href", "/es");

    // Check for screen reader text
    expect(screen.getByText("Switch to Spanish")).toBeInTheDocument();

    // Check tooltip content
    const tooltipContent = screen.getByTestId("tooltip-content");
    expect(tooltipContent).toHaveTextContent("Traducir al Español");
  });

  test("renders with Spanish as current locale", () => {
    render(<LanguageSwitcher currentLocale="es" />);

    // Check that link points to English locale
    const link = screen.getByTestId("language-link");
    expect(link).toHaveAttribute("href", "/en");

    // Check for screen reader text
    expect(screen.getByText("Cambiar a Inglés")).toBeInTheDocument();

    // Check tooltip content
    const tooltipContent = screen.getByTestId("tooltip-content");
    expect(tooltipContent).toHaveTextContent("Translate to English");
  });

  test("renders the Languages icon", () => {
    render(<LanguageSwitcher currentLocale="en" />);
    expect(screen.getByTestId("languages-icon")).toBeInTheDocument();
  });
});

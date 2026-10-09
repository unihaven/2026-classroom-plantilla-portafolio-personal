import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProjectCard } from "@/components/project-card";

// Mock the Badge component
jest.mock("@/components/ui/badge", () => ({
  Badge: function MockBadge({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) {
    return (
      <span className={className} data-testid="badge">
        {children}
      </span>
    );
  },
}));

// Mock Card components
jest.mock("@/components/ui/card", () => ({
  Card: function MockCard({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) {
    return (
      <div data-testid="card" className={className}>
        {children}
      </div>
    );
  },
  CardContent: function MockCardContent({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) {
    return (
      <div data-testid="card-content" className={className}>
        {children}
      </div>
    );
  },
  CardHeader: function MockCardHeader({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) {
    return (
      <div data-testid="card-header" className={className}>
        {children}
      </div>
    );
  },
  CardTitle: function MockCardTitle({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) {
    return (
      <h3 data-testid="card-title" className={className}>
        {children}
      </h3>
    );
  },
  CardFooter: function MockCardFooter({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) {
    return (
      <div data-testid="card-footer" className={className}>
        {children}
      </div>
    );
  },
}));

// Mock react-markdown
jest.mock(
  "react-markdown",
  () =>
    function MockMarkdown({ children }: { children?: React.ReactNode }) {
      return <div data-testid="markdown">{children}</div>;
    },
);

// Mock Card components
jest.mock("@/components/ui/card", () => ({
  Card: ({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  ),
  CardHeader: ({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => (
    <div data-testid="card-header" className={className}>
      {children}
    </div>
  ),
  CardTitle: ({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => (
    <h3 data-testid="card-title" className={className}>
      {children}
    </h3>
  ),
  CardFooter: ({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => (
    <div data-testid="card-footer" className={className}>
      {children}
    </div>
  ),
}));

// Mock Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
    width,
    height,
  }: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      data-testid="mock-image"
    />
  ),
}));

// Mock Link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    className,
    target,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
  }) => (
    <a
      href={href}
      className={className}
      target={target}
      data-testid="mock-link"
    >
      {children}
    </a>
  ),
}));

// Mock Markdown component
jest.mock("react-markdown", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="markdown">{children}</div>
  ),
}));

describe("ProjectCard Component", () => {
  const mockProps = {
    title: "Test Project",
    href: "https://test-project.com",
    description: "This is a test project description",
    tags: ["React", "TypeScript", "Next.js"],
    image: "/images/test-project.jpg",
    links: [
      {
        icon: <span>Icon</span>,
        type: "Website",
        href: "https://test-project.com",
      },
      {
        icon: <span>Icon</span>,
        type: "Source",
        href: "https://github.com/test/project",
      },
    ],
  };

  test("renders project title correctly", () => {
    render(<ProjectCard {...mockProps} />);
    expect(screen.getByTestId("card-title")).toHaveTextContent("Test Project");
  });

  test("renders project description", () => {
    render(<ProjectCard {...mockProps} />);
    const markdownElement = screen.getByTestId("markdown");
    expect(markdownElement).toHaveTextContent(
      "This is a test project description",
    );
  });

  test("renders project image with correct attributes", () => {
    render(<ProjectCard {...mockProps} />);
    const image = screen.getByTestId("mock-image");
    expect(image).toHaveAttribute("src", "/images/test-project.jpg");
    expect(image).toHaveAttribute("alt", "Test Project");
  });

  test("renders project tags", () => {
    render(<ProjectCard {...mockProps} />);
    // Using getAllByTestId to get all badges
    const badges = screen.getAllByTestId("badge");
    expect(badges.length).toBeGreaterThanOrEqual(3);

    // Check the content of badges
    const badgeTexts = badges.map((badge) => badge.textContent);
    expect(badgeTexts).toContain("React");
    expect(badgeTexts).toContain("TypeScript");
    expect(badgeTexts).toContain("Next.js");
  });

  test("renders project links", () => {
    render(<ProjectCard {...mockProps} />);
    const links = screen.getAllByTestId("mock-link");
    expect(links.length).toBeGreaterThanOrEqual(1);

    // Get all badges which contain link types
    const badges = screen.getAllByTestId("badge");
    const badgeTexts = badges.map((badge) => badge.textContent);

    expect(badgeTexts).toContain("IconWebsite");
    expect(badgeTexts).toContain("IconSource");
  });
});

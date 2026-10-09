// filepath: c:\Users\iontc\Proyectos\portfolio2025\src\__tests__\components\ResumeCard.test.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ResumeCard } from "@/components/resume-card";

// Mock the components that ResumeCard depends on
jest.mock("next/link", () => ({
  __esModule: true,
  default: function MockLink(props: any) {
    return (
      <a
        href={props.href}
        className={props.className}
        target={props.target}
        data-testid="mock-link"
      >
        {props.children}
      </a>
    );
  },
}));

jest.mock("react-markdown", () => ({
  __esModule: true,
  default: function MockMarkdown(props: any) {
    return <div data-testid="markdown">{props.children}</div>;
  },
}));

// Mock the Avatar components
jest.mock("@/components/ui/avatar", () => ({
  Avatar: function MockAvatar(props: any) {
    return (
      <div data-testid="avatar" className={props.className}>
        {props.children}
      </div>
    );
  },
  AvatarImage: function MockAvatarImage(props: any) {
    return (
      <img
        src={props.src}
        alt={props.alt}
        className={props.className}
        data-testid="avatar-image"
      />
    );
  },
  AvatarFallback: function MockAvatarFallback(props: any) {
    return <div data-testid="avatar-fallback">{props.children}</div>;
  },
}));

// Mock Card components
jest.mock("@/components/ui/card", () => ({
  Card: function MockCard(props: any) {
    return (
      <div data-testid="card" className={props.className}>
        {props.children}
      </div>
    );
  },
  CardHeader: function MockCardHeader(props: any) {
    return <div data-testid="card-header">{props.children}</div>;
  },
}));

describe("ResumeCard Component", () => {
  const mockProps = {
    logoUrl: "/icons/test-logo.png",
    altText: "Test Company",
    title: "Test Company",
    subtitle: "Senior Developer",
    href: "https://test-company.com",
    badges: ["Full-time", "Remote"],
    period: "2020 - Present",
    description: "This is a test job description",
  };

  test("renders company name and job title correctly", () => {
    render(<ResumeCard {...mockProps} />);
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
  });

  test("renders logo with correct attributes", () => {
    render(<ResumeCard {...mockProps} />);
    const logo = screen.getByTestId("avatar-image");
    expect(logo).toHaveAttribute("src", "/icons/test-logo.png");
    expect(logo).toHaveAttribute("alt", "Test Company");
  });

  test("renders company badges", () => {
    render(<ResumeCard {...mockProps} />);
    expect(screen.getByText("Full-time")).toBeInTheDocument();
    expect(screen.getByText("Remote")).toBeInTheDocument();
  });

  test("renders job period", () => {
    render(<ResumeCard {...mockProps} />);
    expect(screen.getByText("2020 - Present")).toBeInTheDocument();
  });

  test("renders job description", () => {
    render(<ResumeCard {...mockProps} />);
    const markdown = screen.getByTestId("markdown");
    expect(markdown).toHaveTextContent("This is a test job description");
  });

  test("links to the provided href", () => {
    render(<ResumeCard {...mockProps} />);
    const link = screen.getByTestId("mock-link");
    expect(link).toHaveAttribute("href", "https://test-company.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  test("renders fallback avatar if logo fails to load", () => {
    // Using a placeholder instead of an empty string to avoid warnings
    render(
      <ResumeCard
        {...mockProps}
        logoUrl="/placeholder-that-doesnt-exist.png"
      />,
    );
    expect(screen.getByTestId("avatar-fallback")).toHaveTextContent("T");
  });

  test("handles missing subtitle", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { subtitle, ...propsWithoutSubtitle } = mockProps;
    render(<ResumeCard {...propsWithoutSubtitle} />);
    expect(screen.queryByText("Senior Developer")).not.toBeInTheDocument();
  });

  test("handles missing description", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { description, ...propsWithoutDescription } = mockProps;
    render(<ResumeCard {...propsWithoutDescription} />);
    expect(screen.queryByTestId("markdown")).not.toBeInTheDocument();
  });

  test("uses # as href when no href is provided", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { href, ...propsWithoutHref } = mockProps;
    render(<ResumeCard {...propsWithoutHref} />);
    const link = screen.getByTestId("mock-link");
    expect(link).toHaveAttribute("href", "#");
  });
});

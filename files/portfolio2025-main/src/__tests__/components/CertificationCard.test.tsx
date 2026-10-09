/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CertificationCard } from "@/components/certification-card";

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

// Mock the Badge component
jest.mock("@/components/ui/badge", () => ({
  Badge: function MockBadge(props: any) {
    return (
      <span data-testid="badge" className={props.className} title={props.title}>
        {props.children}
      </span>
    );
  },
}));

// Mock Link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: function MockLink(props: any) {
    return (
      <a href={props.href} target={props.target} data-testid="mock-link">
        {props.children}
      </a>
    );
  },
}));

describe("CertificationCard Component", () => {
  const mockProps = {
    title: "React Developer Certification",
    description: "Advanced React development certification",
    dates: "May 2023",
    location: "Online",
    image: "/icons/react-cert.png",
    links: [
      {
        icon: <span>Icon</span>,
        title: "View Certificate",
        href: "https://example.com/cert",
      },
    ],
  };

  test("renders certification title correctly", () => {
    render(<CertificationCard {...mockProps} />);
    expect(
      screen.getByText("React Developer Certification"),
    ).toBeInTheDocument();
  });

  test("renders certification image with correct attributes", () => {
    render(<CertificationCard {...mockProps} />);
    const image = screen.getByTestId("avatar-image");
    expect(image).toHaveAttribute("src", "/icons/react-cert.png");
    expect(image).toHaveAttribute("alt", "React Developer Certification");
  });

  test("renders certification date", () => {
    render(<CertificationCard {...mockProps} />);
    expect(screen.getByText("May 2023")).toBeInTheDocument();
  });

  test("renders certification location", () => {
    render(<CertificationCard {...mockProps} />);
    expect(screen.getByText("Online")).toBeInTheDocument();
  });

  test("renders certification description", () => {
    render(<CertificationCard {...mockProps} />);
    expect(
      screen.getByText("Advanced React development certification"),
    ).toBeInTheDocument();
  });

  test("renders certification links", () => {
    render(<CertificationCard {...mockProps} />);
    expect(screen.getByText("View Certificate")).toBeInTheDocument();
    const link = screen.getByTestId("mock-link");
    expect(link).toHaveAttribute("href", "https://example.com/cert");
    expect(link).toHaveAttribute("target", "_blank");
  });
  test("handles missing links", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { links, ...propsWithoutLinks } = mockProps;
    render(<CertificationCard {...propsWithoutLinks} />);
    expect(screen.queryByTestId("mock-link")).not.toBeInTheDocument();
  });

  test("handles empty links array", () => {
    render(<CertificationCard {...mockProps} links={[]} />);
    expect(screen.queryByTestId("mock-link")).not.toBeInTheDocument();
  });
  test("renders fallback avatar if image fails to load", () => {
    // Using a placeholder instead of an empty string to avoid warnings
    render(
      <CertificationCard
        {...mockProps}
        image="/placeholder-that-doesnt-exist.png"
      />,
    );
    expect(screen.getByTestId("avatar-fallback")).toHaveTextContent("R");
  });
});

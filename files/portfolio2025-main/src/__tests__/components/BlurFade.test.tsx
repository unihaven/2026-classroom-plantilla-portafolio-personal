/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen } from "@testing-library/react";
import BlurFade from "@/components/magicui/blur-fade";

// Mock motion/react
jest.mock("motion/react", () => {
  const actual = jest.requireActual("motion/react");
  return {
    ...actual,
    useInView: jest.fn().mockReturnValue(true),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    motion: {
      div: ({
        children,
        className,
        ...props
      }: {
        children: React.ReactNode;
        className?: string;
        [key: string]: any;
      }) => (
        <div data-testid="motion-div" className={className} {...props}>
          {children}
        </div>
      ),
    },
  };
});

describe("BlurFade Component", () => {
  test("renders children correctly", () => {
    render(
      <BlurFade>
        <p>Test Content</p>
      </BlurFade>,
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(
      <BlurFade className="custom-class">
        <p>Test Content</p>
      </BlurFade>,
    );

    expect(screen.getByTestId("motion-div")).toHaveClass("custom-class");
  });

  test("renders with default props", () => {
    render(
      <BlurFade>
        <p>Test Content</p>
      </BlurFade>,
    );

    // We're just checking rendering with default props doesn't error
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    const customVariant = {
      hidden: { y: 10 },
      visible: { y: 0 },
    };

    render(
      <BlurFade
        variant={customVariant}
        duration={0.6}
        delay={0.2}
        yOffset={10}
        blur="8px"
      >
        <p>Test Content</p>
      </BlurFade>,
    );

    // Since we've mocked motion, we're just checking it renders without errors
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});

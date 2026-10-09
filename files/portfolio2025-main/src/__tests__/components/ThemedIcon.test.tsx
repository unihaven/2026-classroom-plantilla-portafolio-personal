import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ThemedIcon from "@/components/themed-icon";

// Interface for MockImage props to fix TypeScript errors
interface MockImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  unoptimized?: boolean;
  [otherProps: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Mock the next/image component directly in this test file
jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage(props: MockImageProps) {
    const {
      src,
      alt,
      className,
      width = 16,
      height = 16,
      unoptimized,
      ...restProps
    } = props; // Handle the unoptimized attribute properly
    const dataAttributes =
      unoptimized !== undefined ? { "data-unoptimized": "true" } : {};

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        data-testid="mock-image"
        {...dataAttributes}
        {...restProps}
      />
    );
  },
}));

describe("ThemedIcon Component", () => {
  test("renders light and dark variant images", () => {
    render(
      <ThemedIcon
        lightVariant="/test-light.svg"
        darkVariant="/test-dark.svg"
        alt="Test Icon"
      />,
    );

    const images = screen.getAllByTestId("mock-image");
    expect(images).toHaveLength(2);

    // Check light variant
    expect(images[0]).toHaveAttribute("src", "/test-light.svg");
    expect(images[0]).toHaveAttribute("alt", "Test Icon");
    expect(images[0]).toHaveAttribute(
      "class",
      expect.stringContaining("dark:hidden"),
    );

    // Check dark variant
    expect(images[1]).toHaveAttribute("src", "/test-dark.svg");
    expect(images[1]).toHaveAttribute("alt", "Test Icon");
    expect(images[1]).toHaveAttribute(
      "class",
      expect.stringContaining("hidden dark:block"),
    );
  });

  test("applies custom className to both images", () => {
    render(
      <ThemedIcon
        lightVariant="/test-light.svg"
        darkVariant="/test-dark.svg"
        alt="Test Icon"
        className="custom-class"
      />,
    );

    const images = screen.getAllByTestId("mock-image");

    expect(images[0]).toHaveAttribute(
      "class",
      expect.stringContaining("custom-class"),
    );
    expect(images[1]).toHaveAttribute(
      "class",
      expect.stringContaining("custom-class"),
    );
  });

  test("applies custom width and height to both images", () => {
    render(
      <ThemedIcon
        lightVariant="/test-light.svg"
        darkVariant="/test-dark.svg"
        alt="Test Icon"
        width={32}
        height={32}
      />,
    );

    const images = screen.getAllByTestId("mock-image");

    expect(images[0]).toHaveAttribute("width", "32");
    expect(images[0]).toHaveAttribute("height", "32");
    expect(images[1]).toHaveAttribute("width", "32");
    expect(images[1]).toHaveAttribute("height", "32");
  });

  test("uses default width and height if not provided", () => {
    render(
      <ThemedIcon
        lightVariant="/test-light.svg"
        darkVariant="/test-dark.svg"
        alt="Test Icon"
      />,
    );

    const images = screen.getAllByTestId("mock-image");

    expect(images[0]).toHaveAttribute("width", "16");
    expect(images[0]).toHaveAttribute("height", "16");
    expect(images[1]).toHaveAttribute("width", "16");
    expect(images[1]).toHaveAttribute("height", "16");
  });
});

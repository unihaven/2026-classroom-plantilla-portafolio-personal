import { cn } from "@/lib/utils";

describe("cn utility", () => {
  test("combines class names correctly", () => {
    expect(cn("test-class")).toBe("test-class");
    expect(cn("test-class", "another-class")).toBe("test-class another-class");
  });

  test("handles conditional classes", () => {
    expect(cn("base-class", { "conditional-class": true })).toBe(
      "base-class conditional-class",
    );
    expect(cn("base-class", { "conditional-class": false })).toBe("base-class");
  });

  test("handles array of classes", () => {
    expect(cn("base-class", ["array-class-1", "array-class-2"])).toBe(
      "base-class array-class-1 array-class-2",
    );
  });

  test("properly merges Tailwind classes", () => {
    // Should merge conflicting classes with the latter taking precedence
    expect(cn("p-2 m-2", "p-4")).toBe("m-2 p-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
});

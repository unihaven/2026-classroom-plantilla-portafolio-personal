// filepath: c:\Users\iontc\Proyectos\portfolio2025\src\types\jest-dom.d.ts
import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(name: string, value?: string): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveClass(className: string | RegExp): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toHaveStyle(css: Record<string, any>): R;
      toHaveValue(value: string | string[] | number): R;
    }
  }
}

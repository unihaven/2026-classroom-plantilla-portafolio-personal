import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(className: string | RegExp): R;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toHaveStyle(style: Record<string, any>): R;
      toHaveTextContent(text: string | RegExp): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toHaveValue(value: string | string[] | number): R;
      toBeChecked(): R;
      toBeRequired(): R;
      toHaveFocus(): R;
      toContainElement(element: HTMLElement | null): R;
      toBeEmpty(): R;
      toHaveDisplayValue(value: string | RegExp | Array<string | RegExp>): R;
      toHaveLength(length: number): R;
    }
  }
}

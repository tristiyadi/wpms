/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock next/dynamic since it's used in Header component
vi.mock("next/dynamic", () => ({
  default: () => {
    const MockComponent = () => null;
    return MockComponent;
  },
}));

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
  }),
}));

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    testTimeout: 500,
    exclude: ["node_modules", "dist", "tests/e2e"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      thresholds: {
        lines: 60,
      },
    },
  },
});

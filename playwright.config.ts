import { defineConfig } from "@playwright/test";

/**
 * Browser integration tests drive the BUILT app in dist/ (built by
 * `npm run build` before running). Chromium only — the suite exists for
 * real-layout/real-browser behavior, not cross-browser coverage.
 */
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  globalSetup: "./tests/e2e/global-setup.ts",
  timeout: 30_000,
  use: {
    // Set by tests/e2e/global-setup.ts (ephemeral port; config is re-evaluated
    // in each worker, which inherits the mutated process.env).
    baseURL: process.env.E2E_BASE_URL,
    viewport: { width: 1280, height: 900 },
    trace: "retain-on-failure",
  },
});

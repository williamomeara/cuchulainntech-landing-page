import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/production.spec.ts",
  fullyParallel: true,
  retries: 1,
  reporter: "list",
  use: {
    baseURL: "https://cuchulainntech.ie",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-iphone", use: { ...devices["iPhone 14 Pro"] } },
  ],
});

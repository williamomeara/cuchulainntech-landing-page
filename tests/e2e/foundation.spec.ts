import { test, expect } from "@playwright/test";

test.describe("Phase 1 foundation", () => {
  test("page starts in dark mode with no flash", async ({ page }) => {
    await page.goto("/");
    const theme = await page.locator("html").getAttribute("data-theme");
    expect(theme).toBe("dark");

    const bodyBg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor
    );
    // #0a0a0a → rgb(10, 10, 10)
    expect(bodyBg).toBe("rgb(10, 10, 10)");
  });

  test("Geist Sans renders, not a system fallback", async ({ page }) => {
    await page.goto("/");
    const h1FontFamily = await page.locator("h1").evaluate(
      (el) => getComputedStyle(el).fontFamily
    );
    // next/font hashes the family name (e.g. `__Geist_abc123`) but the
    // literal "Geist" segment is always present.
    expect(h1FontFamily).toMatch(/geist/i);
  });

  test("site header is fixed at top across viewports", async ({ page }) => {
    await page.goto("/");
    const header = page.getByTestId("site-header");
    await expect(header).toBeVisible();
    const position = await header.evaluate(
      (el) => getComputedStyle(el).position
    );
    expect(position).toBe("fixed");
    const box = await header.boundingBox();
    expect(box?.y).toBe(0);
  });

  test("footer shows legal identity with CRO number", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByTestId("site-footer");
    await expect(footer).toContainText(
      "Cú Chulainn Tech Limited · CRO 812722 · Ireland"
    );
  });

  test("clicking 'Get in Touch' scrolls to #contact", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Get in Touch" }).click();
    await expect(page).toHaveURL(/#contact$/);
  });
});

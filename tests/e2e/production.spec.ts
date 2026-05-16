import { test, expect } from "@playwright/test";

const PROD_URL = "https://cuchulainntech.ie";

test.describe("Production deploy — Phase 1 verification", () => {
  test.use({ baseURL: PROD_URL });

  test("page starts dark with no flash", async ({ page }) => {
    await page.goto("/");
    const theme = await page.locator("html").getAttribute("data-theme");
    expect(theme).toBe("dark");
    const bodyBg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor
    );
    expect(bodyBg).toBe("rgb(10, 10, 10)");
  });

  test("Geist renders on production", async ({ page }) => {
    await page.goto("/");
    const ff = await page
      .locator("h1")
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(ff).toMatch(/geist/i);
  });

  test("header fixed across viewports", async ({ page }) => {
    await page.goto("/");
    const header = page.getByTestId("site-header");
    await expect(header).toBeVisible();
    expect(
      await header.evaluate((el) => getComputedStyle(el).position)
    ).toBe("fixed");
    expect((await header.boundingBox())?.y).toBe(0);
  });

  test("footer legal line on production", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("site-footer")).toContainText(
      "Cú Chulainn Tech Limited · CRO 812722 · Ireland"
    );
  });

  test("Vercel Analytics script is injected on the client", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    // Vercel Web Analytics rewrites the script path to bypass ad-blockers, so
    // matching on `_vercel/insights/script.js` is unreliable. Instead match
    // the `data-sdkn` attribute the SDK always sets — current value on the
    // Next.js wrapper is `@vercel/analytics/next`, so we use a prefix match
    // to stay resilient to minor SDK name changes.
    await expect(
      page.locator('script[data-sdkn^="@vercel/analytics"]')
    ).toHaveCount(1, { timeout: 15_000 });
  });
});

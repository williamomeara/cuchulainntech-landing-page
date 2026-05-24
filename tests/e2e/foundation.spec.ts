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
    // Phase 2 adds a hero CTA with the same accessible name; scope to the
    // site header so this test stays unambiguous.
    await page
      .getByTestId("site-header")
      .getByRole("link", { name: "Get in Touch" })
      .click();
    await expect(page).toHaveURL(/#contact$/);
  });
});

test.describe("Phase 2 hero + products", () => {
  test("hero CTA is visible above the fold on mobile (iPhone 14 Pro)", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("mobile"),
      "Above-fold check is mobile-specific",
    );
    await page.goto("/");
    const cta = page.getByTestId("hero-cta");
    await expect(cta).toBeVisible();
    const box = await cta.boundingBox();
    // 393x852 viewport → CTA must sit above y=852 without scrolling.
    expect(box?.y).toBeDefined();
    expect((box?.y ?? Infinity) + (box?.height ?? 0)).toBeLessThan(852);
  });

  test("hero stat reflects the product list", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/shipped \d+ products · building \d+ more/)).toBeVisible();
  });

  test("all nine product cards render with correct status badges", async ({
    page,
  }) => {
    await page.goto("/");
    const liveBadges = page.locator('[data-status="live"]');
    const soonBadges = page.locator('[data-status="coming-soon"]');
    await expect(liveBadges).toHaveCount(5);
    await expect(soonBadges).toHaveCount(4);
  });

  test("Éist card is an external link to eist.app", async ({ page }) => {
    await page.goto("/");
    const card = page.getByTestId("product-card-eist");
    await expect(card).toHaveAttribute("href", "https://eist.app");
    await expect(card).toHaveAttribute("target", "_blank");
    await expect(card).toHaveAttribute("rel", /noopener/);
  });

  test("newly-live cards link out to their sites", async ({ page }) => {
    await page.goto("/");
    const expected: Record<string, string> = {
      "every-company-ever": "https://everycompanyever.ie",
      "tender-match": "https://tendermatch.ie",
    };
    for (const [id, href] of Object.entries(expected)) {
      const card = page.getByTestId(`product-card-${id}`);
      await expect(card).toHaveAttribute("href", href);
      await expect(card).toHaveAttribute("target", "_blank");
    }
  });

  test("Coming-Soon cards are not anchors", async ({ page }) => {
    await page.goto("/");
    for (const id of [
      "grant-match",
      "funding-alerts",
      "are-we-there-yet",
      "ogma",
      "student-placement",
    ]) {
      const card = page.getByTestId(`product-card-${id}`);
      await expect(card).toBeVisible();
      await expect(card).not.toHaveAttribute("href", /.*/);
    }
  });

  test("hero CTA scrolls to contact", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("hero-cta").click();
    await expect(page).toHaveURL(/#contact$/);
  });

  test("OSS strip surfaces the three OSS projects as github links", async ({
    page,
  }) => {
    await page.goto("/");
    const blindfold = page.getByTestId("oss-card-blindfold-env");
    const craobh = page.getByTestId("oss-card-craobh");
    const didIDoGood = page.getByTestId("oss-card-did-i-do-good");
    await expect(blindfold).toHaveAttribute(
      "href",
      "https://github.com/williamomeara/blindfold-env",
    );
    await expect(blindfold).toHaveAttribute("target", "_blank");
    await expect(craobh).toHaveAttribute(
      "href",
      "https://github.com/williamomeara/craobh",
    );
    await expect(didIDoGood).toHaveAttribute(
      "href",
      "https://github.com/williamomeara/did-i-do-good",
    );
  });
});

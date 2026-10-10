import { expect, test } from "@playwright/test";

const TYPED_HEX = "#3366cc";

test("color and history survive a reload", async ({ page }) => {
  await page.goto("/");
  const hexInput = page.locator('color-converter-input[type="HEX"] input');

  // Commit a color through the converter (parse -> SetColor + CommitColor).
  await hexInput.fill(TYPED_HEX);
  // Enter settles the value so it commits (issue #72).
  await hexInput.press("Enter");
  await expect(
    page.locator('color-history .history-swatch[title="#3366CC"]'),
  ).toBeVisible();
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(51, 102, 204)",
  );

  // A full reload must restore the last color (localStorage
  // "last-active-color") and the history ("color-history-store").
  await page.reload();
  await expect(hexInput).toHaveValue(/^#3366cc$/i);
  await expect(
    page.locator('color-history .history-swatch[title="#3366CC"]'),
  ).toBeVisible();
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(51, 102, 204)",
  );
});

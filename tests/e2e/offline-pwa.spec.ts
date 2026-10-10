import { expect, test } from "@playwright/test";

test("app renders fully offline once the service worker precaches", async ({
  page,
  context,
}) => {
  await page.goto("/");

  // Wait for the service worker to finish installing (which includes the
  // precache of all 11 app files) and activating.
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });

  // Reload so the page becomes controlled by the active service worker.
  await page.reload();
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);

  await context.setOffline(true);
  await page.reload();

  // The shell, bundle and custom elements all come from the SW cache.
  const hexInput = page.locator('color-converter-input[type="HEX"] input');
  await expect(hexInput).toBeVisible();
  await expect(hexInput).toHaveValue(/^#[0-9a-f]{6}$/i);
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(71, 85, 105)",
  );

  // The self-hosted font is served from the SW cache too (no third-party
  // requests exist, so offline == fonts still load).
  await expect
    .poll(() =>
      page.evaluate(() => document.fonts.check('16px "Google Sans Flex"')),
    )
    .toBe(true);
});

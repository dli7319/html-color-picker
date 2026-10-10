import { expect, test } from "@playwright/test";

// tests/fixtures/red-64.png: solid #ff0000, 64x64 px
// (generated once with Pillow: Image.new("RGB", (64, 64), (255, 0, 0))).

test("clicking a sampled image pixel sets the app color", async ({ page }) => {
  await page.goto("/");

  await page
    .locator('image-sampling input[type="file"]')
    .setInputFiles("tests/fixtures/red-64.png");

  // The file input draws the image onto the canvas at natural size.
  const canvas = page.locator("image-sampling canvas");
  await expect(canvas).toHaveJSProperty("width", 64);

  // Click the canvas center: the drag controller samples the pixel under
  // the cursor (real 2D canvas getImageData) and dispatches SetColor.
  await canvas.click();

  const hexInput = page.locator('color-converter-input[type="HEX"] input');
  await expect(hexInput).toHaveValue(/^#ff0000$/i);
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(255, 0, 0)",
  );

  // Drag end commits the sampled color to history.
  await expect(
    page.locator('color-history .history-swatch[title="#FF0000"]'),
  ).toBeVisible();
});

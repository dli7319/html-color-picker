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

test("sample from screen captures one frame into the sampling canvas", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(0, 0, 64, 64);
    const stream = canvas.captureStream(30);
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: {
        getDisplayMedia: () => Promise.resolve(stream),
        // silence any other probing
      },
    });
  });
  await page.goto("/");

  await page.getByRole("button", { name: "Sample from screen" }).click();

  const canvas = page.locator("image-sampling canvas");
  await expect(canvas).toHaveJSProperty("width", 64);

  // sampling the captured green frame reports it through the readout
  await canvas.click({ position: { x: 32, y: 32 } });
  const hexInput = page.locator('color-converter-input[type="HEX"] input');
  await expect(hexInput).toHaveValue(/^#00ff00$/i);
});

test("pick a pixel uses the EyeDropper quick-pick when available", async ({
  page,
}) => {
  await page.addInitScript(() => {
    (
      window as unknown as {
        EyeDropper: new () => { open(): Promise<{ sRGBHex: string }> };
      }
    ).EyeDropper = class {
      open() {
        return Promise.resolve({ sRGBHex: "#0000ff" });
      }
    };
  });
  await page.goto("/");

  await page.getByRole("button", { name: "Pick a pixel" }).click();

  const hexInput = page.locator('color-converter-input[type="HEX"] input');
  await expect(hexInput).toHaveValue(/^#0000ff$/i);
});

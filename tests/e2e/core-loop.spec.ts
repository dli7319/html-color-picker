import { expect, test } from "@playwright/test";

const DEFAULT_HEX = "#475569";
const DEFAULT_RGB = "rgb(71, 85, 105)";
const TYPED_HEX = "#3366cc";
const TYPED_RGB255 = "51,102,204";
const TYPED_RGB01 = "0.200,0.400,0.800";
const TYPED_RGB_CSS = "rgb(51, 102, 204)";

const hexInput = (page: import("@playwright/test").Page) =>
  page.locator('color-converter-input[type="HEX"] input');

test("typing a color syncs converter inputs, body background, and history", async ({
  page,
}) => {
  await page.goto("/");

  // Default slate color is rendered from the initial state.
  await expect(hexInput(page)).toBeVisible();
  await expect(hexInput(page)).toHaveValue(DEFAULT_HEX);
  await expect(page.locator("body")).toHaveCSS("background-color", DEFAULT_RGB);

  await hexInput(page).fill(TYPED_HEX);

  // All converter views agree on the typed color.
  await expect(
    page.locator('color-converter-input[type="RGB255"] input'),
  ).toHaveValue(TYPED_RGB255);
  await expect(
    page.locator('color-converter-input[type="RGB01"] input'),
  ).toHaveValue(TYPED_RGB01);
  await expect(
    page.locator('color-converter-input[type="HSV"] input'),
  ).toHaveValue(/.+/);
  await expect(
    page.locator('color-converter-input[type="HSL"] input'),
  ).toHaveValue(/.+/);

  // The root element drives the page background.
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    TYPED_RGB_CSS,
  );

  // The commit event records the color in history.
  await expect(
    page.locator('color-history .history-swatch[title="#3366CC"]'),
  ).toBeVisible();
});

test("dragging the HSV surface drives the whole app state", async ({
  page,
}) => {
  await page.goto("/");
  await hexInput(page).fill(TYPED_HEX);
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    TYPED_RGB_CSS,
  );

  const grad = page.locator("color-selection-hsv-grad #color-grad-container");
  await expect(grad).toBeVisible();
  const box = await grad.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;

  // Drag to the bottom-left corner: extreme saturation/value coordinates that
  // cannot reproduce the interior color typed above.
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.05, box.y + box.height * 0.95, {
    steps: 10,
  });
  await page.mouse.up();

  const draggedHex = await hexInput(page).inputValue();
  expect(draggedHex).not.toBe(TYPED_HEX);
  expect(draggedHex).toMatch(/^#[0-9a-f]{6}$/i);

  // Body background and the RGB input agree with the dragged hex value.
  const r = parseInt(draggedHex.slice(1, 3), 16);
  const g = parseInt(draggedHex.slice(3, 5), 16);
  const b = parseInt(draggedHex.slice(5, 7), 16);
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    `rgb(${r}, ${g}, ${b})`,
  );
  await expect(
    page.locator('color-converter-input[type="RGB255"] input'),
  ).toHaveValue(`${r},${g},${b}`);

  // The drag committed the color to history.
  await expect(
    page.locator(
      `color-history .history-swatch[title="${draggedHex.toUpperCase()}"]`,
    ),
  ).toBeVisible();
});

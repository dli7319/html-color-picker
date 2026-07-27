import { describe, it, expect, beforeEach } from "vitest";
import { Color } from "../lib/Color";
import { Coordinates } from "../lib/Coordinates";
import { ActiveColorSide } from "./interpolation/ColorInterpolation";
import { ColorPickerSetColorEvent } from "../events/ColorPickerSetColorEvent";
import { ColorPickerSetCoordinatesEvent } from "../events/ColorPickerSetCoordinatesEvent";
import { ColorPickerSetInterpolationActiveEvent } from "../events/ColorPickerSetInterpolationActiveEvent";
import { ColorPickerSetPaletteActiveEvent } from "../events/ColorPickerSetPaletteActiveEvent";
import { ColorPicker } from "./ColorPicker";

/**
 * Creates a ColorPicker element safe for testing in jsdom.
 * Sets renderRoot to a fresh shadow root to bypass Lit's style adoption
 * (jsdom does not support adoptedStyleSheets).
 */
function createPicker(): ColorPicker {
  const el = document.createElement("color-picker") as ColorPicker;
  (
    el as unknown as { renderRoot: ShadowRoot }
  ).renderRoot = el.attachShadow({ mode: "open" });
  return el;
}

describe("ColorPicker", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("is registered as a custom element", () => {
    expect(customElements.get("color-picker")).toBe(ColorPicker);
  });

  it("has default color slate gray (71, 85, 105)", () => {
    const el = createPicker();
    expect(el.color.getRGB255()).toEqual([71, 85, 105]);
  });

  it("has default interpolationLeft as red and interpolationRight as white", () => {
    const el = createPicker();
    expect(el.interpolationLeft.getRGB255()).toEqual([255, 0, 0]);
    expect(el.interpolationRight.getRGB255()).toEqual([255, 255, 255]);
  });

  it("setColor updates color state", () => {
    const el = createPicker();
    const newColor = Color.fromRGB255Array([100, 150, 200]);
    el.setColor(newColor);
    expect(el.color).toBe(newColor);
  });

  it("syncs interpolation endpoint when interpolationActive is LEFT", () => {
    const el = createPicker();
    el.interpolationActive = ActiveColorSide.LEFT;
    const newColor = Color.fromRGB255Array([100, 150, 200]);
    el.setColor(newColor);
    expect(el.interpolationLeft).toBe(newColor);
  });

  it("syncs interpolation endpoint when interpolationActive is RIGHT", () => {
    const el = createPicker();
    el.interpolationActive = ActiveColorSide.RIGHT;
    const newColor = Color.fromRGB255Array([100, 150, 200]);
    el.setColor(newColor);
    expect(el.interpolationRight).toBe(newColor);
  });

  it("does not sync interpolation endpoint when interpolationActive is NONE", () => {
    const el = createPicker();
    el.interpolationActive = ActiveColorSide.NONE;
    const originalLeft = el.interpolationLeft;
    const originalRight = el.interpolationRight;
    const newColor = Color.fromRGB255Array([100, 150, 200]);
    el.setColor(newColor);
    expect(el.interpolationLeft).toBe(originalLeft);
    expect(el.interpolationRight).toBe(originalRight);
  });

  it("listens for set-color event and updates color", () => {
    const el = createPicker();
    const newColor = Color.fromRGB255Array([100, 150, 200]);
    el.dispatchEvent(new ColorPickerSetColorEvent(newColor));
    expect(el.color).toBe(newColor);
  });

  it("listens for set-coordinates event and updates coordinates", () => {
    const el = createPicker();
    const newCoords: Coordinates = { x: 10, y: 20, width: 100, height: 200 };
    el.dispatchEvent(new ColorPickerSetCoordinatesEvent(newCoords));
    expect(el.coordinates).toEqual(newCoords);
  });

  it("listens for set-interpolation-active event and updates interpolationActive", () => {
    const el = createPicker();
    el.dispatchEvent(
      new ColorPickerSetInterpolationActiveEvent(ActiveColorSide.LEFT),
    );
    expect(el.interpolationActive).toBe(ActiveColorSide.LEFT);
  });

  it("listens for set-palette-active event and updates paletteActiveIndex", () => {
    const el = createPicker();
    el.dispatchEvent(new ColorPickerSetPaletteActiveEvent(3));
    expect(el.paletteActiveIndex).toBe(3);
  });

  it("loads last color from localStorage on construction", () => {
    localStorage.setItem("last-active-color", "ff8800");
    const el = createPicker();
    expect(el.color.getHex()).toBe("ff8800");
  });

  it("renders a slot", () => {
    const el = createPicker();
    const result = el.render();
    // TemplateResult.strings contains the literal segments of the template
    const output = result.strings.join("");
    expect(output).toMatch(/<slot/);
    expect(output).toContain('class="main-container"');
  });
});

// Mock the CSS import before the component module loads.
// Vitest hoists vi.mock calls, so this runs before any imports below.
vi.mock("../../styles/ColorSelectionTypeA.css", () => ({
  styles: [],
}));

import { describe, it, expect, vi, afterEach } from "vitest";
import { Color, ColorInputType } from "../../lib/Color";
import "./ColorSelectionHsvBar";
import type { ColorSelectionHsvBar } from "./ColorSelectionHsvBar";
import type { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hsv(h: number, s: number, v: number): Color {
  return new Color({ type: ColorInputType.HSV, h, s, v });
}

/** jsdom elements have zero bounding rects by default, so provide one. */
function rect(width: number, height: number): DOMRect {
  return {
    x: 0,
    y: 0,
    width,
    height,
    top: 0,
    right: width,
    bottom: height,
    left: 0,
    toJSON: () => {},
  } as DOMRect;
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

describe("ColorSelectionHsvBar", () => {
  let el: ColorSelectionHsvBar;

  afterEach(() => {
    if (el?.parentNode) {
      el.parentNode.removeChild(el);
    }
    // Clean up any in-progress drag listeners between tests
    document.dispatchEvent(new MouseEvent("mouseup"));
  });

  // ---- Test 1: Registration ----
  it('is registered as "color-selection-hsv-bar"', () => {
    expect(customElements.get("color-selection-hsv-bar")).toBeDefined();
  });

  // ---- Test 2: Render structure ----
  it("renders .color-bar div and <color-bar-pointer> child", async () => {
    el = document.createElement(
      "color-selection-hsv-bar",
    ) as ColorSelectionHsvBar;
    document.body.appendChild(el);
    await el.updateComplete;

    const root = el.shadowRoot!;
    expect(root.querySelector(".color-bar")).not.toBeNull();
    expect(root.querySelector(".color-bar")!.id).toBe("color-bar");
    expect(root.querySelector("color-bar-pointer")).not.toBeNull();
  });

  // ---- Test 3: Pointer position ----
  it("sets pointer.position to (hue / 360) * 100", async () => {
    el = document.createElement(
      "color-selection-hsv-bar",
    ) as ColorSelectionHsvBar;
    el.color = hsv(90, 50, 50);
    document.body.appendChild(el);
    await el.updateComplete;

    const ptr = el.shadowRoot!.querySelector(
      "color-bar-pointer",
    ) as unknown as { position: number };
    // (90 / 360) * 100 = 25
    expect(ptr.position).toBeCloseTo(25);
  });

  // ---- Test 4: Pointer color ----
  it("sets pointer.color to hex of the full-saturation hue", async () => {
    const hues = [0, 90, 180, 270];

    for (const h of hues) {
      el = document.createElement(
        "color-selection-hsv-bar",
      ) as ColorSelectionHsvBar;
      el.color = hsv(h, 50, 50);
      document.body.appendChild(el);
      await el.updateComplete;

      const ptr = el.shadowRoot!.querySelector(
        "color-bar-pointer",
      ) as unknown as { color: string };
      const expected =
        "#" +
        new Color({ type: ColorInputType.HSV, h, s: 100, v: 100 }).getHex();
      expect(ptr.color.toLowerCase()).toBe(expected.toLowerCase());

      // Clean up so afterEach can remove the old element
      el.parentNode!.removeChild(el);
    }
  });

  // ---- Test 5: Color property change ----
  it("re-renders pointer when color property is changed", async () => {
    el = document.createElement(
      "color-selection-hsv-bar",
    ) as ColorSelectionHsvBar;
    el.color = hsv(0, 100, 100);
    document.body.appendChild(el);
    await el.updateComplete;

    const ptr = el.shadowRoot!.querySelector(
      "color-bar-pointer",
    ) as unknown as { position: number; color: string };
    expect(ptr.position).toBe(0);
    expect(ptr.color.toLowerCase()).toBe("#ff0000");

    // Change to a different hue
    el.color = hsv(180, 100, 100);
    await el.updateComplete;
    expect(ptr.position).toBeCloseTo(50);
    expect(ptr.color.toLowerCase()).toBe("#00ffff");
  });

  // ---- Test 6: Drag interaction ----
  it("handles mousedown/mousemove on the color bar to update hue", async () => {
    el = document.createElement(
      "color-selection-hsv-bar",
    ) as ColorSelectionHsvBar;
    el.color = hsv(0, 100, 100);
    document.body.appendChild(el);
    await el.updateComplete;

    const bar = el.shadowRoot!.querySelector(".color-bar") as HTMLDivElement;
    vi.spyOn(bar, "getBoundingClientRect").mockReturnValue(rect(200, 20));

    const setColorSpy = vi.fn();
    el.addEventListener("set-color", setColorSpy);

    // Start drag
    bar.dispatchEvent(
      new MouseEvent("mousedown", { bubbles: true, composed: true }),
    );
    // Move to x=100 → x-ratio = 0.5 → newHue = 180
    document.dispatchEvent(new MouseEvent("mousemove", { clientX: 100 }));
    // End drag
    document.dispatchEvent(new MouseEvent("mouseup"));

    expect(setColorSpy).toHaveBeenCalledTimes(1);

    const ev = setColorSpy.mock.calls[0][0] as ColorPickerSetColorEvent;
    const [h, s, v] = ev.color.getHSV();
    expect(h).toBeCloseTo(180);
    expect(s).toBe(100);
    expect(v).toBe(100);
  });
});

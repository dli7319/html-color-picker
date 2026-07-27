import { describe, it, expect } from "vitest";
import { Color, ColorInputType } from "../../lib/Color";
import "./ColorSelectionHsl";
import type { ColorSelectionHsl } from "./ColorSelectionHsl";
import type { ColorSelectionHslBar } from "./ColorSelectionHslBar";
import type { ColorSelectionHslWheel } from "./ColorSelectionHslWheel";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hsl(h: number, s: number, l: number): Color {
  return new Color({ type: ColorInputType.HSL, h, s, l });
}

// ---------------------------------------------------------------------------
// ColorSelectionHsl (<color-selection-hsl>)
// ---------------------------------------------------------------------------

describe("ColorSelectionHsl", () => {
  // -----------------------------------------------------------------------
  // 1. Custom element registration
  // -----------------------------------------------------------------------
  describe("custom element", () => {
    it('is defined as "color-selection-hsl"', () => {
      const el = document.createElement("color-selection-hsl");
      expect(el).toBeInstanceOf(HTMLElement);
    });

    it("is registered in the custom elements registry", () => {
      expect(customElements.get("color-selection-hsl")).toBeDefined();
    });
  });

  // -----------------------------------------------------------------------
  // 2. Renders both child components in light DOM
  // -----------------------------------------------------------------------
  describe("rendered children", () => {
    it("renders a <color-selection-hsl-wheel> child", async () => {
      const el = document.createElement("color-selection-hsl");
      document.body.appendChild(el);
      await el.updateComplete;

      const wheel = el.shadowRoot!.querySelector("color-selection-hsl-wheel");
      expect(wheel).not.toBeNull();

      document.body.removeChild(el);
    });

    it("renders a <color-selection-hsl-bar> child", async () => {
      const el = document.createElement("color-selection-hsl");
      document.body.appendChild(el);
      await el.updateComplete;

      const bar = el.shadowRoot!.querySelector("color-selection-hsl-bar");
      expect(bar).not.toBeNull();

      document.body.removeChild(el);
    });

    it("renders exactly two custom element children", async () => {
      const el = document.createElement("color-selection-hsl");
      document.body.appendChild(el);
      await el.updateComplete;

      const wheels = el.shadowRoot!.querySelectorAll(
        "color-selection-hsl-wheel",
      );
      const bars = el.shadowRoot!.querySelectorAll("color-selection-hsl-bar");
      expect(wheels.length).toBe(1);
      expect(bars.length).toBe(1);

      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 3. Child components receive the color property from the parent
  // -----------------------------------------------------------------------
  describe("color property passthrough", () => {
    it("passes the default color to <color-selection-hsl-wheel>", async () => {
      const el = document.createElement(
        "color-selection-hsl",
      ) as ColorSelectionHsl;
      document.body.appendChild(el);
      await el.updateComplete;

      const wheel = el.shadowRoot!.querySelector(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      expect(wheel.color).toBe(el.color);
      expect(wheel.color).toEqual(new Color());

      document.body.removeChild(el);
    });

    it("passes the default color to <color-selection-hsl-bar>", async () => {
      const el = document.createElement(
        "color-selection-hsl",
      ) as ColorSelectionHsl;
      document.body.appendChild(el);
      await el.updateComplete;

      const bar = el.shadowRoot!.querySelector(
        "color-selection-hsl-bar",
      ) as ColorSelectionHslBar;
      expect(bar.color).toBe(el.color);
      expect(bar.color).toEqual(new Color());

      document.body.removeChild(el);
    });

    it("forwards an updated color to both children", async () => {
      const el = document.createElement(
        "color-selection-hsl",
      ) as ColorSelectionHsl;
      document.body.appendChild(el);
      await el.updateComplete;

      const blueHsl = hsl(240, 100, 50);
      el.color = blueHsl;
      await el.updateComplete;

      const wheel = el.shadowRoot!.querySelector(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      const bar = el.shadowRoot!.querySelector(
        "color-selection-hsl-bar",
      ) as ColorSelectionHslBar;

      expect(wheel.color).toBe(blueHsl);
      expect(bar.color).toBe(blueHsl);

      document.body.removeChild(el);
    });

    it("both children share the same color object reference", async () => {
      const el = document.createElement(
        "color-selection-hsl",
      ) as ColorSelectionHsl;
      document.body.appendChild(el);
      await el.updateComplete;

      const wheel = el.shadowRoot!.querySelector(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      const bar = el.shadowRoot!.querySelector(
        "color-selection-hsl-bar",
      ) as ColorSelectionHslBar;

      expect(wheel.color).toBe(bar.color);

      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 4. Default color property
  // -----------------------------------------------------------------------
  describe("default color", () => {
    it("has a default color of black (new Color())", async () => {
      const el = document.createElement(
        "color-selection-hsl",
      ) as ColorSelectionHsl;
      document.body.appendChild(el);
      await el.updateComplete;
      expect(el.color).toEqual(new Color());
      document.body.removeChild(el);
    });

    it("can be set to a different Color value", async () => {
      const el = document.createElement(
        "color-selection-hsl",
      ) as ColorSelectionHsl;
      document.body.appendChild(el);
      await el.updateComplete;

      const green = hsl(120, 100, 50);
      el.color = green;
      await el.updateComplete;
      expect(el.color).toBe(green);

      document.body.removeChild(el);
    });
  });
});

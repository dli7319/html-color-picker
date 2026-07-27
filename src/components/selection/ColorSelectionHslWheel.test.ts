import { describe, it, expect, vi } from "vitest";
import { Color, ColorInputType } from "../../lib/Color";
import "./ColorSelectionHslWheel";
import type { ColorSelectionHslWheel } from "./ColorSelectionHslWheel";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hsl(h: number, s: number, l: number): Color {
  return new Color({ type: ColorInputType.HSL, h, s, l });
}

/**
 * Extracts a numeric CSS percentage from a style attribute key-value pair.
 */
function extractPct(style: string, key: string): number {
  const re = new RegExp(`${key}:\\s*([\\d.]+)%`);
  const m = style.match(re);
  return m ? parseFloat(m[1]) : NaN;
}

/**
 * Asserts that a CSS percentage value is within a small tolerance of expected.
 */
function expectPct(style: string, key: string, expected: number, tol = 0.01) {
  const actual = extractPct(style, key);
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tol);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("ColorSelectionHslWheel", () => {
  // -----------------------------------------------------------------------
  // 1. Custom element registration
  // -----------------------------------------------------------------------
  describe("custom element", () => {
    it('is defined as "color-selection-hsl-wheel"', () => {
      const el = document.createElement("color-selection-hsl-wheel");
      expect(el).toBeInstanceOf(HTMLElement);
    });

    it("is registered in the custom elements registry", () => {
      expect(customElements.get("color-selection-hsl-wheel")).toBeDefined();
    });
  });

  // -----------------------------------------------------------------------
  // 2. Renders gradient backgrounds
  // -----------------------------------------------------------------------
  describe("gradient rendering", () => {
    it("renders .color-grad div with radial-gradient and conic-gradient", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      const grad = el.shadowRoot!.querySelector(".color-grad") as HTMLElement;
      expect(grad).toBeTruthy();

      const style = grad.getAttribute("style") ?? "";
      expect(style).toContain("radial-gradient");
      expect(style).toContain("conic-gradient");
      expect(style).toContain("in hsl shorter hue");

      // Verify the key gradient stops
      expect(style).toContain("hsl(0, 0%, 50%, 1) 0%");
      expect(style).toContain("hsl(0, 100%, 0%, 0) 70%");
      expect(style).toContain("hsl(0, 100%, 50%)");
      expect(style).toContain("hsl(360, 100%, 50%)");

      document.body.removeChild(el);
    });

    it("has a circular .color-grad with aspect-ratio: 1 and border-radius: 100%", () => {
      // Read static styles directly from the registered class constructor
      const ColorSelectionHslWheelClass = customElements.get(
        "color-selection-hsl-wheel",
      ) as typeof ColorSelectionHslWheel;
      const stylesArray = ColorSelectionHslWheelClass.styles;
      const cssText = Array.isArray(stylesArray)
        ? stylesArray.map((s) => s.toString?.() ?? "").join(" ")
        : String(stylesArray);
      expect(cssText).toContain("aspect-ratio: 1");
      expect(cssText).toContain("border-radius: 100%");
    });
  });

  // -----------------------------------------------------------------------
  // 3. Circle position based on hue and saturation
  // -----------------------------------------------------------------------
  describe("circle position", () => {
    it("positions the circle at center when saturation is 0", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      el.color = hsl(0, 0, 50);
      await el.updateComplete;

      const circle = el.shadowRoot!.querySelector(
        ".color-grad-circle",
      ) as HTMLElement;
      const style = circle.getAttribute("style") ?? "";
      expectPct(style, "top", 50);
      expectPct(style, "left", 50);

      document.body.removeChild(el);
    });

    it("positions the circle at the top edge for hue=0 sat=100", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      el.color = hsl(0, 100, 50);
      await el.updateComplete;

      const circle = el.shadowRoot!.querySelector(
        ".color-grad-circle",
      ) as HTMLElement;
      const style = circle.getAttribute("style") ?? "";
      // radius=0.5, angle=270deg -> cos=0, sin=-1
      // left: 50 + 0 = 50%, top: 50 + (-0.5*100) = 0%
      expectPct(style, "left", 50);
      expectPct(style, "top", 0);

      document.body.removeChild(el);
    });

    it("positions the circle at the right edge for hue=90 sat=100", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      el.color = hsl(90, 100, 50);
      await el.updateComplete;

      const circle = el.shadowRoot!.querySelector(
        ".color-grad-circle",
      ) as HTMLElement;
      const style = circle.getAttribute("style") ?? "";
      // radius=0.5, angle=360deg -> cos=1, sin=0
      // left: 50 + 50 = 100%, top: 50 + 0 = 50%
      expectPct(style, "left", 100);
      expectPct(style, "top", 50);

      document.body.removeChild(el);
    });

    it("positions the circle at the bottom edge for hue=180 sat=100", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      el.color = hsl(180, 100, 50);
      await el.updateComplete;

      const circle = el.shadowRoot!.querySelector(
        ".color-grad-circle",
      ) as HTMLElement;
      const style = circle.getAttribute("style") ?? "";
      // radius=0.5, angle=450deg->90deg -> cos=0, sin=1
      // left: 50 + 0 = 50%, top: 50 + 50 = 100%
      expectPct(style, "left", 50);
      expectPct(style, "top", 100);

      document.body.removeChild(el);
    });

    it("positions the circle at the left edge for hue=270 sat=100", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      el.color = hsl(270, 100, 50);
      await el.updateComplete;

      const circle = el.shadowRoot!.querySelector(
        ".color-grad-circle",
      ) as HTMLElement;
      const style = circle.getAttribute("style") ?? "";
      // radius=0.5, angle=540deg->180deg -> cos=-1, sin=0
      // left: 50 + (-50) = 0%, top: 50 + 0 = 50%
      expectPct(style, "left", 0);
      expectPct(style, "top", 50);

      document.body.removeChild(el);
    });

    it("positions the circle at half-radius for saturation=50", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      // hue=0, sat=50: radius = 0.25, angle = 270deg
      // cos(270)=0, sin(270)=-1
      // left: 50 + 0 = 50%, top: 50 + (-0.25*100) = 25%
      el.color = hsl(0, 50, 50);
      await el.updateComplete;

      const circle = el.shadowRoot!.querySelector(
        ".color-grad-circle",
      ) as HTMLElement;
      const style = circle.getAttribute("style") ?? "";
      expectPct(style, "left", 50);
      expectPct(style, "top", 25);

      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 4. Setting color updates circle position
  // -----------------------------------------------------------------------
  describe("color updates", () => {
    it("moves the circle when color changes from one HSL value to another", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      const circleEl = () =>
        el.shadowRoot!.querySelector(".color-grad-circle") as HTMLElement;

      // Start at center (sat=0)
      el.color = hsl(0, 0, 50);
      await el.updateComplete;
      let style = circleEl().getAttribute("style") ?? "";
      expectPct(style, "top", 50);
      expectPct(style, "left", 50);

      // Move to right edge
      el.color = hsl(90, 100, 50);
      await el.updateComplete;
      style = circleEl().getAttribute("style") ?? "";
      expectPct(style, "left", 100);
      expectPct(style, "top", 50);

      // Move to bottom edge
      el.color = hsl(180, 100, 50);
      await el.updateComplete;
      style = circleEl().getAttribute("style") ?? "";
      expectPct(style, "top", 100);
      expectPct(style, "left", 50);

      document.body.removeChild(el);
    });

    it("retains a centered circle when hue changes but saturation stays 0", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      const circleEl = () =>
        el.shadowRoot!.querySelector(".color-grad-circle") as HTMLElement;

      el.color = hsl(0, 0, 50);
      await el.updateComplete;
      expectPct(circleEl().getAttribute("style") ?? "", "left", 50);

      el.color = hsl(120, 0, 50);
      await el.updateComplete;
      expectPct(circleEl().getAttribute("style") ?? "", "left", 50);

      el.color = hsl(240, 0, 50);
      await el.updateComplete;
      expectPct(circleEl().getAttribute("style") ?? "", "left", 50);

      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 5. Circle background-color is hex of color at l=50
  // -----------------------------------------------------------------------
  describe("circle background-color", () => {
    it("uses the hex of the current color at lightness=50", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      const testColor = hsl(180, 50, 50);
      el.color = testColor;
      await el.updateComplete;

      const expectedHex = new Color({
        type: ColorInputType.HSL,
        h: 180,
        s: 50,
        l: 50,
      }).getHex();

      const circle = el.shadowRoot!.querySelector(
        ".color-grad-circle",
      ) as HTMLElement;
      const style = circle.getAttribute("style") ?? "";
      expect(style).toContain(`#${expectedHex}`);

      document.body.removeChild(el);
    });

    it("changes background-color when a different hue is selected", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      el.color = hsl(0, 100, 50);
      await el.updateComplete;

      const circle = el.shadowRoot!.querySelector(
        ".color-grad-circle",
      ) as HTMLElement;

      // hsl(0, 100%, 50%) with l forced to 50 in the hex → same as hsl(0, 100, 50)
      const expectedHex1 = new Color({
        type: ColorInputType.HSL,
        h: 0,
        s: 100,
        l: 50,
      }).getHex();
      let style = circle.getAttribute("style") ?? "";
      expect(style).toContain(`#${expectedHex1}`);

      // Change to hue=120
      el.color = hsl(120, 100, 50);
      await el.updateComplete;

      const expectedHex2 = new Color({
        type: ColorInputType.HSL,
        h: 120,
        s: 100,
        l: 50,
      }).getHex();
      style = circle.getAttribute("style") ?? "";
      expect(style).toContain(`#${expectedHex2}`);

      document.body.removeChild(el);
    });

    it("uses the hex of color at l=50 regardless of actual color lightness", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      // Color with l=20 but the indicator should use l=50 for its background
      el.color = hsl(200, 80, 20);
      await el.updateComplete;

      const expectedHex = new Color({
        type: ColorInputType.HSL,
        h: 200,
        s: 80,
        l: 50,
      }).getHex();

      const circle = el.shadowRoot!.querySelector(
        ".color-grad-circle",
      ) as HTMLElement;
      const style = circle.getAttribute("style") ?? "";
      expect(style).toContain(`#${expectedHex}`);

      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 6. Renders expected DOM structure
  // -----------------------------------------------------------------------
  describe("DOM structure", () => {
    it("renders exactly one .color-grad and one .color-grad-circle", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      const grads = el.shadowRoot!.querySelectorAll(".color-grad");
      const circles = el.shadowRoot!.querySelectorAll(".color-grad-circle");
      expect(grads.length).toBe(1);
      expect(circles.length).toBe(1);

      document.body.removeChild(el);
    });

    it("has the color-grad-circle inside the color-grad div", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      const grad = el.shadowRoot!.querySelector(".color-grad") as HTMLElement;
      const circle = grad.querySelector(".color-grad-circle");
      expect(circle).not.toBeNull();

      document.body.removeChild(el);
    });

    it("renders a shadowRoot", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;
      expect(el.shadowRoot).toBeTruthy();
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 7. Drag interaction
  // -----------------------------------------------------------------------
  describe("drag interaction", () => {
    it("dragging on the wheel updates hue and saturation", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      const grad = el.shadowRoot!.querySelector(".color-grad") as HTMLElement;
      const bcrSpy = vi
        .spyOn(grad, "getBoundingClientRect")
        .mockReturnValue(new DOMRect(0, 0, 200, 200));

      const setEvent = await new Promise<ColorPickerSetColorEvent>(
        (resolve) => {
          el.addEventListener(
            "set-color",
            (e: Event) => resolve(e as ColorPickerSetColorEvent),
            { once: true },
          );
          grad.dispatchEvent(
            new MouseEvent("mousedown", {
              bubbles: true,
              clientX: 200,
              clientY: 100,
            }),
          );
          document.dispatchEvent(
            new MouseEvent("mousemove", {
              bubbles: true,
              clientX: 200,
              clientY: 100,
            }),
          );
        },
      );

      const [hue] = setEvent.color.getHSL();
      expect(hue).toBeCloseTo(90);

      document.dispatchEvent(new MouseEvent("mouseup"));
      bcrSpy.mockRestore();
      document.body.removeChild(el);
    });

    it("drag end commits the color", async () => {
      const el = document.createElement(
        "color-selection-hsl-wheel",
      ) as ColorSelectionHslWheel;
      document.body.appendChild(el);
      await el.updateComplete;

      const grad = el.shadowRoot!.querySelector(".color-grad") as HTMLElement;

      const commitEvent = await new Promise<Event>((resolve) => {
        el.addEventListener("commit-color", resolve, { once: true });
        grad.dispatchEvent(
          new MouseEvent("mousedown", {
            bubbles: true,
            clientX: 100,
            clientY: 100,
          }),
        );
        document.dispatchEvent(new MouseEvent("mouseup"));
      });

      expect(commitEvent).toBeInstanceOf(ColorPickerCommitColorEvent);
      document.body.removeChild(el);
    });
  });
});

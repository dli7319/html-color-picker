import { describe, it, expect, vi, afterEach } from "vitest";
import type { LitElement } from "lit";
import { Color, ColorInputType } from "../../lib/Color";

// Mock CSS imports — vitest treats .css as an empty module, but the build
// pipeline uses rollup-plugin-lit-css to produce Lit CSSResult objects.
vi.mock("../../styles/ColorSelectionTypeA.css", () => ({
  styles: { cssText: ":host { display: flex; }" },
}));

import "./ColorSelectionHsv";

/**
 * Helper: create a <color-selection-hsv> element, attach it to the document,
 * and wait for Lit's first update cycle to complete.
 */
async function createElement() {
  const el = document.createElement("color-selection-hsv");
  document.body.appendChild(el);
  await (el as LitElement).updateComplete;
  return el as LitElement & { color: Color };
}

function getGrad(el: LitElement): Element | null {
  return el.shadowRoot!.querySelector("color-selection-hsv-grad");
}

function getBar(el: LitElement): Element | null {
  return el.shadowRoot!.querySelector("color-selection-hsv-bar");
}

describe("ColorSelectionHsv", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("registers the custom element as color-selection-hsv", () => {
    const Ctor = customElements.get("color-selection-hsv");
    expect(Ctor).toBeDefined();
  });

  describe("rendering", () => {
    it("renders a <color-selection-hsv-grad> child", async () => {
      const el = await createElement();
      expect(getGrad(el)).toBeTruthy();
    });

    it("renders a <color-selection-hsv-bar> child", async () => {
      const el = await createElement();
      expect(getBar(el)).toBeTruthy();
    });

    it("renders both children inside shadow DOM", async () => {
      const el = await createElement();
      expect(el.shadowRoot).toBeTruthy();
      const customChildren = el.shadowRoot!.querySelectorAll(
        "color-selection-hsv-grad, color-selection-hsv-bar",
      );
      expect(customChildren.length).toBe(2);
    });
  });

  describe("color property propagation", () => {
    it("passes the initial color to both children", async () => {
      const color = new Color({
        type: ColorInputType.HSV,
        h: 180,
        s: 50,
        v: 75,
      });

      const el = document.createElement(
        "color-selection-hsv",
      ) as LitElement & {
        color: Color;
      };
      el.color = color;
      document.body.appendChild(el);
      await el.updateComplete;

      const grad = getGrad(el) as unknown as { color: Color };
      const bar = getBar(el) as unknown as { color: Color };

      expect(grad.color).toBe(color);
      expect(bar.color).toBe(color);
    });

    it("uses the default black Color when no color is set", async () => {
      const el = await createElement();
      const defaultColor = new Color();

      const grad = getGrad(el) as unknown as { color: Color };
      const bar = getBar(el) as unknown as { color: Color };

      expect(grad.color.getRGB255()).toEqual(defaultColor.getRGB255());
      expect(bar.color.getRGB255()).toEqual(defaultColor.getRGB255());
    });
  });

  describe("color change propagation", () => {
    it("updates children when color changes", async () => {
      const el = await createElement();

      const newColor = new Color({
        type: ColorInputType.HSV,
        h: 90,
        s: 50,
        v: 50,
      });

      el.color = newColor;
      await el.updateComplete;

      const grad = getGrad(el) as unknown as { color: Color };
      const bar = getBar(el) as unknown as { color: Color };

      expect(grad.color).toBe(newColor);
      expect(bar.color).toBe(newColor);
    });

    it("propagates multiple sequential color changes", async () => {
      const el = await createElement();

      const colors = [
        new Color({ type: ColorInputType.HSV, h: 0, s: 100, v: 100 }),
        new Color({ type: ColorInputType.HSV, h: 120, s: 50, v: 50 }),
        new Color({ type: ColorInputType.HSV, h: 240, s: 25, v: 75 }),
      ];

      for (const color of colors) {
        el.color = color;
        await el.updateComplete;

        const grad = getGrad(el) as unknown as { color: Color };
        expect(grad.color).toBe(color);
      }
    });
  });
});

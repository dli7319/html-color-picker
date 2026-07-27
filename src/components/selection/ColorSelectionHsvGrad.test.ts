// Mock the CSS import before the component module loads.
// Vitest hoists vi.mock calls, so this runs before any imports below.
vi.mock("../../styles/ColorSelectionTypeA.css", () => ({
  styles: [],
}));

import { describe, it, expect, vi, afterEach } from "vitest";
import { Color, ColorInputType } from "../../lib/Color";
import "./ColorSelectionHsvGrad";
import type { ColorSelectionHsvGrad } from "./ColorSelectionHsvGrad";

describe("ColorSelectionHsvGrad", () => {
  let el: ColorSelectionHsvGrad;

  afterEach(() => {
    if (el?.parentNode) {
      el.parentNode.removeChild(el);
    }
  });

  // ---- Test 1 ----
  it("is registered as color-selection-hsv-grad", () => {
    expect(customElements.get("color-selection-hsv-grad")).toBeDefined();
  });

  // ---- Test 2 ----
  it("renders #color-grad-container with gradient layers and circle", async () => {
    el = document.createElement(
      "color-selection-hsv-grad",
    ) as ColorSelectionHsvGrad;
    document.body.appendChild(el);
    await el.updateComplete;

    const root = el.shadowRoot!;
    const container = root.querySelector("#color-grad-container");
    expect(container).not.toBeNull();

    expect(container!.querySelector(".color-grad-1")).not.toBeNull();
    expect(container!.querySelector(".color-grad-2")).not.toBeNull();
    expect(container!.querySelector(".color-grad-circle")).not.toBeNull();
  });

  // ---- Test 3 ----
  it("positions circle: top from value, left from saturation", async () => {
    el = document.createElement(
      "color-selection-hsv-grad",
    ) as ColorSelectionHsvGrad;
    document.body.appendChild(el);

    // saturation=75, value=30
    el.color = new Color({
      type: ColorInputType.HSV,
      h: 180,
      s: 75,
      v: 30,
    });
    await el.updateComplete;

    const circle = el.shadowRoot!.querySelector(
      ".color-grad-circle",
    ) as HTMLElement;
    const style = circle.getAttribute("style");

    // top = (1 - value/100) * 100 = (1 - 0.30) * 100 = 70%
    expect(style).toContain("top: 70%");
    // left = saturation/100 * 100 = 0.75 * 100 = 75%
    expect(style).toContain("left: 75%");
  });

  // ---- Test 4 ----
  it("sets circle border to white when value < 50 and black when value >= 50", async () => {
    el = document.createElement(
      "color-selection-hsv-grad",
    ) as ColorSelectionHsvGrad;
    document.body.appendChild(el);

    // value=25 < 50 => white border
    el.color = new Color({
      type: ColorInputType.HSV,
      h: 0,
      s: 100,
      v: 25,
    });
    await el.updateComplete;

    let circle = el.shadowRoot!.querySelector(
      ".color-grad-circle",
    ) as HTMLElement;
    expect(circle.getAttribute("style")).toContain("border-color: white");

    // value=75 >= 50 => black border
    el.color = new Color({
      type: ColorInputType.HSV,
      h: 0,
      s: 100,
      v: 75,
    });
    await el.updateComplete;

    circle = el.shadowRoot!.querySelector(".color-grad-circle") as HTMLElement;
    expect(circle.getAttribute("style")).toContain("border-color: black");
  });

  // ---- Test 5 ----
  it("sets circle background color to current color hex", async () => {
    el = document.createElement(
      "color-selection-hsv-grad",
    ) as ColorSelectionHsvGrad;
    document.body.appendChild(el);

    const color = new Color({
      type: ColorInputType.HSV,
      h: 200,
      s: 50,
      v: 75,
    });
    el.color = color;
    await el.updateComplete;

    const circle = el.shadowRoot!.querySelector(
      ".color-grad-circle",
    ) as HTMLElement;
    expect(circle.getAttribute("style")).toContain(
      `background-color: #${color.getHex()}`,
    );
  });

  // ---- Test 6 ----
  it("updates circle position when color changes", async () => {
    el = document.createElement(
      "color-selection-hsv-grad",
    ) as ColorSelectionHsvGrad;
    document.body.appendChild(el);

    // Default color is black (HSV: 0, 0, 0)
    await el.updateComplete;

    const circle = el.shadowRoot!.querySelector(
      ".color-grad-circle",
    ) as HTMLElement;
    const initialStyle = circle.getAttribute("style");

    // Change color to something different
    el.color = new Color({
      type: ColorInputType.HSV,
      h: 90,
      s: 80,
      v: 30,
    });
    await el.updateComplete;

    const updatedStyle = circle.getAttribute("style");
    expect(updatedStyle).not.toBe(initialStyle);
    // value=30 => top = (1 - 30/100) * 100 = 70%
    expect(updatedStyle).toContain("top: 70%");
    // saturation=80 => left = 80/100 * 100 = 80%
    expect(updatedStyle).toContain("left: 80%");
  });
});

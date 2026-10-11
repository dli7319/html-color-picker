// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from "vitest";
import { css } from "lit";

// Mock CSS imports so vitest does not need rollup-plugin-lit-css (same
// pattern as ColorPalette.test.ts).
vi.mock("../../styles/ColorInterpolation.css", () => ({ styles: css`` }));
vi.mock("../../styles/Tailwind", () => ({ tailwindStyles: css`` }));
vi.mock("../../styles/DragSurface", () => ({ dragSurfaceStyles: css`` }));

import "./ColorInterpolation";
import type { ColorInterpolation } from "./ColorInterpolation";

async function mount(): Promise<ColorInterpolation> {
  const el = document.createElement(
    "color-interpolation",
  ) as ColorInterpolation;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("ColorInterpolation structure (template-nesting regression)", () => {
  it("renders both endpoints as real buttons (keyboard-focusable)", async () => {
    const el = await mount();
    const root = el.shadowRoot!;
    expect(
      root.querySelector('button[title="Set left endpoint color"]'),
    ).not.toBeNull();
    expect(
      root.querySelector('button[title="Set right endpoint color"]'),
    ).not.toBeNull();
  }, 5000);

  it("keeps the gradient column outside the endpoints row", async () => {
    const el = await mount();
    const root = el.shadowRoot!;
    const endpointsRow = root.querySelector("div.flex.justify-center");
    const gradientColumn = root.querySelector("div.flex.flex-col");
    expect(endpointsRow).not.toBeNull();
    expect(gradientColumn).not.toBeNull();
    // Regression guard: a <div>/</button> tag mismatch made the parser nest
    // the gradient column INSIDE the endpoints flex row, where the flex-1
    // ramps had nothing to expand into and collapsed to 0px width (only the
    // RGB/HSL/HSL*/LCH labels remained).
    expect(endpointsRow!.contains(gradientColumn!)).toBe(false);
  }, 5000);

  it("renders one keyboard-sampleable gradient ramp per lerp mode", async () => {
    const el = await mount();
    const ramps = el.shadowRoot!.querySelectorAll('[role="slider"]');
    expect(ramps.length).toBe(4);
    for (const ramp of ramps) {
      expect(ramp.getAttribute("tabindex")).toBe("0");
      expect(ramp.getAttribute("aria-label")).toBeTruthy();
    }
  }, 5000);
});

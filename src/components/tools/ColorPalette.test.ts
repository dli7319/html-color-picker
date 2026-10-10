// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { css } from "lit";

// Mock CSS imports so vitest does not need rollup-plugin-lit-css.
vi.mock("../../styles/ColorPalette.css", () => ({ styles: css`` }));
vi.mock("../../styles/Tailwind", () => ({ tailwindStyles: css`` }));
vi.mock("../../styles/DragSurface", () => ({ dragSurfaceStyles: css`` }));

import "./ColorPalette";
import type { ColorPalette } from "./ColorPalette";

const TAG = "color-palette";

function spaceEvent(target: EventTarget, init: KeyboardEventInit = {}) {
  const e = new KeyboardEvent("keydown", {
    code: "Space",
    bubbles: true,
    composed: true,
    cancelable: true,
    ...init,
  });
  target.dispatchEvent(e);
  return e;
}

describe("ColorPalette Space shortcut (issue #73)", () => {
  let el: ColorPalette;

  beforeEach(async () => {
    document.body.innerHTML = "";
    el = document.createElement(TAG) as ColorPalette;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  it("regenerates for Space pressed inside the panel", () => {
    const e = spaceEvent(el);
    expect(e.defaultPrevented).toBe(true);
  });

  it("leaves Space alone outside the panel (page keeps scrolling)", () => {
    const outside = document.createElement("div");
    document.body.appendChild(outside);
    const e = spaceEvent(outside);
    expect(e.defaultPrevented).toBe(false);
  });

  it("ignores Space on editable/activatable targets inside the panel", () => {
    const input = document.createElement("input");
    el.appendChild(input);
    expect(spaceEvent(input).defaultPrevented).toBe(false);

    const button = document.createElement("button");
    el.appendChild(button);
    expect(spaceEvent(button).defaultPrevented).toBe(false);
  });

  it("ignores Space with modifiers or key repeat", () => {
    expect(spaceEvent(el, { ctrlKey: true }).defaultPrevented).toBe(false);
    expect(spaceEvent(el, { repeat: true }).defaultPrevented).toBe(false);
  });
});

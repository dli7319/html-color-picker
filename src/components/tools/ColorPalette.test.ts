// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { css } from "lit";

// Mock CSS imports so vitest does not need rollup-plugin-lit-css.
vi.mock("../../styles/ColorPalette.css", () => ({ styles: css`` }));
vi.mock("../../styles/Tailwind", () => ({ tailwindStyles: css`` }));
vi.mock("../../styles/DragSurface", () => ({ dragSurfaceStyles: css`` }));

import "./ColorPalette";
import type { ColorPalette } from "./ColorPalette";
import { Color, ColorInputType } from "../../lib/Color";

// jsdom has no ResizeObserver; ColorPalette uses one in connectedCallback.
// Without this stub the custom-element reaction error surfaces as an
// unhandled error and fails the run after all tests pass (CI, Node 24).
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal("ResizeObserver", ResizeObserverStub);

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

  it("count reduction preserves swatches and locks for regrow (round-2 regression)", async () => {
    const hexes = () =>
      [...el.shadowRoot!.querySelectorAll(".palette-swatch-hex")].map((n) =>
        n.textContent!.trim(),
      );
    const labels = hexes();
    expect(labels.length).toBe(5);

    // Lock the first swatch via its action button.
    const lockBtn = el.shadowRoot!.querySelector(
      ".palette-swatch .palette-action-btn",
    ) as HTMLElement;
    lockBtn.click();
    await el.updateComplete;

    const clickCount = async (n: string) => {
      const btn = [
        ...el.shadowRoot!.querySelectorAll(".palette-contrast-btn"),
      ].find((b) => b.textContent!.trim() === n) as HTMLElement;
      btn.click();
      await el.updateComplete;
    };
    await clickCount("2");
    expect(hexes().length).toBe(2);
    await clickCount("5");

    // Shrinking then growing restores the exact swatches — no re-roll, no
    // lost locks (previously slice + regenerate destroyed everything).
    expect(hexes()).toEqual(labels);
    const icons = [
      ...el.shadowRoot!.querySelectorAll(
        ".palette-swatch .palette-action-btn .material-symbols-outlined",
      ),
    ].map((n) => n.textContent!.trim());
    expect(icons[0]).toBe("lock");
    expect(icons.slice(1).every((t) => t === "lock_open")).toBe(true);
  });

  it("keeps swatch DOM nodes stable while the active color is edited (round-2 regression)", async () => {
    const swatch = el.shadowRoot!.querySelector(
      ".palette-swatch-apply",
    ) as HTMLElement;
    swatch.click(); // activates the swatch
    await el.updateComplete;

    const before = el.shadowRoot!.querySelector(".palette-swatch");
    // ColorPicker pushes a NEW Color instance on every drag frame; the keyed
    // repeat() must update in place instead of recreating (re-animating) the
    // swatch node.
    el.activeEditingColor = new Color({
      type: ColorInputType.RGB255,
      r: 10,
      g: 20,
      b: 30,
    });
    await el.updateComplete;
    await el.updateComplete;
    const after = el.shadowRoot!.querySelector(".palette-swatch");
    expect(after).toBe(before);
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { css } from "lit";
import { Color, ColorInputType } from "../../lib/Color";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";

// Mock CSS imports so vitest does not need rollup-plugin-lit-css.
// vi.mock is hoisted by vitest; by the time the mocked modules are loaded
// (via the import of ./ColorHistory below), `css` from './lit' is already
// available in the outer scope.
vi.mock("../../styles/ColorHistory.css", () => ({ styles: css`` }));
vi.mock("../../styles/Tailwind", () => ({ tailwindStyles: css`` }));

import "./ColorHistory";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TAG = "color-history";
const STORAGE_KEY = "color-history-store";

/** Create a Color from an RGB255 triple. */
function rgb(r: number, g: number, b: number): Color {
  return new Color({ type: ColorInputType.RGB255, r, g, b });
}

/** Create a Color from a hex string (without leading #). */
function hexColor(hex: string): Color {
  return new Color({ type: ColorInputType.HEX, hex });
}

// ---------------------------------------------------------------------------
// Setup helpers
// ---------------------------------------------------------------------------

/**
 * Create a `<color-history>` element nested inside a `<color-picker>` ancestor.
 * Also returns a <div> trigger that can be used to dispatch commit-color events
 * within the picker scope.
 */
function setupInPicker() {
  const picker = document.createElement("color-picker");
  const el = document.createElement(TAG) as any;
  const trigger = document.createElement("div");
  picker.appendChild(trigger);
  picker.appendChild(el);
  document.body.appendChild(picker);
  return { el, picker, trigger };
}

/**
 * Create a `<color-history>` element without any `<color-picker>` ancestor.
 */
function setupAlone() {
  const el = document.createElement(TAG) as any;
  document.body.appendChild(el);
  return { el };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("ColorHistory", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = "";
  });

  // ---------------------------------------------------------------
  // 1. Element registration
  // ---------------------------------------------------------------
  it("is registered as color-history", () => {
    expect(customElements.get("color-history")).toBeDefined();
  });

  // ---------------------------------------------------------------
  // 2. Load empty history from localStorage
  // ---------------------------------------------------------------
  it("loads empty history when localStorage has no data", async () => {
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    const { el } = setupInPicker();
    await el.updateComplete;
    // No swatches rendered — confirms history is empty
    expect(el.shadowRoot.querySelectorAll(".history-swatch")).toHaveLength(0);
  });

  // ---------------------------------------------------------------
  // 3. Empty-state text
  // ---------------------------------------------------------------
  it('shows "No colors yet" when history is empty', async () => {
    const { el } = setupInPicker();
    await el.updateComplete;
    const emptyMsg = el.shadowRoot.querySelector(".history-empty");
    expect(emptyMsg).not.toBeNull();
    expect(emptyMsg!.textContent).toBe("No colors yet");
  });

  // ---------------------------------------------------------------
  // 4. Swatch click dispatches ColorPickerSetColorEvent
  // ---------------------------------------------------------------
  it("dispatches ColorPickerSetColorEvent on swatch click", async () => {
    const { el, trigger } = setupInPicker();
    const red = rgb(255, 0, 0);

    // Seed history with a color
    trigger.dispatchEvent(new ColorPickerCommitColorEvent(red));
    await el.updateComplete;

    const swatch = el.shadowRoot!.querySelector(".history-swatch");
    expect(swatch).not.toBeNull();

    return new Promise<void>((resolve) => {
      el.addEventListener(ColorPickerSetColorEvent.eventName, (e: Event) => {
        const event = e as ColorPickerSetColorEvent;
        expect(event.color.getHex()).toBe(red.getHex());
        resolve();
      });
      (swatch as HTMLElement).click();
    });
  });

  // ---------------------------------------------------------------
  // 5. Clear button visibility
  // ---------------------------------------------------------------
  it("shows Clear button when history has entries", async () => {
    const { el, trigger } = setupInPicker();
    await el.updateComplete;

    // No history → no Clear button
    expect(el.shadowRoot.querySelector(".history-clear-btn")).toBeNull();

    trigger.dispatchEvent(new ColorPickerCommitColorEvent(rgb(255, 0, 0)));
    await el.updateComplete;

    const clearBtn = el.shadowRoot.querySelector(".history-clear-btn");
    expect(clearBtn).not.toBeNull();
    expect(clearBtn!.textContent!.trim()).toBe("Clear");
  });

  // ---------------------------------------------------------------
  // 6. Persist history to localStorage
  // ---------------------------------------------------------------
  it("persists history to localStorage on commit-color event", () => {
    const { el, trigger } = setupInPicker();
    const red = rgb(255, 0, 0);

    trigger.dispatchEvent(new ColorPickerCommitColorEvent(red));

    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).not.toBeNull();
    const data = JSON.parse(stored!);
    expect(data).toHaveLength(1);
    expect(data[0].hex).toBe(red.getHex());
  });

  // ---------------------------------------------------------------
  // 7. Deduplicate consecutive same-hex entries
  // ---------------------------------------------------------------
  it("deduplicates consecutive same-hex entries", async () => {
    const { el, trigger } = setupInPicker();
    const red = rgb(255, 0, 0);

    // Two consecutive commits of the same color → only one entry
    trigger.dispatchEvent(new ColorPickerCommitColorEvent(red));
    trigger.dispatchEvent(new ColorPickerCommitColorEvent(red));
    await el.updateComplete;
    expect(el.shadowRoot.querySelectorAll(".history-swatch")).toHaveLength(1);

    // Different color in between allows red to be added again
    const blue = rgb(0, 0, 255);
    trigger.dispatchEvent(new ColorPickerCommitColorEvent(blue));
    trigger.dispatchEvent(new ColorPickerCommitColorEvent(red));
    await el.updateComplete;
    expect(el.shadowRoot.querySelectorAll(".history-swatch")).toHaveLength(3);
  });

  // ---------------------------------------------------------------
  // 8. Capped at 50 entries
  // ---------------------------------------------------------------
  it("caps history at 50 entries", async () => {
    const { el, trigger } = setupInPicker();

    for (let i = 0; i < 51; i++) {
      const hex = `#${i.toString(16).padStart(2, "0")}0000`;
      trigger.dispatchEvent(new ColorPickerCommitColorEvent(hexColor(hex)));
    }
    await el.updateComplete;

    expect(el.shadowRoot.querySelectorAll(".history-swatch")).toHaveLength(50);
  });

  // ---------------------------------------------------------------
  // 9. Graceful handling when <color-picker> ancestor is missing
  // ---------------------------------------------------------------
  it("handles missing color-picker ancestor gracefully", async () => {
    const { el } = setupAlone();
    await el.updateComplete;

    // Empty state is shown
    expect(el.shadowRoot.querySelector(".history-empty")).not.toBeNull();

    // Dispatch a commit-color event on window (where the listener is attached)
    window.dispatchEvent(new ColorPickerCommitColorEvent(rgb(255, 0, 0)));
    await el.updateComplete;

    // History should remain empty — the scope guard prevented processing
    expect(el.shadowRoot.querySelector(".history-empty")).not.toBeNull();
    expect(el.shadowRoot.querySelector(".history-swatch")).toBeNull();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});

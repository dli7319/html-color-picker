import { describe, it, expect, beforeEach, vi } from "vitest";
import { css } from "lit";

import { Color, ColorInputType } from "../../lib/Color";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";
import { ColorConverterInputEvent } from "../../events/ColorConverterInputEvent";
import { InputType } from "./ColorConverterInput";

// Mock CSS imports so vitest does not need rollup-plugin-lit-css.
vi.mock("../../styles/ColorConverter.css", () => ({ styles: css`` }));
vi.mock("../../styles/Tailwind", () => ({ tailwindStyles: css`` }));

import "./ColorConverter";
import { ColorConverterInput } from "./ColorConverterInput";
import type { ColorConverter } from "./ColorConverter";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TAG = "color-converter";

function rgb(r: number, g: number, b: number): Color {
  return new Color({ type: ColorInputType.RGB255, r, g, b });
}

function setup(): { el: ColorConverter } {
  const el = document.createElement(TAG) as ColorConverter;
  document.body.appendChild(el);
  return { el };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("ColorConverter", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  // ---------------------------------------------------------------
  // 1. Element registration
  // ---------------------------------------------------------------
  it("is registered as color-converter", () => {
    expect(customElements.get(TAG)).toBeDefined();
  });

  // ---------------------------------------------------------------
  // 2. Default property values
  // ---------------------------------------------------------------
  it("has default color of new Color()", () => {
    const { el } = setup();
    expect(el.color).toBeDefined();
    expect(el.color.getRGB255()).toEqual([0, 0, 0]);
  });

  it("has default coordinates of {x:0, y:0, width:0, height:0}", () => {
    const { el } = setup();
    expect(el.coordinates).toEqual({ x: 0, y: 0, width: 0, height: 0 });
  });

  // ---------------------------------------------------------------
  // 3. setColor() dispatches ColorPickerSetColorEvent
  // ---------------------------------------------------------------
  it("dispatches ColorPickerSetColorEvent on setColor()", () => {
    const { el } = setup();
    const red = rgb(255, 0, 0);
    return new Promise<void>((resolve) => {
      el.addEventListener(ColorPickerSetColorEvent.eventName, (e: Event) => {
        const event = e as ColorPickerSetColorEvent;
        expect(event.color.getRGB255()).toEqual([255, 0, 0]);
        resolve();
      });
      el.setColor(red);
    });
  });

  // ---------------------------------------------------------------
  // 4. Constructor event listener — settled (commit) HEX input
  // ---------------------------------------------------------------
  it("dispatches SetColor and CommitColor events on a settled valid HEX input", async () => {
    const { el } = setup();

    const setColorEventPromise = new Promise<ColorPickerSetColorEvent>(
      (resolve) => {
        el.addEventListener(ColorPickerSetColorEvent.eventName, (e: Event) => {
          resolve(e as ColorPickerSetColorEvent);
        });
      },
    );

    const commitColorEventPromise = new Promise<ColorPickerCommitColorEvent>(
      (resolve) => {
        el.addEventListener(
          ColorPickerCommitColorEvent.eventName,
          (e: Event) => {
            resolve(e as ColorPickerCommitColorEvent);
          },
        );
      },
    );

    el.dispatchEvent(
      new ColorConverterInputEvent(InputType.HEX, "#ff0000", true),
    );

    const setColorEvent = await setColorEventPromise;
    const commitColorEvent = await commitColorEventPromise;

    expect(setColorEvent.color.getHex()).toBe("ff0000");
    expect(commitColorEvent.color.getHex()).toBe("ff0000");
  });

  it("previews but does not commit on a mid-typing input event", async () => {
    const { el } = setup();
    let commitFired = false;
    el.addEventListener(ColorPickerCommitColorEvent.eventName, () => {
      commitFired = true;
    });
    let seenHex = "";
    el.addEventListener(ColorPickerSetColorEvent.eventName, (e: Event) => {
      seenHex = (e as ColorPickerSetColorEvent).color.getHex();
    });

    // Live preview (no commit flag) — like typing "#336" mid-entry.
    el.dispatchEvent(new ColorConverterInputEvent(InputType.HEX, "#336"));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(seenHex).toBe("336");
    expect(commitFired).toBe(false);
  });

  // ---------------------------------------------------------------
  // 5. Constructor event listener — invalid input (returns null)
  // ---------------------------------------------------------------
  it("does not dispatch SetColor event on invalid HEX input", () => {
    const { el } = setup();
    let setColorFired = false;
    el.addEventListener(ColorPickerSetColorEvent.eventName, () => {
      setColorFired = true;
    });
    el.dispatchEvent(
      new ColorConverterInputEvent(InputType.HEX, "not-a-color"),
    );
    expect(setColorFired).toBe(false);
  });

  // ---------------------------------------------------------------
  // 6. updateChildren() — propagates color and inputValues
  // ---------------------------------------------------------------
  it("updateChildren() propagates color and inputValues to child ColorConverterInput elements", () => {
    const { el } = setup();
    el.color = rgb(0, 255, 0);
    el.inputValues = { hexValue: "#00ff00" };

    const child = document.createElement(
      "color-converter-input",
    ) as ColorConverterInput;
    el.appendChild(child);

    el.updateChildren();

    expect(child.color.getRGB255()).toEqual([0, 255, 0]);
    expect(child.inputValues).toEqual({ hexValue: "#00ff00" });
  });

  // ---------------------------------------------------------------
  // 7. render() — displays coordinates
  // ---------------------------------------------------------------
  it("renders float and int coordinates", async () => {
    const { el } = setup();
    el.coordinates = { x: 100, y: 200, width: 400, height: 300 };
    await el.updateComplete;

    const container = el.shadowRoot!.getElementById("coordinates-container");
    expect(container).not.toBeNull();
    expect(container!.textContent).toContain("(0.250, 0.667)");
    expect(container!.textContent).toContain("(100, 200)");
  });

  // ---------------------------------------------------------------
  // 8. render() — zero width/height fallback (safeW/safeH)
  // ---------------------------------------------------------------
  it("handles zero width/height coordinates without crashing", async () => {
    const { el } = setup();
    el.coordinates = { x: 50, y: 60, width: 0, height: 0 };
    await el.updateComplete;

    const container = el.shadowRoot!.getElementById("coordinates-container");
    expect(container).not.toBeNull();
    expect(container!.textContent).toContain("(50.000, 60.000)");
    expect(container!.textContent).toContain("(50, 60)");
  });

  // ---------------------------------------------------------------
  // 9. render() — contains heading and slot
  // ---------------------------------------------------------------
  it("renders heading and slot element", async () => {
    const { el } = setup();
    await el.updateComplete;

    const heading = el.shadowRoot!.querySelector("h5");
    expect(heading).not.toBeNull();
    expect(heading!.textContent).toBe("Color Converter");

    const slot = el.shadowRoot!.querySelector("slot");
    expect(slot).not.toBeNull();
  });

  // ---------------------------------------------------------------
  // 10. updated() calls updateChildren (integration)
  // ---------------------------------------------------------------
  it("propagates color changes to child elements via updated()", async () => {
    const el = document.createElement(TAG) as ColorConverter;
    const child = document.createElement(
      "color-converter-input",
    ) as ColorConverterInput;
    el.appendChild(child);
    document.body.appendChild(el);

    // Initial render triggers updated() which propagates default values
    await el.updateComplete;

    // Change color — this triggers another update cycle
    el.color = rgb(0, 0, 255);
    await el.updateComplete;

    // Child should now reflect the new color
    expect(child.color.getRGB255()).toEqual([0, 0, 255]);
  });

  // ---------------------------------------------------------------
  // 11. Raw input echo vs external color changes
  // ---------------------------------------------------------------
  it("keeps the raw input echo for the typed color but drops it on external color changes", async () => {
    const el = document.createElement(TAG) as ColorConverter;
    const child = document.createElement(
      "color-converter-input",
    ) as ColorConverterInput;
    child.setAttribute("type", "HEX");
    el.appendChild(child);
    document.body.appendChild(el);
    await el.updateComplete;

    // User types a valid color: the raw string is echoed back to the input.
    el.dispatchEvent(new ColorConverterInputEvent(InputType.HEX, "#3366CC"));
    await el.updateComplete;
    expect(el.inputValues).toEqual({ hexValue: "#3366CC" });

    // The color round-trip from our own parse keeps the echo.
    el.color = rgb(51, 102, 204);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.inputValues).toEqual({ hexValue: "#3366CC" });

    // An external color change (drag, history, image sampling) must not be
    // shadowed by the stale echo.
    el.color = rgb(13, 13, 13);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.inputValues).toEqual({});
    expect(child.inputValues).toEqual({});
    expect(child.color.getRGB255()).toEqual([13, 13, 13]);
  });
});

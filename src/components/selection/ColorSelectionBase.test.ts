import { describe, it, expect, beforeEach } from "vitest";
import { Color, ColorInputType } from "../../lib/Color";
import { ColorSelectionBase } from "./ColorSelectionBase";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function rgb(r: number, g: number, b: number): Color {
  return new Color({ type: ColorInputType.RGB255, r, g, b });
}

// ---------------------------------------------------------------------------
// Test-only subclass that exposes protected members
// ---------------------------------------------------------------------------

class TestColorSelectionBase extends ColorSelectionBase {
  getLastCommittedColor(): Color {
    return this.lastCommittedColor;
  }
}

const tagName = "test-color-selection-base";
if (!customElements.get(tagName)) {
  customElements.define(tagName, TestColorSelectionBase);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("ColorSelectionBase", () => {
  let el: TestColorSelectionBase;

  beforeEach(() => {
    el = document.createElement(tagName) as TestColorSelectionBase;
  });

  // ---------------------------------------------------------------
  // 1. Default color
  // ---------------------------------------------------------------
  describe("default state", () => {
    it("default color is black (new Color())", () => {
      expect(el.color).toEqual(new Color());
    });

    it("default lastCommittedColor equals the initial color", () => {
      expect(el.getLastCommittedColor()).toBe(el.color);
    });
  });

  // ---------------------------------------------------------------
  // 2. setColor()
  // ---------------------------------------------------------------
  describe("setColor()", () => {
    it("dispatches ColorPickerSetColorEvent with the given color", () =>
      new Promise<void>((resolve) => {
        const red = rgb(255, 0, 0);
        el.addEventListener("set-color", (e) => {
          const event = e as ColorPickerSetColorEvent;
          expect(event.color).toBe(red);
          resolve();
        });
        el.setColor(red);
      }));

    it("updates lastCommittedColor to the given color", () => {
      const red = rgb(255, 0, 0);
      el.setColor(red);
      expect(el.getLastCommittedColor()).toBe(red);
    });
  });

  // ---------------------------------------------------------------
  // 3. commitColor()
  // ---------------------------------------------------------------
  describe("commitColor()", () => {
    it("dispatches ColorPickerCommitColorEvent with the current lastCommittedColor", () =>
      new Promise<void>((resolve) => {
        const green = rgb(0, 255, 0);
        el.setColor(green);

        el.addEventListener("commit-color", (e) => {
          const event = e as ColorPickerCommitColorEvent;
          expect(event.color).toBe(green);
          resolve();
        });
        el.commitColor();
      }));
  });

  // ---------------------------------------------------------------
  // 4. color property
  // ---------------------------------------------------------------
  describe("color property", () => {
    it("can be set to a new Color value", () => {
      const blue = rgb(0, 0, 255);
      el.color = blue;
      expect(el.color).toEqual(blue);
    });
  });

  // ---------------------------------------------------------------
  // 5. Multiple setColor calls
  // ---------------------------------------------------------------
  describe("multiple setColor calls", () => {
    it("tracks the latest color", () => {
      const red = rgb(255, 0, 0);
      const green = rgb(0, 255, 0);
      const blue = rgb(0, 0, 255);

      el.setColor(red);
      el.setColor(green);
      el.setColor(blue);

      expect(el.getLastCommittedColor()).toBe(blue);
    });
  });
});

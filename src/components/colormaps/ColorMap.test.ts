import { describe, it, expect, vi } from "vitest";
import { Color, ColorInputType } from "../../lib/Color";
import "./ColorMap";
import type { ColorMap } from "./ColorMap";
import type { ColorBarPointer } from "../selection/ColorBarPointer";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function rgb(r: number, g: number, b: number): Color {
  return new Color({ type: ColorInputType.RGB255, r, g, b });
}

/**
 * A 256-entry black-to-white gradient used for testing toCss() and rendering.
 */
const gradient256 = Array.from(
  { length: 256 },
  (_, i) => [i / 255, i / 255, i / 255] as number[],
);

// ---------------------------------------------------------------------------
// ColorMap (<color-map>)
// ---------------------------------------------------------------------------

describe("ColorMap", () => {
  // -----------------------------------------------------------------------
  // 1. Custom element registration
  // -----------------------------------------------------------------------
  describe("custom element", () => {
    it('is defined as "color-map"', () => {
      const el = document.createElement("color-map");
      expect(el).toBeInstanceOf(HTMLElement);
    });

    it("is registered in the custom elements registry", () => {
      expect(customElements.get("color-map")).toBeDefined();
    });
  });

  // -----------------------------------------------------------------------
  // 9. Default data
  // -----------------------------------------------------------------------
  describe("default data", () => {
    it("default data is [[0, 0, 0]] (single black entry)", () => {
      const el = document.createElement("color-map") as ColorMap;
      expect(el.data).toEqual([[0, 0, 0]]);
    });
  });

  // -----------------------------------------------------------------------
  // 2. toCss()
  // -----------------------------------------------------------------------
  describe("toCss()", () => {
    it("returns a linear-gradient(to right, ...) string with 256 stops", () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = gradient256;
      const css = el.toCss();
      expect(css).toMatch(/^linear-gradient\(to right,/);

      // Count rgba occurrences — should be 256
      const rgbaMatches = css.match(/rgba/g);
      expect(rgbaMatches).toHaveLength(256);
    });

    it("stops have increasing percentages from 0% to 100%", () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = gradient256;
      const css = el.toCss();
      expect(css).toContain("0%");
      expect(css).toContain("100%");
    });
  });

  // -----------------------------------------------------------------------
  // 3. getColorAt(0) returns first, getColorAt(1) returns last
  // -----------------------------------------------------------------------
  describe("getColorAt() endpoints", () => {
    it("getColorAt(0) returns the first color in the data", () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = gradient256;
      const c = el.getColorAt(0);
      expect(c.getRGB01()).toEqual([0, 0, 0]);
    });

    it("getColorAt(1) returns the last color in the data", () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = gradient256;
      const c = el.getColorAt(1);
      expect(c.getRGB01()).toEqual([1, 1, 1]);
    });
  });

  // -----------------------------------------------------------------------
  // 4. getColorAt(0.5) — interpolated between midpoints
  // -----------------------------------------------------------------------
  describe("getColorAt(0.5) interpolation", () => {
    it("returns lerped color at x=0.5 between mid data points (3-entry data)", () => {
      // With 3 entries: [[0,0,0], [0.5,0.5,0.5], [1,1,1]]
      // getColorAt(0.5): x*3 = 1.5, floor=1, ceil=2, ratio=0.5
      // lerp between data[1]=(0.5,0.5,0.5) and data[2]=(1,1,1) at t=0.5 => (0.75, 0.75, 0.75)
      const el = document.createElement("color-map") as ColorMap;
      el.data = [
        [0, 0, 0],
        [0.5, 0.5, 0.5],
        [1, 1, 1],
      ];
      const c = el.getColorAt(0.5);
      expect(c.getRGB01()).toEqual([0.75, 0.75, 0.75]);
    });

    it("linearly interpolates between two data points at x=0.25 (2-entry data)", () => {
      // With 2 entries: [[0,0,0], [1,1,1]]
      // getColorAt(0.25): x*2 = 0.5, floor=0, ceil=1, ratio=0.5
      // lerp between data[0]=(0,0,0) and data[1]=(1,1,1) at t=0.5 => (0.5, 0.5, 0.5)
      const el = document.createElement("color-map") as ColorMap;
      el.data = [
        [0, 0, 0],
        [1, 1, 1],
      ];
      const c = el.getColorAt(0.25);
      expect(c.getRGB01()).toEqual([0.5, 0.5, 0.5]);
    });
  });

  // -----------------------------------------------------------------------
  // 5. findClosestColormapPoint — exact match
  // -----------------------------------------------------------------------
  describe("findClosestColormapPoint exact match", () => {
    it("finds exact match at index 0", () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = [
        [0, 0, 0],
        [0.5, 0, 0],
        [1, 0, 0],
      ];
      const result = el.findClosestColormapPoint(rgb(0, 0, 0));
      expect(result.index).toBe(0);
      expect(result.distance).toBe(0);
      expect(result.ratio).toBe(0);
    });

    it("finds exact match at the last index", () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = [
        [0, 0, 0],
        [0.5, 0, 0],
        [1, 0, 0],
      ];
      const result = el.findClosestColormapPoint(rgb(255, 0, 0));
      expect(result.index).toBe(2);
      expect(result.distance).toBe(0);
      expect(result.ratio).toBe(1);
    });

    it("finds exact match at a middle index", () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = [
        [0, 0, 0],
        [0.5, 0, 0],
        [1, 0, 0],
      ];
      const result = el.findClosestColormapPoint(
        new Color({ type: ColorInputType.RGB01, r: 0.5, g: 0, b: 0 }),
      );
      expect(result.index).toBe(1);
      expect(result.distance).toBe(0);
      expect(result.ratio).toBe(0.5);
    });

    it("returns ratio 0 for single-entry data", () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = [[0, 0, 0]];
      const result = el.findClosestColormapPoint(rgb(0, 0, 0));
      expect(result.index).toBe(0);
      expect(result.distance).toBe(0);
      expect(result.ratio).toBe(0);
    });
  });

  // -----------------------------------------------------------------------
  // 6. findClosestColormapPoint — high distance for far-away colors
  // -----------------------------------------------------------------------
  describe("findClosestColormapPoint high distance", () => {
    it("returns a distance > 200 for white against a black-to-mid-gray gradient", () => {
      const el = document.createElement("color-map") as ColorMap;
      // data: [[0,0,0], [0.5,0.5,0.5]]
      // target white (255,255,255): closest is data[1] ~ (128,128,128)
      // distance = sqrt((255-128)^2 * 3) = sqrt(48387) ~ 219.97
      el.data = [
        [0, 0, 0],
        [0.5, 0.5, 0.5],
      ];
      const result = el.findClosestColormapPoint(rgb(255, 255, 255));
      expect(result.distance).toBeGreaterThan(200);
      expect(result.distance).toBeLessThan(250);
    });

    it("returns a larger distance for a farther color than a closer one", () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = [
        [0, 0, 0],
        [0.5, 0.5, 0.5],
      ];
      const close = el.findClosestColormapPoint(rgb(0, 0, 0));
      expect(close.distance).toBe(0);

      const far = el.findClosestColormapPoint(rgb(255, 255, 255));
      expect(far.distance).toBeGreaterThan(close.distance);
    });
  });

  // -----------------------------------------------------------------------
  // 7. Renders gradient bar with correct background style
  // -----------------------------------------------------------------------
  describe("rendering gradient bar", () => {
    it("renders a div with the gradient background", async () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = gradient256;
      document.body.appendChild(el);
      await el.updateComplete;

      const div = el.shadowRoot!.getElementById("colormap-div") as HTMLElement;
      expect(div).not.toBeNull();

      // jsdom's CSS parser struggles with large gradient strings, so check
      // the raw style attribute and verify it starts with the expected value.
      const rawStyle = div.getAttribute("style");
      expect(rawStyle).toMatch(/^background:\s*linear-gradient\(to right,/);

      document.body.removeChild(el);
    });

    it("renders the name text in a span", async () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = gradient256;
      el.name = "Test Map";
      document.body.appendChild(el);
      await el.updateComplete;

      const span = el.shadowRoot!.querySelector("span");
      expect(span).not.toBeNull();
      expect(span!.textContent).toBe("Test Map");

      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 8. Shows <color-bar-pointer> when color is close enough (distance <= 30)
  // -----------------------------------------------------------------------
  describe("color-bar-pointer display", () => {
    it("shows <color-bar-pointer> when color exactly matches a data point (distance 0)", async () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = gradient256;
      el.color = rgb(0, 0, 0); // Exactly matches gradient256[0] => distance 0
      document.body.appendChild(el);
      await el.updateComplete;

      const pointer = el.shadowRoot!.querySelector("color-bar-pointer");
      expect(pointer).not.toBeNull();

      document.body.removeChild(el);
    });

    it("sets pointer position based on match ratio", async () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = gradient256;
      el.color = rgb(0, 0, 0); // match at index 0, ratio 0
      document.body.appendChild(el);
      await el.updateComplete;

      const pointer = el.shadowRoot!.querySelector(
        "color-bar-pointer",
      ) as ColorBarPointer;
      expect(pointer).not.toBeNull();
      expect(pointer.position).toBe(0);

      document.body.removeChild(el);
    });

    it("does not show <color-bar-pointer> when color is far from all data points", async () => {
      const el = document.createElement("color-map") as ColorMap;
      // data is black -> white gradient; pure red has distance ~208 from closest point
      el.data = gradient256;
      el.color = rgb(255, 0, 0);
      document.body.appendChild(el);
      await el.updateComplete;

      const pointer = el.shadowRoot!.querySelector("color-bar-pointer");
      expect(pointer).toBeNull();

      document.body.removeChild(el);
    });
  });

  describe("setColor and commitColor", () => {
    it("setColor() dispatches ColorPickerSetColorEvent", () => {
      const el = document.createElement("color-map") as ColorMap;
      const events: ColorPickerSetColorEvent[] = [];
      el.addEventListener(ColorPickerSetColorEvent.eventName, (e) =>
        events.push(e as ColorPickerSetColorEvent),
      );
      const color = rgb(100, 150, 200);
      el.setColor(color);
      expect(events).toHaveLength(1);
      expect(events[0].color).toBe(color);
    });

    it("commitColor() dispatches ColorPickerCommitColorEvent with last set color", () => {
      const el = document.createElement("color-map") as ColorMap;
      const commitEvents: ColorPickerCommitColorEvent[] = [];
      el.addEventListener(ColorPickerCommitColorEvent.eventName, (e) =>
        commitEvents.push(e as ColorPickerCommitColorEvent),
      );
      const color = rgb(100, 150, 200);
      el.setColor(color);
      el.commitColor();
      expect(commitEvents).toHaveLength(1);
      expect(commitEvents[0].color).toBe(color);
    });
  });

  describe("drag interaction", () => {
    it("mousedown+mousemove on colormap bar dispatches ColorPickerSetColorEvent", async () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = gradient256;
      document.body.appendChild(el);
      await el.updateComplete;

      const div = el.shadowRoot!.getElementById(
        "colormap-div",
      ) as HTMLElement;
      vi.spyOn(div, "getBoundingClientRect").mockReturnValue({
        left: 0,
        top: 0,
        width: 256,
        height: 30,
        right: 256,
        bottom: 30,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const setColorEvents: ColorPickerSetColorEvent[] = [];
      el.addEventListener(ColorPickerSetColorEvent.eventName, (e) =>
        setColorEvents.push(e as ColorPickerSetColorEvent),
      );

      div.dispatchEvent(
        new MouseEvent("mousedown", { clientX: 128, bubbles: true }),
      );
      document.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 200, bubbles: true }),
      );

      expect(setColorEvents.length).toBeGreaterThan(0);

      document.body.removeChild(el);
      vi.restoreAllMocks();
    });

    it("mouseup after drag dispatches ColorPickerCommitColorEvent", async () => {
      const el = document.createElement("color-map") as ColorMap;
      el.data = gradient256;
      document.body.appendChild(el);
      await el.updateComplete;

      const div = el.shadowRoot!.getElementById(
        "colormap-div",
      ) as HTMLElement;
      vi.spyOn(div, "getBoundingClientRect").mockReturnValue({
        left: 0,
        top: 0,
        width: 256,
        height: 30,
        right: 256,
        bottom: 30,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const commitColorEvents: ColorPickerCommitColorEvent[] = [];
      el.addEventListener(ColorPickerCommitColorEvent.eventName, (e) =>
        commitColorEvents.push(e as ColorPickerCommitColorEvent),
      );

      div.dispatchEvent(
        new MouseEvent("mousedown", { clientX: 128, bubbles: true }),
      );
      document.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 200, bubbles: true }),
      );
      document.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

      expect(commitColorEvents).toHaveLength(1);

      document.body.removeChild(el);
      vi.restoreAllMocks();
    });
  });
});

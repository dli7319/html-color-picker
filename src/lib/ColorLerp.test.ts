// @vitest-environment node
import { describe, it, expect } from "vitest";
import { Color, ColorInputType } from "./Color";
import { lerpColor, ColorLerpMode } from "./ColorLerp";

describe("lerpColor", () => {
  describe("midpoint interpolation (t=0.5)", () => {
    it("should interpolate correctly in RGB mode", () => {
      const color0 = new Color({
        type: ColorInputType.RGB255,
        r: 0,
        g: 0,
        b: 0,
      });
      const color1 = new Color({
        type: ColorInputType.RGB255,
        r: 255,
        g: 255,
        b: 255,
      });
      const result = lerpColor(color0, color1, 0.5, ColorLerpMode.RGB);
      const [r, g, b] = result.getRGB255();
      expect(r).toBe(128);
      expect(g).toBe(128);
      expect(b).toBe(128);
    });

    it("should interpolate correctly in HSV mode", () => {
      const color0 = new Color({ type: ColorInputType.HSV, h: 0, s: 0, v: 0 });
      const color1 = new Color({
        type: ColorInputType.HSV,
        h: 100,
        s: 100,
        v: 100,
      });
      const result = lerpColor(color0, color1, 0.5, ColorLerpMode.HSV);
      const [h, s, v] = result.getHSV();
      expect(h).toBeCloseTo(50);
      expect(s).toBeCloseTo(50);
      expect(v).toBeCloseTo(50);
    });

    it("should interpolate correctly in HSL mode", () => {
      const color0 = new Color({ type: ColorInputType.HSL, h: 0, s: 0, l: 0 });
      const color1 = new Color({
        type: ColorInputType.HSL,
        h: 100,
        s: 100,
        l: 100,
      });
      const result = lerpColor(color0, color1, 0.5, ColorLerpMode.HSL);
      const [h, s, l] = result.getHSL();
      expect(h).toBeCloseTo(50);
      expect(s).toBeCloseTo(50);
      expect(l).toBeCloseTo(50);
    });

    it("should interpolate correctly in LCH mode", () => {
      const color0 = new Color({ type: ColorInputType.LCH, l: 0, c: 0, h: 0 });
      const color1 = new Color({
        type: ColorInputType.LCH,
        l: 100,
        c: 100,
        h: 100,
      });
      const result = lerpColor(color0, color1, 0.5, ColorLerpMode.LCH);
      const [l, c, h] = result.getLCH();
      expect(l).toBeCloseTo(50);
      expect(c).toBeCloseTo(50);
      expect(h).toBeCloseTo(50);
    });
  });

  describe("t = 0 returns color0 exactly", () => {
    it("in RGB mode", () => {
      const color0 = new Color({
        type: ColorInputType.RGB255,
        r: 10,
        g: 20,
        b: 30,
      });
      const color1 = new Color({
        type: ColorInputType.RGB255,
        r: 200,
        g: 210,
        b: 220,
      });
      const result = lerpColor(color0, color1, 0, ColorLerpMode.RGB);
      const [r, g, b] = result.getRGB255();
      expect(r).toBe(10);
      expect(g).toBe(20);
      expect(b).toBe(30);
    });

    it("in HSV mode", () => {
      const color0 = new Color({
        type: ColorInputType.HSV,
        h: 15,
        s: 25,
        v: 35,
      });
      const color1 = new Color({
        type: ColorInputType.HSV,
        h: 100,
        s: 100,
        v: 100,
      });
      const result = lerpColor(color0, color1, 0, ColorLerpMode.HSV);
      const [h, s, v] = result.getHSV();
      expect(h).toBeCloseTo(15);
      expect(s).toBeCloseTo(25);
      expect(v).toBeCloseTo(35);
    });

    it("in HSL mode", () => {
      const color0 = new Color({
        type: ColorInputType.HSL,
        h: 30,
        s: 40,
        l: 50,
      });
      const color1 = new Color({
        type: ColorInputType.HSL,
        h: 200,
        s: 90,
        l: 10,
      });
      const result = lerpColor(color0, color1, 0, ColorLerpMode.HSL);
      const [h, s, l] = result.getHSL();
      expect(h).toBeCloseTo(30);
      expect(s).toBeCloseTo(40);
      expect(l).toBeCloseTo(50);
    });

    it("in HSL_FLIP mode", () => {
      const color0 = new Color({
        type: ColorInputType.HSL,
        h: 60,
        s: 70,
        l: 80,
      });
      const color1 = new Color({
        type: ColorInputType.HSL,
        h: 300,
        s: 20,
        l: 30,
      });
      const result = lerpColor(color0, color1, 0, ColorLerpMode.HSL_FLIP);
      const [h, s, l] = result.getHSL();
      expect(h).toBeCloseTo(60);
      expect(s).toBeCloseTo(70);
      expect(l).toBeCloseTo(80);
    });

    it("in LCH mode", () => {
      const color0 = new Color({
        type: ColorInputType.LCH,
        l: 10,
        c: 20,
        h: 30,
      });
      const color1 = new Color({
        type: ColorInputType.LCH,
        l: 90,
        c: 80,
        h: 270,
      });
      const result = lerpColor(color0, color1, 0, ColorLerpMode.LCH);
      const [l, c, h] = result.getLCH();
      expect(l).toBeCloseTo(10);
      expect(c).toBeCloseTo(20);
      expect(h).toBeCloseTo(30);
    });
  });

  /**
   * t = 1 — every mode should return color1 exactly.
   */
  describe("t = 1 returns color1 exactly", () => {
    it("in RGB mode", () => {
      const color0 = new Color({
        type: ColorInputType.RGB255,
        r: 0,
        g: 0,
        b: 0,
      });
      const color1 = new Color({
        type: ColorInputType.RGB255,
        r: 100,
        g: 150,
        b: 200,
      });
      const result = lerpColor(color0, color1, 1, ColorLerpMode.RGB);
      const [r, g, b] = result.getRGB255();
      expect(r).toBe(100);
      expect(g).toBe(150);
      expect(b).toBe(200);
    });

    it("in HSV mode", () => {
      const color0 = new Color({ type: ColorInputType.HSV, h: 0, s: 0, v: 0 });
      const color1 = new Color({
        type: ColorInputType.HSV,
        h: 45,
        s: 55,
        v: 65,
      });
      const result = lerpColor(color0, color1, 1, ColorLerpMode.HSV);
      const [h, s, v] = result.getHSV();
      expect(h).toBeCloseTo(45);
      expect(s).toBeCloseTo(55);
      expect(v).toBeCloseTo(65);
    });

    it("in HSL mode", () => {
      const color0 = new Color({ type: ColorInputType.HSL, h: 0, s: 0, l: 0 });
      const color1 = new Color({
        type: ColorInputType.HSL,
        h: 210,
        s: 60,
        l: 40,
      });
      const result = lerpColor(color0, color1, 1, ColorLerpMode.HSL);
      const [h, s, l] = result.getHSL();
      expect(h).toBeCloseTo(210);
      expect(s).toBeCloseTo(60);
      expect(l).toBeCloseTo(40);
    });

    it("in HSL_FLIP mode", () => {
      const color0 = new Color({ type: ColorInputType.HSL, h: 0, s: 0, l: 0 });
      const color1 = new Color({
        type: ColorInputType.HSL,
        h: 120,
        s: 50,
        l: 50,
      });
      const result = lerpColor(color0, color1, 1, ColorLerpMode.HSL_FLIP);
      const [h, s, l] = result.getHSL();
      expect(h).toBeCloseTo(120);
      expect(s).toBeCloseTo(50);
      expect(l).toBeCloseTo(50);
    });

    it("in LCH mode", () => {
      const color0 = new Color({ type: ColorInputType.LCH, l: 0, c: 0, h: 0 });
      const color1 = new Color({
        type: ColorInputType.LCH,
        l: 70,
        c: 40,
        h: 180,
      });
      const result = lerpColor(color0, color1, 1, ColorLerpMode.LCH);
      const [l, c, h] = result.getLCH();
      expect(l).toBeCloseTo(70);
      expect(c).toBeCloseTo(40);
      expect(h).toBeCloseTo(180);
    });
  });

  /**
   * Lerping a color to itself should return the same color, regardless of mode.
   */
  describe("same color to itself", () => {
    it("in RGB mode", () => {
      const color = new Color({
        type: ColorInputType.RGB255,
        r: 100,
        g: 150,
        b: 200,
      });
      const result = lerpColor(color, color, 0.5, ColorLerpMode.RGB);
      const [r, g, b] = result.getRGB255();
      expect(r).toBe(100);
      expect(g).toBe(150);
      expect(b).toBe(200);
    });

    it("in HSV mode", () => {
      const color = new Color({
        type: ColorInputType.HSV,
        h: 180,
        s: 50,
        v: 75,
      });
      const result = lerpColor(color, color, 0.5, ColorLerpMode.HSV);
      const [h, s, v] = result.getHSV();
      expect(h).toBeCloseTo(180);
      expect(s).toBeCloseTo(50);
      expect(v).toBeCloseTo(75);
    });

    it("in HSL mode", () => {
      const color = new Color({
        type: ColorInputType.HSL,
        h: 200,
        s: 60,
        l: 40,
      });
      const result = lerpColor(color, color, 0.5, ColorLerpMode.HSL);
      const [h, s, l] = result.getHSL();
      expect(h).toBeCloseTo(200);
      expect(s).toBeCloseTo(60);
      expect(l).toBeCloseTo(40);
    });

    it("in HSL_FLIP mode", () => {
      const color = new Color({
        type: ColorInputType.HSL,
        h: 80,
        s: 30,
        l: 70,
      });
      const result = lerpColor(color, color, 0.5, ColorLerpMode.HSL_FLIP);
      const [h, s, l] = result.getHSL();
      expect(h).toBeCloseTo(80);
      expect(s).toBeCloseTo(30);
      expect(l).toBeCloseTo(70);
    });

    it("in LCH mode", () => {
      const color = new Color({
        type: ColorInputType.LCH,
        l: 50,
        c: 30,
        h: 90,
      });
      const result = lerpColor(color, color, 0.5, ColorLerpMode.LCH);
      const [l, c, h] = result.getLCH();
      expect(l).toBeCloseTo(50);
      expect(c).toBeCloseTo(30);
      expect(h).toBeCloseTo(90);
    });
  });

  describe("HSL short-arc vs HSL_FLIP long-arc behavior", () => {
    /**
     * When the hue difference is less than 180 the direct linear
     * interpolation is already the short arc, so HSL and HSL_FLIP differ:
     *
     *   h0=30  h1=90  diff=60
     *   HSL       (short arc, default): t=0.5 → h=60
     *   HSL_FLIP  (long arc, flipped):  t=0.5 → h=240
     */
    it("HSL_FLIP takes the long arc when hue diff < 180", () => {
      const color0 = new Color({
        type: ColorInputType.HSL,
        h: 30,
        s: 50,
        l: 50,
      });
      const color1 = new Color({
        type: ColorInputType.HSL,
        h: 90,
        s: 50,
        l: 50,
      });

      const shortArc = lerpColor(color0, color1, 0.5, ColorLerpMode.HSL);
      const longArc = lerpColor(color0, color1, 0.5, ColorLerpMode.HSL_FLIP);

      const [hShort] = shortArc.getHSL();
      const [hLong] = longArc.getHSL();

      // Short arc: halfway between 30 and 90 is 60.
      expect(hShort).toBeCloseTo(60);
      // Long arc: should NOT be 60 — it takes the 300-degree path,
      // with the midpoint at 240.
      expect(hLong).toBeCloseTo(240);
    });

    /**
     * When the hue difference is greater than 180 the direct linear
     * interpolation wraps the long way.  HSL unwraps it to take the
     * short arc; HSL_FLIP leaves it alone (long arc).
     *
     *   h0=350  h1=10  diff=|350-10|=340 (> 180)
     *   HSL       (short arc via unwrap):   t=0.5 → h≈0 (or 360)
     *   HSL_FLIP  (long arc, no unwrap):    t=0.5 → h=180
     */
    it("HSL takes the short arc when hue diff > 180, HSL_FLIP takes the long arc", () => {
      const color0 = new Color({
        type: ColorInputType.HSL,
        h: 350,
        s: 50,
        l: 50,
      });
      const color1 = new Color({
        type: ColorInputType.HSL,
        h: 10,
        s: 50,
        l: 50,
      });

      const shortArc = lerpColor(color0, color1, 0.5, ColorLerpMode.HSL);
      const longArc = lerpColor(color0, color1, 0.5, ColorLerpMode.HSL_FLIP);

      const [hShort] = shortArc.getHSL();
      const [hLong] = longArc.getHSL();

      // Short arc through 0: the unwrapped values are 350 and 370,
      // midpoint is 360 (equivalent to 0).
      expect(hShort).toBeCloseTo(360);
      // Long arc (direct linear interpolation): midpoint of 350 and 10 is 180.
      expect(hLong).toBeCloseTo(180);
    });

    /**
     * Verify that HSL_FLIP also returns a sensible t=0.5 result for
     * non-wrapping hues, matching direct interpolation expectations.
     */
    it("should interpolate correctly in HSL_FLIP mode with generic values", () => {
      const color0 = new Color({ type: ColorInputType.HSL, h: 0, s: 0, l: 0 });
      const color1 = new Color({
        type: ColorInputType.HSL,
        h: 360,
        s: 100,
        l: 100,
      });
      const result = lerpColor(color0, color1, 0.5, ColorLerpMode.HSL_FLIP);
      const [h, s, l] = result.getHSL();
      // With h0=0, h1=360, diff=360. Since diff > 180, HSL_FLIP does NOT unwrap.
      // Direct linear interpolation: (0+360)/2 = 180.
      expect(h).toBeCloseTo(180);
      expect(s).toBeCloseTo(50);
      expect(l).toBeCloseTo(50);
    });
  });

  // ---------------------------------------------------------------------------
  // Default mode
  // ---------------------------------------------------------------------------

  describe("default mode", () => {
    it("should default to RGB mode when mode is not specified", () => {
      // Same test values as the RGB basic test — default should produce RGB.
      const color0 = new Color({
        type: ColorInputType.RGB255,
        r: 0,
        g: 0,
        b: 0,
      });
      const color1 = new Color({
        type: ColorInputType.RGB255,
        r: 255,
        g: 255,
        b: 255,
      });
      const result = lerpColor(color0, color1, 0.5);
      const [r, g, b] = result.getRGB255();
      expect(r).toBe(128);
      expect(g).toBe(128);
      expect(b).toBe(128);
    });

    it("default (RGB) and explicit RGB produce identical results", () => {
      const color0 = new Color({
        type: ColorInputType.RGB255,
        r: 40,
        g: 80,
        b: 160,
      });
      const color1 = new Color({
        type: ColorInputType.RGB255,
        r: 200,
        g: 180,
        b: 60,
      });
      const defaultResult = lerpColor(color0, color1, 0.3);
      const explicitResult = lerpColor(color0, color1, 0.3, ColorLerpMode.RGB);
      const [r1, g1, b1] = defaultResult.getRGB255();
      const [r2, g2, b2] = explicitResult.getRGB255();
      expect(r1).toBe(r2);
      expect(g1).toBe(g2);
      expect(b1).toBe(b2);
    });
  });
});

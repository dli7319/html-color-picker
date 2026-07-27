// @vitest-environment node
import { describe, it, expect } from "vitest";
import { Color, ColorInputType } from "./Color";

// Helper: create a Color from RGB255 values
function rgb(r: number, g: number, b: number): Color {
  return new Color({ type: ColorInputType.RGB255, r, g, b });
}

// ============================================================
// Color — comprehensive unit tests
// ============================================================

describe("Color", () => {
  // ---------------------------------------------------------------
  // 1. Default constructor (black)
  // ---------------------------------------------------------------
  describe("default constructor", () => {
    const c = new Color();

    it("stores RGB255(0,0,0) as input", () => {
      expect(c.input).toEqual({
        type: ColorInputType.RGB255,
        r: 0,
        g: 0,
        b: 0,
      });
    });

    it("returns black from getRGB255", () => {
      expect(c.getRGB255()).toEqual([0, 0, 0]);
    });

    it("returns black from getRGB01", () => {
      expect(c.getRGB01()).toEqual([0, 0, 0]);
    });

    it("returns black from getHex", () => {
      expect(c.getHex()).toBe("000000");
    });

    it("returns black from getHSV", () => {
      expect(c.getHSV()).toEqual([0, 0, 0]);
    });

    it("returns black from getHSL", () => {
      expect(c.getHSL()).toEqual([0, 0, 0]);
    });

    it("returns black from getLCH", () => {
      expect(c.getLCH()).toEqual([0, 0, 0]);
    });

    it("defaults a to 1", () => {
      expect(c.a).toBe(1);
    });
  });

  // ---------------------------------------------------------------
  // 2. Property `a` defaults to 1
  // ---------------------------------------------------------------
  describe("property a", () => {
    it("is 1 for default constructor", () => {
      expect(new Color().a).toBe(1);
    });

    it("is 1 for all input types", () => {
      const colors = [
        rgb(255, 0, 0),
        new Color({ type: ColorInputType.RGB01, r: 0.5, g: 0.5, b: 0.5 }),
        new Color({ type: ColorInputType.HEX, hex: "ff0000" }),
        new Color({ type: ColorInputType.HSV, h: 0, s: 100, v: 100 }),
        new Color({ type: ColorInputType.HSL, h: 0, s: 100, l: 50 }),
        new Color({ type: ColorInputType.LCH, l: 50, c: 30, h: 200 }),
      ];
      colors.forEach((c) => expect(c.a).toBe(1));
    });
  });

  // ---------------------------------------------------------------
  // 3. Construction with all 6 input types — input is stored
  // ---------------------------------------------------------------
  describe("construction stores original input", () => {
    it("RGB255", () => {
      const c = new Color({
        type: ColorInputType.RGB255,
        r: 100,
        g: 150,
        b: 200,
      });
      expect(c.input).toEqual({
        type: ColorInputType.RGB255,
        r: 100,
        g: 150,
        b: 200,
      });
    });

    it("RGB01", () => {
      const c = new Color({
        type: ColorInputType.RGB01,
        r: 0.1,
        g: 0.5,
        b: 0.9,
      });
      expect(c.input).toEqual({
        type: ColorInputType.RGB01,
        r: 0.1,
        g: 0.5,
        b: 0.9,
      });
    });

    it("HEX", () => {
      const c = new Color({ type: ColorInputType.HEX, hex: "aabbcc" });
      expect(c.input).toEqual({ type: ColorInputType.HEX, hex: "aabbcc" });
    });

    it("HSV", () => {
      const c = new Color({ type: ColorInputType.HSV, h: 180, s: 50, v: 75 });
      expect(c.input).toEqual({
        type: ColorInputType.HSV,
        h: 180,
        s: 50,
        v: 75,
      });
    });

    it("HSL", () => {
      const c = new Color({ type: ColorInputType.HSL, h: 270, s: 60, l: 40 });
      expect(c.input).toEqual({
        type: ColorInputType.HSL,
        h: 270,
        s: 60,
        l: 40,
      });
    });

    it("LCH", () => {
      const c = new Color({ type: ColorInputType.LCH, l: 50, c: 30, h: 200 });
      expect(c.input).toEqual({
        type: ColorInputType.LCH,
        l: 50,
        c: 30,
        h: 200,
      });
    });
  });

  // ---------------------------------------------------------------
  // 4. toCSS()
  // ---------------------------------------------------------------
  describe("toCSS()", () => {
    it("returns rgba() strings for known colors", () => {
      expect(rgb(255, 0, 0).toCSS()).toBe("rgba(255, 0, 0)");
      expect(rgb(0, 255, 0).toCSS()).toBe("rgba(0, 255, 0)");
      expect(rgb(0, 0, 255).toCSS()).toBe("rgba(0, 0, 255)");
      expect(rgb(0, 0, 0).toCSS()).toBe("rgba(0, 0, 0)");
      expect(rgb(255, 255, 255).toCSS()).toBe("rgba(255, 255, 255)");
      expect(rgb(128, 128, 128).toCSS()).toBe("rgba(128, 128, 128)");
      expect(rgb(42, 99, 177).toCSS()).toBe("rgba(42, 99, 177)");
    });

    it("works for non-RGB255 constructed colors", () => {
      const hex = new Color({ type: ColorInputType.HEX, hex: "ff8800" });
      expect(hex.toCSS()).toBe("rgba(255, 136, 0)");

      const hsv = new Color({ type: ColorInputType.HSV, h: 0, s: 100, v: 100 });
      expect(hsv.toCSS()).toBe("rgba(255, 0, 0)");
    });
  });

  // ---------------------------------------------------------------
  // 5. fromRGB255Array() static factory
  // ---------------------------------------------------------------
  describe("fromRGB255Array()", () => {
    it("creates a Color with correct RGB255", () => {
      const c = Color.fromRGB255Array([255, 0, 0]);
      expect(c).toBeInstanceOf(Color);
      expect(c.getRGB255()).toEqual([255, 0, 0]);
      expect(c.getHex()).toBe("FF0000");
    });

    it("works with arbitrary values", () => {
      const c = Color.fromRGB255Array([42, 99, 177]);
      expect(c.getRGB255()).toEqual([42, 99, 177]);
    });

    it("creates a frozen instance", () => {
      expect(Object.isFrozen(Color.fromRGB255Array([128, 128, 128]))).toBe(
        true,
      );
    });

    it("sets a to 1", () => {
      expect(Color.fromRGB255Array([0, 0, 0]).a).toBe(1);
    });
  });

  // ---------------------------------------------------------------
  // 6. Immutability (Object.freeze)
  // ---------------------------------------------------------------
  describe("immutability", () => {
    it("all instances are frozen", () => {
      expect(Object.isFrozen(new Color())).toBe(true);
      expect(Object.isFrozen(rgb(255, 0, 0))).toBe(true);
      expect(
        Object.isFrozen(new Color({ type: ColorInputType.HEX, hex: "ff0000" })),
      ).toBe(true);
    });

    it("cannot set existing properties", () => {
      const c = new Color();
      expect(() => {
        (c as unknown as Record<string, unknown>).a = 2;
      }).toThrow();
    });

    it("cannot add new properties", () => {
      const c = new Color();
      expect(() => {
        (c as unknown as Record<string, unknown>).foo = "bar";
      }).toThrow();
    });

    it("cannot delete properties", () => {
      const c = new Color();
      expect(() => {
        delete (c as unknown as Record<string, unknown>).a;
      }).toThrow();
    });

    it("cannot reconfigure properties", () => {
      const c = new Color();
      expect(() => {
        Object.defineProperty(c, "a", { value: 2 });
      }).toThrow();
    });
  });

  // ---------------------------------------------------------------
  // 7. Clamping behavior
  // ---------------------------------------------------------------
  describe("clamping behavior", () => {
    describe("RGB255 input", () => {
      it("getRGB255 returns original (unclamped) values", () => {
        const c = new Color({
          type: ColorInputType.RGB255,
          r: 300,
          g: -100,
          b: 255,
        });
        expect(c.getRGB255()).toEqual([300, -100, 255]);
      });

      it("getHex is based on clamped conversion input", () => {
        const c = new Color({
          type: ColorInputType.RGB255,
          r: 300,
          g: -100,
          b: 255,
        });
        // r clamped to 255, g clamped to 0, b stays 255 → "FF00FF"
        expect(c.getHex()).toBe("FF00FF");
      });

      it("when all channels exceed range, hex reflects clamped extremes", () => {
        const c = new Color({
          type: ColorInputType.RGB255,
          r: 500,
          g: 400,
          b: 300,
        });
        expect(c.getRGB255()).toEqual([500, 400, 300]);
        expect(c.getHex()).toBe("FFFFFF");
      });

      it("when all channels are below range, hex reflects clamped extremes", () => {
        const c = new Color({
          type: ColorInputType.RGB255,
          r: -1,
          g: -2,
          b: -3,
        });
        expect(c.getRGB255()).toEqual([-1, -2, -3]);
        expect(c.getHex()).toBe("000000");
      });
    });

    describe("RGB01 input", () => {
      it("getRGB01 returns original (unclamped) values", () => {
        const c = new Color({
          type: ColorInputType.RGB01,
          r: 5,
          g: -2,
          b: 0.5,
        });
        expect(c.getRGB01()).toEqual([5, -2, 0.5]);
      });

      it("getRGB255 recalculates from original (not clamped conversion input)", () => {
        const c = new Color({
          type: ColorInputType.RGB01,
          r: 2,
          g: -1,
          b: 0.5,
        });
        // Math.round(2*255) = 510, Math.round(-1*255) = -255, Math.round(0.5*255) = 128
        expect(c.getRGB255()).toEqual([510, -255, 128]);
      });

      it("getHex is based on clamped conversion input", () => {
        const c = new Color({
          type: ColorInputType.RGB01,
          r: 2,
          g: -0.5,
          b: 0.5,
        });
        // conversionInput: [clamp(510,0,255), clamp(-128,0,255), clamp(128,0,255)]
        // = [255, 0, 128] → "FF0080"
        expect(c.getHex()).toBe("FF0080");
      });

      it("all channels out of range clamp to extremes", () => {
        const c = new Color({
          type: ColorInputType.RGB01,
          r: 5,
          g: 100,
          b: -0.1,
        });
        expect(c.getHex()).toBe("FFFF00"); // all clamped → [255, 255, 0]
      });

      it("normal 0-1 range values pass through conversion unchanged", () => {
        const c = new Color({
          type: ColorInputType.RGB01,
          r: 0.2,
          g: 0.5,
          b: 0.8,
        });
        // Math.round(0.2*255) = 51, Math.round(0.5*255) = 128, Math.round(0.8*255) = 204
        expect(c.getRGB255()).toEqual([51, 128, 204]);
        expect(c.getHex()).toBe("3380CC");
      });
    });

    describe("non-RGB inputs are not clamped", () => {
      it("HEX passes string through unchanged", () => {
        const c = new Color({ type: ColorInputType.HEX, hex: "zzzzzz" });
        expect((c.input as { hex: string }).hex).toBe("zzzzzz");
      });

      it("HSV values are stored as-is", () => {
        const c = new Color({
          type: ColorInputType.HSV,
          h: -1,
          s: 200,
          v: -50,
        });
        expect(c.input as { h: number; s: number; v: number }).toEqual({
          type: ColorInputType.HSV,
          h: -1,
          s: 200,
          v: -50,
        });
      });

      it("HSL values are stored as-is", () => {
        const c = new Color({
          type: ColorInputType.HSL,
          h: 500,
          s: -10,
          l: 150,
        });
        expect(c.input as { h: number; s: number; l: number }).toEqual({
          type: ColorInputType.HSL,
          h: 500,
          s: -10,
          l: 150,
        });
      });

      it("LCH values are stored as-is", () => {
        const c = new Color({
          type: ColorInputType.LCH,
          l: -100,
          c: 999,
          h: 9999,
        });
        expect(c.input as { l: number; c: number; h: number }).toEqual({
          type: ColorInputType.LCH,
          l: -100,
          c: 999,
          h: 9999,
        });
      });
    });
  });

  // ---------------------------------------------------------------
  // 8. Well-known colors from RGB255 — every getter
  // ---------------------------------------------------------------
  describe("known colors from RGB255 input", () => {
    describe("red RGB(255, 0, 0)", () => {
      const c = rgb(255, 0, 0);

      it("getRGB255", () => expect(c.getRGB255()).toEqual([255, 0, 0]));
      it("getRGB01", () => {
        const [r, g, b] = c.getRGB01();
        expect(r).toBeCloseTo(1, 5);
        expect(g).toBe(0);
        expect(b).toBe(0);
      });
      it("getHex", () => expect(c.getHex()).toBe("FF0000"));
      it("getHSV (raw)", () => expect(c.getHSV()).toEqual([0, 100, 100]));
      it("getHSL (raw)", () => expect(c.getHSL()).toEqual([0, 100, 50]));
      it("getLCH (raw)", () => {
        const [l, ch, h] = c.getLCH();
        expect(l).toBeCloseTo(53.237, 1);
        expect(ch).toBeCloseTo(104.551, 1);
        expect(h).toBeCloseTo(40.001, 1);
      });
    });

    describe("green RGB(0, 255, 0)", () => {
      const c = rgb(0, 255, 0);

      it("getRGB255", () => expect(c.getRGB255()).toEqual([0, 255, 0]));
      it("getRGB01", () => {
        const [r, g, b] = c.getRGB01();
        expect(r).toBe(0);
        expect(g).toBeCloseTo(1, 5);
        expect(b).toBe(0);
      });
      it("getHex", () => expect(c.getHex()).toBe("00FF00"));
      it("getHSV (raw)", () => {
        const [h, s, v] = c.getHSV();
        expect(h).toBeCloseTo(120, 5);
        expect(s).toBe(100);
        expect(v).toBe(100);
      });
      it("getHSL (raw)", () => expect(c.getHSL()).toEqual([120, 100, 50]));
      it("getLCH (raw)", () => {
        const [l, ch, h] = c.getLCH();
        expect(l).toBeCloseTo(87.735, 1);
        expect(ch).toBeCloseTo(119.776, 1);
        expect(h).toBeCloseTo(136.016, 1);
      });
    });

    describe("blue RGB(0, 0, 255)", () => {
      const c = rgb(0, 0, 255);

      it("getRGB255", () => expect(c.getRGB255()).toEqual([0, 0, 255]));
      it("getRGB01", () => {
        const [r, g, b] = c.getRGB01();
        expect(r).toBe(0);
        expect(g).toBe(0);
        expect(b).toBeCloseTo(1, 5);
      });
      it("getHex", () => expect(c.getHex()).toBe("0000FF"));
      it("getHSV (raw)", () => expect(c.getHSV()).toEqual([240, 100, 100]));
      it("getHSL (raw)", () => expect(c.getHSL()).toEqual([240, 100, 50]));
      it("getLCH (raw)", () => {
        const [l, ch, h] = c.getLCH();
        expect(l).toBeCloseTo(32.297, 1);
        expect(ch).toBeCloseTo(133.808, 1);
        expect(h).toBeCloseTo(306.285, 1);
      });
    });

    describe("black RGB(0, 0, 0)", () => {
      const c = rgb(0, 0, 0);

      it("getRGB255", () => expect(c.getRGB255()).toEqual([0, 0, 0]));
      it("getRGB01", () => expect(c.getRGB01()).toEqual([0, 0, 0]));
      it("getHex", () => expect(c.getHex()).toBe("000000"));
      it("getHSV (raw)", () => expect(c.getHSV()).toEqual([0, 0, 0]));
      it("getHSL (raw)", () => expect(c.getHSL()).toEqual([0, 0, 0]));
      it("getLCH (raw)", () => expect(c.getLCH()).toEqual([0, 0, 0]));
    });

    describe("white RGB(255, 255, 255)", () => {
      const c = rgb(255, 255, 255);

      it("getRGB255", () => expect(c.getRGB255()).toEqual([255, 255, 255]));
      it("getRGB01", () => {
        const [r, g, b] = c.getRGB01();
        expect(r).toBeCloseTo(1, 5);
        expect(g).toBeCloseTo(1, 5);
        expect(b).toBeCloseTo(1, 5);
      });
      it("getHex", () => expect(c.getHex()).toBe("FFFFFF"));
      it("getHSV (raw)", () => expect(c.getHSV()).toEqual([0, 0, 100]));
      it("getHSL (raw)", () => expect(c.getHSL()).toEqual([0, 0, 100]));
      it("getLCH (raw)", () => {
        const [l, cVal, hVal] = c.getLCH();
        expect(l).toBeCloseTo(100, 1);
        expect(cVal).toBeCloseTo(0, 1);
        // H is undefined for achromatic colors; just assert it is a number
        expect(typeof hVal).toBe("number");
      });
    });

    describe("gray RGB(128, 128, 128)", () => {
      const c = rgb(128, 128, 128);

      it("getRGB255", () => expect(c.getRGB255()).toEqual([128, 128, 128]));
      it("getRGB01", () => {
        const expected = 128 / 255;
        const [r, g, b] = c.getRGB01();
        expect(r).toBeCloseTo(expected, 5);
        expect(g).toBeCloseTo(expected, 5);
        expect(b).toBeCloseTo(expected, 5);
      });
      it("getHex", () => expect(c.getHex()).toBe("808080"));
      it("getHSV (raw) — V is fractional", () => {
        const [h, s, v] = c.getHSV(true);
        expect(h).toBe(0);
        expect(s).toBe(0);
        expect(v).toBeCloseTo(50.196, 2);
      });
      it("getHSL (raw) — L is fractional", () => {
        const [h, s, l] = c.getHSL(true);
        expect(h).toBe(0);
        expect(s).toBe(0);
        expect(l).toBeCloseTo(50.196, 2);
      });
      it("getLCH (raw) — C~0, L~53.585", () => {
        const [lVal, cVal] = c.getLCH(true);
        expect(lVal).toBeCloseTo(53.585, 1);
        expect(cVal).toBeCloseTo(0, 1);
      });
    });

    describe("secondary colors", () => {
      it("yellow RGB(255, 255, 0)", () => {
        const c = rgb(255, 255, 0);
        expect(c.getHex()).toBe("FFFF00");
        const [yh, ys, yv] = c.getHSV();
        expect(yh).toBeCloseTo(60, 5);
        expect(ys).toBe(100);
        expect(yv).toBe(100);
        expect(c.getHSL()).toEqual([60, 100, 50]);
      });

      it("cyan RGB(0, 255, 255)", () => {
        const c = rgb(0, 255, 255);
        expect(c.getHex()).toBe("00FFFF");
        expect(c.getHSV()).toEqual([180, 100, 100]);
        expect(c.getHSL()).toEqual([180, 100, 50]);
      });

      it("magenta RGB(255, 0, 255)", () => {
        const c = rgb(255, 0, 255);
        expect(c.getHex()).toBe("FF00FF");
        expect(c.getHSV()).toEqual([300, 100, 100]);
        expect(c.getHSL()).toEqual([300, 100, 50]);
      });
    });
  });

  // ---------------------------------------------------------------
  // 9. Identity getters — same-type returns stored values
  // ---------------------------------------------------------------
  describe("identity getters return stored values directly", () => {
    it("RGB01 -> getRGB01", () => {
      const c = new Color({
        type: ColorInputType.RGB01,
        r: 0.123456,
        g: 0.789012,
        b: 0.345678,
      });
      expect(c.getRGB01()).toEqual([0.123456, 0.789012, 0.345678]);
    });

    it("HEX -> getHex (no normalization)", () => {
      const c = new Color({ type: ColorInputType.HEX, hex: "AbCdEf" });
      expect(c.getHex()).toBe("AbCdEf");
    });

    it("HSV -> getHSV(true) unrounded", () => {
      const c = new Color({
        type: ColorInputType.HSV,
        h: 123.456,
        s: 45.678,
        v: 89.012,
      });
      expect(c.getHSV(true)).toEqual([123.456, 45.678, 89.012]);
    });

    it("HSV -> getHSV(false) rounded", () => {
      const c = new Color({
        type: ColorInputType.HSV,
        h: 123.456,
        s: 45.678,
        v: 89.012,
      });
      expect(c.getHSV(false)).toEqual([123, 46, 89]);
    });

    it("HSL -> getHSL(true) unrounded", () => {
      const c = new Color({
        type: ColorInputType.HSL,
        h: 321.654,
        s: 10.987,
        l: 65.432,
      });
      expect(c.getHSL(true)).toEqual([321.654, 10.987, 65.432]);
    });

    it("HSL -> getHSL(false) rounded", () => {
      const c = new Color({
        type: ColorInputType.HSL,
        h: 321.654,
        s: 10.987,
        l: 65.432,
      });
      expect(c.getHSL(false)).toEqual([322, 11, 65]);
    });

    it("LCH -> getLCH(true) unrounded", () => {
      const c = new Color({
        type: ColorInputType.LCH,
        l: 75.5,
        c: 25.3,
        h: 180.1,
      });
      expect(c.getLCH(true)).toEqual([75.5, 25.3, 180.1]);
    });

    it("LCH -> getLCH(false) rounded", () => {
      const c = new Color({
        type: ColorInputType.LCH,
        l: 75.512,
        c: 25.345,
        h: 180.789,
      });
      expect(c.getLCH(false)).toEqual([76, 25, 181]);
    });
  });

  // ---------------------------------------------------------------
  // 10. Non-RGB255 inputs produce correct RGB255
  // ---------------------------------------------------------------
  describe("conversion from each input type to RGB255", () => {
    it("from RGB01 input", () => {
      const c = new Color({ type: ColorInputType.RGB01, r: 1, g: 0.5, b: 0 });
      expect(c.getRGB255()).toEqual([255, 128, 0]);
    });

    it("from HEX input", () => {
      const c = new Color({ type: ColorInputType.HEX, hex: "ff8800" });
      expect(c.getRGB255()).toEqual([255, 136, 0]);
    });

    it("from HSV input: red", () => {
      const c = new Color({ type: ColorInputType.HSV, h: 0, s: 100, v: 100 });
      expect(c.getRGB255()).toEqual([255, 0, 0]);
    });

    it("from HSV input: green", () => {
      const c = new Color({ type: ColorInputType.HSV, h: 120, s: 100, v: 100 });
      expect(c.getRGB255()).toEqual([0, 255, 0]);
    });

    it("from HSV input: blue", () => {
      const c = new Color({ type: ColorInputType.HSV, h: 240, s: 100, v: 100 });
      expect(c.getRGB255()).toEqual([0, 0, 255]);
    });

    it("from HSL input: red", () => {
      const c = new Color({ type: ColorInputType.HSL, h: 0, s: 100, l: 50 });
      expect(c.getRGB255()).toEqual([255, 0, 0]);
    });

    it("from HSL input: green", () => {
      const c = new Color({ type: ColorInputType.HSL, h: 120, s: 100, l: 50 });
      expect(c.getRGB255()).toEqual([0, 255, 0]);
    });

    it("from HSL input: blue", () => {
      const c = new Color({ type: ColorInputType.HSL, h: 240, s: 100, l: 50 });
      expect(c.getRGB255()).toEqual([0, 0, 255]);
    });

    it("from LCH input: red (approximate)", () => {
      const c = new Color({
        type: ColorInputType.LCH,
        l: 53.237,
        c: 104.551,
        h: 40.001,
      });
      const [r, g, b] = c.getRGB255();
      expect(r).toBeCloseTo(255, 0);
      expect(g).toBeCloseTo(0, 0);
      expect(b).toBeCloseTo(0, 0);
    });

    it("from LCH input: green (approximate)", () => {
      const c = new Color({
        type: ColorInputType.LCH,
        l: 87.735,
        c: 119.776,
        h: 136.016,
      });
      const [r, g, b] = c.getRGB255();
      expect(r).toBeCloseTo(0, 0);
      expect(g).toBeCloseTo(255, 0);
      expect(b).toBeCloseTo(0, 0);
    });

    it("from LCH input: blue (approximate)", () => {
      const c = new Color({
        type: ColorInputType.LCH,
        l: 32.297,
        c: 133.808,
        h: 306.285,
      });
      const [r, g, b] = c.getRGB255();
      expect(r).toBeCloseTo(0, 0);
      expect(g).toBeCloseTo(0, 0);
      expect(b).toBeCloseTo(255, 0);
    });
  });

  // ---------------------------------------------------------------
  // 11. getHSV / getHSL / getLCH — raw vs rounded (from conversion)
  // ---------------------------------------------------------------
  describe("getHSV raw vs rounded", () => {
    it("raw=true returns unrounded values via conversion", () => {
      const c = rgb(128, 128, 128);
      const [h, s, v] = c.getHSV(true);
      expect(h).toBe(0);
      expect(s).toBe(0);
      expect(v).toBeCloseTo(50.196, 2);
    });

    it("raw=false returns rounded values via conversion", () => {
      const c = rgb(128, 128, 128);
      const [h, s, v] = c.getHSV(false);
      expect(h).toBe(0);
      expect(s).toBe(0);
      expect(v).toBe(50);
    });
  });

  describe("getHSL raw vs rounded", () => {
    it("raw=true returns unrounded values via conversion", () => {
      const c = rgb(128, 128, 128);
      const [h, s, l] = c.getHSL(true);
      expect(h).toBe(0);
      expect(s).toBe(0);
      expect(l).toBeCloseTo(50.196, 2);
    });

    it("raw=false returns rounded values via conversion", () => {
      const c = rgb(128, 128, 128);
      const [h, s, l] = c.getHSL(false);
      expect(h).toBe(0);
      expect(s).toBe(0);
      expect(l).toBe(50);
    });
  });

  describe("getLCH raw vs rounded", () => {
    it("raw=true returns unrounded values via conversion", () => {
      const c = rgb(255, 0, 0);
      const [l, ch, h] = c.getLCH(true);
      expect(l).toBeCloseTo(53.237, 1);
      expect(ch).toBeCloseTo(104.551, 1);
      expect(h).toBeCloseTo(40.001, 1);
    });

    it("raw=false returns rounded values via conversion", () => {
      const c = rgb(255, 0, 0);
      const [l, ch, h] = c.getLCH(false);
      expect(l).toBeCloseTo(53, 0);
      expect(ch).toBeCloseTo(105, 0);
      expect(h).toBeCloseTo(40, 0);
    });

    it("raw=false rounds identity results", () => {
      const c = new Color({
        type: ColorInputType.LCH,
        l: 50.123,
        c: 30.456,
        h: 200.789,
      });
      expect(c.getLCH(false)).toEqual([50, 30, 201]);
    });
  });

  // ---------------------------------------------------------------
  // 12. Cross-model round-tripping
  // ---------------------------------------------------------------
  describe("cross-model round-tripping", () => {
    it("RGB255 -> HEX -> Color(HEX) -> getRGB255", () => {
      const original = rgb(42, 99, 177);
      const hex = original.getHex();
      const roundTrip = new Color({ type: ColorInputType.HEX, hex });
      expect(roundTrip.getRGB255()).toEqual([42, 99, 177]);
    });

    it("RGB255 -> HSV -> Color(HSV) -> getRGB255", () => {
      const original = rgb(100, 150, 200);
      const [h, s, v] = original.getHSV(true);
      const roundTrip = new Color({ type: ColorInputType.HSV, h, s, v });
      const [r, g, b] = roundTrip.getRGB255();
      expect(r).toBeCloseTo(100, 0);
      expect(g).toBeCloseTo(150, 0);
      expect(b).toBeCloseTo(200, 0);
    });

    it("RGB255 -> HSL -> Color(HSL) -> getRGB255", () => {
      const original = rgb(100, 150, 200);
      const [h, s, l] = original.getHSL(true);
      const roundTrip = new Color({ type: ColorInputType.HSL, h, s, l });
      const [r, g, b] = roundTrip.getRGB255();
      expect(r).toBeCloseTo(100, 0);
      expect(g).toBeCloseTo(150, 0);
      expect(b).toBeCloseTo(200, 0);
    });

    it("RGB255 -> LCH -> Color(LCH) -> getRGB255 (approximate)", () => {
      const original = rgb(100, 150, 200);
      const [lVal, cVal, hVal] = original.getLCH(true);
      const roundTrip = new Color({
        type: ColorInputType.LCH,
        l: lVal,
        c: cVal,
        h: hVal,
      });
      const [r, g, b] = roundTrip.getRGB255();
      expect(r).toBeCloseTo(100, 0);
      expect(g).toBeCloseTo(150, 0);
      expect(b).toBeCloseTo(200, 0);
    });

    it("multiple round-trips RGB -> HSV -> RGB do not drift", () => {
      let c: Color = rgb(42, 99, 177);
      for (let i = 0; i < 3; i++) {
        const [h, s, v] = c.getHSV(true);
        c = new Color({ type: ColorInputType.HSV, h, s, v });
      }
      const [r, g, b] = c.getRGB255();
      expect(r).toBeCloseTo(42, 0);
      expect(g).toBeCloseTo(99, 0);
      expect(b).toBeCloseTo(177, 0);
    });

    it("multiple round-trips RGB -> HSL -> RGB do not drift", () => {
      let c: Color = rgb(42, 99, 177);
      for (let i = 0; i < 3; i++) {
        const [h, s, l] = c.getHSL(true);
        c = new Color({ type: ColorInputType.HSL, h, s, l });
      }
      const [r, g, b] = c.getRGB255();
      expect(r).toBeCloseTo(42, 0);
      expect(g).toBeCloseTo(99, 0);
      expect(b).toBeCloseTo(177, 0);
    });

    it("primary red round-trips through all RGB-based models", () => {
      const colors: Color[] = [
        rgb(255, 0, 0),
        new Color({ type: ColorInputType.HEX, hex: "ff0000" }),
        new Color({ type: ColorInputType.HSV, h: 0, s: 100, v: 100 }),
        new Color({ type: ColorInputType.HSL, h: 0, s: 100, l: 50 }),
      ];
      for (const c of colors) {
        expect(c.getRGB255()).toEqual([255, 0, 0]);
      }
    });

    it("white round-trips through RGB, HSV, HSL", () => {
      const fromRGB = rgb(255, 255, 255);
      const fromHSV = new Color({
        type: ColorInputType.HSV,
        h: 0,
        s: 0,
        v: 100,
      });
      const fromHSL = new Color({
        type: ColorInputType.HSL,
        h: 0,
        s: 0,
        l: 100,
      });
      expect(fromHSV.getRGB255()).toEqual([255, 255, 255]);
      expect(fromHSL.getRGB255()).toEqual([255, 255, 255]);
      expect(fromRGB.getHex()).toBe("FFFFFF");
      expect(fromHSV.getHex()).toBe("FFFFFF");
      expect(fromHSL.getHex()).toBe("FFFFFF");
    });
  });

  // ---------------------------------------------------------------
  // 13. Additional edge cases
  // ---------------------------------------------------------------
  describe("edge cases", () => {
    it("single-channel colors", () => {
      const r = rgb(128, 0, 0);
      expect(r.getHex()).toBe("800000");
      const [rh, rs, rv] = r.getHSV();
      expect(rh).toBe(0);
      expect(rs).toBe(100);
      expect(rv).toBeCloseTo(50.196, 2);

      const g = rgb(0, 128, 0);
      expect(g.getHex()).toBe("008000");
      const [gh, gs, gv] = g.getHSV();
      expect(gh).toBeCloseTo(120, 5);
      expect(gs).toBe(100);
      expect(gv).toBeCloseTo(50.196, 2);

      const b = rgb(0, 0, 128);
      expect(b.getHex()).toBe("000080");
      const [bh, bs, bv] = b.getHSV();
      expect(bh).toBe(240);
      expect(bs).toBe(100);
      expect(bv).toBeCloseTo(50.196, 2);
    });

    it("values at clamping boundaries", () => {
      const exact = rgb(0, 128, 255);
      expect(exact.getRGB255()).toEqual([0, 128, 255]);
      expect(exact.getHex()).toBe("0080FF");
    });

    it("RGB01 fractional values round correctly", () => {
      // RGB01(0.00392156862) -> Math.round(1) = 1
      const low = new Color({
        type: ColorInputType.RGB01,
        r: 0.00392156862,
        g: 0.5,
        b: 1,
      });
      expect(low.getRGB255()).toEqual([1, 128, 255]);
    });

    it("RGB01(0.004, 0, 0) -> getRGB255 = [1, 0, 0]", () => {
      // Math.round(0.004 * 255) = Math.round(1.02) = 1
      const c = new Color({
        type: ColorInputType.RGB01,
        r: 0.004,
        g: 0,
        b: 0,
      });
      expect(c.getRGB255()).toEqual([1, 0, 0]);
    });

    it("getRGB01 from HEX input uses division", () => {
      const c = new Color({ type: ColorInputType.HEX, hex: "ff0000" });
      const [r, g, b] = c.getRGB01();
      expect(r).toBeCloseTo(1, 5);
      expect(g).toBe(0);
      expect(b).toBe(0);
    });

    it("getRGB01 from HSV input uses division", () => {
      const c = new Color({ type: ColorInputType.HSV, h: 0, s: 100, v: 100 });
      const [r, g, b] = c.getRGB01();
      expect(r).toBeCloseTo(1, 5);
      expect(g).toBe(0);
      expect(b).toBe(0);
    });
  });
});

// @vitest-environment node
import { describe, it, expect } from "vitest";
import { Color } from "./Color";
import {
  parseHexColor,
  parseRGB255Color,
  parseRGB01Color,
  parseHSVColor,
  parseHSLColor,
} from "./ColorStringParsing";

// ---------------------------------------------------------------------------
// parseHexColor
// ---------------------------------------------------------------------------
describe("parseHexColor", () => {
  // ---- valid inputs ----
  it("parses 6-digit hex with #", () => {
    const result = parseHexColor("#ff0000");
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(Color);
    expect(result!.getHex()).toBe("ff0000");
  });

  it("parses 3-digit hex with #", () => {
    const result = parseHexColor("#abc");
    expect(result).not.toBeNull();
    expect(result!.getHex()).toBe("abc");
  });

  it("parses 6-digit hex without #", () => {
    const result = parseHexColor("aabbcc");
    expect(result).not.toBeNull();
    expect(result!.getHex()).toBe("aabbcc");
  });

  it("parses 3-digit hex without #", () => {
    const result = parseHexColor("abc");
    expect(result).not.toBeNull();
    expect(result!.getHex()).toBe("abc");
  });

  it("parses uppercase hex digits", () => {
    const result = parseHexColor("#FF00AA");
    expect(result).not.toBeNull();
    expect(result!.getHex()).toBe("FF00AA");
  });

  it("parses mixed-case hex digits", () => {
    const result = parseHexColor("#FfAaBb");
    expect(result).not.toBeNull();
    expect(result!.getHex()).toBe("FfAaBb");
  });

  it("returns correct Color with getRGB255 for 3-digit hex", () => {
    // #abc expands to #aabbcc → RGB(170, 187, 204)
    const result = parseHexColor("#abc");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(170);
    expect(g).toBe(187);
    expect(b).toBe(204);
  });

  it("returns correct Color with getRGB255 for 6-digit hex", () => {
    const result = parseHexColor("#ff0000");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(255);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });

  it("parses black (#000)", () => {
    const result = parseHexColor("#000");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(0);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });

  it("parses black (#000000)", () => {
    const result = parseHexColor("#000000");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(0);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });

  it("parses white (#fff)", () => {
    const result = parseHexColor("#fff");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(255);
    expect(g).toBe(255);
    expect(b).toBe(255);
  });

  it("parses white (#ffffff)", () => {
    const result = parseHexColor("#ffffff");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(255);
    expect(g).toBe(255);
    expect(b).toBe(255);
  });

  // ---- invalid inputs ----
  it("returns null for empty string", () => {
    expect(parseHexColor("")).toBeNull();
  });

  it("returns null for just #", () => {
    expect(parseHexColor("#")).toBeNull();
  });

  it("returns null for 4 hex digits with #", () => {
    expect(parseHexColor("#abcd")).toBeNull();
  });

  it("returns null for 5 hex digits with #", () => {
    expect(parseHexColor("#abcde")).toBeNull();
  });

  it("returns null for 7 hex digits with #", () => {
    expect(parseHexColor("#abcdefg")).toBeNull();
  });

  it("returns null for 1 hex digit", () => {
    expect(parseHexColor("a")).toBeNull();
  });

  it("returns null for 2 hex digits", () => {
    expect(parseHexColor("ab")).toBeNull();
  });

  it("returns null for non-hex characters", () => {
    expect(parseHexColor("#xyz")).toBeNull();
  });

  it("returns null for comma-separated values", () => {
    expect(parseHexColor("ab,cd,ef")).toBeNull();
  });

  it("returns null for hex with spaces", () => {
    expect(parseHexColor("#ab cd")).toBeNull();
  });

  it("returns null for hex with leading whitespace", () => {
    expect(parseHexColor(" #abc")).toBeNull();
  });

  it("returns null for hex with trailing whitespace", () => {
    expect(parseHexColor("#abc ")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// parseRGB255Color
// ---------------------------------------------------------------------------
describe("parseRGB255Color", () => {
  // ---- valid inputs ----
  it("parses minimum values (0, 0, 0)", () => {
    const result = parseRGB255Color("0, 0, 0");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(0);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });

  it("parses maximum values (255, 255, 255)", () => {
    const result = parseRGB255Color("255, 255, 255");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(255);
    expect(g).toBe(255);
    expect(b).toBe(255);
  });

  it("parses mid-range values", () => {
    const result = parseRGB255Color("128, 64, 192");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(128);
    expect(g).toBe(64);
    expect(b).toBe(192);
  });

  it("parses without spaces after commas", () => {
    const result = parseRGB255Color("255,0,128");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(255);
    expect(g).toBe(0);
    expect(b).toBe(128);
  });

  it("parses with multiple spaces after commas", () => {
    const result = parseRGB255Color("10,   20,   30");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(10);
    expect(g).toBe(20);
    expect(b).toBe(30);
  });

  it("parses leading zeros", () => {
    const result = parseRGB255Color("000, 000, 000");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(0);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });

  it("preserves input values via getRGB255", () => {
    const result = parseRGB255Color("100, 200, 50");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(100);
    expect(g).toBe(200);
    expect(b).toBe(50);
  });

  it("returns correct RGB01 values via getRGB01", () => {
    const result = parseRGB255Color("255, 128, 0");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB01();
    expect(r).toBeCloseTo(1, 10);
    expect(g).toBeCloseTo(128 / 255, 10);
    expect(b).toBe(0);
  });

  // ---- invalid inputs ----
  it("returns null for empty string", () => {
    expect(parseRGB255Color("")).toBeNull();
  });

  it("returns null when value exceeds 255", () => {
    expect(parseRGB255Color("256, 0, 0")).toBeNull();
  });

  it("returns null when all values are too large", () => {
    expect(parseRGB255Color("300, 400, 500")).toBeNull();
  });

  it("returns null for only two components", () => {
    expect(parseRGB255Color("0, 0")).toBeNull();
  });

  it("returns null for only one component", () => {
    expect(parseRGB255Color("0")).toBeNull();
  });

  it("returns null for four components", () => {
    expect(parseRGB255Color("0, 0, 0, 0")).toBeNull();
  });

  it("returns null for negative values", () => {
    expect(parseRGB255Color("-1, 0, 0")).toBeNull();
  });

  it("returns null for decimal values", () => {
    expect(parseRGB255Color("12.5, 0, 0")).toBeNull();
  });

  it("returns null for letter characters", () => {
    expect(parseRGB255Color("abc, 0, 0")).toBeNull();
  });

  it("returns null for hex-like input", () => {
    expect(parseRGB255Color("#ff0000")).toBeNull();
  });

  it("returns null for leading whitespace", () => {
    expect(parseRGB255Color(" 0, 0, 0")).toBeNull();
  });

  it("returns null for trailing whitespace", () => {
    expect(parseRGB255Color("0, 0, 0 ")).toBeNull();
  });

  it("returns null for special characters", () => {
    expect(parseRGB255Color("0, 0, @")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// parseRGB01Color
// ---------------------------------------------------------------------------
describe("parseRGB01Color", () => {
  // ---- valid inputs ----
  it("parses minimum values (0, 0, 0)", () => {
    const result = parseRGB01Color("0, 0, 0");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB01();
    expect(r).toBe(0);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });

  it("parses maximum values (1, 1, 1)", () => {
    const result = parseRGB01Color("1, 1, 1");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB01();
    expect(r).toBe(1);
    expect(g).toBe(1);
    expect(b).toBe(1);
  });

  it("parses mid-range decimal values", () => {
    const result = parseRGB01Color("0.5, 0.25, 0.75");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB01();
    expect(r).toBeCloseTo(0.5, 10);
    expect(g).toBeCloseTo(0.25, 10);
    expect(b).toBeCloseTo(0.75, 10);
  });

  it("parses values without fractional part", () => {
    const result = parseRGB01Color("0, 0.5, 1");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB01();
    expect(r).toBe(0);
    expect(g).toBeCloseTo(0.5, 10);
    expect(b).toBe(1);
  });

  it("parses values with leading decimal point", () => {
    const result = parseRGB01Color(".5, .25, .75");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB01();
    expect(r).toBeCloseTo(0.5, 10);
    expect(g).toBeCloseTo(0.25, 10);
    expect(b).toBeCloseTo(0.75, 10);
  });

  it("parses scientific notation (lowercase e)", () => {
    const result = parseRGB01Color("1e0, 0.5, 3e-1");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB01();
    expect(r).toBe(1);
    expect(g).toBeCloseTo(0.5, 10);
    expect(b).toBeCloseTo(0.3, 10);
  });

  it("parses scientific notation (uppercase E)", () => {
    const result = parseRGB01Color("5E-1, 2.5E-1, 1E0");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB01();
    expect(r).toBeCloseTo(0.5, 10);
    expect(g).toBeCloseTo(0.25, 10);
    expect(b).toBe(1);
  });

  it("parses scientific notation with negative exponent", () => {
    const result = parseRGB01Color("1e-1, 2e-1, 3e-1");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB01();
    expect(r).toBeCloseTo(0.1, 10);
    expect(g).toBeCloseTo(0.2, 10);
    expect(b).toBeCloseTo(0.3, 10);
  });

  it("parses values with positive sign", () => {
    const result = parseRGB01Color("+0.5, +0.25, +0.75");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB01();
    expect(r).toBeCloseTo(0.5, 10);
    expect(g).toBeCloseTo(0.25, 10);
    expect(b).toBeCloseTo(0.75, 10);
  });

  it("returns correct RGB255 values via getRGB255", () => {
    const result = parseRGB01Color("0.5, 0.25, 0.75");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(128); // Math.round(0.5 * 255)
    expect(g).toBe(64); // Math.round(0.25 * 255)
    expect(b).toBe(191); // Math.round(0.75 * 255)
  });

  it("parses black (0, 0, 0) to getRGB255 zeroes", () => {
    const result = parseRGB01Color("0, 0, 0");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(0);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });

  it("parses white (1, 1, 1) to getRGB255 255s", () => {
    const result = parseRGB01Color("1, 1, 1");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(255);
    expect(g).toBe(255);
    expect(b).toBe(255);
  });

  it("parses with multiple commas between values", () => {
    const result = parseRGB01Color("0.5,, 0.25,, 0.75");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB01();
    expect(r).toBeCloseTo(0.5, 10);
    expect(g).toBeCloseTo(0.25, 10);
    expect(b).toBeCloseTo(0.75, 10);
  });

  // ---- invalid inputs ----
  it("returns null for empty string", () => {
    expect(parseRGB01Color("")).toBeNull();
  });

  it("returns null for value over 1", () => {
    expect(parseRGB01Color("1.5, 0, 0")).toBeNull();
  });

  it("returns null for negative value", () => {
    expect(parseRGB01Color("-0.1, 0, 0")).toBeNull();
  });

  it("returns null for all values over 1", () => {
    expect(parseRGB01Color("2, 2, 2")).toBeNull();
  });

  it("returns null for only two components", () => {
    expect(parseRGB01Color("0.5, 0.5")).toBeNull();
  });

  it("returns null for only one component", () => {
    expect(parseRGB01Color("0.5")).toBeNull();
  });

  it("returns null for four components", () => {
    expect(parseRGB01Color("0, 0, 0, 0")).toBeNull();
  });

  it("returns null for letter characters", () => {
    expect(parseRGB01Color("abc, 0, 0")).toBeNull();
  });

  it("returns null for leading whitespace", () => {
    expect(parseRGB01Color(" 0.5, 0.5, 0.5")).toBeNull();
  });

  it("returns null for trailing whitespace", () => {
    expect(parseRGB01Color("0.5, 0.5, 0.5 ")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// parseHSVColor
// ---------------------------------------------------------------------------
describe("parseHSVColor", () => {
  // ---- valid inputs ----
  it("parses minimum values (0, 0, 0)", () => {
    const result = parseHSVColor("0, 0, 0");
    expect(result).not.toBeNull();
    const [h, s, v] = result!.getHSV();
    expect(h).toBe(0);
    expect(s).toBe(0);
    expect(v).toBe(0);
  });

  it("parses maximum values (360, 100, 100)", () => {
    const result = parseHSVColor("360, 100, 100");
    expect(result).not.toBeNull();
    const [h, s, v] = result!.getHSV();
    expect(h).toBe(360);
    expect(s).toBe(100);
    expect(v).toBe(100);
  });

  it("parses mid-range float values", () => {
    const result = parseHSVColor("180.5, 50.25, 75.75");
    expect(result).not.toBeNull();
    const [h, s, v] = result!.getHSV();
    expect(h).toBeCloseTo(180.5, 10);
    expect(s).toBeCloseTo(50.25, 10);
    expect(v).toBeCloseTo(75.75, 10);
  });

  it("parses integer values", () => {
    const result = parseHSVColor("120, 50, 50");
    expect(result).not.toBeNull();
    const [h, s, v] = result!.getHSV();
    expect(h).toBe(120);
    expect(s).toBe(50);
    expect(v).toBe(50);
  });

  it("parses scientific notation in H", () => {
    const result = parseHSVColor("1.8e2, 50, 50");
    expect(result).not.toBeNull();
    const [h, s, v] = result!.getHSV();
    expect(h).toBeCloseTo(180, 10);
    expect(s).toBe(50);
    expect(v).toBe(50);
  });

  it("parses scientific notation in S and V", () => {
    const result = parseHSVColor("180, 5e1, 1e2");
    expect(result).not.toBeNull();
    const [h, s, v] = result!.getHSV();
    expect(h).toBe(180);
    expect(s).toBe(50);
    expect(v).toBe(100);
  });

  it("parses with positive sign", () => {
    const result = parseHSVColor("+180, +50, +50");
    expect(result).not.toBeNull();
    const [h, s, v] = result!.getHSV();
    expect(h).toBe(180);
    expect(s).toBe(50);
    expect(v).toBe(50);
  });

  it("parses red hue HSV to getRGB255 correctly", () => {
    // HSV(0, 100, 100) → RGB(255, 0, 0)
    const result = parseHSVColor("0, 100, 100");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(255);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });

  it("parses with leading decimal point", () => {
    const result = parseHSVColor(".5, .5, .5");
    expect(result).not.toBeNull();
    const [h, s, v] = result!.getHSV();
    expect(h).toBeCloseTo(0.5, 10);
    expect(s).toBeCloseTo(0.5, 10);
    expect(v).toBeCloseTo(0.5, 10);
  });

  it("parses with multiple commas between values", () => {
    const result = parseHSVColor("180,, 50,, 50");
    expect(result).not.toBeNull();
    const [h, s, v] = result!.getHSV();
    expect(h).toBe(180);
    expect(s).toBe(50);
    expect(v).toBe(50);
  });

  // ---- invalid inputs ----
  it("returns null for empty string", () => {
    expect(parseHSVColor("")).toBeNull();
  });

  it("returns null when H exceeds 360", () => {
    expect(parseHSVColor("361, 0, 0")).toBeNull();
  });

  it("returns null when H is negative", () => {
    expect(parseHSVColor("-1, 0, 0")).toBeNull();
  });

  it("returns null when S exceeds 100", () => {
    expect(parseHSVColor("0, 101, 0")).toBeNull();
  });

  it("returns null when S is negative", () => {
    expect(parseHSVColor("0, -1, 0")).toBeNull();
  });

  it("returns null when V exceeds 100", () => {
    expect(parseHSVColor("0, 0, 101")).toBeNull();
  });

  it("returns null when V is negative", () => {
    expect(parseHSVColor("0, 0, -1")).toBeNull();
  });

  it("returns null when all values are out of range", () => {
    expect(parseHSVColor("500, 200, 200")).toBeNull();
  });

  it("returns null for only two components", () => {
    expect(parseHSVColor("180, 50")).toBeNull();
  });

  it("returns null for only one component", () => {
    expect(parseHSVColor("180")).toBeNull();
  });

  it("returns null for four components", () => {
    expect(parseHSVColor("0, 0, 0, 0")).toBeNull();
  });

  it("returns null for letter characters", () => {
    expect(parseHSVColor("abc, 0, 0")).toBeNull();
  });

  it("returns null for leading whitespace", () => {
    expect(parseHSVColor(" 180, 50, 50")).toBeNull();
  });

  it("returns null for trailing whitespace", () => {
    expect(parseHSVColor("180, 50, 50 ")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// parseHSLColor
// ---------------------------------------------------------------------------
describe("parseHSLColor", () => {
  // ---- valid inputs ----
  it("parses minimum values (0, 0, 0)", () => {
    const result = parseHSLColor("0, 0, 0");
    expect(result).not.toBeNull();
    const [h, s, l] = result!.getHSL();
    expect(h).toBe(0);
    expect(s).toBe(0);
    expect(l).toBe(0);
  });

  it("parses maximum values (360, 100, 100)", () => {
    const result = parseHSLColor("360, 100, 100");
    expect(result).not.toBeNull();
    const [h, s, l] = result!.getHSL();
    expect(h).toBe(360);
    expect(s).toBe(100);
    expect(l).toBe(100);
  });

  it("parses mid-range float values", () => {
    const result = parseHSLColor("180.5, 50.25, 75.75");
    expect(result).not.toBeNull();
    const [h, s, l] = result!.getHSL();
    expect(h).toBeCloseTo(180.5, 10);
    expect(s).toBeCloseTo(50.25, 10);
    expect(l).toBeCloseTo(75.75, 10);
  });

  it("parses integer values", () => {
    const result = parseHSLColor("240, 100, 50");
    expect(result).not.toBeNull();
    const [h, s, l] = result!.getHSL();
    expect(h).toBe(240);
    expect(s).toBe(100);
    expect(l).toBe(50);
  });

  it("parses scientific notation in H", () => {
    const result = parseHSLColor("2.4e2, 50, 50");
    expect(result).not.toBeNull();
    const [h, s, l] = result!.getHSL();
    expect(h).toBeCloseTo(240, 10);
    expect(s).toBe(50);
    expect(l).toBe(50);
  });

  it("parses scientific notation in S and L", () => {
    const result = parseHSLColor("180, 5e1, 1e2");
    expect(result).not.toBeNull();
    const [h, s, l] = result!.getHSL();
    expect(h).toBe(180);
    expect(s).toBe(50);
    expect(l).toBe(100);
  });

  it("parses with positive sign", () => {
    const result = parseHSLColor("+180, +50, +50");
    expect(result).not.toBeNull();
    const [h, s, l] = result!.getHSL();
    expect(h).toBe(180);
    expect(s).toBe(50);
    expect(l).toBe(50);
  });

  it("parses red hue HSL to getRGB255 correctly", () => {
    // HSL(0, 100, 50) → RGB(255, 0, 0)
    const result = parseHSLColor("0, 100, 50");
    expect(result).not.toBeNull();
    const [r, g, b] = result!.getRGB255();
    expect(r).toBe(255);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });

  it("parses with leading decimal point", () => {
    const result = parseHSLColor(".5, .5, .5");
    expect(result).not.toBeNull();
    const [h, s, l] = result!.getHSL();
    expect(h).toBeCloseTo(0.5, 10);
    expect(s).toBeCloseTo(0.5, 10);
    expect(l).toBeCloseTo(0.5, 10);
  });

  it("parses with multiple commas between values", () => {
    const result = parseHSLColor("180,, 50,, 50");
    expect(result).not.toBeNull();
    const [h, s, l] = result!.getHSL();
    expect(h).toBe(180);
    expect(s).toBe(50);
    expect(l).toBe(50);
  });

  // ---- invalid inputs ----
  it("returns null for empty string", () => {
    expect(parseHSLColor("")).toBeNull();
  });

  it("returns null when H exceeds 360", () => {
    expect(parseHSLColor("361, 0, 0")).toBeNull();
  });

  it("returns null when H is negative", () => {
    expect(parseHSLColor("-1, 0, 0")).toBeNull();
  });

  it("returns null when S exceeds 100", () => {
    expect(parseHSLColor("0, 101, 0")).toBeNull();
  });

  it("returns null when S is negative", () => {
    expect(parseHSLColor("0, -1, 0")).toBeNull();
  });

  it("returns null when L exceeds 100", () => {
    expect(parseHSLColor("0, 0, 101")).toBeNull();
  });

  it("returns null when L is negative", () => {
    expect(parseHSLColor("0, 0, -1")).toBeNull();
  });

  it("returns null when all values are out of range", () => {
    expect(parseHSLColor("500, 200, 200")).toBeNull();
  });

  it("returns null for only two components", () => {
    expect(parseHSLColor("180, 50")).toBeNull();
  });

  it("returns null for only one component", () => {
    expect(parseHSLColor("180")).toBeNull();
  });

  it("returns null for four components", () => {
    expect(parseHSLColor("0, 0, 0, 0")).toBeNull();
  });

  it("returns null for letter characters", () => {
    expect(parseHSLColor("abc, 0, 0")).toBeNull();
  });

  it("returns null for leading whitespace", () => {
    expect(parseHSLColor(" 180, 50, 50")).toBeNull();
  });

  it("returns null for trailing whitespace", () => {
    expect(parseHSLColor("180, 50, 50 ")).toBeNull();
  });
});

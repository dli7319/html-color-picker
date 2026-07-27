// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Color, ColorInputType } from "./Color";
import { PaletteMode, generatePalette } from "./PaletteGenerator";

// ---------------------------------------------------------------------------
// Deterministic mock: Math.random() always returns 0.5
//
// This makes every randomInRange(a, b) = a + 0.5*(b-a), i.e. the midpoint.
// randomInRange  jitter  →  0
// randomInRange  sat     →  70  (non-tonal)  or  50  (tonal)
// randomInRange  light   →  60
// pickRule(ANY)  →  floor(0.5*6)  = 0  →  MONOCHROMATIC
// pickRule(VIVID)→  floor(0.5*4)  = 0  →  COMPLEMENTARY
// baseHue        =  0.5*360      = 180
// ---------------------------------------------------------------------------

function hsl(h: number, s: number, l: number): Color {
  return new Color({ type: ColorInputType.HSL, h, s, l });
}

describe("PaletteGenerator", () => {
  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // -----------------------------------------------------------------------
  // 1. Default config
  // -----------------------------------------------------------------------
  describe("default config", () => {
    it("generates 5 Color instances", () => {
      const colors = generatePalette();
      expect(colors).toHaveLength(5);
      colors.forEach((c) => expect(c).toBeInstanceOf(Color));
    });
  });

  // -----------------------------------------------------------------------
  // 2. Each PaletteMode generates the correct number of colors
  // -----------------------------------------------------------------------
  describe("PaletteMode count", () => {
    it.each([
      [PaletteMode.ANY, 3],
      [PaletteMode.TONAL, 4],
      [PaletteMode.ANALOGOUS, 2],
      [PaletteMode.VIVID, 6],
    ])("mode=%s count=%i", (mode, count) => {
      const colors = generatePalette({ count, mode: mode as PaletteMode });
      expect(colors).toHaveLength(count);
    });
  });

  // -----------------------------------------------------------------------
  // 3. TONAL mode — monochromatic, same hue (± jitter), decreasing lightness
  // -----------------------------------------------------------------------
  describe("PaletteMode.TONAL", () => {
    it("produces monochromatic colors with evenly-spaced lightness steps", () => {
      const count = 5;
      const colors = generatePalette({ count, mode: PaletteMode.TONAL });

      // With random=0.5:
      //   baseHue = 180
      //   saturation = randomInRange(30,70) = 50
      //   h_jitter = randomInRange(-3,3) = 0
      // Lightness steps (descending, because index 0 → highest L):
      //   i=0: 15 + (4/4)*70 = 85
      //   i=1: 15 + (3/4)*70 = 67.5
      //   i=2: 15 + (2/4)*70 = 50
      //   i=3: 15 + (1/4)*70 = 32.5
      //   i=4: 15 + (0/4)*70 = 15
      const expectedLightness = [85, 67.5, 50, 32.5, 15];

      colors.forEach((c, i) => {
        const [h, s, l] = c.getHSL();
        expect(h).toBeCloseTo(180, 5);
        expect(s).toBeCloseTo(50, 5);
        expect(l).toBeCloseTo(expectedLightness[i], 5);
      });
    });

    it("uses MONOCHROMATIC rule consistently regardless of random value", () => {
      // pickRule(TONAL) returns MONOCHROMATIC directly — no Math.random used
      const colors = generatePalette({ count: 3, mode: PaletteMode.TONAL });
      expect(colors).toHaveLength(3);
      // All colors should have the same base hue
      const hues = colors.map((c) => c.getHSL()[0]);
      expect(new Set(hues).size).toBe(1);
    });
  });

  // -----------------------------------------------------------------------
  // 4. Other PaletteMode modes — predictable rule / offset behavior
  // -----------------------------------------------------------------------
  describe("PaletteMode.ANALOGOUS", () => {
    it("uses ANALOGOUS rule offsets", () => {
      // pickRule(ANALOGOUS): Math.floor(0.5 * 1) = 0 → ANALOGOUS
      // baseHue = 180
      // Offsets: [-60, -30, 0, 30, 60]
      // hue = wrapHue(180 + offset + 0)  (jitter=0 at random=0.5)
      // s=70, l=60
      const colors = generatePalette({ count: 5, mode: PaletteMode.ANALOGOUS });

      const expectedHues = [120, 150, 180, 210, 240];
      colors.forEach((c, i) => {
        const [h, s, l] = c.getHSL();
        expect(h).toBeCloseTo(expectedHues[i], 5);
        expect(s).toBeCloseTo(70, 5);
        expect(l).toBeCloseTo(60, 5);
      });
    });
  });

  describe("PaletteMode.VIVID", () => {
    it("picks from vivid rules (SPLIT_COMPLEMENTARY with random=0.5)", () => {
      // pickRule(VIVID): Math.floor(0.5 * 4) = 2 → SPLIT_COMPLEMENTARY
      // baseHue = 180
      // Offsets for SPLIT_COMPLEMENTARY: [0, 150, 210, -20, 170]
      // hue = wrapHue(180 + offset + 0)  (jitter=0 at random=0.5)
      // s=70, l=60
      const colors = generatePalette({ count: 5, mode: PaletteMode.VIVID });

      const expectedHues = [180, 330, 30, 160, 350]; // 180+210=390→30
      colors.forEach((c, i) => {
        const [h, s, l] = c.getHSL();
        expect(h).toBeCloseTo(expectedHues[i], 5);
        expect(s).toBeCloseTo(70, 5);
        expect(l).toBeCloseTo(60, 5);
      });
    });

    it("never produces MONOCHROMATIC or ANALOGOUS hues", () => {
      // Run several calls — with VIVID mode the pool only contains
      // COMPLEMENTARY, TRIADIC, SPLIT_COMPLEMENTARY, TETRADIC.
      // With random=0.5 the pick is SPLIT_COMPLEMENTARY, but any
      // of the vivid rules produce diverse offsets.
      for (let trial = 0; trial < 5; trial++) {
        const colors = generatePalette({ count: 5, mode: PaletteMode.VIVID });
        const hues = colors.map((c) => c.getHSL()[0]);
        // At least 4 distinct hue values (with jitter=0, we get exactly 5)
        expect(new Set(hues).size).toBeGreaterThanOrEqual(4);
      }
    });
  });

  describe("PaletteMode.ANY", () => {
    it("picks from all rules (TRIADIC with random=0.5)", () => {
      // pickRule(ANY): Math.floor(0.5 * 6) = 3 → TRIADIC
      // baseHue = 180
      // Offsets for TRIADIC: [0, 120, 240, 30, 150]
      // hue = wrapHue(180 + offset + 0)  (jitter=0 at random=0.5)
      // s=70, l=60
      const colors = generatePalette({ count: 5, mode: PaletteMode.ANY });

      const expectedHues = [180, 300, 60, 210, 330]; // 180+240=420→60
      colors.forEach((c, i) => {
        const [h, s, l] = c.getHSL();
        expect(h).toBeCloseTo(expectedHues[i], 5);
        expect(s).toBeCloseTo(70, 5);
        expect(l).toBeCloseTo(60, 5);
      });
    });
  });

  // -----------------------------------------------------------------------
  // 5. Custom config
  // -----------------------------------------------------------------------
  describe("custom config", () => {
    it("accepts a different count", () => {
      const colors = generatePalette({ count: 3 });
      expect(colors).toHaveLength(3);
    });

    it("accepts a custom saturation range", () => {
      // With random=0.5: s = 10 + 0.5*(90-10) = 10 + 40 = 50
      const colors = generatePalette({
        mode: PaletteMode.TONAL,
        saturationRange: [10, 90],
      });
      colors.forEach((c) => {
        const [, s] = c.getHSL();
        expect(s).toBeCloseTo(50, 5);
      });
    });

    it("accepts a custom lightness range", () => {
      // With random=0.5: l = 20 + 0.5*(60-20) = 20 + 20 = 40
      // (tested in non-tonal mode)
      const colors = generatePalette({
        mode: PaletteMode.ANALOGOUS,
        lightnessRange: [20, 60],
        count: 2,
      });
      colors.forEach((c) => {
        const [, , l] = c.getHSL();
        expect(l).toBeCloseTo(40, 5);
      });
    });

    it("accepts a custom jitter", () => {
      // With jitter=20 and random=0.5: jitter contribution = 0
      // (since randomInRange(-20,20) = -20 + 0.5*40 = 0 at random=0.5)
      // Use a different random value for the jitter call to validate.
      // Instead, verify that with jitter=0 the hue is exactly baseHue+offset.
      const colorsA = generatePalette({
        mode: PaletteMode.ANALOGOUS,
        jitter: 0,
        count: 1,
      });
      // With jitter=0: randomInRange(0,0) always returns 0 regardless of random()
      expect(colorsA[0].getHSL()[0]).toBeCloseTo(120, 5); // baseHue=180, offset=-60, jitter=0

      // Now with jitter=20: at random=0.5, jitter=0, same result
      const colorsB = generatePalette({
        mode: PaletteMode.ANALOGOUS,
        jitter: 20,
        count: 1,
      });
      expect(colorsB[0].getHSL()[0]).toBeCloseTo(120, 5);
    });

    it("merges partial config with defaults", () => {
      // Only override count, everything else should fall back to defaults
      const colors = generatePalette({ count: 2 });
      expect(colors).toHaveLength(2);
      const [, s, l] = colors[0].getHSL();
      expect(s).toBeCloseTo(70, 5); // default satRange [50,90], midpoint=70
      expect(l).toBeCloseTo(60, 5); // default lightRange [40,80], midpoint=60
    });
  });

  // -----------------------------------------------------------------------
  // 6. Locking
  // -----------------------------------------------------------------------
  describe("locking", () => {
    const existingColors = [
      hsl(10, 20, 30),
      hsl(40, 50, 60),
      hsl(70, 80, 90),
      hsl(100, 30, 50),
      hsl(130, 60, 40),
    ];

    it("preserves locked colors at their indices", () => {
      const locked = [true, false, false, false, false];
      const colors = generatePalette(
        { mode: PaletteMode.ANALOGOUS },
        locked,
        existingColors,
      );

      // Index 0 should be the exact same object from existingColors
      expect(colors[0]).toBe(existingColors[0]);

      // Unlocked colors are regenerated objects (not same references)
      for (let i = 1; i < 5; i++) {
        expect(colors[i]).not.toBe(existingColors[i]);
      }
    });

    it("preserves multiple locked colors at arbitrary indices", () => {
      const locked = [true, false, true, false, true];
      const colors = generatePalette(
        { mode: PaletteMode.ANALOGOUS },
        locked,
        existingColors,
      );

      expect(colors[0]).toBe(existingColors[0]);
      expect(colors[2]).toBe(existingColors[2]);
      expect(colors[4]).toBe(existingColors[4]);

      // Unlocked indices are regenerated
      expect(colors[1]).not.toBe(existingColors[1]);
      expect(colors[3]).not.toBe(existingColors[3]);
    });

    it("anchors unlocked colors to the first locked color's hue", () => {
      // When a locked color exists at index 0, it becomes the anchor.
      // baseHue = wrapHue(anchor.hsl[0] - offsets[anchor.index])
      // With ANALOGOUS rule (offsets=[-60,-30,0,30,60]) and locked[0]=true:
      //   anchor.hsl[0] = 10, offsets[0] = -60
      //   baseHue = wrapHue(10 - (-60)) = 70
      // Unlocked colors use this baseHue instead of Math.random()*360
      const locked = [true, false, false, false, false];
      const colors = generatePalette(
        { mode: PaletteMode.ANALOGOUS },
        locked,
        existingColors,
      );

      // Color [0] is locked (h=10). Colors [1..4] should be generated around h=70.
      // Offsets:  [1]→-30 → h=40,  [2]→0 → h=70,  [3]→30 → h=100,  [4]→60 → h=130
      expect(colors[0].getHSL()[0]).toBeCloseTo(10, 5); // locked, preserved
      expect(colors[1].getHSL()[0]).toBeCloseTo(40, 5); // 70 + (-30) = 40
      expect(colors[2].getHSL()[0]).toBeCloseTo(70, 5); // 70 + 0 = 70
      expect(colors[3].getHSL()[0]).toBeCloseTo(100, 5); // 70 + 30 = 100
      expect(colors[4].getHSL()[0]).toBeCloseTo(130, 5); // 70 + 60 = 130
    });

    it("works with undefined locked array", () => {
      const colors = generatePalette(undefined, undefined, existingColors);
      // Should fall back to no-lock behavior: baseHue = Math.random() * 360
      expect(colors).toHaveLength(5);
      // All colors should be regenerated (none locked)
      colors.forEach((c) => expect(c).toBeInstanceOf(Color));
    });

    it("works with an empty locked array", () => {
      const colors = generatePalette({ count: 5 }, [], existingColors);
      // Empty array — no anchor, no locked colors, all regenerated
      expect(colors).toHaveLength(5);
    });

    it("works with undefined existingColors", () => {
      const locked = [true, false, false, false, false];
      const colors = generatePalette({ count: 5 }, locked, undefined);
      // No existingColors means no anchor, all colors generated fresh
      expect(colors).toHaveLength(5);
      colors.forEach((c) => expect(c).toBeInstanceOf(Color));
    });

    it("ignores locked indices when existingColors is missing that index", () => {
      const locked = [true, false];
      const sparseColors = [hsl(200, 50, 50)]; // only index 0
      const colors = generatePalette({ count: 2 }, locked, sparseColors);
      // Index 0 is locked and exists → preserved
      expect(colors[0]).toBe(sparseColors[0]);
      // Index 1: locked=true but existingColors[1] is undefined → regenerated
      expect(colors[1]).toBeInstanceOf(Color);
    });
  });

  // -----------------------------------------------------------------------
  // 7. Edge cases
  // -----------------------------------------------------------------------
  describe("edge cases", () => {
    it("count=2", () => {
      const colors = generatePalette({ count: 2 });
      expect(colors).toHaveLength(2);
    });

    it("count=7", () => {
      const colors = generatePalette({ count: 7 });
      expect(colors).toHaveLength(7);
    });

    it("count=1", () => {
      // For tonal mode with count=1: (count-1-index)/(count-1) = 0/0
      // The code uses (count - 1 - index) / (count - 1)
      // With count=1: (1-1-0)/(1-1) = 0/0 = NaN, so lightness = 15 + NaN*70 = NaN
      // This is an edge case the implementation doesn't handle gracefully.
      // Just verify it doesn't crash and returns 1 Color.
      const colors = generatePalette({ count: 1 });
      expect(colors).toHaveLength(1);
      expect(colors[0]).toBeInstanceOf(Color);
    });

    it("count=10", () => {
      const colors = generatePalette({ count: 10 });
      expect(colors).toHaveLength(10);
    });

    it("all locked = false regenerates all colors", () => {
      const locked = [false, false, false, false, false];
      const colors = generatePalette({ mode: PaletteMode.ANALOGOUS }, locked, [
        hsl(10, 20, 30),
        hsl(40, 50, 60),
        hsl(70, 80, 90),
        hsl(100, 30, 50),
        hsl(130, 60, 40),
      ]);
      // All regenerated — none should be the original references
      colors.forEach((c) => {
        const [, s, l] = c.getHSL();
        // With random=0.5: s=70, l=60 (the default midpoint values)
        expect(s).toBeCloseTo(70, 5);
        expect(l).toBeCloseTo(60, 5);
      });
    });
  });

  // -----------------------------------------------------------------------
  // 8. Hue wrapping at 360 degrees
  // -----------------------------------------------------------------------
  describe("hue wrapping", () => {
    it("wraps hues that exceed 360 degrees", () => {
      // VIVID mode with random=0.5 → SPLIT_COMPLEMENTARY
      // SPLIT_COMPLEMENTARY offsets: [0, 150, 210, -20, 170]
      // baseHue = 180 → h[2] = 180+210 = 390 → 30
      const colors = generatePalette({ count: 5, mode: PaletteMode.VIVID });
      // h[0]=180, h[1]=330, h[2]=390→30 (wraps), h[3]=160, h[4]=350
      expect(colors[2].getHSL()[0]).toBeCloseTo(30, 5);
    });

    it("wraps hues that go below 0 degrees", () => {
      // Mock a low baseHue and use ANALOGOUS offsets [-60, -30, 0, 30, 60]
      // so that offset -60 pushes hue below 0 and wrapHue corrects it.
      vi.restoreAllMocks();
      let callCount = 0;
      vi.spyOn(Math, "random").mockImplementation(() => {
        callCount++;
        // Call 2 (baseHue): return 0 so baseHue = 0
        if (callCount === 2) return 0;
        return 0.5;
      });

      // With baseHue=0 and ANALOGOUS offsets:
      // h[0] = wrapHue(0 + (-60) + 0) = 300
      // h[1] = wrapHue(0 + (-30) + 0) = 330
      // h[2] = wrapHue(0 + 0 + 0) = 0
      const colors = generatePalette({ mode: PaletteMode.ANALOGOUS, count: 3 });
      expect(colors[0].getHSL()[0]).toBeCloseTo(300, 5);
      expect(colors[1].getHSL()[0]).toBeCloseTo(330, 5);
      expect(colors[2].getHSL()[0]).toBeCloseTo(0, 5);
    });

    it("wraps correctly at the 0/360 boundary with negative offsets", () => {
      // Test wrapHue indirectly: ANALOGOUS offset -60 with small hue → wraps to 300
      vi.restoreAllMocks();
      let calls = 0;
      vi.spyOn(Math, "random").mockImplementation(() => {
        calls++;
        // Call 1: pickRule(ANY) with random=0.5 → floor(3) → ... but
        // we're in ANALOGOUS mode so no calls to pickRule beyond Math.floor
        // Actually ANALOGOUS mode uses pool = ANALOGOUS_RULES (length 1)
        // pickRule: Math.floor(0.5 * 1) = 0 → ANALOGOUS
        // Call 2: baseHue
        if (calls === 2) return 0.01; // baseHue ≈ 3.6
        return 0.5;
      });

      const colors = generatePalette({ mode: PaletteMode.ANALOGOUS, count: 3 });
      // baseHue ≈ 3.6
      // h[0] = wrapHue(3.6 + (-60)) = wrapHue(-56.4) = 303.6
      // h[1] = wrapHue(3.6 + (-30)) = wrapHue(-26.4) = 333.6
      // h[2] = wrapHue(3.6 + 0) = 3.6 (no wrap)
      expect(colors[0].getHSL()[0]).toBeCloseTo(303.6, 1);
      expect(colors[1].getHSL()[0]).toBeCloseTo(333.6, 1);
      expect(colors[2].getHSL()[0]).toBeCloseTo(3.6, 1);
    });

    it("wraps correctly for large positive offsets at the 360 boundary", () => {
      // With baseHue near 360 and a positive offset, should wrap to small values
      vi.restoreAllMocks();
      let calls = 0;
      vi.spyOn(Math, "random").mockImplementation(() => {
        calls++;
        // Call 2 (baseHue): return 0.99 → baseHue ≈ 356.4
        if (calls === 2) return 0.99;
        return 0.5;
      });

      const colors = generatePalette({
        mode: PaletteMode.ANALOGOUS,
        count: 4,
        jitter: 0,
      });
      // baseHue ≈ 356.4
      // ANALOGOUS offsets: [-60, -30, 0, 30, 60]
      // h[0] = 356.4 + (-60) = 296.4 (no wrap, still positive)
      // h[1] = 356.4 + (-30) = 326.4
      // h[2] = 356.4 + 0 = 356.4
      // h[3] = 356.4 + 30 = 386.4 → 26.4

      expect(colors[0].getHSL()[0]).toBeCloseTo(296.4, 1);
      expect(colors[1].getHSL()[0]).toBeCloseTo(326.4, 1);
      expect(colors[2].getHSL()[0]).toBeCloseTo(356.4, 1);
      expect(colors[3].getHSL()[0]).toBeCloseTo(26.4, 1);
    });
  });

  // -----------------------------------------------------------------------
  // 9. Tonal locked anchor behavior
  // -----------------------------------------------------------------------
  describe("tonal mode with locking", () => {
    it("preserves locked colors in tonal mode", () => {
      const existing = [hsl(200, 60, 50), hsl(0, 0, 0), hsl(0, 0, 0)];
      const locked = [true, false, false];
      const colors = generatePalette(
        { count: 3, mode: PaletteMode.TONAL },
        locked,
        existing,
      );

      // Index 0 is locked — should be preserved exactly
      expect(colors[0]).toBe(existing[0]);
      // Index 1,2 should be tonal colors around hue 200
      const [, s1] = colors[1].getHSL();
      const [, s2] = colors[2].getHSL();
      // Saturation is inherited from the anchor
      expect(s1).toBeCloseTo(60, 5);
      expect(s2).toBeCloseTo(60, 5);
    });

    it("uses anchor saturation for tonal mode when locked", () => {
      const existing = [hsl(300, 80, 50)];
      const locked = [true, false, false];
      const colors = generatePalette(
        { count: 3, mode: PaletteMode.TONAL },
        locked,
        existing,
      );

      // Locked color preserved
      expect(colors[0].getHSL()[1]).toBeCloseTo(80, 5);
      // Unlocked colors should use anchor's saturation (80), not randomInRange(30,70)
      expect(colors[1].getHSL()[1]).toBeCloseTo(80, 5);
      expect(colors[2].getHSL()[1]).toBeCloseTo(80, 5);
    });
  });
});

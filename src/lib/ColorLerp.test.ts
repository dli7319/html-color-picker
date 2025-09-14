import { describe, it, expect } from 'vitest';
import { Color, ColorInputType } from './Color';
import { lerpColor, ColorLerpMode } from './ColorLerp';

describe('lerpColor', () => {
  it('should interpolate correctly in RGB mode', () => {
    const color0 = new Color({ type: ColorInputType.RGB255, r: 0, g: 0, b: 0 });
    const color1 = new Color({ type: ColorInputType.RGB255, r: 255, g: 255, b: 255 });
    const t = 0.5;
    const result = lerpColor(color0, color1, t, ColorLerpMode.RGB);
    const [r, g, b] = result.getRGB255();
    expect(r).toBe(128);
    expect(g).toBe(128);
    expect(b).toBe(128);
  });

  it('should interpolate correctly in HSV mode', () => {
    const color0 = new Color({ type: ColorInputType.HSV, h: 0, s: 0, v: 0 });
    const color1 = new Color({ type: ColorInputType.HSV, h: 100, s: 100, v: 100 });
    const t = 0.5;
    const result = lerpColor(color0, color1, t, ColorLerpMode.HSV);
    const [h, s, v] = result.getHSV();
    expect(h).toBeCloseTo(50);
    expect(s).toBeCloseTo(50);
    expect(v).toBeCloseTo(50);
  });

  it('should interpolate correctly in HSL mode', () => {
    const color0 = new Color({ type: ColorInputType.HSL, h: 0, s: 0, l: 0 });
    const color1 = new Color({ type: ColorInputType.HSL, h: 100, s: 100, l: 100 });
    const t = 0.5;
    const result = lerpColor(color0, color1, t, ColorLerpMode.HSL);
    const [h, s, l] = result.getHSL();
    expect(h).toBeCloseTo(50);
    expect(s).toBeCloseTo(50);
    expect(l).toBeCloseTo(50);
  });

  it('should interpolate correctly in LCH mode', () => {
    const color0 = new Color({ type: ColorInputType.LCH, l: 0, c: 0, h: 0 });
    const color1 = new Color({ type: ColorInputType.LCH, l: 100, c: 100, h: 100 });
    const t = 0.5;
    const result = lerpColor(color0, color1, t, ColorLerpMode.LCH);
    const [l, c, h] = result.getLCH();
    expect(l).toBeCloseTo(50);
    expect(c).toBeCloseTo(50);
    expect(h).toBeCloseTo(50);
  });
});

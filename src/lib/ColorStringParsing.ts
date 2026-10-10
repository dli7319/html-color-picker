import { Color, ColorInputType } from "./Color";

const hexRegex = /^#?([0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)$/;
const functionWrapperRegex = /^(?:rgba?|hsla?|hsva?)\((.*)\)$/i;
const componentRegex = /^([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*(%)?$/;

export type ColorInputKind = "HEX" | "RGB255" | "RGB01" | "HSV" | "HSL";

/**
 * Strips CSS color-function syntax so real-world pastes parse:
 * "rgb(51, 102, 204)" -> "51, 102, 204". Percent signs are kept — each
 * parser interprets "%" relative to its own range (round-2 review).
 */
function normalizeColorInput(value: string): string {
  let v = value.trim();
  const match = functionWrapperRegex.exec(v);
  if (match) v = match[1];
  return v.trim();
}

interface Component {
  n: number;
  pct: boolean;
}

/** Splits "a, b, c" into three numeric components with %-flags. */
function parseComponents(
  value: string,
): [Component, Component, Component] | null {
  // Empty segments collapse: the historical parsers accepted multiple
  // commas between values ("1,, 2, 3").
  const parts = normalizeColorInput(value)
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p !== "");
  if (parts.length !== 3) return null;
  const out: Component[] = [];
  for (const part of parts) {
    const m = componentRegex.exec(part);
    if (!m) return null;
    out.push({ n: parseFloat(m[1]), pct: m[2] !== undefined });
  }
  return out as [Component, Component, Component];
}

/** Parses a color string for the given converter input kind, or null. */
export function parseColorString(
  inputType: ColorInputKind,
  value: string,
): Color | null {
  switch (inputType) {
    case "HEX":
      return parseHexColor(value);
    case "RGB255":
      return parseRGB255Color(value);
    case "RGB01":
      return parseRGB01Color(value);
    case "HSV":
      return parseHSVColor(value);
    case "HSL":
      return parseHSLColor(value);
    default:
      return null;
  }
}

export function parseHexColor(value: string) {
  const match = hexRegex.exec(normalizeColorInput(value));
  if (match && match.length === 2) {
    return new Color({
      type: ColorInputType.HEX,
      hex: match[1],
    });
  }
  return null;
}

export function parseRGB255Color(value: string) {
  const comps = parseComponents(value);
  if (!comps) return null;
  // Plain components stay integer-only (historical contract); "51%" maps to
  // a percentage of 255 instead of silently becoming 51 (round-2 review).
  if (!comps.every((c) => c.pct || Number.isInteger(c.n))) return null;
  const [r, g, b] = comps.map((c) =>
    c.pct ? Math.round((c.n * 255) / 100) : c.n,
  );
  if (0 <= r && r <= 255 && 0 <= g && g <= 255 && 0 <= b && b <= 255) {
    return new Color({
      type: ColorInputType.RGB255,
      r,
      g,
      b,
    });
  }
  return null;
}

export function parseRGB01Color(value: string) {
  const comps = parseComponents(value);
  if (!comps) return null;
  const [r, g, b] = comps.map((c) => (c.pct ? c.n / 100 : c.n));
  if (0 <= r && r <= 1 && 0 <= g && g <= 1 && 0 <= b && b <= 1) {
    return new Color({
      type: ColorInputType.RGB01,
      r,
      g,
      b,
    });
  }
  return null;
}

export function parseHSVColor(value: string) {
  const comps = parseComponents(value);
  if (!comps) return null;
  // HSV/HSL percentages are percentage points (CSS semantics): 45% -> 45.
  const [h, s, v] = comps.map((c) => c.n);
  if (0 <= h && h <= 360 && 0 <= s && s <= 100 && 0 <= v && v <= 100) {
    return new Color({
      type: ColorInputType.HSV,
      h: h,
      s: s,
      v: v,
    });
  }
  return null;
}

export function parseHSLColor(value: string) {
  const comps = parseComponents(value);
  if (!comps) return null;
  const [h, s, l] = comps.map((c) => c.n);
  if (0 <= h && h <= 360 && 0 <= s && s <= 100 && 0 <= l && l <= 100) {
    return new Color({
      type: ColorInputType.HSL,
      h: h,
      s: s,
      l: l,
    });
  }
  return null;
}

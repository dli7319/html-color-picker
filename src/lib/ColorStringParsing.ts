import { Color, ColorInputType } from "./Color";

const hexRegex = /^#?([0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)$/;
const rgb255Regex = /^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/;
const floatTripletRegex =
  /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;

export function parseHexColor(value: string) {
  const match = hexRegex.exec(value);
  if (match && match.length === 2) {
    return new Color({
      type: ColorInputType.HEX,
      hex: match[1],
    });
  }
  return null;
}

export function parseRGB255Color(value: string) {
  const match = rgb255Regex.exec(value);
  if (match && match.length === 4) {
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    if (0 <= r && r <= 255 && 0 <= g && g <= 255 && 0 <= b && b <= 255) {
      return new Color({
        type: ColorInputType.RGB255,
        r,
        g,
        b,
      });
    }
  }
  return null;
}

export function parseRGB01Color(value: string) {
  const match = floatTripletRegex.exec(value);
  if (match && match.length === 4) {
    const r = parseFloat(match[1]);
    const g = parseFloat(match[2]);
    const b = parseFloat(match[3]);
    if (0 <= r && r <= 1 && 0 <= g && g <= 1 && 0 <= b && b <= 1) {
      return new Color({
        type: ColorInputType.RGB01,
        r,
        g,
        b,
      });
    }
  }
  return null;
}

export function parseHSVColor(value: string) {
  const match = floatTripletRegex.exec(value);
  if (match && match.length === 4) {
    const h = parseFloat(match[1]);
    const s = parseFloat(match[2]);
    const v = parseFloat(match[3]);
    if (0 <= h && h <= 360 && 0 <= s && s <= 100 && 0 <= v && v <= 100) {
      return new Color({
        type: ColorInputType.HSV,
        h: h,
        s: s,
        v: v,
      });
    }
  }
  return null;
}

export function parseHSLColor(value: string) {
  const match = floatTripletRegex.exec(value);
  if (match && match.length === 4) {
    const h = parseFloat(match[1]);
    const s = parseFloat(match[2]);
    const l = parseFloat(match[3]);
    if (0 <= h && h <= 360 && 0 <= s && s <= 100 && 0 <= l && l <= 100) {
      return new Color({
        type: ColorInputType.HSL,
        h: h,
        s: s,
        l: l,
      });
    }
  }
  return null;
}

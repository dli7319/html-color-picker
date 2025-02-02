import Color, { ColorInputType } from "./Color";

const hexRegex = /^#?([0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)$/;
const rgb255Regex = /^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/;
const rgb01Regex =
  /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;
const hsvRegex =
  /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;

export function parseHexColor(value: string) {
  const match = hexRegex.exec(value);
  if (match && match.length == 2) {
    return new Color({
      type: ColorInputType.HEX,
      hex: match[1],
    });
  }
  return null;
}

export function parseRGB255Color(value: string) {
  const match = rgb255Regex.exec(value);
  if (match && match.length == 4) {
    return new Color({
      type: ColorInputType.RGB255,
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
    });
  }
  return null;
}

export function parseRGB01Color(value: string) {
  const match = rgb01Regex.exec(value);
  if (match && match.length == 4) {
    return new Color({
      type: ColorInputType.RGB01,
      r: parseFloat(match[1]),
      g: parseFloat(match[2]),
      b: parseFloat(match[3]),
    });
  }
  return null;
}

export function parseHSVColor(value: string) {
  const match = hsvRegex.exec(value);
  if (match && match.length == 4) {
    const h = parseFloat(match[1]);
    const s = parseFloat(match[2]);
    const v = parseFloat(match[3]);
    if (0 <= h && h <= 360 && 0 <= s && s <= 100 && 0 <= v && v <= 100) {
      return new Color({
        type: ColorInputType.HSV,
        h: parseFloat(match[1]),
        s: parseFloat(match[2]),
        v: parseFloat(match[3]),
      });
    }
  }
  return null;
}

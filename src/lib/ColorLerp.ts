import { Color, ColorInputType } from "./Color";
import { lerp } from "./utils/math";

export enum ColorLerpMode {
  RGB = "rgb",
  HSV = "hsv",
  HSL = "hsl",
  HSL_FLIP = "hsl_flip",
  LCH = "lch",
}

function lerpRGB(color0: Color, color1: Color, t: number) {
  const [color0r, color0g, color0b] = color0.getRGB01();
  const [color1r, color1g, color1b] = color1.getRGB01();
  return new Color({
    type: ColorInputType.RGB01,
    r: lerp(color0r, color1r, t),
    g: lerp(color0g, color1g, t),
    b: lerp(color0b, color1b, t),
  });
}

function lerpLCH(color0: Color, color1: Color, t: number) {
  let lch0 = color0.getLCH();
  let lch1 = color1.getLCH();
  return new Color({
    type: ColorInputType.LCH,
    l: lerp(lch0[0], lch1[0], t),
    c: lerp(lch0[1], lch1[1], t),
    h: lerp(lch0[2], lch1[2], t),
  });
}

function lerpHSL(color0: Color, color1: Color, t: number) {
  const hsl0 = color0.getHSL();
  const hsl1 = color1.getHSL();
  const flipHueDirection = Math.abs(hsl0[0] - hsl1[0]) > 180;
  const hsl0Updated =
    hsl0[0] + 360 * Number(flipHueDirection && hsl0[0] < hsl1[0]);
  const hsl1Updated =
    hsl1[0] + 360 * Number(flipHueDirection && hsl1[0] < hsl0[0]);
  const intermediateHue = lerp(hsl0Updated, hsl1Updated, t);
  return new Color({
    type: ColorInputType.HSL,
    h: intermediateHue,
    s: lerp(hsl0[1], hsl1[1], t),
    l: lerp(hsl0[2], hsl1[2], t),
  });
}

function lerpHSLFlip(color0: Color, color1: Color, t: number) {
  const hsl0 = color0.getHSL();
  const hsl1 = color1.getHSL();
  const flipHueDirection = Math.abs(hsl0[0] - hsl1[0]) > 180;
  const hsl0Updated =
    hsl0[0] + 360 * Number(!flipHueDirection && hsl0[0] < hsl1[0]);
  const hsl1Updated =
    hsl1[0] + 360 * Number(!flipHueDirection && hsl1[0] < hsl0[0]);
  const intermediateHue = lerp(hsl0Updated, hsl1Updated, t);
  return new Color({
    type: ColorInputType.HSL,
    h: intermediateHue,
    s: lerp(hsl0[1], hsl1[1], t),
    l: lerp(hsl0[2], hsl1[2], t),
  });
}

function lerpHSV(color0: Color, color1: Color, t: number) {
  let hsv0 = color0.getHSV();
  let hsv1 = color1.getHSV();
  return new Color({
    type: ColorInputType.HSV,
    h: lerp(hsv0[0], hsv1[0], t),
    s: lerp(hsv0[1], hsv1[1], t),
    v: lerp(hsv0[2], hsv1[2], t),
  });
}

const LerpModeToFunction = {
  [ColorLerpMode.RGB]: lerpRGB,
  [ColorLerpMode.HSV]: lerpHSV,
  [ColorLerpMode.HSL]: lerpHSL,
  [ColorLerpMode.HSL_FLIP]: lerpHSLFlip,
  [ColorLerpMode.LCH]: lerpLCH,
};

export function lerpColor(
  color0: Color,
  color1: Color,
  t: number,
  mode: ColorLerpMode = ColorLerpMode.RGB
) {
  return LerpModeToFunction[mode](color0, color1, t);
}

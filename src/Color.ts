import clamp from "clamp";
import colorConvert from "color-convert";

import {
  parseHexColor,
  parseHSVColor,
  parseRGB01Color,
  parseRGB255Color,
} from "./ColorStringParsing";

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export enum ColorInputType {
  RGB255 = "rgb255",
  RGB01 = "rgb01",
  HEX = "hex",
  HSV = "hsv",
  HSL = "hsl",
  LCH = "lch",
}

export enum ColorLerpMode {
  RGB = "rgb",
  HSV = "hsv",
  HSL = "hsl",
  HSL_FLIP = "hsl_flip",
  LCH = "lch",
}

export interface ColorInput {
  type?: ColorInputType;
  r?: number;
  g?: number;
  b?: number;
  a?: number;
  hex?: string;
  h?: number;
  s?: number;
  v?: number;
  l?: number;
  c?: number;
}

export default class Color {
  a: number = 1;
  input: ColorInput;
  #conversionInput: String | Array<number>;
  #colorConvertFunction: any;

  constructor(color: ColorInput = {}) {
    if (color.type == ColorInputType.RGB255) {
      this.#conversionInput = [
        clamp(color.r || 0, 0, 255),
        clamp(color.g || 0, 0, 255),
        clamp(color.b || 0, 0, 255),
      ];
      this.#colorConvertFunction = colorConvert.rgb;
    } else if (color.type == ColorInputType.RGB01) {
      this.#conversionInput = [
        clamp(Math.round((color.r || 0) * 255), 0, 255),
        clamp(Math.round((color.g || 0) * 255), 0, 255),
        clamp(Math.round((color.b || 0) * 255), 0, 255),
      ];
      this.#colorConvertFunction = colorConvert.rgb;
    } else if (color.type == ColorInputType.HEX) {
      this.#conversionInput = color.hex || "#000000";
      this.#colorConvertFunction = colorConvert.hex;
    } else if (color.type == ColorInputType.HSV) {
      this.#conversionInput = [color.h || 0, color.s || 0, color.v || 0];
      this.#colorConvertFunction = colorConvert.hsv;
    } else if (color.type == ColorInputType.HSL) {
      this.#conversionInput = [color.h || 0, color.s || 0, color.l || 0];
      this.#colorConvertFunction = colorConvert.hsl;
    } else if (color.type == ColorInputType.LCH) {
      this.#conversionInput = [color.l || 0, color.c || 0, color.h || 0];
      this.#colorConvertFunction = colorConvert.lch;
    } else {
      // Assume black color by default.
      color = { type: ColorInputType.RGB255, ...color };
      this.#conversionInput = [0, 0, 0];
      this.#colorConvertFunction = colorConvert.rgb;
    }
    this.input = color;
    Object.freeze(this);
  }

  getRGB255(): [number, number, number] {
    if (this.input.type === ColorInputType.RGB255) {
      return [this.input.r || 0, this.input.g || 0, this.input.b || 0];
    } else if (this.input.type === ColorInputType.RGB01) {
      return [
        Math.round((this.input.r || 0) * 255),
        Math.round((this.input.g || 0) * 255),
        Math.round((this.input.b || 0) * 255),
      ];
    }
    return this.#colorConvertFunction.rgb(this.#conversionInput);
  }

  getRGB01(): number[] {
    if (this.input.type === ColorInputType.RGB255) {
      return [
        (this.input.r || 0) / 255,
        (this.input.g || 0) / 255,
        (this.input.b || 0) / 255,
      ];
    } else if (this.input.type === ColorInputType.RGB01) {
      return [this.input.r || 0, this.input.g || 0, this.input.b || 0];
    }
    return this.getRGB255().map((x) => x / 255);
  }

  getHex(): string {
    if (this.input.type === ColorInputType.HEX) {
      return this.input.hex || "";
    }
    return this.#colorConvertFunction.hex(this.#conversionInput);
  }

  getHSV(raw: boolean = true): number[] {
    if (this.input.type === ColorInputType.HSV) {
      const output = [this.input.h || 0, this.input.s || 0, this.input.v || 0];
      return raw ? output : output.map((x) => Math.round(x));
    }
    if (raw) {
      return this.#colorConvertFunction.hsv.raw(this.#conversionInput);
    }
    return this.#colorConvertFunction.hsv(this.#conversionInput);
  }

  getHSL(raw: boolean = true): number[] {
    if (this.input.type === ColorInputType.HSL) {
      const hslArray = [
        this.input.h || 0,
        this.input.s || 0,
        this.input.l || 0,
      ];
      return raw ? hslArray : hslArray.map((x) => Math.round(x));
    }
    if (raw) {
      return this.#colorConvertFunction.hsl.raw(this.#conversionInput);
    }
    return this.#colorConvertFunction.hsl(this.#conversionInput);
  }

  getLCH(raw: boolean = true): number[] {
    if (this.input.type === ColorInputType.LCH) {
      const lchArray = [
        this.input.l || 0,
        this.input.c || 0,
        this.input.h || 0,
      ];
      return raw ? lchArray : lchArray.map((x) => Math.round(x));
    }
    if (raw) {
      return this.#colorConvertFunction.lch.raw(this.#conversionInput);
    }
    return this.#colorConvertFunction.lch(this.#conversionInput);
  }

  toCSS() {
    return `rgba(${this.getRGB255().join(", ")})`;
  }

  static fromRGB255Array(arr: number[]) {
    return new Color({
      type: ColorInputType.RGB255,
      r: arr[0],
      g: arr[1],
      b: arr[2],
    });
  }

  static lerp(
    color0: Color,
    color1: Color,
    t: number,
    mode: ColorLerpMode = ColorLerpMode.RGB
  ) {
    if (mode === ColorLerpMode.HSV) {
      let hsv0 = color0.getHSV();
      let hsv1 = color1.getHSV();
      return new Color({
        type: ColorInputType.HSV,
        h: lerp(hsv0[0], hsv1[0], t),
        s: lerp(hsv0[1], hsv1[1], t),
        v: lerp(hsv0[2], hsv1[2], t),
      });
    } else if (mode === ColorLerpMode.HSL) {
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
    } else if (mode === ColorLerpMode.HSL_FLIP) {
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
    } else if (mode == ColorLerpMode.LCH) {
      let lch0 = color0.getLCH();
      let lch1 = color1.getLCH();
      return new Color({
        type: ColorInputType.LCH,
        l: lerp(lch0[0], lch1[0], t),
        c: lerp(lch0[1], lch1[1], t),
        h: lerp(lch0[2], lch1[2], t),
      });
    }
    const [color0r, color0g, color0b] = color0.getRGB01();
    const [color1r, color1g, color1b] = color1.getRGB01();
    return new Color({
      type: ColorInputType.RGB01,
      r: lerp(color0r, color1r, t),
      g: lerp(color0g, color1g, t),
      b: lerp(color0b, color1b, t),
    });
  }

  static parseHex = parseHexColor;
  static parseRGB255 = parseRGB255Color;
  static parseRGB01 = parseRGB01Color;
  static parseHSV = parseHSVColor;
}

import * as colorConvert from "color-convert";

import { clamp } from "./utils/math";

export enum ColorInputType {
  RGB255 = "rgb255",
  RGB01 = "rgb01",
  HEX = "hex",
  HSV = "hsv",
  HSL = "hsl",
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

export class Color {
  a: number = 1;
  input: ColorInput;
  private conversionInput: String | Array<number>;
  private colorConvertFunction: any;

  constructor(color: ColorInput = {}) {
    if (color.type == ColorInputType.RGB255) {
      this.conversionInput = [
        clamp(color.r || 0, 0, 255),
        clamp(color.g || 0, 0, 255),
        clamp(color.b || 0, 0, 255),
      ];
      this.colorConvertFunction = colorConvert.rgb;
    } else if (color.type == ColorInputType.RGB01) {
      this.conversionInput = [
        clamp(Math.round((color.r || 0) * 255), 0, 255),
        clamp(Math.round((color.g || 0) * 255), 0, 255),
        clamp(Math.round((color.b || 0) * 255), 0, 255),
      ];
      this.colorConvertFunction = colorConvert.rgb;
    } else if (color.type == ColorInputType.HEX) {
      this.conversionInput = color.hex || "#000000";
      this.colorConvertFunction = colorConvert.hex;
    } else if (color.type == ColorInputType.HSV) {
      this.conversionInput = [color.h || 0, color.s || 0, color.v || 0];
      this.colorConvertFunction = colorConvert.hsv;
    } else if (color.type == ColorInputType.HSL) {
      this.conversionInput = [color.h || 0, color.s || 0, color.l || 0];
      this.colorConvertFunction = colorConvert.hsl;
    } else if (color.type == ColorInputType.LCH) {
      this.conversionInput = [color.l || 0, color.c || 0, color.h || 0];
      this.colorConvertFunction = colorConvert.lch;
    } else {
      // Assume black color by default.
      color = { type: ColorInputType.RGB255, ...color };
      this.conversionInput = [0, 0, 0];
      this.colorConvertFunction = colorConvert.rgb;
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
    return this.colorConvertFunction.rgb(this.conversionInput);
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
    return this.colorConvertFunction.hex(this.conversionInput);
  }

  getHSV(raw: boolean = true): number[] {
    if (this.input.type === ColorInputType.HSV) {
      const output = [this.input.h || 0, this.input.s || 0, this.input.v || 0];
      return raw ? output : output.map((x) => Math.round(x));
    }
    if (raw) {
      return this.colorConvertFunction.hsv.raw(this.conversionInput);
    }
    return this.colorConvertFunction.hsv(this.conversionInput);
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
      return this.colorConvertFunction.hsl.raw(this.conversionInput);
    }
    return this.colorConvertFunction.hsl(this.conversionInput);
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
      return this.colorConvertFunction.lch.raw(this.conversionInput);
    }
    return this.colorConvertFunction.lch(this.conversionInput);
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
}

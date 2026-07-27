import colorConvert from "color-convert";

import { clamp } from "./utils/math";

export enum ColorInputType {
  RGB255 = "rgb255",
  RGB01 = "rgb01",
  HEX = "hex",
  HSV = "hsv",
  HSL = "hsl",
  LCH = "lch",
}

export type ColorInput =
  | { type: ColorInputType.RGB255; r: number; g: number; b: number }
  | { type: ColorInputType.RGB01; r: number; g: number; b: number }
  | { type: ColorInputType.HEX; hex: string }
  | { type: ColorInputType.HSV; h: number; s: number; v: number }
  | { type: ColorInputType.HSL; h: number; s: number; l: number }
  | { type: ColorInputType.LCH; l: number; c: number; h: number };

type ColorModel = "rgb" | "hex" | "hsv" | "hsl" | "lch";

interface ConverterFunction {
  (input: string | [number, number, number]): unknown;
  raw?: (input: string | [number, number, number]) => unknown;
}

function convertColor<T>(
  fromModel: ColorModel,
  toModel: ColorModel,
  input: string | [number, number, number],
  raw: boolean = false,
): T {
  const modelConverters = colorConvert[fromModel] as unknown as Record<
    string,
    ConverterFunction
  >;
  const fn = modelConverters[toModel];
  if (raw && fn.raw) {
    return fn.raw(input) as T;
  }
  return fn(input) as T;
}

export class Color {
  a: number = 1;
  input: ColorInput;
  private conversionInput!: string | [number, number, number];

  constructor(
    color: ColorInput = {
      type: ColorInputType.RGB255,
      r: 0,
      g: 0,
      b: 0,
    },
  ) {
    if (color.type === ColorInputType.RGB255) {
      this.conversionInput = [
        clamp(color.r, 0, 255),
        clamp(color.g, 0, 255),
        clamp(color.b, 0, 255),
      ];
    } else if (color.type === ColorInputType.RGB01) {
      this.conversionInput = [
        clamp(Math.round(color.r * 255), 0, 255),
        clamp(Math.round(color.g * 255), 0, 255),
        clamp(Math.round(color.b * 255), 0, 255),
      ];
    } else if (color.type === ColorInputType.HEX) {
      this.conversionInput = color.hex;
    } else if (color.type === ColorInputType.HSV) {
      this.conversionInput = [color.h, color.s, color.v];
    } else if (color.type === ColorInputType.HSL) {
      this.conversionInput = [color.h, color.s, color.l];
    } else if (color.type === ColorInputType.LCH) {
      this.conversionInput = [color.l, color.c, color.h];
    }
    // ColorInput is an exhaustive discriminated union — every case is covered above.
    this.input = color;
    Object.freeze(this);
  }

  private get model(): ColorModel {
    switch (this.input.type) {
      case ColorInputType.HEX:
        return "hex";
      case ColorInputType.HSV:
        return "hsv";
      case ColorInputType.HSL:
        return "hsl";
      case ColorInputType.LCH:
        return "lch";
      case ColorInputType.RGB255:
      case ColorInputType.RGB01:
      default:
        return "rgb";
    }
  }

  getRGB255(): [number, number, number] {
    const input = this.input;
    if (input.type === ColorInputType.RGB255) {
      return [input.r, input.g, input.b];
    }
    if (input.type === ColorInputType.RGB01) {
      return [
        Math.round(input.r * 255),
        Math.round(input.g * 255),
        Math.round(input.b * 255),
      ];
    }
    return convertColor<[number, number, number]>(
      this.model,
      "rgb",
      this.conversionInput,
    );
  }

  getRGB01(): [number, number, number] {
    const input = this.input;
    if (input.type === ColorInputType.RGB255) {
      return [input.r / 255, input.g / 255, input.b / 255];
    }
    if (input.type === ColorInputType.RGB01) {
      return [input.r, input.g, input.b];
    }
    return this.getRGB255().map((x) => x / 255) as [number, number, number];
  }

  getHex(): string {
    const input = this.input;
    if (input.type === ColorInputType.HEX) {
      return input.hex;
    }
    return convertColor<string>(this.model, "hex", this.conversionInput);
  }

  getHSV(raw: boolean = true): number[] {
    const input = this.input;
    if (input.type === ColorInputType.HSV) {
      const output = [input.h, input.s, input.v];
      return raw ? output : output.map((x) => Math.round(x));
    }
    return convertColor<number[]>(this.model, "hsv", this.conversionInput, raw);
  }

  getHSL(raw: boolean = true): number[] {
    const input = this.input;
    if (input.type === ColorInputType.HSL) {
      const hslArray = [input.h, input.s, input.l];
      return raw ? hslArray : hslArray.map((x) => Math.round(x));
    }
    return convertColor<number[]>(this.model, "hsl", this.conversionInput, raw);
  }

  getLCH(raw: boolean = true): number[] {
    const input = this.input;
    if (input.type === ColorInputType.LCH) {
      const lchArray = [input.l, input.c, input.h];
      return raw ? lchArray : lchArray.map((x) => Math.round(x));
    }
    return convertColor<number[]>(this.model, "lch", this.conversionInput, raw);
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

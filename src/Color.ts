import clamp from "clamp";
import lerp from "lerp";
import colorConvert from "color-convert";

export default class Color {
  r: number = 0;
  g: number = 0;
  b: number = 0;
  a: number = 1;
  input: any;

  constructor(color: any) {
    if (color == null) {
      color = {};
    }
    if (color.type == "rgb255") {
      this.r = clamp(color.r / 255, 0, 1);
      this.g = clamp(color.g / 255, 0, 1);
      this.b = clamp(color.b / 255, 0, 1);
      if (color.a != null) {
        this.a = clamp(color.a / 255, 0, 1);
      } else {
        this.a = 1;
      }
    } else if (color.type == "rgb01") {
      this.r = clamp(color.r, 0, 1);
      this.g = clamp(color.g, 0, 1);
      this.b = clamp(color.b, 0, 1);
      if (color.a != null) {
        this.a = clamp(color.a, 0, 1);
      } else {
        this.a = 1;
      }
    } else if (color.type == "hex") {
      // TODO: Write my own implementation to handle alpha
      let rgb255Color = colorConvert.hex.rgb(color.hex);
      this.r = rgb255Color[0] / 255;
      this.g = rgb255Color[1] / 255;
      this.b = rgb255Color[2] / 255;
    } else if (color.type == "hsv") {
      let newColor = colorConvert.hsv.rgb([color.h, color.s, color.v]);
      this.r = newColor[0] / 255;
      this.g = newColor[1] / 255;
      this.b = newColor[2] / 255;
    } else if (color.type == "hsl") {
      let newColor = colorConvert.hsl.rgb([color.h, color.s, color.l]);
      this.r = newColor[0] / 255;
      this.g = newColor[1] / 255;
      this.b = newColor[2] / 255;
    } else if (color.type == "lch") {
      let newColor = colorConvert.lch.rgb([color.l, color.c, color.h]);
      this.r = newColor[0] / 255;
      this.g = newColor[1] / 255;
      this.b = newColor[2] / 255;
    }
    this.input = color;
    Object.freeze(this);
  }

  getRGB255(): [number, number, number] {
    return [
      clamp(Math.round(this.r * 255), 0, 255),
      clamp(Math.round(this.g * 255), 0, 255),
      clamp(Math.round(this.b * 255), 0, 255),
    ];
  }

  getRGB01() {
    return [
      this.r, this.g, this.b, this.a
    ];
  }

  getHex() {
    return colorConvert.rgb.hex(this.getRGB255());
  }

  getHSV() {
    if (this.input.type === "hsv") {
      // Use the original input values to avoid rounding errors.
      return [this.input.h, this.input.s, this.input.v];
    }
    return colorConvert.rgb.hsv(this.getRGB255());
  }

  getHSL() {
    return colorConvert.rgb.hsl(this.getRGB255());
  }

  getLCH() {
    return colorConvert.rgb.lch(this.getRGB255());
  }

  toCSS() {
    return `rgba(${this.getRGB255().join(", ")})`;
  }

  static fromRGB255Array(arr: number[]) {
    return new Color({
      type: "rgb255",
      r: arr[0],
      g: arr[1],
      b: arr[2]
    });
  }

  static lerp(color0: Color, color1: Color, t: number, mode: string = "rgb") {
    if (mode === "hsv") {
      let hsv0 = color0.getHSV();
      let hsv1 = color1.getHSV();
      return new Color({
        type: "hsv",
        h: lerp(hsv0[0], hsv1[0], t),
        s: lerp(hsv0[1], hsv1[1], t),
        v: lerp(hsv0[2], hsv1[2], t)
      });
    } else if (mode === "hsl") {
      const hsl0 = color0.getHSL();
      const hsl1 = color1.getHSL();
      const flipHueDirection = (Math.abs(hsl0[0] - hsl1[0]) > 180);
      const hsl0Updated = hsl0[0] + 360 * Number(flipHueDirection && hsl0[0] < hsl1[0]);
      const hsl1Updated = hsl1[0] + 360 * Number(flipHueDirection && hsl1[0] < hsl0[0]);
      const intermediateHue = lerp(
        hsl0Updated, hsl1Updated, t);
      return new Color({
        type: "hsl",
        h: intermediateHue,
        s: lerp(hsl0[1], hsl1[1], t),
        l: lerp(hsl0[2], hsl1[2], t)
      });
    } else if (mode === "hsl_flip") {
      const hsl0 = color0.getHSL();
      const hsl1 = color1.getHSL();
      const flipHueDirection = (Math.abs(hsl0[0] - hsl1[0]) > 180);
      const hsl0Updated = hsl0[0] + 360 * Number(!flipHueDirection && hsl0[0] < hsl1[0]);
      const hsl1Updated = hsl1[0] + 360 * Number(!flipHueDirection && hsl1[0] < hsl0[0]);
      const intermediateHue = lerp(
        hsl0Updated, hsl1Updated, t);
      return new Color({
        type: "hsl",
        h: intermediateHue,
        s: lerp(hsl0[1], hsl1[1], t),
        l: lerp(hsl0[2], hsl1[2], t)
      });
    } else if (mode == "lch") {
      let lch0 = color0.getLCH();
      let lch1 = color1.getLCH();
      return new Color({
        type: "lch",
        l: lerp(lch0[0], lch1[0], t),
        c: lerp(lch0[1], lch1[1], t),
        h: lerp(lch0[2], lch1[2], t)
      });
    }
    return new Color({
      type: "rgb01",
      r: lerp(color0.r, color1.r, t),
      g: lerp(color0.g, color1.g, t),
      b: lerp(color0.b, color1.b, t),
      a: lerp(color0.a, color1.a, t)
    });
  }
}

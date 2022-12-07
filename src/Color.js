const colorConvert = require("color-convert");
Math.clamp = require("clamp");
Math.lerp = require("lerp");

export default class Color {
  constructor(color) {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 1;
    if (color == null) {
      color = {};
    }
    let colorType = "rgb255";
    if (color.type != null) {
      colorType = color.type;
    }

    if (color.type == "rgb255") {
      this.r = Math.clamp(color.r / 255, 0, 1);
      this.g = Math.clamp(color.g / 255, 0, 1);
      this.b = Math.clamp(color.b / 255, 0, 1);
      if (color.a != null) {
        this.a = Math.clamp(color.a / 255, 0, 1);
      } else {
        this.a = 1;
      }
    } else if (color.type == "rgb01") {
      this.r = Math.clamp(color.r, 0, 1);
      this.g = Math.clamp(color.g, 0, 1);
      this.b = Math.clamp(color.b, 0, 1);
      if (color.a != null) {
        this.a = Math.clamp(color.a, 0, 1);
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

    Object.freeze(this);
  }

  getRGB255() {
    return [
      Math.clamp(Math.floor(this.r * 256), 0, 255),
      Math.clamp(Math.floor(this.g * 256), 0, 255),
      Math.clamp(Math.floor(this.b * 256), 0, 255),
      Math.clamp(Math.floor(this.a * 256), 0, 255),
    ];
  }

  getRGB01() {
    return [
      this.r, this.g, this.b, this.a
    ];
  }

  getHex() {
    return colorConvert.rgb.hex(...this.getRGB255());
  }

  getHSV() {
    return colorConvert.rgb.hsv(...this.getRGB255());
  }

  getHSL() {
    return colorConvert.rgb.hsl(...this.getRGB255());
  }

  getLCH() {
    return colorConvert.rgb.lch(...this.getRGB255());
  }

  toCSS() {
    return `rgba(${this.getRGB255().join(", ")})`;
  }

  static fromRGB255Array(arr) {
    return new Color({
      type: "rgb255",
      r: arr[0],
      g: arr[1],
      b: arr[2]
    });
  }

  static lerp(color0, color1, t, mode = "rgb") {
    if (mode === "rgb") {
      return new Color({
        type: "rgb01",
        r: Math.lerp(color0.r, color1.r, t),
        g: Math.lerp(color0.g, color1.g, t),
        b: Math.lerp(color0.b, color1.b, t),
        a: Math.lerp(color0.a, color1.a, t)
      });
    } else if (mode === "hsv") {
      let hsv0 = color0.getHSV();
      let hsv1 = color1.getHSV();
      return new Color({
        type: "hsv",
        h: Math.lerp(hsv0[0], hsv1[0], t),
        s: Math.lerp(hsv0[1], hsv1[1], t),
        v: Math.lerp(hsv0[2], hsv1[2], t)
      });
    } else if (mode === "hsl") {
      const hsl0 = color0.getHSL();
      const hsl1 = color1.getHSL();
      const flipHueDirection = (Math.abs(hsl0[0] - hsl1[0]) > 180);
      const intermediateHue = Math.lerp(
        hsl0[0] + 360 * (flipHueDirection && hsl0[0] < hsl1[0]),
        hsl1[0 + 360 * (flipHueDirection && hsl1[0] < hsl0[0])], t);
      return new Color({
        type: "hsl",
        h: intermediateHue,
        s: Math.lerp(hsl0[1], hsl1[1], t),
        l: Math.lerp(hsl0[2], hsl1[2], t)
      });
    } else if (mode === "hsl_flip") {
      const hsl0 = color0.getHSL();
      const hsl1 = color1.getHSL();
      const flipHueDirection = (Math.abs(hsl0[0] - hsl1[0]) > 180);
      const intermediateHue = Math.lerp(
        hsl0[0] + 360 * (!flipHueDirection && hsl0[0] < hsl1[0]),
        hsl1[0 + 360 * (!flipHueDirection && hsl1[0] < hsl0[0])], t);
      return new Color({
        type: "hsl",
        h: intermediateHue,
        s: Math.lerp(hsl0[1], hsl1[1], t),
        l: Math.lerp(hsl0[2], hsl1[2], t)
      });
    } else if (mode == "lch") {
      let lch0 = color0.getLCH();
      let lch1 = color1.getLCH();
      return new Color({
        type: "lch",
        l: Math.lerp(lch0[0], lch1[0], t),
        c: Math.lerp(lch0[1], lch1[1], t),
        h: Math.lerp(lch0[2], lch1[2], t)
      });
    }
  }
}

const colorConvert = require("color-convert");
Math.clamp = require("clamp");

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

  static fromRGB255Array(arr) {
    return new Color({
      type: "rgb255",
      r: arr[0],
      g: arr[1],
      b: arr[2]
    });
  }
}

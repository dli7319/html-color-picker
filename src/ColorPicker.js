import Color from "./Color.js";
Math.clamp = require("clamp");

export default class ColorPicker {
  constructor() {
    this.imageInput = document.getElementById("image-input");
    this.hexInput = document.getElementById("hex-input");
    this.rgb255Input = document.getElementById("rgb255-input");
    this.rgb01Input = document.getElementById("rgb01-input");
    this.hsvInput = document.getElementById("hsv-input");
    this.documentBody = document.getElementById("doc-body");
    this.coordinatesContainer = document.getElementById(
      "coordinates-container"
    );
    this.imagePreviewCanvas = document.getElementById("image-preview-canvas");
    this.colorBar = document.getElementById("color-bar");
    this.colorGrad = document.getElementById("color-grad-1");
    this.colorGrad2 = document.getElementById("color-grad-2");
    this.colorGradCircle = document.getElementById("color-grad-circle");
    this.colorGradHue = 0;
    this.colorGradSaturation = 0;
    this.colorGradValue = 100;
    this.updateColorGrad();
  }

  setColor(newColor, options = {}) {
    if (!options.silent) {
      console.log("Changing color to", newColor);
    }
    if (this.rgb255Input && !options.ignoreRGB255) {
      this.rgb255Input.value = newColor
        .getRGB255()
        .splice(0, 3)
        .toString();
    }
    if (this.rgb01Input && !options.ignoreRGB01) {
      this.rgb01Input.value = newColor
        .getRGB01()
        .splice(0, 3)
        .map(x => x.toFixed(3))
        .toString();
    }
    if (this.hexInput && !options.ignoreHex) {
      this.hexInput.value = "#" + newColor.getHex();
    }
    if (this.hsvInput && !options.ignoreHSV) {
      this.hsvInput.value = newColor.getHSV().toString();
    }
    if (this.documentBody) {
      this.documentBody.style.background = "#" + newColor.getHex();
    }
    if (this.coordinatesContainer && !options.keepCoordinates) {
      this.coordinatesContainer.innerHTML = "";
    }
  }

  attachListeners() {
    const imageInput = this.imageInput;
    const hexInput = this.hexInput;
    const rgb255Input = this.rgb255Input;
    const rgb01Input = this.rgb01Input;
    const hsvInput = this.hsvInput;
    const documentBody = this.documentBody;
    const coordinatesContainer = this.coordinatesContainer;
    const imagePreviewCanvas = this.imagePreviewCanvas;
    const colorBar = this.colorBar;
    const colorGrad = this.colorGrad;
    const colorGrad2 = this.colorGrad2;

    if (imageInput) {
      imageInput.addEventListener("change", () => {
        if (imageInput.files.length !== 1) {
          return;
        }
        let image = imageInput.files[0];
        let reader = new FileReader();
        let img = new Image();
        img.onload = function() {
          if (imagePreviewCanvas) {
            imagePreviewCanvas.width = img.width;
            imagePreviewCanvas.height = img.height;
            let ctx = imagePreviewCanvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
          }
        };
        reader.onload = function(e) {
          img.src = e.target.result;
        };
        reader.readAsDataURL(image);
      });
    }

    if (imagePreviewCanvas) {
      imagePreviewCanvas.addEventListener("mousemove", e => {
        let mousePos = {
          x: e.offsetX / imagePreviewCanvas.clientWidth,
          y: e.offsetY / imagePreviewCanvas.clientHeight
        };
        let intCoordinates = {
          x: Math.clamp(
            Math.floor(
              mousePos.x * imagePreviewCanvas.width,
              0,
              imagePreviewCanvas.width - 1
            )
          ),
          y: Math.clamp(
            Math.floor(
              mousePos.y * imagePreviewCanvas.height,
              0,
              imagePreviewCanvas.height - 1
            )
          )
        };
        if (coordinatesContainer) {
          coordinatesContainer.innerHTML = "";
          coordinatesContainer.appendChild(
            document.createTextNode(
              `(${mousePos.x.toFixed(3)},${mousePos.y.toFixed(3)})`
            )
          );
          coordinatesContainer.appendChild(document.createElement("br"));
          coordinatesContainer.appendChild(
            document.createTextNode(`(${intCoordinates.x},${intCoordinates.y})`)
          );
        }
        let ctx = imagePreviewCanvas.getContext("2d");
        let colors = ctx.getImageData(intCoordinates.x, intCoordinates.y, 1, 1);
        this.setColor(Array.from(colors.data.slice(0, 3)), {
          keepCoordinates: true
        });
      });
    }

    if (hexInput) {
      hexInput.addEventListener("input", () => {
        let value = hexInput.value;
        let hexRegex = /^#?([0-9a-zA-Z]{3}(?:[0-9a-zA-Z]{3})?)$/;
        let match = hexRegex.exec(value);
        if (match && match.length == 2) {
          console.log(`Found Hex: ${match[1]}`);
          let color = new Color({
            type: "hex",
            hex: match[1]
          });
          this.setColor(color, {
            ignoreHex: true
          });
        }
      });
    }

    if (rgb255Input) {
      rgb255Input.addEventListener("input", () => {
        let value = rgb255Input.value.trim().replace(/\s/g, ",");
        let rgb255Regex = /^(\d{1,3}),+(\d{1,3}),+(\d{1,3})$/;
        let match = rgb255Regex.exec(value);
        if (match && match.length == 4) {
          let newColor = match.slice(1, 4).map(x => parseInt(x));
          let inRange = newColor
            .map(x => 0 <= x && x <= 255)
            .reduce((acc, x) => acc && x);
          if (inRange) {
            console.log(`Found RGB255: ${match.slice(1, 4)}`);
            let color = new Color({
              type: "rgb255",
              r: newColor[0],
              g: newColor[1],
              b: newColor[2]
            });
            this.setColor(color, {
              ignoreRGB255: true
            });
          }
        }
      });
    }

    if (rgb01Input) {
      rgb01Input.addEventListener("input", () => {
        let value = rgb01Input.value.trim().replace(/\s/g, ",");
        let rgb01Regex = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;
        let match = rgb01Regex.exec(value);
        if (match && match.length == 4) {
          let newColor = match.slice(1, 4).map(x => parseFloat(x));
          let inRange = newColor
            .map(x => 0 <= x && x <= 1)
            .reduce((acc, x) => acc && x);
          if (inRange) {
            console.log(`Found RGB01: ${newColor.toString()}`);
            let color = new Color({
              type: "rgb01",
              r: newColor[0],
              g: newColor[1],
              b: newColor[2]
            });
            this.setColor(color, {
              ignoreRGB01: true
            });
          }
        }
      });
    }

    if (hsvInput) {
      hsvInput.addEventListener("input", () => {
        let value = hsvInput.value.trim().replace(/\s/g, ",");
        let rgb01Regex = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;
        let match = rgb01Regex.exec(value);
        if (match && match.length == 4) {
          let newColor = match.slice(1, 4).map(x => parseInt(x));
          console.log(`Found HSV: ${newColor.toString()}`);
          let color = new Color({
            type: "hsv",
            h: Math.clamp(newColor[0], 0, 360),
            s: Math.clamp(newColor[1], 0, 100),
            v: Math.clamp(newColor[2], 0, 100)
          });
          this.setColor(color, {
            ignoreHSV: true
          });
        }
      });
    }

    if (colorBar) {
      let mousedown = false;
      colorBar.addEventListener("mousedown", e => {
        mousedown = true;
        const bbox = colorBar.getBoundingClientRect();
        this.colorGradHue =
          360 *
          Math.clamp((e.clientX - bbox.left) / colorBar.clientWidth, 0, 1);
        this.updateColorGrad();
      });
      colorBar.addEventListener("mousemove", e => {
        if (mousedown) {
          const bbox = colorBar.getBoundingClientRect();
          this.colorGradHue =
            360 *
            Math.clamp((e.clientX - bbox.left) / colorBar.clientWidth, 0, 1);
          this.updateColorGrad();
        }
      });
      document.addEventListener("mouseup", e => {
        if (mousedown) {
          mousedown = false;
        }
      });
    }

    if (colorGrad2) {
      let mousedown = false;
      colorGrad2.addEventListener("mousedown", e => {
        mousedown = true;
        const bbox = colorGrad2.getBoundingClientRect();
        this.colorGradSaturation =
          100 *
          Math.clamp((e.clientX - bbox.left) / colorGrad2.clientWidth, 0, 1);
        this.colorGradValue =
          100 *
          Math.clamp(
            1 - (e.clientY - bbox.top) / colorGrad2.clientHeight,
            0,
            1
          );
        this.updateColorGrad();
      });
      colorGrad2.addEventListener("mousemove", e => {
        if (mousedown) {
          const bbox = colorGrad2.getBoundingClientRect();
          this.colorGradSaturation =
            100 *
            Math.clamp((e.clientX - bbox.left) / colorGrad2.clientWidth, 0, 1);
          this.colorGradValue =
            100 *
            Math.clamp(
              1 - (e.clientY - bbox.top) / colorGrad2.clientHeight,
              0,
              1
            );
          this.updateColorGrad();
        }
      });
      document.addEventListener("mouseup", e => {
        if (mousedown) {
          mousedown = false;
        }
      });
    }
  }

  updateColorGrad() {
    const colorGrad = this.colorGrad;
    const hue = this.colorGradHue;
    const saturation = this.colorGradSaturation;
    const value = this.colorGradValue;
    const colorGradCircle = this.colorGradCircle;
    if (colorGrad) {
      const color = new Color({
        type: "hsv",
        h: hue,
        s: 100,
        v: 100
      });
      const hex = color.getHex();
      colorGrad.style.background = `linear-gradient(to right, #FFF 0%, #${hex} 100%)`;
    }

    const newColor = new Color({
      type: "hsv",
      h: hue,
      s: saturation,
      v: value
    });
    this.setColor(newColor, {
      silent: true
    });

    if (colorGradCircle) {
      const totalHeight = colorGrad.clientHeight;
      const totalWidth = colorGrad.clientWidth;
      const offset = colorGradCircle.clientWidth / 2;
      colorGradCircle.style.top =
        String((1.0 - value / 100) * totalHeight - offset) + "px";
      colorGradCircle.style.left =
        String((saturation / 100) * totalWidth - offset) + "px";
      colorGradCircle.style.backgroundColor = `#${newColor.getHex()}`;
      if (value < 50) {
        colorGradCircle.style.borderColor = "white";
      } else {
        colorGradCircle.style.borderColor = "black";
      }
    }
  }
}

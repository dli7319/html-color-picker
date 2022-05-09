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
    this.imagePreviewOverlayCanvas = document.getElementById("image-preview-overlay-canvas");
    this.imagePreviewOverlayColorInputs = document.querySelectorAll('input[name="image-preview-overlay-color"]');
    this.colorBar = document.getElementById("color-bar");
    this.colorGrad = document.getElementById("color-grad-1");
    this.colorGrad2 = document.getElementById("color-grad-2");
    this.colorGradCircle = document.getElementById("color-grad-circle");
    this.colorBarPointer = document.getElementById("color-bar-pointer");
    this.colorBarPointer3 = document.getElementById("color-bar-pointer3");
    this.colorBarPointer4 = document.getElementById("color-bar-pointer4");
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
      this.coordinatesContainer.innerHTML = "(0, 0)<br>(0, 0)";
    }
    if (options.updateColorGrad || options.updateColorGrad == null) {
      this.updateColorGrad(newColor, { setColor: false });
    }
  }

  attachListeners() {
    const imageInput = this.imageInput;
    const hexInput = this.hexInput;
    const rgb255Input = this.rgb255Input;
    const rgb01Input = this.rgb01Input;
    const hsvInput = this.hsvInput;
    const coordinatesContainer = this.coordinatesContainer;
    const imagePreviewCanvas = this.imagePreviewCanvas;
    const imagePreviewOverlayCanvas = this.imagePreviewOverlayCanvas;
    const colorBar = this.colorBar;
    const colorGrad2 = this.colorGrad2;

    if (imageInput) {
      imageInput.addEventListener("change", () => {
        if (imageInput.files.length !== 1) {
          return;
        }
        let image = imageInput.files[0];
        let reader = new FileReader();
        let img = new Image();
        img.onload = function () {
          if (imagePreviewCanvas) {
            imagePreviewCanvas.width = img.width;
            imagePreviewCanvas.height = img.height;
            let ctx = imagePreviewCanvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            if (imagePreviewOverlayCanvas) {
              imagePreviewOverlayCanvas.width = img.width;
              imagePreviewOverlayCanvas.height = img.height;
            }
          }
        };
        reader.onload = function (e) {
          img.src = e.target.result;
        };
        reader.readAsDataURL(image);
      });
    }

    if (imagePreviewOverlayCanvas) {
      imagePreviewOverlayCanvas.addEventListener("mousemove", e => {
        const mousedown = (e.buttons && e.buttons | 1) || e.which === 1;
        if (!mousedown) return;
        let mousePos = {
          x: e.offsetX / imagePreviewOverlayCanvas.clientWidth,
          y: e.offsetY / imagePreviewOverlayCanvas.clientHeight
        };
        let intCoordinates = {
          x: Math.clamp(
            Math.floor(
              mousePos.x * imagePreviewOverlayCanvas.width,
              0,
              imagePreviewOverlayCanvas.width - 1
            )
          ),
          y: Math.clamp(
            Math.floor(
              mousePos.y * imagePreviewOverlayCanvas.height,
              0,
              imagePreviewOverlayCanvas.height - 1
            )
          )
        };
        this.updateFromImageOverlay(intCoordinates);
      });
      imagePreviewOverlayCanvas.addEventListener("click", e => {
        const mousedown = (e.buttons && e.buttons | 1) || e.which === 1;
        if (!mousedown) return;
        let mousePos = {
          x: e.offsetX / imagePreviewOverlayCanvas.clientWidth,
          y: e.offsetY / imagePreviewOverlayCanvas.clientHeight
        };
        let intCoordinates = {
          x: Math.clamp(
            Math.floor(
              mousePos.x * imagePreviewOverlayCanvas.width,
              0,
              imagePreviewOverlayCanvas.width - 1
            )
          ),
          y: Math.clamp(
            Math.floor(
              mousePos.y * imagePreviewOverlayCanvas.height,
              0,
              imagePreviewOverlayCanvas.height - 1
            )
          )
        };
        this.updateFromImageOverlay(intCoordinates);
      });
    }

    if (hexInput) {
      hexInput.addEventListener("input", () => {
        const value = hexInput.value;
        const hexRegex = /^#?([0-9a-zA-Z]{3}(?:[0-9a-zA-Z]{3})?)$/;
        const match = hexRegex.exec(value);
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
        const value = rgb255Input.value.trim().replace(/\s/g, ",");
        const rgb255Regex = /^(\d{1,3}),+(\d{1,3}),+(\d{1,3})$/;
        const match = rgb255Regex.exec(value);
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
        const value = rgb01Input.value.trim().replace(/\s/g, ",");
        const rgb01Regex = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;
        const match = rgb01Regex.exec(value);
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
        const value = hsvInput.value.trim().replace(/\s/g, ",");
        const rgb01Regex = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;
        const match = rgb01Regex.exec(value);
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

  updateFromImageOverlay(intCoordinates) {
    const coordinatesContainer = this.coordinatesContainer;
    const imagePreviewCanvas = this.imagePreviewCanvas;
    const imagePreviewOverlayCanvas = this.imagePreviewOverlayCanvas;
    if (coordinatesContainer) {
      const floatCoordinates = {
        x: intCoordinates.x / imagePreviewOverlayCanvas.width,
        y: intCoordinates.y / imagePreviewOverlayCanvas.height
      }
      coordinatesContainer.innerHTML = "";
      coordinatesContainer.appendChild(
        document.createTextNode(
          `(${floatCoordinates.x.toFixed(3)}, ${floatCoordinates.y.toFixed(3)})`
        )
      );
      coordinatesContainer.appendChild(document.createElement("br"));
      coordinatesContainer.appendChild(
        document.createTextNode(
          `(${intCoordinates.x}, ${intCoordinates.y})`
        )
      );
    }
    const ctx = imagePreviewCanvas.getContext("2d");
    const colors = ctx.getImageData(
      intCoordinates.x,
      intCoordinates.y,
      1, 1);
    this.setColor(Color.fromRGB255Array(colors.data), {
      keepCoordinates: true
    });

    const overlayColor = Array.from(this.imagePreviewOverlayColorInputs).filter(x => x.checked)[0].value;
    const minWidthHeight = Math.min(imagePreviewOverlayCanvas.width, imagePreviewOverlayCanvas.height);
    const radius = 0.05 * minWidthHeight;
    const overlayCtx = imagePreviewOverlayCanvas.getContext("2d");
    overlayCtx.clearRect(0, 0, imagePreviewOverlayCanvas.width, imagePreviewOverlayCanvas.height);
    overlayCtx.beginPath();
    overlayCtx.arc(
      intCoordinates.x,
      intCoordinates.y,
      radius, 0, 2 * Math.PI);
    overlayCtx.strokeStyle = overlayColor;
    overlayCtx.lineWidth = 0.01 * minWidthHeight;
    overlayCtx.stroke();
  }

  updateColorGrad(newColor, options = {}) {
    const colorGrad = this.colorGrad;
    let hue, saturation, value;
    if (newColor == null) {
      newColor = new Color({
        type: "hsv",
        h: this.colorGradHue,
        s: this.colorGradSaturation,
        v: this.colorGradValue
      });
      [hue, saturation, value] = [
        this.colorGradHue,
        this.colorGradSaturation,
        this.colorGradValue
      ];
    } else {
      [hue, saturation, value] = newColor.getHSV();
    }

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

    if (options.setColor == null || options.setColor) {
      this.setColor(newColor, {
        silent: true,
        updateColorGrad: false
      });
    }

    if (
      options.updateColorGradCircle ||
      options.updateColorGradCircle == null
    ) {
      this.updateColorGradCircle(newColor, value, saturation);
    }

    if (
      options.updateColorBarPointer ||
      options.updateColorBarPointer == null
    ) {
      this.updateHuePointer(hue);
    }
  }

  updateColorGradCircle(newColor, value, saturation) {
    if (newColor == null) {
      newColor = new Color({
        type: "hsv",
        h: this.colorGradHue,
        s: this.colorGradSaturation,
        v: this.colorGradValue
      });
    }
    const colorGrad = this.colorGrad;
    const colorGradCircle = this.colorGradCircle;
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

  updateHuePointer(hue) {
    const colorBarPointer = this.colorBarPointer;
    const colorBarPointer3 = this.colorBarPointer3;
    const colorBarPointer4 = this.colorBarPointer4;
    if (colorBarPointer) {
      const color = new Color({
        type: "hsv",
        h: hue,
        s: 100,
        v: 100
      });
      const newColorHex = `#${color.getHex()}`;
      console.log("New color hex", newColorHex);
      colorBarPointer.style.left = (100 * hue) / 360 + "%";
      colorBarPointer3.style.borderBottomColor = newColorHex;
      colorBarPointer4.style.borderColor = newColorHex;
    }
  }
}

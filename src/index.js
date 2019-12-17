const colorConvert = require("color-convert");
window.colorConvert = colorConvert;
Math.clamp = require("clamp");

let imageInput = document.getElementById("image-input");
let hexInput = document.getElementById("hex-input");
let rgb255Input = document.getElementById("rgb255-input");
let rgb01Input = document.getElementById("rgb01-input");
let hsvInput = document.getElementById("hsv-input");
let documentBody = document.getElementById("doc-body");
let coordinatesContainer = document.getElementById("coordinates-container");
let imagePreviewCanvas = document.getElementById("image-preview-canvas");
attachListeners();

function setColor(newColor, options = {}) {
  console.log("Changing color to", newColor);
  let hexValue = colorConvert.rgb.hex(...newColor);
  if (rgb255Input && !options.ignoreRGB255) {
    rgb255Input.value = newColor.toString();
  }
  if (rgb01Input && !options.ignoreRGB01) {
    rgb01Input.value =
      `${(newColor[0] / 255).toFixed(3)},` +
      `${(newColor[1] / 255).toFixed(3)},` +
      `${(newColor[2] / 255).toFixed(3)}`;
  }
  if (hexInput && !options.ignoreHex) {
    hexInput.value = `#${hexValue}`;
  }
  if (hsvInput && !options.ignoreHSV) {
    hsvInput.value = colorConvert.rgb.hsv(newColor);
  }
  if (documentBody) {
    documentBody.style.background = `#${hexValue}`;
  }
  if (coordinatesContainer && !options.keepCoordinates) {
    coordinatesContainer.innerHTML = "";
  }
}

function attachListeners() {
  if (imageInput) {
    imageInput.addEventListener("change", function() {
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
    imagePreviewCanvas.addEventListener("mousemove", function(e) {
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
          document.createTextNode(`(${mousePos.x.toFixed(3)},${mousePos.y.toFixed(3)})`)
        );
        coordinatesContainer.appendChild(document.createElement("br"));
        coordinatesContainer.appendChild(
          document.createTextNode(`(${intCoordinates.x},${intCoordinates.y})`)
        );
      }
      let ctx = imagePreviewCanvas.getContext("2d");
      let colors = ctx.getImageData(intCoordinates.x, intCoordinates.y, 1, 1);
      setColor(Array.from(colors.data.slice(0, 3)), {keepCoordinates: true});
    });
  }

  if (hexInput) {
    hexInput.addEventListener("input", function() {
      let value = hexInput.value;
      let hexRegex = /^#?([0-9a-zA-Z]{3}(?:[0-9a-zA-Z]{3})?)$/;
      let match = hexRegex.exec(value);
      if (match && match.length == 2) {
        console.log(`Found Hex: ${match[1]}`);
        let color = colorConvert.hex.rgb(match[1]);
        setColor(color, {ignoreHex: true});
      }
    });
  }

  if (rgb255Input) {
    rgb255Input.addEventListener("input", function() {
      let value = rgb255Input.value.trim().replace(/\s/g, ",");
      let rgb255Regex = /^(\d{1,3}),+(\d{1,3}),+(\d{1,3})$/;
      let match = rgb255Regex.exec(value);
      if (match && match.length == 4) {
        let newColor = match.slice(1, 4).map(x => parseInt(x));
        let inRange = newColor
          .map(x => 0 <= x && x <= 255)
          .reduce((acc, x) => acc && x);
        if (inRange) {
          console.log(`Found RGB255: ${newColor}`);
          setColor(newColor, {ignoreRGB255: true});
        }
      }
    });
  }

  if (rgb01Input) {
    rgb01Input.addEventListener("input", function() {
      let value = rgb01Input.value.trim().replace(/\s/g, ",");
      let rgb01Regex = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;
      let match = rgb01Regex.exec(value);
      if (match && match.length == 4) {
        console.log(`Found RGB01: ${match[1]}, ${match[2]}, ${match[3]}`);
        let newColor = [
          Math.clamp(match[1] * 256, 0, 255),
          Math.clamp(match[2] * 256, 0, 255),
          Math.clamp(match[3] * 256, 0, 255)
        ];
        setColor(newColor, {ignoreRGB01: true});
      }
    });
  }
}

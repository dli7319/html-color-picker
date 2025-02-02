import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";

import { styles } from "./styles/ImageSampling";
import { bootstrap } from "./styles/Bootstrap";
import Color, { ColorInputType } from "./Color";
import { Coordinates } from "./Coordinates";
import { ColorPickerSetColorEvent } from "./ColorPickerSetColorEvent";

export enum OverlayColor {
  Transparent = "transparent",
  Black = "black",
  White = "white",
}

export enum OverlaySize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

const overlaySizeToRem = {
  [OverlaySize.Small]: "1rem",
  [OverlaySize.Medium]: "1.5rem",
  [OverlaySize.Large]: "3rem",
};

@customElement("image-sampling")
export class ImageSampling extends LitElement {
  static styles = [styles];

  @property({ attribute: false })
  coordinates: Coordinates = { x: 0, y: 0, width: 0, height: 0 };
  @property({ attribute: false })
  setCoordinates: (coordinates: Coordinates) => void = () => {};
  @property({ attribute: false })
  initialOverlayColor: OverlayColor = OverlayColor.Black;

  @state()
  overlayColor: OverlayColor = OverlayColor.Black;
  @state()
  overlaySize: OverlaySize = OverlaySize.Medium;
  @state()
  loadedImage = false;

  canvasRef: Ref<HTMLCanvasElement> = createRef();

  constructor() {
    super();
    this.overlayColor = this.initialOverlayColor;
  }

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  loadImage(e: Event) {
    const file = (e.currentTarget as HTMLInputElement).files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = this.canvasRef.value!;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
          }
          this.loadedImage = true;
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  sampleImage(e: Event) {
    if (e instanceof MouseEvent && e.buttons == 1) {
      const canvas = this.canvasRef.value!;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
        const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
        const imageData = ctx.getImageData(x, y, 1, 1);
        this.setColor(
          new Color({
            type: ColorInputType.RGB255,
            r: imageData.data[0],
            g: imageData.data[1],
            b: imageData.data[2],
          })
        );
        this.setCoordinates({
          x: x,
          y: y,
          width: canvas.width,
          height: canvas.height,
        });
      }
    }
  }

  selectOverlayColor(e: Event) {
    this.overlayColor = (e.currentTarget as HTMLSelectElement)
      .value as OverlayColor;
  }

  selectOverlaySize(e: Event) {
    this.overlaySize = (e.currentTarget as HTMLSelectElement)
      .value as OverlaySize;
  }

  render() {
    const xPercent = (this.coordinates.x / this.coordinates.width) * 100;
    const yPercent = (this.coordinates.y / this.coordinates.height) * 100;
    const overlayStyle = `
      border-color: ${this.overlayColor};
      top: calc(${yPercent}% - var(--circle-diameter) / 2);
      left: calc(${xPercent}% - var(--circle-diameter) / 2);
      --circle-diameter: ${overlaySizeToRem[this.overlaySize]};
    `;
    return html`
      ${bootstrap}
      <h5>Image Sampling</h5>
      <div>
        <input class="form-control" type="file" @change=${this.loadImage} />
      </div>
      <div class="d-flex flex-row">
        <div class="form-floating flex-grow-1">
          <select
            class="form-select"
            aria-label="Select Overlay Color"
            @change=${this.selectOverlayColor}
          >
            <option
              value=${OverlayColor.Transparent}
              .selected=${this.overlayColor == OverlayColor.Transparent}
            >
              None
            </option>
            <option
              value=${OverlayColor.Black}
              .selected=${this.overlayColor == OverlayColor.Black}
            >
              Black
            </option>
            <option
              value=${OverlayColor.White}
              .selected=${this.overlayColor == OverlayColor.White}
            >
              White
            </option>
          </select>
          <label>Overlay Color</label>
        </div>
        <div class="form-floating flex-grow-1">
          <select
            class="form-select"
            aria-label="Select Overlay Size"
            @change=${this.selectOverlaySize}
          >
            <option
              value=${OverlaySize.Small}
              .selected=${this.overlaySize == OverlaySize.Small}
            >
              Small
            </option>
            <option
              value=${OverlaySize.Medium}
              .selected=${this.overlaySize == OverlaySize.Medium}
            >
              Medium
            </option>
            <option
              value=${OverlaySize.Large}
              .selected=${this.overlaySize == OverlaySize.Large}
            >
              Large
            </option>
          </select>
          <label>Overlay Size</label>
        </div>
      </div>
      <div class="mt-1 image-preview-canvas-wrapper">
        <canvas
          class="image-preview-canvas"
          width="0"
          height="0"
          ${ref(this.canvasRef)}
          @mousedown=${this.sampleImage}
          @mousemove=${this.sampleImage}
        ></canvas>
        <div
          class="image-preview-overlay"
          ?hidden=${!this.loadedImage}
          style=${overlayStyle}
        ></div>
      </div>
    `;
  }
}

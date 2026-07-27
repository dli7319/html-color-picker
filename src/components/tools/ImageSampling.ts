import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";

import { styles } from "../../styles/ImageSampling.css";
import { tailwindStyles } from "../../styles/Tailwind";
import { Color, ColorInputType } from "../../lib/Color";
import { Coordinates } from "../../lib/Coordinates";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";
import { ColorPickerSetCoordinatesEvent } from "../../events/ColorPickerSetCoordinatesEvent";
import { DragController } from "../../controllers/DragController";

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
  static styles = [tailwindStyles, styles];

  @property({ attribute: false })
  coordinates: Coordinates = { x: 0, y: 0, width: 0, height: 0 };
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

  private lastSampledColor: Color = new Color();

  private samplePixel(e: MouseEvent) {
    const canvas = this.canvasRef.value!;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
      const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
      const imageData = ctx.getImageData(x, y, 1, 1);
      const color = new Color({
        type: ColorInputType.RGB255,
        r: imageData.data[0],
        g: imageData.data[1],
        b: imageData.data[2],
      });
      this.lastSampledColor = color;
      this.dispatchEvent(new ColorPickerSetColorEvent(color));
      this.dispatchEvent(
        new ColorPickerSetCoordinatesEvent({
          x,
          y,
          width: canvas.width,
          height: canvas.height,
        }),
      );
    }
  }

  private drag = new DragController(this, {
    onDragStart: (e: MouseEvent) => this.samplePixel(e),
    onDrag: (e: MouseEvent) => this.samplePixel(e),
    onDragEnd: () => {
      this.dispatchEvent(
        new ColorPickerCommitColorEvent(this.lastSampledColor),
      );
    },
  });

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
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Image Sampling</h5>
      <div class="mb-3">
        <input
          class="block w-full text-xs text-gray-800 bg-white/50 backdrop-blur-md rounded-lg cursor-pointer focus:outline-none file:mr-3 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-white/80 file:text-gray-800 hover:file:bg-white"
          type="file"
          @change=${this.loadImage}
        />
      </div>
      <div class="flex gap-2 mb-2">
        <div
          class="flex-1 rounded-lg bg-white/50 backdrop-blur-md p-1 px-2.5 text-left"
        >
          <label
            class="block text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >Overlay Color</label
          >
          <select
            class="w-full text-xs font-medium text-gray-800 bg-transparent outline-none cursor-pointer"
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
        </div>
        <div
          class="flex-1 rounded-lg bg-white/50 backdrop-blur-md p-1 px-2.5 text-left"
        >
          <label
            class="block text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >Overlay Size</label
          >
          <select
            class="w-full text-xs font-medium text-gray-800 bg-transparent outline-none cursor-pointer"
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
        </div>
      </div>
      <div class="mt-1 image-preview-canvas-wrapper">
        <canvas
          class="image-preview-canvas"
          width="0"
          height="0"
          ${ref(this.canvasRef)}
          @mousedown=${this.drag.handleMouseDown}
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

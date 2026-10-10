import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";

import { styles } from "../../styles/ImageSampling.css";
import { dragSurfaceStyles } from "../../styles/DragSurface";
import { reducedMotionStyles } from "../../styles/Motion";
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
  static styles = [
    reducedMotionStyles,
    tailwindStyles,
    styles,
    dragSurfaceStyles,
  ];

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

  /** True once a pixel has been sampled — the overlay stays hidden before. */
  @state()
  private hasSample = false;

  @state()
  private loadError = "";

  @state()
  private lastSampledColor: Color | null = null;

  canvasRef: Ref<HTMLCanvasElement> = createRef();

  constructor() {
    super();
    this.overlayColor = this.initialOverlayColor;
  }

  private samplePixel(e: MouseEvent) {
    // Never sample an empty or stale canvas (round-2 review).
    if (!this.loadedImage) return;
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
      this.hasSample = true;
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
      if (this.lastSampledColor) {
        this.dispatchEvent(
          new ColorPickerCommitColorEvent(this.lastSampledColor),
        );
      }
    },
  });

  /** Clears image-derived state so stale pixels can never be sampled. */
  private resetImageState() {
    this.loadedImage = false;
    this.hasSample = false;
    this.lastSampledColor = null;
    const canvas = this.canvasRef.value;
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
  }

  loadImage(e: Event) {
    const file = (e.currentTarget as HTMLInputElement).files?.item(0);
    if (file) {
      this.loadError = "";
      const reader = new FileReader();
      reader.onerror = () => {
        this.loadError = "Couldn't read this file — choose a PNG or JPEG.";
        this.resetImageState();
      };
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => {
          this.loadError = "Couldn't load this file — choose a PNG or JPEG.";
          this.resetImageState();
        };
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
    // Guard against the default {width: 0, height: 0} coordinates (issue #78).
    const xPercent =
      this.coordinates.width > 0
        ? (this.coordinates.x / this.coordinates.width) * 100
        : 0;
    const yPercent =
      this.coordinates.height > 0
        ? (this.coordinates.y / this.coordinates.height) * 100
        : 0;
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
          accept="image/*"
          @change=${this.loadImage}
        />
        <p class="text-[11px] text-gray-800 mt-1 text-left">
          Upload an image, then click or drag on it to sample colors.
        </p>
        ${
          this.loadError
            ? html`<p class="text-[10px] text-red-600 mt-1 text-left">
                ${this.loadError}
              </p>`
            : ""
        }
      </div>
      <div class="flex gap-2 mb-2">
        <div
          class="flex-1 rounded-lg bg-white/50 backdrop-blur-md p-1 px-2.5 text-left"
        >
          <label
            class="block text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >Overlay Color</label
          >
          <select
            class="w-full text-xs font-medium text-gray-800 bg-transparent outline-none cursor-pointer"
            aria-label="Select Overlay Color"
            ?disabled=${!this.loadedImage}
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
            class="block text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >Overlay Size</label
          >
          <select
            class="w-full text-xs font-medium text-gray-800 bg-transparent outline-none cursor-pointer"
            aria-label="Select Overlay Size"
            ?disabled=${!this.loadedImage}
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
          class="image-preview-canvas drag-surface"
          width="0"
          height="0"
          ${ref(this.canvasRef)}
          @pointerdown=${this.drag.handlePointerDown}
        ></canvas>
        <div
          class="image-preview-overlay"
          ?hidden=${!this.loadedImage || !this.hasSample}
          style=${overlayStyle}
        ></div>
      </div>
      ${
        this.hasSample && this.lastSampledColor
          ? html`<div class="sampled-readout">
              <span
                class="sampled-swatch"
                style="background: #${this.lastSampledColor.getHex()}"
              ></span>
              <code>#${this.lastSampledColor.getHex().toUpperCase()}</code>
            </div>`
          : ""
      }
    `;
  }
}

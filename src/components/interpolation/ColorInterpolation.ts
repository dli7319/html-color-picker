import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { Color } from "../../lib/Color";
import { ColorGradient } from "../../lib/ColorGradient";
import { styles } from "../../styles/ColorInterpolation.css";
import { dragSurfaceStyles } from "../../styles/DragSurface";
import { reducedMotionStyles } from "../../styles/Motion";
import { tailwindStyles } from "../../styles/Tailwind";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";
import { ColorPickerSetInterpolationActiveEvent } from "../../events/ColorPickerSetInterpolationActiveEvent";
import { ColorLerpMode } from "../../lib/ColorLerp";

interface GradientDef {
  type: string;
  typeName?: string;
}
import { clamp } from "../../lib/utils/math";
import { storageGet, storageSet } from "../../lib/utils/storage";
import { DragController } from "../../controllers/DragController";
import "../selection/ColorBarPointer";

export enum ActiveColorSide {
  LEFT = "left",
  RIGHT = "right",
  NONE = "none",
}

const STORAGE_KEY = "color-interpolation-ui-store";

@customElement("color-interpolation")
export class ColorInterpolation extends LitElement {
  static styles = [
    reducedMotionStyles,
    tailwindStyles,
    styles,
    dragSurfaceStyles,
  ];

  @property()
  activeColor: ActiveColorSide = ActiveColorSide.NONE;
  @property({ attribute: false })
  leftColor: Color = new Color();
  @property({ attribute: false })
  rightColor: Color = new Color();

  @state()
  activeLerpMode: string | null = null;
  @state()
  activeRatio: number = 0.5;

  @property({ attribute: false })
  gradients: GradientDef[] = [
    { type: "RGB" },
    { type: "HSL" },
    { typeName: "HSL*", type: "HSL_FLIP" },
    { type: "LCH" },
  ];

  colorGradient: ColorGradient = new ColorGradient();

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      ColorPickerSetColorEvent.eventName,
      this.handleExternalColor as EventListener,
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      ColorPickerSetColorEvent.eventName,
      this.handleExternalColor as EventListener,
    );
  }

  private handleExternalColor = () => {
    if (!this.isInternalDrag && this.activeLerpMode !== null) {
      this.activeLerpMode = null;
      this.saveUIState();
    }
  };

  private lastCommittedColor: Color = this.leftColor;

  private selectedGradientDiv: HTMLDivElement | null = null;

  private isInternalDrag = false;

  private processDrag = (e: MouseEvent) => {
    if (this.selectedGradientDiv) {
      const mode = this.selectedGradientDiv.getAttribute("data-mode") || "";
      const rect = this.selectedGradientDiv.getBoundingClientRect();
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const lerpEnum =
        ColorLerpMode[mode.toUpperCase() as keyof typeof ColorLerpMode];
      const newColor = this.colorGradient.getColorAt(x, lerpEnum);
      this.activeRatio = x;
      this.activeLerpMode = mode;
      this.saveUIState();
      this.setActiveColor(ActiveColorSide.NONE);
      this.isInternalDrag = true;
      this.setColor(newColor);
      this.isInternalDrag = false;
    }
  };

  /** Arrow keys sample along a focused ramp (round-2 review). */
  private handleRampKeydown = (e: KeyboardEvent, lerpMode: never) => {
    const step = e.shiftKey ? 0.001 : 0.01;
    switch (e.key) {
      case "ArrowLeft":
        this.activeRatio = Math.max(0, this.activeRatio - step);
        break;
      case "ArrowRight":
        this.activeRatio = Math.min(1, this.activeRatio + step);
        break;
      default:
        return;
    }
    e.preventDefault();
    this.setColor(this.colorGradient.getColorAt(this.activeRatio, lerpMode));
    this.commitColor();
  };

  private drag = new DragController(this, {
    onDragStart: (e: MouseEvent) => {
      this.selectedGradientDiv = e.currentTarget as HTMLDivElement;
      this.processDrag(e);
    },
    onDrag: (e: MouseEvent) => {
      this.processDrag(e);
    },
    onDragEnd: () => {
      this.selectedGradientDiv = null;
      this.commitColor();
    },
  });

  setColor(color: Color) {
    this.lastCommittedColor = color;
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  commitColor() {
    this.dispatchEvent(
      new ColorPickerCommitColorEvent(this.lastCommittedColor),
    );
  }

  setActiveColor(activeColor: ActiveColorSide) {
    this.dispatchEvent(new ColorPickerSetInterpolationActiveEvent(activeColor));
  }

  setActiveColorLeft() {
    this.setActiveColor(
      this.activeColor === ActiveColorSide.LEFT
        ? ActiveColorSide.NONE
        : ActiveColorSide.LEFT,
    );
  }

  setActiveColorRight() {
    this.setActiveColor(
      this.activeColor === ActiveColorSide.RIGHT
        ? ActiveColorSide.NONE
        : ActiveColorSide.RIGHT,
    );
  }

  firstUpdated() {
    this.loadUIState();
  }

  private saveUIState() {
    storageSet(STORAGE_KEY, {
      activeLerpMode: this.activeLerpMode,
      activeRatio: this.activeRatio,
    });
  }

  private loadUIState() {
    const data = storageGet<{
      activeLerpMode?: string | null;
      activeRatio?: number;
    } | null>(STORAGE_KEY, null);
    if (!data) return;
    if (data.activeLerpMode !== undefined) {
      this.activeLerpMode = data.activeLerpMode;
    }
    if (data.activeRatio !== undefined) {
      this.activeRatio = data.activeRatio;
    }
  }

  render() {
    this.colorGradient = new ColorGradient(this.leftColor, this.rightColor);
    return html`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">
        Color Interpolation
      </h5>
      <p class="text-[11px] text-gray-800 mb-2">
        Click a color swatch to set an endpoint, then drag along a gradient to
        pick a color in between.
      </p>
      <div class="flex justify-center gap-6 my-2">
        <button
          type="button"
          class="color-selection cursor-pointer ${this.activeColor === ActiveColorSide.LEFT ? "active ring-2 ring-blue-600" : ""}"
          @click=${this.setActiveColorLeft}
          title="Set left endpoint color"
          aria-label="Set left endpoint color"
          aria-pressed=${
            this.activeColor === ActiveColorSide.LEFT ? "true" : "false"
          }
          style="background: #${this.leftColor.getHex()}"
        ></button>
        <div
          class="color-selection cursor-pointer ${this.activeColor === ActiveColorSide.RIGHT ? "active ring-2 ring-blue-600" : ""}"
          @click=${this.setActiveColorRight}
          title="Set right endpoint color"
          aria-label="Set right endpoint color"
          aria-pressed=${
            this.activeColor === ActiveColorSide.RIGHT ? "true" : "false"
          }
          style="background: #${this.rightColor.getHex()}"
        ></button>
      </div>
      <div class="flex flex-col gap-2 mt-3">
        ${this.gradients.map((gradient) => {
          const lerpMode =
            ColorLerpMode[gradient.type as keyof typeof ColorLerpMode];
          const isActive = this.activeLerpMode === lerpMode;
          const pointerColor = isActive
            ? "#" +
              this.colorGradient.getColorAt(this.activeRatio, lerpMode).getHex()
            : "#ffffff";

          return html`
            <div class="flex items-center gap-3">
              <span class="w-12 text-left font-bold text-xs text-gray-700"
                >${
                  gradient.typeName === "HSL*"
                    ? html`<span title="HSL via shortest hue path">HSL*</span>`
                    : gradient.typeName || gradient.type
                }</span
              >
              <div
                class="gradient flex-1 rounded relative overflow-visible cursor-crosshair h-6 shadow-inner drag-surface"
                style="background: ${this.colorGradient.getBackgroundImageStyle(
                  lerpMode,
                )}"
                data-mode=${lerpMode}
                title="Drag to pick an interpolated color"
                tabindex="0"
                role="slider"
                aria-label="Gradient bar, arrows pick an interpolated color"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow=${Math.round(this.activeRatio * 100)}
                @keydown=${(e: KeyboardEvent) =>
                  this.handleRampKeydown(e, lerpMode as never)}
                @pointerdown=${this.drag.handlePointerDown}
              >
                ${
                  isActive
                    ? html`<color-bar-pointer
                        .position=${this.activeRatio * 100}
                        .color=${pointerColor}
                      ></color-bar-pointer>`
                    : ""
                }
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

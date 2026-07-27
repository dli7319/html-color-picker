import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { Color } from "../../lib/Color";
import { ColorGradient } from "../../lib/ColorGradient";
import { styles } from "../../styles/ColorInterpolation.css";
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
  static styles = [tailwindStyles, styles];

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
      <div class="flex justify-center gap-6 my-2">
        <div
          class="color-selection cursor-pointer ${this.activeColor === ActiveColorSide.LEFT ? "active ring-2 ring-blue-600" : ""}"
          @click=${this.setActiveColorLeft}
          style="background: #${this.leftColor.getHex()}"
        ></div>
        <div
          class="color-selection cursor-pointer ${this.activeColor === ActiveColorSide.RIGHT ? "active ring-2 ring-blue-600" : ""}"
          @click=${this.setActiveColorRight}
          style="background: #${this.rightColor.getHex()}"
        ></div>
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
                >${gradient.typeName || gradient.type}</span
              >
              <div
                class="gradient flex-1 rounded relative overflow-visible cursor-crosshair h-6 shadow-inner"
                style="background: ${this.colorGradient.getBackgroundImageStyle(
                  lerpMode,
                )}"
                data-mode=${lerpMode}
                @mousedown=${this.drag.handleMouseDown}
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

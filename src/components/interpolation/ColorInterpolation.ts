import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { Color } from "../../lib/Color";
import { ColorGradient } from "../../lib/ColorGradient";
import { styles } from "../../styles/ColorInterpolation.css";
import { tailwindStyles } from "../../styles/Tailwind";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerSetInterpolationActiveEvent } from "../../events/ColorPickerSetInterpolationActiveEvent";
import { ColorInterpolationGradient } from "./ColorInterpolationGradient";
import { ColorLerpMode } from "../../lib/ColorLerp";
import { clamp } from "../../lib/utils/math";
import { DragController } from "../../controllers/DragController";
import "../selection/ColorBarPointer";

export enum ActiveColorSide {
  LEFT = "left",
  RIGHT = "right",
  NONE = "none",
}

@customElement("color-interpolation")
export class ColorInterpolation extends LitElement {
  static styles = [tailwindStyles, styles];

  @property()
  activeColor: ActiveColorSide = ActiveColorSide.NONE;
  @property({ attribute: false })
  leftColor: Color = new Color({});
  @property({ attribute: false })
  rightColor: Color = new Color({});

  @state()
  activeLerpMode: string | null = null;
  @state()
  activeRatio: number = 0.5;

  colorGradient: ColorGradient = new ColorGradient();

  private selectedGradientDiv: HTMLDivElement | null = null;

  private processDrag = (e: MouseEvent) => {
    if (this.selectedGradientDiv) {
      const mode =
        this.selectedGradientDiv.getAttribute("data-mode") || "";
      const rect = this.selectedGradientDiv.getBoundingClientRect();
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const lerpEnum = ColorLerpMode[mode.toUpperCase() as keyof typeof ColorLerpMode];
      const newColor = this.colorGradient.getColorAt(x, lerpEnum);
      this.activeRatio = x;
      this.activeLerpMode = mode;
      this.setActiveColor(ActiveColorSide.NONE);
      this.setColor(newColor);
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
    },
  });

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  setActiveColor(activeColor: ActiveColorSide) {
    this.dispatchEvent(new ColorPickerSetInterpolationActiveEvent(activeColor));
  }

  setActiveColorLeft() {
    this.setActiveColor(
      this.activeColor == ActiveColorSide.LEFT
        ? ActiveColorSide.NONE
        : ActiveColorSide.LEFT
    );
  }

  setActiveColorRight() {
    this.setActiveColor(
      this.activeColor == ActiveColorSide.RIGHT
        ? ActiveColorSide.NONE
        : ActiveColorSide.RIGHT
    );
  }

  render() {
    this.colorGradient = new ColorGradient(this.leftColor, this.rightColor);
    return html`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Interpolation</h5>
      <div class="flex justify-center gap-6 my-2">
        <div
          class="color-selection cursor-pointer ${this.activeColor === ActiveColorSide.LEFT ? 'active ring-2 ring-blue-600' : ''}"
          @click=${this.setActiveColorLeft}
          style="background: #${this.leftColor.getHex()}"
        ></div>
        <div
          class="color-selection cursor-pointer ${this.activeColor === ActiveColorSide.RIGHT ? 'active ring-2 ring-blue-600' : ''}"
          @click=${this.setActiveColorRight}
          style="background: #${this.rightColor.getHex()}"
        ></div>
      </div>
      <div class="flex flex-col gap-2 mt-3">
        ${Array.prototype.map.call(this.children, (child) => {
          if (child instanceof ColorInterpolationGradient) {
            const lerpMode =
              ColorLerpMode[child.type as keyof typeof ColorLerpMode];
            const isActive = this.activeLerpMode === lerpMode;
            const pointerColor = isActive
              ? "#" +
                this.colorGradient
                  .getColorAt(
                    this.activeRatio,
                    ColorLerpMode[lerpMode.toUpperCase() as keyof typeof ColorLerpMode]
                  )
                  .getHex()
              : "#ffffff";

            return html`
              <div class="flex items-center gap-3">
                <span class="w-12 text-left font-bold text-xs text-gray-700">${child.typeName || child.type}</span>
                <div
                  class="gradient flex-1 rounded relative overflow-visible cursor-crosshair h-6 shadow-inner"
                  style="background: ${this.colorGradient.getBackgroundImageStyle(
                    lerpMode
                  )}"
                  data-mode=${lerpMode}
                  @mousedown=${this.drag.handleMouseDown}
                >
                  ${isActive
                    ? html`<color-bar-pointer
                        .position=${this.activeRatio * 100}
                        .color=${pointerColor}
                      ></color-bar-pointer>`
                    : ""}
                </div>
              </div>
            `;
          }
        })}
      </div>
    `;
  }
}

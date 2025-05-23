import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Color } from "./lib/Color";
import { ColorGradient } from "./lib/ColorGradient";
import { styles } from "./styles/ColorInterpolation.css";
import { bootstrap } from "./styles/Bootstrap";
import { ColorPickerSetColorEvent } from "./events/ColorPickerSetColorEvent";
import { ColorPickerSetInterpolationActiveEvent } from "./events/ColorPickerSetInterpolationActiveEvent";
import { ColorInterpolationGradient } from "./ColorInterpolationGradient";
import { ColorLerpMode } from "./lib/ColorLerp";

export enum ActiveColorSide {
  LEFT = "left",
  RIGHT = "right",
  NONE = "none",
}

@customElement("color-interpolation")
export class ColorInterpolation extends LitElement {
  static styles = [styles];

  @property()
  activeColor: ActiveColorSide = ActiveColorSide.NONE;
  @property({ attribute: false })
  leftColor: Color = new Color({});
  @property({ attribute: false })
  rightColor: Color = new Color({});

  colorGradient: ColorGradient = new ColorGradient();

  private onMouseMoveBound = this.onMouseMove.bind(this);
  private onMouseUpBound = this.onMouseUp.bind(this);
  private selectedGolorGradientDiv: HTMLDivElement | null = null;

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

  onMouseMove(event: MouseEvent) {
    if (this.selectedGolorGradientDiv instanceof HTMLDivElement) {
      const mode =
        this.selectedGolorGradientDiv.getAttribute("data-mode") || "";
      const rect = this.selectedGolorGradientDiv.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const newColor = this.colorGradient.getColorAt(
        x,
        ColorLerpMode[mode.toUpperCase() as keyof typeof ColorLerpMode]
      );
      this.setActiveColor(ActiveColorSide.NONE);
      this.setColor(newColor);
    }
  }

  onMouseDown(event: MouseEvent) {
    this.selectedGolorGradientDiv = event.currentTarget as HTMLDivElement;
    document.addEventListener("mousemove", this.onMouseMoveBound);
    document.addEventListener("mouseup", this.onMouseUpBound);
  }

  onMouseUp() {
    document.removeEventListener("mousemove", this.onMouseMoveBound);
    document.removeEventListener("mouseup", this.onMouseUpBound);
    this.selectedGolorGradientDiv = null;
  }

  render() {
    this.colorGradient = new ColorGradient(this.leftColor, this.rightColor);
    return html`
      ${bootstrap}
      <h5>Color Interpolation</h5>
      <table class="table mb-0">
        <tbody>
          <tr>
            <td>
              <div
                class="color-selection ${this.activeColor ===
                ActiveColorSide.LEFT
                  ? "active"
                  : ""}"
                @click=${this.setActiveColorLeft}
                style="background: #${this.leftColor.getHex()}"
              ></div>
            </td>
            <td>
              <div
                class="color-selection ${this.activeColor ===
                ActiveColorSide.RIGHT
                  ? "active"
                  : ""}"
                @click=${this.setActiveColorRight}
                style="background: #${this.rightColor.getHex()}"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table mb-0">
        <tbody>
          ${Array.prototype.map.call(this.children, (child) => {
            if (child instanceof ColorInterpolationGradient) {
              const lerpMode =
                ColorLerpMode[child.type as keyof typeof ColorLerpMode];
              return html` <tr>
                <th>${child.typeName || child.type}</th>
                <td>
                  <div
                    class="gradient"
                    style="background: ${this.colorGradient.getBackgroundImageStyle(
                      lerpMode
                    )}"
                    data-mode=${lerpMode}
                    @mousedown=${this.onMouseDown.bind(this)}
                  ></div>
                </td>
              </tr>`;
            }
          })}
        </tbody>
      </table>
    `;
  }
}

import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import Color, { ColorLerpMode } from "./Color";
import { ColorGradient } from "./ColorGradient";
import { styles } from "./styles/ColorInterpolation";
import { bootstrap } from "./styles/Bootstrap";
import { ColorPickerSetColorEvent } from "./ColorPickerSetColorEvent";

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
  @property()
  setActiveColor: (activeColor: ActiveColorSide) => void = () => {};

  colorGradient: ColorGradient = new ColorGradient();

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
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

  onMouseMoveGradient(event: MouseEvent) {
    if (event.buttons == 1) {
      const mode =
        (event.currentTarget as HTMLDivElement).getAttribute("data-mode") || "";
      const rect = (
        event.currentTarget as HTMLDivElement
      ).getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const newColor = this.colorGradient.getColorAt(
        x,
        ColorLerpMode[mode as keyof typeof ColorLerpMode]
      );
      this.setActiveColor(ActiveColorSide.NONE);
      this.setColor(newColor);
    }
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
          <tr>
            <th>RGB</th>
            <td>
              <div
                class="gradient"
                style="background: ${this.colorGradient.getBackgroundImageStyle(
                  ColorLerpMode.RGB
                )}"
                data-mode=${ColorLerpMode.RGB}
                @mousedown=${this.onMouseMoveGradient}
                @mousemove=${this.onMouseMoveGradient}
              ></div>
            </td>
          </tr>
          <tr>
            <th>HSL</th>
            <td>
              <div
                class="gradient"
                style="background: ${this.colorGradient.getBackgroundImageStyle(
                  ColorLerpMode.HSL
                )}"
                data-mode=${ColorLerpMode.HSL}
                @mousedown=${this.onMouseMoveGradient}
                @mousemove=${this.onMouseMoveGradient}
              ></div>
            </td>
          </tr>
          <tr>
            <th>HSL*</th>
            <td>
              <div
                class="gradient"
                style="background: ${this.colorGradient.getBackgroundImageStyle(
                  ColorLerpMode.HSL_FLIP
                )}"
                data-mode=${ColorLerpMode.HSL_FLIP}
                @mousedown=${this.onMouseMoveGradient}
                @mousemove=${this.onMouseMoveGradient}
              ></div>
            </td>
          </tr>
          <tr>
            <th>LCH</th>
            <td>
              <div
                class="gradient"
                style="background: ${this.colorGradient.getBackgroundImageStyle(
                  ColorLerpMode.LCH
                )}"
                data-mode=${ColorLerpMode.LCH}
                @mousedown=${this.onMouseMoveGradient}
                @mousemove=${this.onMouseMoveGradient}
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }
}

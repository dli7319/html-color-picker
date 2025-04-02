import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { clamp } from "./lib/utils/math";
import { Color, ColorInputType } from "./lib/Color";
import { styles } from "./styles/ColorSelectionTypeA.css";
import { bootstrap } from "./styles/Bootstrap";
import { ColorPickerSetColorEvent } from "./events/ColorPickerSetColorEvent";
import "./ColorSelectionTypeABar";

@customElement("color-selection-type-a-grad")
export class ColorSelectionTypeAGrad extends LitElement {
  static styles = [
    styles,
    css`
      :host {
        flex: 1;
      }
    `,
  ];

  @property({ attribute: false })
  color: Color = new Color();

  @query("#color-grad-container")
  colorGradContainer!: HTMLDivElement;

  private onMouseMoveBound = this.onMouseMove.bind(this);
  private onMouseUpBound = this.onMouseUp.bind(this);

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  onMouseMove(e: MouseEvent) {
    const [hue] = this.color.getHSV();
    const mouseDown = e.buttons == 1;
    if (mouseDown) {
      const rect = this.colorGradContainer.getBoundingClientRect();
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
      const newSaturation = x * 100;
      const newValue = (1 - y) * 100;
      this.setColor(
        new Color({
          type: ColorInputType.HSV,
          h: hue,
          s: newSaturation,
          v: newValue,
        })
      );
    }
  }

  onMouseDown() {
    document.addEventListener("mousemove", this.onMouseMoveBound);
    document.addEventListener("mouseup", this.onMouseUpBound);
  }

  onMouseUp() {
    document.removeEventListener("mousemove", this.onMouseMoveBound);
    document.removeEventListener("mouseup", this.onMouseUpBound);
  }

  render() {
    const [hue, saturation, value] = this.color.getHSV();
    const hueColorHex =
      "#" +
      new Color({
        type: ColorInputType.HSV,
        h: hue,
        s: 100,
        v: 100,
      }).getHex();
    const colorGradStyleBackground = `linear-gradient(to right, #FFF 0%, ${hueColorHex} 100%)`;
    const colorCircleStyle = `
      top: calc(${(1.0 - value / 100) * 100}% - 0.5rem);
      left: calc(${(saturation / 100) * 100}% - 0.5rem);
      background-color: #${this.color.getHex()};
      border-color: ${value < 50 ? "white" : "black"};
    `;
    return html`
      ${bootstrap}
      <div class="color-grad-container" id="color-grad-container">
        <div
          class="color-grad color-grad-1"
          style="background: ${colorGradStyleBackground};"
        ></div>
        <div
          class="color-grad color-grad-2"
          @mousedown=${this.onMouseDown.bind(this)}
        ></div>
        <div class="color-grad-circle" style=${colorCircleStyle}></div>
      </div>
    `;
  }
}

import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { clamp } from "./lib/utils/math";
import { Color, ColorInputType } from "./lib/Color";
import { styles } from "./styles/ColorSelection.css";
import { bootstrap } from "./styles/Bootstrap";
import { ColorPickerSetColorEvent } from "./events/ColorPickerSetColorEvent";
import "./ColorSelectionBarPointer";

@customElement("color-selection")
export class ColorSelection extends LitElement {
  static styles = [styles];

  @property({ attribute: false })
  color: Color = new Color();

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  onMouseMoveColorGrad(e: MouseEvent) {
    const [hue] = this.color.getHSV();
    const mouseDown = e.buttons == 1;
    if (mouseDown) {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
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

  onMouseMoveColorBar(e: MouseEvent) {
    const [, saturation, value] = this.color.getHSV();
    const mouseDown = e.buttons == 1;
    if (mouseDown) {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const newHue = x * 360;
      this.setColor(
        new Color({
          type: ColorInputType.HSV,
          h: newHue,
          s: saturation,
          v: value,
        })
      );
    }
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
      <h5>Color Selection</h5>
      <div class="color-grad-container">
        <div
          class="color-grad color-grad-1"
          style="background: ${colorGradStyleBackground};"
        ></div>
        <div
          class="color-grad color-grad-2"
          @mousemove=${this.onMouseMoveColorGrad}
          @mousedown=${this.onMouseMoveColorGrad}
        ></div>
        <div class="color-grad-circle" style=${colorCircleStyle}></div>
      </div>
      <div
        class="color-bar"
        @mousemove=${this.onMouseMoveColorBar}
        @mousedown=${this.onMouseMoveColorBar}
      >
        <color-selection-bar-pointer hue=${hue}></color-selection-bar-pointer>
      </div>
    `;
  }
}

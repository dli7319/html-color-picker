import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { clamp } from "../../lib/utils/math";
import { Color, ColorInputType } from "../../lib/Color";
import { styles } from "../../styles/ColorSelectionTypeA.css";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import "./ColorBarPointer";

@customElement("color-selection-hsv-bar")
export class ColorSelectionHsvBar extends LitElement {
  static styles = [styles];

  @property({ attribute: false })
  color: Color = new Color();

  @query("#color-bar")
  colorBar!: HTMLDivElement;

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  onMouseMove = (e: MouseEvent) => {
    const [, saturation, value] = this.color.getHSV();
    const mouseDown = e.buttons == 1;
    if (mouseDown) {
      const rect = this.colorBar.getBoundingClientRect();
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
  };

  onMouseDown = () => {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  };

  onMouseUp = () => {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  };

  render() {
    const [hue] = this.color.getHSV();
    const hueColorHex =
      "#" +
      new Color({
        type: ColorInputType.HSV,
        h: hue,
        s: 100,
        v: 100,
      }).getHex();
    return html`
      <div class="color-bar" @mousedown=${this.onMouseDown} id="color-bar">
        <color-bar-pointer
          .position=${(hue / 360) * 100}
          .color=${hueColorHex}
        ></color-bar-pointer>
      </div>
    `;
  }
}

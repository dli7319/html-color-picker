import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Color, ColorInputType } from "./Color";

import { styles } from "./styles/ColorSelectionBarPointer.css";

@customElement("color-selection-bar-pointer")
export class ColorSelectionBarPointer extends LitElement {
  static styles = [styles];

  @property({ type: Number })
  hue: number = 0;

  render() {
    const hueColorHex =
      "#" +
      new Color({
        type: ColorInputType.HSV,
        h: this.hue,
        s: 100,
        v: 100,
      }).getHex();
    const huePointerStyleLeft = `${(this.hue / 360) * 100}%`;
    return html`
      <div class="color-bar-pointer" style="left: ${huePointerStyleLeft};">
        <div class="color-bar-pointer-2"></div>
        <div
          class="color-bar-pointer-3"
          style="border-bottom-color: ${hueColorHex};"
        ></div>
        <div
          class="color-bar-pointer-4"
          style="border-color: ${hueColorHex};"
        ></div>
      </div>
    `;
  }
}

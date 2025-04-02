import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Color } from "./lib/Color";

import { styles } from "./styles/ColorSelectionTypeABarPointer.css";

@customElement("color-selection-type-b-bar-pointer")
export class ColorSelectionTypeBBarPointer extends LitElement {
  static styles = [styles];

  @property({ attribute: false })
  color: Color = new Color();

  render() {
    const [, , lightness] = this.color.getHSL();
    const hueColorHex = "#" + this.color.getHex();
    const huePointerStyleLeft = `${lightness}%`;
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

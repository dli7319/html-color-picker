import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Color } from "./lib/Color";
import "./ColorBarPointer";

@customElement("color-selection-type-b-bar-pointer")
export class ColorSelectionTypeBBarPointer extends LitElement {
  @property({ attribute: false })
  color: Color = new Color();

  render() {
    const [, , lightness] = this.color.getHSL();
    const hueColorHex = "#" + this.color.getHex();
    return html`
      <color-bar-pointer
        .position=${lightness}
        .color=${hueColorHex}
      ></color-bar-pointer>
    `;
  }
}

import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Color, ColorInputType } from "./lib/Color";
import "./ColorBarPointer";

@customElement("color-selection-type-a-bar-pointer")
export class ColorSelectionTypeABarPointer extends LitElement {
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
    return html`
      <color-bar-pointer
        .position=${(this.hue / 360) * 100}
        .color=${hueColorHex}
      ></color-bar-pointer>
    `;
  }
}

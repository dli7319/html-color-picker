import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Color } from "../../lib/Color";
import { styles } from "../../styles/ColorSelectionTypeA.css";
import "./ColorSelectionHsvGrad";
import "./ColorSelectionHsvBar";

@customElement("color-selection-hsv")
export class ColorSelectionHsv extends LitElement {
  static styles = [styles];

  @property({ attribute: false })
  color: Color = new Color();

  render() {
    return html`
      <color-selection-hsv-grad
        .color=${this.color}
      ></color-selection-hsv-grad>
      <color-selection-hsv-bar
        .color=${this.color}
      ></color-selection-hsv-bar>
    `;
  }
}

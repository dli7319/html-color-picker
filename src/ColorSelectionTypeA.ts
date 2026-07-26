import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Color } from "./lib/Color";
import { styles } from "./styles/ColorSelectionTypeA.css";
import "./ColorSelectionTypeAGrad";
import "./ColorSelectionTypeABar";

@customElement("color-selection-type-a")
export class ColorSelectionTypeA extends LitElement {
  static styles = [styles];

  @property({ attribute: false })
  color: Color = new Color();

  render() {
    return html`
      <color-selection-type-a-grad
        .color=${this.color}
      ></color-selection-type-a-grad>
      <color-selection-type-a-bar
        .color=${this.color}
      ></color-selection-type-a-bar>
    `;
  }
}

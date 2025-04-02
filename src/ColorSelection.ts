import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Color } from "./lib/Color";
import { bootstrap } from "./styles/Bootstrap";
import "./ColorSelectionTypeA";
import "./ColorSelectionTypeB";

@customElement("color-selection")
export class ColorSelection extends LitElement {
  static styles = css`
    :host {
      display: flex;
    }

    :host > h5 {
      flex: 0;
    }

    :host > * {
      flex: 1;
    }
  `;

  @property({ attribute: false })
  color: Color = new Color();

  render() {
    return html`
      ${bootstrap}
      <h5>Color Selection</h5>
      <color-selection-type-a .color=${this.color}></color-selection-type-a>
      <!-- <color-selection-type-b .color=${this.color}></color-selection-type-b> -->
    `;
  }
}

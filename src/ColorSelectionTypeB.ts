import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Color } from "./lib/Color";
import { bootstrap } from "./styles/Bootstrap";
import "./ColorSelectionTypeBWheel";
import "./ColorSelectionTypeBBar";

// This is an HSL color wheel with a white center.
@customElement("color-selection-type-b")
export class ColorSelectionTypeB extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
      }
    `,
  ];

  @property({ attribute: false })
  color: Color = new Color();

  render() {
    return html`
      ${bootstrap}
      <color-selection-type-b-wheel
        .color=${this.color}
      ></color-selection-type-b-wheel>
      <color-selection-type-b-bar
        .color=${this.color}
      ></color-selection-type-b-bar>
    `;
  }
}

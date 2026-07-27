import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Color } from "../../lib/Color";
import "./ColorSelectionHslWheel";
import "./ColorSelectionHslBar";

// Layout container that composes the HSL wheel and lightness bar.
// The actual selection interaction is handled by the child components
// (ColorSelectionHslWheel, ColorSelectionHslBar), which extend ColorSelectionBase.
@customElement("color-selection-hsl")
export class ColorSelectionHsl extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 20rem;
        margin: 0 auto;
      }
    `,
  ];

  @property({ attribute: false })
  color: Color = new Color();

  render() {
    return html`
      <color-selection-hsl-wheel
        .color=${this.color}
      ></color-selection-hsl-wheel>
      <color-selection-hsl-bar .color=${this.color}></color-selection-hsl-bar>
    `;
  }
}

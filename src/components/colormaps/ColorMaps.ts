import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { tailwindStyles } from "../../styles/Tailwind";
import { Color } from "../../lib/Color";
import { ColorMap } from "./ColorMap";
import "../../colormaps/all";

@customElement("color-maps")
export class ColorMaps extends LitElement {
  static styles = [tailwindStyles];

  @property({ attribute: false })
  color: Color = new Color();

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("color")) {
      Array.prototype.forEach.call(this.children, (child) => {
        if (child instanceof ColorMap) {
          child.color = this.color;
        }
      });
    }
  }

  render() {
    return html`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Maps</h5>
      <div class="flex flex-col gap-2">
        <slot></slot>
      </div>
    `;
  }
}

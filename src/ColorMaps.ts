import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import { tailwindStyles } from "./styles/Tailwind";
import "./colormaps/all";

@customElement("color-maps")
export class ColorMaps extends LitElement {
  static styles = [tailwindStyles];

  render() {
    return html`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Maps</h5>
      <div class="flex flex-col gap-2">
        <slot></slot>
      </div>
    `;
  }
}

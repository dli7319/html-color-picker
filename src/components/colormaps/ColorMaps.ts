import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { tailwindStyles } from "../../styles/Tailwind";
import { Color } from "../../lib/Color";
import {
  turboColorMapData,
  turboColorMapName,
} from "../../colormap-data/turbo";
import "./ColorMap";

@customElement("color-maps")
export class ColorMaps extends LitElement {
  static styles = [tailwindStyles];

  @property({ attribute: false })
  color: Color = new Color();

  render() {
    return html`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Maps</h5>
      <div class="flex flex-col gap-2">
        <color-map
          .data=${turboColorMapData}
          .name=${turboColorMapName}
          .color=${this.color}
        ></color-map>
      </div>
    `;
  }
}

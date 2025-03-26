import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import { bootstrap } from "./styles/Bootstrap";
import "./colormaps/TurboColormap";

@customElement("color-maps")
export class ColorMaps extends LitElement {
  static styles = [
    css`
      ul {
        padding: 0;
      }
    `,
  ];
  render() {
    return html`
      ${bootstrap}
      <h5>Color Maps</h5>
      <div class="table mb-0">
        <turbo-colormap></turbo-colormap>
      </div>
    `;
  }
}

import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Color } from "../../lib/Color";
import { tailwindStyles } from "../../styles/Tailwind";
import "./ColorSelectionHsv";
import "./ColorSelectionHsl";

enum ColorSelectionType {
  HSV = "HSV",
  HSL_WHEEL = "HSL_WHEEL",
}

@customElement("color-selection")
export class ColorSelection extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
    `,
  ];

  @property({ attribute: false })
  color: Color = new Color();

  @property({ attribute: false })
  colorSelectionType: ColorSelectionType = ColorSelectionType.HSV;

  getColorSelectionHtml() {
    if (this.colorSelectionType === ColorSelectionType.HSV) {
      return html`<color-selection-hsv
        class="w-full flex-1 flex flex-col"
        .color=${this.color}
      ></color-selection-hsv>`;
    } else {
      return html`<color-selection-hsl
        class="w-full flex-1 flex flex-col my-0 mx-auto"
        .color=${this.color}
      ></color-selection-hsl>`;
    }
  }

  render() {
    const isHsv = this.colorSelectionType === ColorSelectionType.HSV;
    return html`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Selection</h5>
      <div
        class="inline-flex rounded-lg bg-slate-800 p-1 mb-3 w-full max-w-xs mx-auto"
      >
        <button
          type="button"
          class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-all ${
            isHsv
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-300 hover:text-white"
          }"
          @click=${() => {
            this.colorSelectionType = ColorSelectionType.HSV;
          }}
        >
          HSV
        </button>
        <button
          type="button"
          class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-all ${
            !isHsv
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-300 hover:text-white"
          }"
          @click=${() => {
            this.colorSelectionType = ColorSelectionType.HSL_WHEEL;
          }}
        >
          HSL Wheel
        </button>
      </div>
      ${this.getColorSelectionHtml()}
    `;
  }
}

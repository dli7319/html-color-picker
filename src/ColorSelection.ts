import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Color } from "./lib/Color";
import { tailwindStyles } from "./styles/Tailwind";
import "./ColorSelectionTypeA";
import "./ColorSelectionTypeB";

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
      return html`<color-selection-type-a
        class="w-full flex-1 flex flex-col"
        .color=${this.color}
      ></color-selection-type-a>`;
    } else {
      return html`<color-selection-type-b
        class="w-full flex-1 flex flex-col my-0 mx-auto"
        .color=${this.color}
      ></color-selection-type-b>`;
    }
  }

  render() {
    const isHsv = this.colorSelectionType === ColorSelectionType.HSV;
    return html`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Selection</h5>
      <div
        class="inline-flex rounded-md bg-slate-600 p-0.5 mb-3 w-full max-w-xs mx-auto shadow-sm"
      >
        <button
          type="button"
          class="flex-1 py-1.5 px-3 text-xs font-medium rounded transition-colors ${isHsv
            ? "bg-slate-800 text-white shadow"
            : "text-slate-200 hover:text-white"}"
          @click=${() => {
            this.colorSelectionType = ColorSelectionType.HSV;
          }}
        >
          HSV
        </button>
        <button
          type="button"
          class="flex-1 py-1.5 px-3 text-xs font-medium rounded transition-colors ${!isHsv
            ? "bg-slate-800 text-white shadow"
            : "text-slate-200 hover:text-white"}"
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

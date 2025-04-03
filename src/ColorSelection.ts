import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Color } from "./lib/Color";
import { bootstrap } from "./styles/Bootstrap";
import "./ColorSelectionTypeA";
import "./ColorSelectionTypeB";

enum ColorSelectionType {
  HSV = "HSV",
  HSL_WHEEL = "HSL_WHEEL",
}

@customElement("color-selection")
export class ColorSelection extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
    }

    :host > h5 {
      flex: 0;
    }

    :host > .color-selection-picker {
      flex: 0;
      margin: 0.5rem 0rem;
    }

    :host > * {
      flex: 1;
    }
  `;

  @property({ attribute: false })
  color: Color = new Color();

  @property({ attribute: false })
  colorSelectionType: ColorSelectionType = ColorSelectionType.HSV;

  getColorSelectionHtml() {
    if (this.colorSelectionType === ColorSelectionType.HSV) {
      return html`<color-selection-type-a .color=${this.color}></color-selection-type-a>`;
    } else {
      return html`<color-selection-type-b .color=${this.color}></color-selection-type-b>`;
    }
  }

  render() {
    return html`
      ${bootstrap}
      <h5>Color Selection</h5>
      <div class="btn-group color-selection-picker" role="group" aria-label="Color Selection">
        <input
          type="radio"
          class="btn-check"
          name="options"
          id="option1"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="option1" @click=${() => {
            this.colorSelectionType = ColorSelectionType.HSV;
        }}>HSV</label>
        <input
          type="radio"
          class="btn-check"
          name="options"
          id="option2"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="option2" @click=${() => {
            this.colorSelectionType = ColorSelectionType.HSL_WHEEL;
        }}>HSL Wheel</label>
      </div>
      ${this.getColorSelectionHtml()}
    `;
  }
}

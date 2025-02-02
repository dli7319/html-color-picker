import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/components/copy-button/copy-button.js";

import { bootstrap } from "./styles/Bootstrap";

@customElement("color-converter-input")
export class ColorConverterInput extends LitElement {
  @property()
  label: string = "";
  @property()
  value: string = "";
  @property()
  onValueChange: (event: Event) => void = () => {};

  render() {
    return html`
      ${bootstrap}
      <div class="input-group">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            .value=${this.value}
            @input=${this.onValueChange}
          />
          <label>${this.label}</label>
        </div>
        <span class="input-group-text">
          <sl-copy-button value=${this.value}></sl-copy-button>
        </span>
      </div>
    `;
  }
}

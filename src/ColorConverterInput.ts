import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/components/copy-button/copy-button.js";

import { bootstrap } from "./styles/Bootstrap";
import Color from "./Color";

export interface InputValues {
  hexValue?: string;
  rgb255Value?: string;
  rgb01Value?: string;
  hsvValue?: string;
}

export enum InputType {
  HEX = "HEX",
  RGB255 = "RGB255",
  RGB01 = "RGB01",
  HSV = "HSV",
}

const inputTypeToLabel = {
  [InputType.HEX]: "Hex",
  [InputType.RGB255]: "RGB (0-255)",
  [InputType.RGB01]: "RGB (0-1)",
  [InputType.HSV]: "HSV",
};

export const inputTypeToInputValueKey = {
  [InputType.HEX]: "hexValue",
  [InputType.RGB255]: "rgb255Value",
  [InputType.RGB01]: "rgb01Value",
  [InputType.HSV]: "hsvValue",
} as Record<InputType, keyof InputValues>;

const colorToString = {
  [InputType.HEX]: (color: Color) => "#" + color.getHex(),
  [InputType.RGB255]: (color: Color) =>
    color.getRGB255().splice(0, 3).toString(),
  [InputType.RGB01]: (color: Color) =>
    color
      .getRGB01()
      .splice(0, 3)
      .map((x) => x.toFixed(3))
      .toString(),
  [InputType.HSV]: (color: Color) =>
    color.getHSV(false).splice(0, 3).toString(),
};

@customElement("color-converter-input")
export class ColorConverterInput extends LitElement {
  @property()
  type: InputType = InputType.HEX;
  @property({ attribute: false })
  inputValues: InputValues = {};
  @property({ attribute: false })
  color: Color = new Color();
  @property()
  onValueChange: (event: Event) => void = () => {};

  render() {
    const value =
      this.inputValues[inputTypeToInputValueKey[this.type]] ??
      colorToString[this.type](this.color);
    return html`
      ${bootstrap}
      <div class="input-group">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            .value=${value}
            @input=${this.onValueChange}
          />
          <label>${inputTypeToLabel[this.type]}</label>
        </div>
        <span class="input-group-text">
          <sl-copy-button value=${value}></sl-copy-button>
        </span>
      </div>
    `;
  }
}

import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { tailwindStyles } from "../../styles/Tailwind";
import { Color } from "../../lib/Color";
import { ColorConverterInputEvent } from "../../events/ColorConverterInputEvent";

export interface InputValues {
  hexValue?: string;
  rgb255Value?: string;
  rgb01Value?: string;
  hsvValue?: string;
  hslValue?: string;
}

export enum InputType {
  HEX = "HEX",
  RGB255 = "RGB255",
  RGB01 = "RGB01",
  HSV = "HSV",
  HSL = "HSL",
}

const inputTypeToLabel = {
  [InputType.HEX]: "Hex",
  [InputType.RGB255]: "RGB (0-255)",
  [InputType.RGB01]: "RGB (0-1)",
  [InputType.HSV]: "HSV",
  [InputType.HSL]: "HSL",
};

export const inputTypeToInputValueKey = {
  [InputType.HEX]: "hexValue",
  [InputType.RGB255]: "rgb255Value",
  [InputType.RGB01]: "rgb01Value",
  [InputType.HSV]: "hsvValue",
  [InputType.HSL]: "hslValue",
} as Record<InputType, keyof InputValues>;

const colorToString = {
  [InputType.HEX]: (color: Color) => "#" + color.getHex(),
  [InputType.RGB255]: (color: Color) =>
    color.getRGB255().toString(),
  [InputType.RGB01]: (color: Color) =>
    color
      .getRGB01()
      .map((x) => x.toFixed(3))
      .toString(),
  [InputType.HSV]: (color: Color) => color.getHSV(false).toString(),
  [InputType.HSL]: (color: Color) => color.getHSL(false).toString(),
};

@customElement("color-converter-input")
export class ColorConverterInput extends LitElement {
  static styles = [tailwindStyles];

  @property()
  type: InputType = InputType.HEX;
  @property({ attribute: false })
  inputValues: InputValues = {};
  @property({ attribute: false })
  color: Color = new Color();

  @state()
  private _copied = false;

  private _copyTimeout: ReturnType<typeof setTimeout> | null = null;

  private async _copyValue(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      this._copied = true;
      if (this._copyTimeout) clearTimeout(this._copyTimeout);
      this._copyTimeout = setTimeout(() => {
        this._copied = false;
      }, 1000);
    } catch {
      // Clipboard write failed — silently ignore
    }
  }

  onValueChange(event: Event) {
    this.dispatchEvent(
      new ColorConverterInputEvent(
        this.type,
        (event.target as HTMLInputElement).value,
      ),
    );
  }

  render() {
    const value =
      this.inputValues[inputTypeToInputValueKey[this.type]] ??
      colorToString[this.type](this.color);
    return html`
      <div
        class="flex items-stretch rounded-lg bg-white/50 backdrop-blur-md overflow-hidden text-left"
      >
        <div class="flex-1 px-2 py-1">
          <label
            class="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider"
            >${inputTypeToLabel[this.type]}</label
          >
          <input
            type="text"
            class="w-full text-xs font-mono text-gray-800 outline-none bg-transparent"
            .value=${value}
            @input=${this.onValueChange}
          />
        </div>
        <div class="flex items-center px-2 bg-white/30">
          <button
            class="p-1.5 rounded-md hover:bg-white/50 transition-colors cursor-pointer border-none bg-transparent"
            @click=${() => this._copyValue(value)}
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
          >
            ${this._copied
              ? html`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><polyline points="20 6 9 17 4 12"></polyline></svg>`
              : html`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`}
          </button>
        </div>
      </div>
    `;
  }
}

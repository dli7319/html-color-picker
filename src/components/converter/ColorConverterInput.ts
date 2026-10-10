import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { tailwindStyles } from "../../styles/Tailwind";
import { reducedMotionStyles } from "../../styles/Motion";
import { Color } from "../../lib/Color";
import { parseColorString } from "../../lib/ColorStringParsing";
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
  [InputType.RGB255]: (color: Color) => color.getRGB255().toString(),
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
  static styles = [
    reducedMotionStyles,
    tailwindStyles,
    css`
      .copied-icon {
        animation: copied-pop 180ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
      }
      @keyframes copied-pop {
        from {
          transform: scale(0.6);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
    `,
  ];

  @property()
  type: InputType = InputType.HEX;
  @property({ attribute: false })
  inputValues: InputValues = {};
  @property({ attribute: false })
  color: Color = new Color();

  @state()
  private _copied = false;

  @state()
  private _invalid = false;

  private _copyTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Last settled value — guards against duplicate commits (issue #72). */
  private _lastSettled: string | null = null;

  private async _copyValue(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      this._copied = true;
      if (this._copyTimeout) clearTimeout(this._copyTimeout);
      this._copyTimeout = setTimeout(() => {
        this._copied = false;
      }, 1000);
    } catch {
      // Clipboard write failed (e.g. non-secure context) — select the text
      // so the user can copy manually instead of failing silently (issue #83).
      this.shadowRoot?.querySelector("input")?.select();
    }
  }

  private previewTimer: ReturnType<typeof setTimeout> | null = null;

  onValueChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    // Live preview while typing; invalid text is simply not applied yet.
    if (parseColorString(this.type, value) == null) return;
    this._invalid = false;
    // Debounce the preview so intermediate parses don't swing the whole app
    // on every keystroke (round-2 review).
    if (this.previewTimer) clearTimeout(this.previewTimer);
    this.previewTimer = setTimeout(() => {
      this.previewTimer = null;
      this.dispatchEvent(new ColorConverterInputEvent(this.type, value));
    }, 200);
  }

  /** Runs when a value settles (blur or Enter): commit valid, flag invalid. */
  private settle() {
    const input = this.shadowRoot?.querySelector("input");
    if (!input) return;
    const value = input.value;
    if (value === this._lastSettled) return;
    if (parseColorString(this.type, value) != null) {
      this._lastSettled = value;
      this._invalid = false;
      this.dispatchEvent(new ColorConverterInputEvent(this.type, value, true));
    } else {
      this._invalid = true;
    }
  }

  /** Esc: revert to the canonical value of the current color. */
  private revert() {
    const canonical = colorToString[this.type](this.color);
    this._lastSettled = canonical;
    this._invalid = false;
    // Imperatively rewrite the field: invalid text is not in inputValues, so
    // the Lit .value binding alone would not replace it (round-2 review).
    const input = this.shadowRoot?.querySelector("input");
    if (input) input.value = canonical;
    this.dispatchEvent(new ColorConverterInputEvent(this.type, canonical));
  }

  private onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.settle();
    } else if (event.key === "Escape") {
      this.revert();
    }
  }

  render() {
    const value =
      this.inputValues[inputTypeToInputValueKey[this.type]] ??
      colorToString[this.type](this.color);
    const copyLabel = `Copy ${inputTypeToLabel[this.type]}`;
    const inputClass = this._invalid
      ? "w-full text-xs font-mono text-gray-800 outline-none bg-transparent rounded border border-red-500"
      : "w-full text-xs font-mono text-gray-800 outline-none bg-transparent";
    return html`
      <div
        class="flex items-stretch rounded-lg bg-white/50 backdrop-blur-md overflow-hidden text-left"
      >
        <div class="flex-1 px-2 py-1">
          <label
            class="block text-[10px] font-semibold text-gray-700 uppercase tracking-wider"
            for="color-input-${this.type}"
            >${inputTypeToLabel[this.type]}</label
          >
          <input
            type="text"
            id="color-input-${this.type}"
            class=${inputClass}
            .value=${value}
            aria-invalid=${this._invalid ? "true" : "false"}
            aria-describedby="color-error-${this.type}"
            @input=${this.onValueChange}
            @change=${this.settle}
            @keydown=${this.onKeydown}
          />
          <p
            id="color-error-${this.type}"
            class="text-[11px] text-red-800 font-medium mt-0.5 min-h-[14px]"
            aria-live="polite"
          >
            ${
              this._invalid
                ? `Not a valid ${inputTypeToLabel[this.type]} value`
                : ""
            }
          </p>
        </div>
        <div class="flex items-center px-2 bg-white/30">
          <button
            class="p-1.5 rounded-md hover:bg-white/50 transition-colors cursor-pointer border-none bg-transparent"
            ?disabled=${this._invalid}
            @click=${() =>
              this._copyValue(
                // Copy what the user sees when it parses (round-2 review).
                parseColorString(this.type, value) != null
                  ? value
                  : colorToString[this.type](this.color),
              )}
            title=${copyLabel}
            aria-label=${copyLabel}
          >
            <span class="sr-only" aria-live="polite"
              >${this._copied ? "Copied" : ""}</span
            >
            ${
              this._copied
                ? html`<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-green-600 copied-icon"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>`
                : html`<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-gray-500"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path
                      d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                    ></path>
                  </svg>`
            }
          </button>
        </div>
      </div>
    `;
  }
}

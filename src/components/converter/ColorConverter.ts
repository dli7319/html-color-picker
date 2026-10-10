import { html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { tailwindStyles } from "../../styles/Tailwind";
import { Color } from "../../lib/Color";
import { Coordinates } from "../../lib/Coordinates";
import { styles } from "../../styles/ColorConverter.css";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";
import {
  ColorConverterInput,
  inputTypeToInputValueKey,
  InputValues,
} from "./ColorConverterInput";
import { ColorConverterInputEvent } from "../../events/ColorConverterInputEvent";
import { parseColorString } from "../../lib/ColorStringParsing";
import { forEachMatchingChild } from "../../lib/utils/dom";

@customElement("color-converter")
export class ColorConverter extends LitElement {
  static styles = [tailwindStyles, styles];

  @property({ attribute: false })
  color: Color = new Color();
  @property({ attribute: false })
  coordinates: Coordinates = { x: 0, y: 0, width: 0, height: 0 };

  @state()
  inputValues: InputValues = {};

  /** Canonical hex of the raw value most recently echoed back from typing. */
  private echoedHex: string | null = null;

  constructor() {
    super();
    this.addEventListener(ColorConverterInputEvent.eventName, (event) => {
      if (event instanceof ColorConverterInputEvent) {
        const { inputType, value, commit } = event;
        const parsedColor = parseColorString(inputType, value);
        if (parsedColor != null) {
          this.echoedHex = parsedColor.getHex();
          this.setColor(parsedColor);
          // Commit only when the value settled (blur/Enter) — committing on
          // every valid keystroke polluted history with partial parses like
          // "#336" or "51,102,2" (issue #72).
          if (commit) {
            this.dispatchEvent(new ColorPickerCommitColorEvent(parsedColor));
          }
          this.inputValues = {
            [inputTypeToInputValueKey[inputType]]: value,
          };
        }
      }
    });
  }

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  updateChildren() {
    forEachMatchingChild(this, ColorConverterInput, (c) => {
      c.inputValues = this.inputValues;
      c.color = this.color;
    });
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has("color") && !this.isEchoedColorUpdate()) {
      // External color change (drag, history, image sampling): drop the raw
      // input echo so every input reflects the new color instead of the
      // stale text last typed into one of them.
      this.inputValues = {};
      this.echoedHex = null;
    }
    this.updateChildren();
  }

  /** True when the incoming color is the one just parsed from user typing. */
  private isEchoedColorUpdate(): boolean {
    return this.echoedHex !== null && this.color.getHex() === this.echoedHex;
  }

  render() {
    const { width, height } = this.coordinates;
    const safeW = width || 1;
    const safeH = height || 1;
    const floatCoordinates = {
      x: this.coordinates.x / safeW,
      y: this.coordinates.y / safeH,
    };
    const floatCoordinatesRounded = [
      floatCoordinates.x.toFixed(3),
      floatCoordinates.y.toFixed(3),
    ];
    const intCoordinates = [
      Math.round(this.coordinates.x),
      Math.round(this.coordinates.y),
    ];
    return html`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Converter</h5>
      <div
        class="flex justify-between items-center px-4 py-2 bg-white/40 backdrop-blur-md rounded-lg text-sm font-medium mb-3"
      >
        <span class="font-semibold text-gray-700">Coordinates</span>
        <div
          id="coordinates-container"
          class="text-right text-gray-600 font-mono text-xs"
        >
          (${floatCoordinatesRounded[0]}, ${floatCoordinatesRounded[1]})<br />
          (${intCoordinates[0]}, ${intCoordinates[1]})
        </div>
      </div>
      <slot class="flex flex-col gap-2 inputs-container"></slot>
    `;
  }
}

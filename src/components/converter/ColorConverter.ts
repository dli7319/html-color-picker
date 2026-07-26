import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { tailwindStyles } from "../../styles/Tailwind";
import { Color } from "../../lib/Color";
import { Coordinates } from "../../lib/Coordinates";
import { styles } from "../../styles/ColorConverter.css";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import {
  ColorConverterInput,
  InputType,
  inputTypeToInputValueKey,
  InputValues,
} from "./ColorConverterInput";
import { ColorConverterInputEvent } from "../../events/ColorConverterInputEvent";
import { parseHexColor, parseHSLColor, parseHSVColor, parseRGB01Color, parseRGB255Color } from "../../lib/ColorStringParsing";

const typeToParseFunction = {
  [InputType.HEX]: parseHexColor,
  [InputType.RGB255]: parseRGB255Color,
  [InputType.RGB01]: parseRGB01Color,
  [InputType.HSV]: parseHSVColor,
  [InputType.HSL]: parseHSLColor,
};

@customElement("color-converter")
export class ColorConverter extends LitElement {
  static styles = [tailwindStyles, styles];

  @property({ attribute: false })
  color: Color = new Color();
  @property({ attribute: false })
  coordinates: Coordinates = { x: 0, y: 0, width: 0, height: 0 };

  @state()
  inputValues: InputValues = {};

  constructor() {
    super();
    this.addEventListener(ColorConverterInputEvent.type, (event) => {
      if (event instanceof ColorConverterInputEvent) {
        const { inputType, value } = event;
        const parsedColor = typeToParseFunction[inputType](value);
        if (parsedColor != null) {
          this.setColor(parsedColor);
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
    Array.prototype.forEach.call(this.children, (child) => {
      if (child instanceof ColorConverterInput) {
        child.inputValues = this.inputValues;
        child.color = this.color;
      }
    });
  }

  render() {
    const floatCoordinates = {
      x: this.coordinates.x / this.coordinates.width,
      y: this.coordinates.y / this.coordinates.height,
    };
    const floatCoordinatesRounded = [
      floatCoordinates.x.toFixed(3),
      floatCoordinates.y.toFixed(3),
    ];
    const intCoordinates = [
      Math.round(this.coordinates.x),
      Math.round(this.coordinates.y),
    ];
    this.updateChildren();
    return html`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Converter</h5>
      <div class="flex justify-between items-center px-4 py-2 bg-white/40 backdrop-blur-md rounded-lg text-sm font-medium mb-3">
        <span class="font-semibold text-gray-700">Coordinates</span>
        <div id="coordinates-container" class="text-right text-gray-600 font-mono text-xs">
          (${floatCoordinatesRounded[0]}, ${floatCoordinatesRounded[1]})<br />
          (${intCoordinates[0]}, ${intCoordinates[1]})
        </div>
      </div>
      <slot class="flex flex-col gap-2 inputs-container"></slot>
    `;
  }
}

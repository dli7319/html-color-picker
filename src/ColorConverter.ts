import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { bootstrap } from "./styles/Bootstrap";
import { Color } from "./lib/Color";
import { Coordinates } from "./lib/Coordinates";
import { styles } from "./styles/ColorConverter.css";
import { ColorPickerSetColorEvent } from "./events/ColorPickerSetColorEvent";
import {
  ColorConverterInput,
  InputType,
  inputTypeToInputValueKey,
  InputValues,
} from "./ColorConverterInput";
import { ColorConverterInputEvent } from "./events/ColorConverterInputEvent";
import { parseHexColor, parseHSLColor, parseHSVColor, parseRGB01Color, parseRGB255Color } from "./lib/ColorStringParsing";

const typeToParseFunction = {
  [InputType.HEX]: parseHexColor,
  [InputType.RGB255]: parseRGB255Color,
  [InputType.RGB01]: parseRGB01Color,
  [InputType.HSV]: parseHSVColor,
  [InputType.HSL]: parseHSLColor,
};

@customElement("color-converter")
export class ColorConverter extends LitElement {
  static styles = [styles];

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
            ...this.inputValues,
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
      ${bootstrap}
      <h5>Color Converter</h5>
      <table class="table mb-0 table-borderless">
        <tbody>
          <tr>
            <th scope="row">Coordinates</th>
            <td>
              <p id="coordinates-container" class="mb-0">
                (${floatCoordinatesRounded[0]}, ${floatCoordinatesRounded[1]})
                <br />
                (${intCoordinates[0]}, ${intCoordinates[1]})
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <slot class="d-flex flex-column inputs-container"></slot>
    `;
  }
}

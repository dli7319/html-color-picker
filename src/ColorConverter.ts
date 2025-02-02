import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { bootstrap } from "./styles/Bootstrap";
import Color from "./Color";
import { Coordinates } from "./Coordinates";
import { styles } from "./styles/ColorConverter";
import "./ColorConverterInput";
import { ColorPickerSetColorEvent } from "./ColorPickerSetColorEvent";
import { InputType, InputValues } from "./ColorConverterInput";

@customElement("color-converter")
export class ColorConverter extends LitElement {
  static styles = [styles];

  @property({ attribute: false })
  color: Color = new Color();
  @property({ attribute: false })
  coordinates: Coordinates = { x: 0, y: 0, width: 0, height: 0 };
  @property({ type: Boolean })
  verbose: boolean = true;

  @state()
  inputValues: InputValues = {};

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  updateFromHex(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedColor = Color.parseHex(value);
    if (parsedColor != null) {
      if (this.verbose) console.log(`Found Hex: #${parsedColor.getHex()}`);
      this.setColor(parsedColor);
      this.inputValues = { hexValue: value };
      return;
    }
    this.inputValues = {
      ...this.inputValues,
      hexValue: value,
    };
  }

  updateFromRGB255(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedColor = Color.parseRGB255(value);
    if (parsedColor != null) {
      if (this.verbose)
        console.log(
          `Found RGB255: ${parsedColor.getRGB255().splice(0, 3).toString()}`
        );
      this.setColor(parsedColor);
      this.inputValues = { rgb255Value: value };
      return;
    }
    this.inputValues = {
      ...this.inputValues,
      rgb255Value: value,
    };
  }

  updateFromRGB01(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedColor = Color.parseRGB01(value);
    if (parsedColor != null) {
      if (this.verbose)
        console.log(
          `Found RGB01: ${parsedColor.getRGB01().splice(0, 3).toString()}`
        );
      this.setColor(parsedColor);
      this.inputValues = { rgb01Value: value };
      return;
    }
    this.inputValues = {
      ...this.inputValues,
      rgb01Value: value,
    };
  }

  updateFromHSV(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedColor = Color.parseHSV(value);
    if (parsedColor != null) {
      if (this.verbose)
        console.log(
          `Found HSV: ${parsedColor.getHSV(false).splice(0, 3).toString()}`
        );
      this.setColor(parsedColor);
      this.inputValues = { hsvValue: value };
      return;
    }
    this.inputValues = {
      ...this.inputValues,
      hsvValue: value,
    };
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
      <div class="d-flex flex-column inputs-container">
        <color-converter-input
          type=${InputType.HEX}
          .inputValues=${this.inputValues}
          .color=${this.color}
          .onValueChange=${this.updateFromHex.bind(this)}
        ></color-converter-input>
        <color-converter-input
          type=${InputType.RGB255}
          .inputValues=${this.inputValues}
          .color=${this.color}
          .onValueChange=${this.updateFromRGB255.bind(this)}
        ></color-converter-input>
        <color-converter-input
          type=${InputType.RGB01}
          .inputValues=${this.inputValues}
          .color=${this.color}
          .onValueChange=${this.updateFromRGB01.bind(this)}
        ></color-converter-input>
        <color-converter-input
          type=${InputType.HSV}
          .inputValues=${this.inputValues}
          .color=${this.color}
          .onValueChange=${this.updateFromHSV.bind(this)}
        ></color-converter-input>
      </div>
    `;
  }
}

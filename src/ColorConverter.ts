import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { bootstrap } from "./styles/Bootstrap";
import Color from "./Color";
import { Coordinates } from "./Coordinates";
import { styles } from "./styles/ColorConverter";
import "./ColorConverterInput";
import { ColorPickerSetColorEvent } from "./ColorPickerSetColorEvent";

interface InputValues {
  color: Color; // Key for the color that was last updated
  hexValue?: string;
  rgb255Value?: string;
  rgb01Value?: string;
  hsvValue?: string;
}

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
  inputValues: InputValues = { color: this.color };

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  updateFromHex(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedColor = Color.parseHex(value);
    if (parsedColor != null) {
      if (this.verbose) console.log(`Found Hex: #${parsedColor.getHex()}`);
      this.setColor(parsedColor);
      this.inputValues = { color: parsedColor, hexValue: value };
      return;
    }
    this.inputValues = {
      ...this.inputValues,
      hexValue: value,
    };
  }

  updateFromRGB255(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    const parsedColor = Color.parseRGB255(value);
    if (parsedColor != null) {
      if (this.verbose)
        console.log(
          `Found RGB255: ${parsedColor.getRGB255().splice(0, 3).toString()}`
        );
      this.setColor(parsedColor);
      this.inputValues = { color: parsedColor, rgb255Value: value };
      return;
    }
    this.inputValues = {
      ...this.inputValues,
      rgb255Value: value,
    };
  }

  updateFromRGB01(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    const parsedColor = Color.parseRGB01(value);
    if (parsedColor != null) {
      if (this.verbose)
        console.log(
          `Found RGB01: ${parsedColor.getRGB01().splice(0, 3).toString()}`
        );
      this.setColor(parsedColor);
      this.inputValues = { color: parsedColor, rgb01Value: value };
      return;
    }
    this.inputValues = {
      ...this.inputValues,
      rgb01Value: value,
    };
  }

  updateFromHSV(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    const parsedColor = Color.parseHSV(value);
    if (parsedColor != null) {
      if (this.verbose)
        console.log(
          `Found HSV: ${parsedColor.getHSV(false).splice(0, 3).toString()}`
        );
      this.setColor(parsedColor);
      this.inputValues = { color: parsedColor, hsvValue: value };
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
          label="Hex"
          value=${this.inputValues.hexValue ?? "#" + this.color.getHex()}
          .onValueChange=${this.updateFromHex.bind(this)}
        ></color-converter-input>
        <color-converter-input
          label="RGB (0-255)"
          value=${this.inputValues.rgb255Value ??
          this.color.getRGB255().splice(0, 3).toString()}
          .onValueChange=${this.updateFromRGB255.bind(this)}
        ></color-converter-input>
        <color-converter-input
          label="RGB (0-1)"
          value=${this.inputValues.rgb01Value ??
          this.color
            .getRGB01()
            .splice(0, 3)
            .map((x) => x.toFixed(3))
            .toString()}
          .onValueChange=${this.updateFromRGB01.bind(this)}
        ></color-converter-input>
        <color-converter-input
          label="HSV (°, %, %)"
          value=${this.inputValues.hsvValue ??
          this.color.getHSV(false).splice(0, 3).toString()}
          .onValueChange=${this.updateFromHSV.bind(this)}
        ></color-converter-input>
      </div>
    `;
  }
}

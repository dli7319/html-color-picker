import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

import Color, { ColorInputType } from "./Color";
import { Coordinates } from "./Coordinates";
import { ActiveColorSide } from "./ColorInterpolation";
import {styles} from "./styles/ColorPicker";
import { bootstrap } from "./styles/Bootstrap";
import "./ColorSelection";
import "./ColorConverter";
import "./ImageSampling";
import "./ColorInterpolation";
import "./OtherTools";

@customElement("color-picker")
export class ColorPicker extends LitElement {
  static styles = [styles];

  @state()
  color: Color = new Color({
    type: ColorInputType.RGB255,
    r: 255,
    g: 255,
    b: 255,
  });
  @state()
  coordinates: Coordinates = {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  };
  @state()
  interpolationLeft: Color = new Color({
    type: ColorInputType.RGB255,
    r: 255,
    g: 0,
    b: 0,
  });
  @state()
  interpolationRight: Color = new Color({
    type: ColorInputType.RGB255,
    r: 255,
    g: 255,
    b: 255,
  });
  @state()
  interpolationActive: ActiveColorSide = ActiveColorSide.NONE;

  setColor(newColor: Color) {
    this.color = newColor;
    if (this.interpolationActive === ActiveColorSide.LEFT) {
      this.interpolationLeft = newColor;
    } else if (this.interpolationActive == ActiveColorSide.RIGHT) {
      this.interpolationRight = newColor;
    }
  }

  setCoordinates(newCoordinates: Coordinates) {
    this.coordinates = newCoordinates;
  }

  setInterpolationActive(newActive: ActiveColorSide) {
    this.interpolationActive = newActive;
  }

  render() {
    const background = "#" + this.color.getHex();
    this.style.background = background;
    return html` ${bootstrap}
      <div class="d-flex flex-row flex-wrap main-container">
        <color-selection
          class="component"
          .color=${this.color}
          .setColor=${this.setColor.bind(this)}
        ></color-selection>
        <color-converter
          class="component"
          .color=${this.color}
          .setColor=${this.setColor.bind(this)}
          .coordinates=${this.coordinates}
        ></color-converter>
        <image-sampling
          class="component"
          .setColor=${this.setColor.bind(this)}
          .coordinates=${this.coordinates}
          .setCoordinates=${this.setCoordinates}
        ></image-sampling>
        <color-interpolation
          class="component"
          .leftColor=${this.interpolationLeft}
          .rightColor=${this.interpolationRight}
          .activeColor=${this.interpolationActive}
          .setActiveColor=${this.setInterpolationActive.bind(this)}
          .setColor=${this.setColor.bind(this)}
        ></color-interpolation>
        <other-tools class="component"></other-tools>
      </div>`;
  }
}

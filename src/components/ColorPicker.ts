import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

import { Color, ColorInputType } from "../lib/Color";
import { Coordinates } from "../lib/Coordinates";
import { ActiveColorSide, ColorInterpolation } from "./interpolation/ColorInterpolation";
import { styles } from "../styles/ColorPicker.css";
import { tailwindStyles } from "../styles/Tailwind";
import { ColorPickerSetColorEvent } from "../events/ColorPickerSetColorEvent";
import { ColorPickerSetCoordinatesEvent } from "../events/ColorPickerSetCoordinatesEvent";
import { ColorPickerSetInterpolationActiveEvent } from "../events/ColorPickerSetInterpolationActiveEvent";
import { ColorSelection } from "./selection/ColorSelection";
import { ColorConverter } from "./converter/ColorConverter";
import { ImageSampling } from "./tools/ImageSampling";
import { ColorMaps } from "./colormaps/ColorMaps";
import "./colormaps/ColorMaps";
import "./tools/OtherTools";

@customElement("color-picker")
export class ColorPicker extends LitElement {
  static styles = [tailwindStyles, styles];

  @state()
  color: Color = new Color({
    type: ColorInputType.RGB255,
    r: 71,
    g: 85,
    b: 105,
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

  constructor() {
    super();
    this.addEventListener(
      ColorPickerSetColorEvent.eventName,
      (event: Event) => {
        if (event instanceof ColorPickerSetColorEvent) {
          this.setColor(event.color);
        }
      },
    );
    this.addEventListener(
      ColorPickerSetCoordinatesEvent.eventName,
      (event: Event) => {
        if (event instanceof ColorPickerSetCoordinatesEvent) {
          this.setCoordinates(event.coordinates);
        }
      },
    );
    this.addEventListener(
      ColorPickerSetInterpolationActiveEvent.eventName,
      (event: Event) => {
        if (event instanceof ColorPickerSetInterpolationActiveEvent) {
          this.setInterpolationActive(event.active);
        }
      },
    );
  }

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

  updateChildren() {
    Array.prototype.forEach.call(this.children, (child) => {
      if (child instanceof ColorSelection) {
        child.color = this.color;
      } else if (child instanceof ColorConverter) {
        child.color = this.color;
        child.coordinates = this.coordinates;
      } else if (child instanceof ImageSampling) {
        child.coordinates = this.coordinates;
      } else if (child instanceof ColorInterpolation) {
        child.leftColor = this.interpolationLeft;
        child.rightColor = this.interpolationRight;
        child.activeColor = this.interpolationActive;
      } else if (child instanceof ColorMaps) {
        child.color = this.color;
      }
    });
  }

  render() {
    this.style.background = "#" + this.color.getHex();
    this.updateChildren();
    return html`<slot class="main-container"></slot>`;
  }
}

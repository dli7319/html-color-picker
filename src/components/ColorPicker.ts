import { html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { Color, ColorInputType } from "../lib/Color";
import { Coordinates } from "../lib/Coordinates";
import {
  ActiveColorSide,
  ColorInterpolation,
} from "./interpolation/ColorInterpolation";
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
import { ColorPalette } from "./tools/ColorPalette";
import "./tools/ColorPalette";
import "./tools/ColorHistory";
import "./tools/OtherTools";
import { ColorPickerSetPaletteActiveEvent } from "../events/ColorPickerSetPaletteActiveEvent";
import { forEachMatchingChild } from "../lib/utils/dom";
import { storageGet, storageSet } from "../lib/utils/storage";

const INTERPOLATION_STORAGE_KEY = "color-interpolation-store";

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
  @state()
  paletteActiveIndex: number = -1;

  /** When true, sets document.body.style.background to the current color on change. */
  @property({ type: Boolean })
  updateBodyBackground = false;

  constructor() {
    super();
    this.loadLastColor();
    this.loadInterpolationState();
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
    this.addEventListener(
      ColorPickerSetPaletteActiveEvent.eventName,
      (event: Event) => {
        if (event instanceof ColorPickerSetPaletteActiveEvent) {
          this.paletteActiveIndex = event.index;
        }
      },
    );
  }

  private loadLastColor() {
    const hex = storageGet<string | null>("last-active-color", null);
    if (hex) {
      this.color = new Color({ type: ColorInputType.HEX, hex });
    }
  }

  private loadInterpolationState() {
    const data = storageGet<{
      left?: string;
      right?: string;
      active?: string;
    } | null>(INTERPOLATION_STORAGE_KEY, null);
    if (!data) return;
    if (data.left) {
      this.interpolationLeft = new Color({
        type: ColorInputType.HEX,
        hex: data.left,
      });
    }
    if (data.right) {
      this.interpolationRight = new Color({
        type: ColorInputType.HEX,
        hex: data.right,
      });
    }
    if (data.active) {
      this.interpolationActive = data.active as ActiveColorSide;
    }
  }

  private saveInterpolationState() {
    storageSet(INTERPOLATION_STORAGE_KEY, {
      left: this.interpolationLeft.getHex(),
      right: this.interpolationRight.getHex(),
      active: this.interpolationActive,
    });
  }

  setColor(newColor: Color) {
    this.color = newColor;
    this.syncInterpolationEndpoint(newColor);
  }

  /** Updates the active interpolation endpoint to match the current color. */
  private syncInterpolationEndpoint(color: Color) {
    if (this.interpolationActive === ActiveColorSide.LEFT) {
      this.interpolationLeft = color;
      this.saveInterpolationState();
    } else if (this.interpolationActive === ActiveColorSide.RIGHT) {
      this.interpolationRight = color;
      this.saveInterpolationState();
    }
  }

  setCoordinates(newCoordinates: Coordinates) {
    this.coordinates = newCoordinates;
  }

  setInterpolationActive(newActive: ActiveColorSide) {
    this.interpolationActive = newActive;
    this.saveInterpolationState();
  }

  updateChildren() {
    forEachMatchingChild(this, ColorSelection, (c) => {
      c.color = this.color;
    });
    forEachMatchingChild(this, ColorConverter, (c) => {
      c.color = this.color;
      c.coordinates = this.coordinates;
    });
    forEachMatchingChild(this, ImageSampling, (c) => {
      c.coordinates = this.coordinates;
    });
    forEachMatchingChild(this, ColorInterpolation, (c) => {
      c.leftColor = this.interpolationLeft;
      c.rightColor = this.interpolationRight;
      c.activeColor = this.interpolationActive;
    });
    forEachMatchingChild(this, ColorMaps, (c) => {
      c.color = this.color;
    });
    forEachMatchingChild(this, ColorPalette, (c) => {
      c.activeEditingColor = this.color;
    });
  }

  updated(changedProperties: PropertyValues) {
    if (this.updateBodyBackground && changedProperties.has("color")) {
      document.body.style.background = "#" + this.color.getHex();
    }
    this.updateChildren();
  }

  render() {
    return html`<slot class="main-container"></slot>`;
  }
}

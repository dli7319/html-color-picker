import { Color } from "../lib/Color";

export class ColorPickerSetColorEvent extends Event {
  static readonly eventName = "set-color";
  color: Color;

  constructor(color: Color) {
    super(ColorPickerSetColorEvent.eventName, {
      bubbles: true,
      composed: true,
    });
    this.color = color;
  }
}

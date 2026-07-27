import { Color } from "../lib/Color";

export class ColorPickerCommitColorEvent extends Event {
  static readonly eventName = "commit-color";
  color: Color;

  constructor(color: Color) {
    super(ColorPickerCommitColorEvent.eventName, {
      bubbles: true,
      composed: true,
    });
    this.color = color;
  }
}

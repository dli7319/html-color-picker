import { Coordinates } from "../lib/Coordinates";

export class ColorPickerSetCoordinatesEvent extends Event {
  static readonly eventName = "set-coordinates";
  coordinates: Coordinates;

  constructor(coordinates: Coordinates) {
    super(ColorPickerSetCoordinatesEvent.eventName, {
      bubbles: true,
      composed: true,
    });
    this.coordinates = coordinates;
  }
}

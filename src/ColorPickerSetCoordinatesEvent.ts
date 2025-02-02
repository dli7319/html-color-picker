import { Coordinates } from "./Coordinates";

export class ColorPickerSetCoordinatesEvent extends Event {
  static eventName = "set-coordinates";
  coordinates: Coordinates;

  constructor(coordinates: Coordinates) {
    super(ColorPickerSetCoordinatesEvent.eventName, {
      bubbles: true,
      composed: true,
    });
    this.coordinates = coordinates;
  }
}

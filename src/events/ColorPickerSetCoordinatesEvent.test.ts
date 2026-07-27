// @vitest-environment node
import { describe, it, expect } from "vitest";
import { Coordinates } from "../lib/Coordinates";
import { ColorPickerSetCoordinatesEvent } from "./ColorPickerSetCoordinatesEvent";

describe("ColorPickerSetCoordinatesEvent", () => {
  const testCoordinates: Coordinates = {
    x: 10,
    y: 20,
    width: 800,
    height: 600,
  };

  it("has the correct eventName static property", () => {
    expect(ColorPickerSetCoordinatesEvent.eventName).toBe("set-coordinates");
  });

  it("creates an Event instance", () => {
    const event = new ColorPickerSetCoordinatesEvent(testCoordinates);
    expect(event instanceof Event).toBe(true);
  });

  it("sets the coordinates property", () => {
    const event = new ColorPickerSetCoordinatesEvent(testCoordinates);
    expect(event.coordinates).toBe(testCoordinates);
  });

  it("has bubbles: true", () => {
    const event = new ColorPickerSetCoordinatesEvent(testCoordinates);
    expect(event.bubbles).toBe(true);
  });

  it("has composed: true", () => {
    const event = new ColorPickerSetCoordinatesEvent(testCoordinates);
    expect(event.composed).toBe(true);
  });
});

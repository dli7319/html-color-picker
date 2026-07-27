// @vitest-environment node
import { describe, it, expect } from "vitest";
import { Color } from "../lib/Color";
import { ColorPickerSetColorEvent } from "./ColorPickerSetColorEvent";

describe("ColorPickerSetColorEvent", () => {
  it("has the correct eventName static property", () => {
    expect(ColorPickerSetColorEvent.eventName).toBe("set-color");
  });

  it("creates an Event instance", () => {
    const color = Color.fromRGB255Array([255, 128, 0]);
    const event = new ColorPickerSetColorEvent(color);
    expect(event instanceof Event).toBe(true);
  });

  it("sets the color property", () => {
    const color = Color.fromRGB255Array([255, 128, 0]);
    const event = new ColorPickerSetColorEvent(color);
    expect(event.color).toBe(color);
  });

  it("has bubbles: true", () => {
    const color = Color.fromRGB255Array([255, 128, 0]);
    const event = new ColorPickerSetColorEvent(color);
    expect(event.bubbles).toBe(true);
  });

  it("has composed: true", () => {
    const color = Color.fromRGB255Array([255, 128, 0]);
    const event = new ColorPickerSetColorEvent(color);
    expect(event.composed).toBe(true);
  });
});

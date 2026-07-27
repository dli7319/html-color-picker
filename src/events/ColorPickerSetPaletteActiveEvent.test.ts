// @vitest-environment node
import { describe, it, expect } from "vitest";
import { ColorPickerSetPaletteActiveEvent } from "./ColorPickerSetPaletteActiveEvent";

describe("ColorPickerSetPaletteActiveEvent", () => {
  it("has the correct eventName static property", () => {
    expect(ColorPickerSetPaletteActiveEvent.eventName).toBe(
      "set-palette-active",
    );
  });

  it("creates an Event instance", () => {
    const event = new ColorPickerSetPaletteActiveEvent(0);
    expect(event instanceof Event).toBe(true);
  });

  it("sets the index property", () => {
    const event = new ColorPickerSetPaletteActiveEvent(3);
    expect(event.index).toBe(3);
  });

  it("has bubbles: true", () => {
    const event = new ColorPickerSetPaletteActiveEvent(0);
    expect(event.bubbles).toBe(true);
  });

  it("has composed: true", () => {
    const event = new ColorPickerSetPaletteActiveEvent(0);
    expect(event.composed).toBe(true);
  });
});

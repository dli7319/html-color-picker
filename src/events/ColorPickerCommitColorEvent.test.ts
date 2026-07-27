// @vitest-environment node
import { describe, it, expect } from "vitest";
import { Color } from "../lib/Color";
import { ColorPickerCommitColorEvent } from "./ColorPickerCommitColorEvent";

describe("ColorPickerCommitColorEvent", () => {
  it("has the correct eventName static property", () => {
    expect(ColorPickerCommitColorEvent.eventName).toBe("commit-color");
  });

  it("creates an Event instance", () => {
    const color = Color.fromRGB255Array([255, 128, 0]);
    const event = new ColorPickerCommitColorEvent(color);
    expect(event instanceof Event).toBe(true);
  });

  it("sets the color property", () => {
    const color = Color.fromRGB255Array([255, 128, 0]);
    const event = new ColorPickerCommitColorEvent(color);
    expect(event.color).toBe(color);
  });

  it("has bubbles: true", () => {
    const color = Color.fromRGB255Array([255, 128, 0]);
    const event = new ColorPickerCommitColorEvent(color);
    expect(event.bubbles).toBe(true);
  });

  it("has composed: true", () => {
    const color = Color.fromRGB255Array([255, 128, 0]);
    const event = new ColorPickerCommitColorEvent(color);
    expect(event.composed).toBe(true);
  });
});

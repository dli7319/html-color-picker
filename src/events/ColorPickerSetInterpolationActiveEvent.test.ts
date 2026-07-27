// @vitest-environment node
import { describe, it, expect } from "vitest";
import { ActiveColorSide } from "../components/interpolation/ColorInterpolation";
import { ColorPickerSetInterpolationActiveEvent } from "./ColorPickerSetInterpolationActiveEvent";

describe("ColorPickerSetInterpolationActiveEvent", () => {
  it("has the correct eventName static property", () => {
    expect(ColorPickerSetInterpolationActiveEvent.eventName).toBe(
      "set-interpolation-active",
    );
  });

  it("creates an Event instance", () => {
    const event = new ColorPickerSetInterpolationActiveEvent(
      ActiveColorSide.LEFT,
    );
    expect(event instanceof Event).toBe(true);
  });

  it("sets the active property", () => {
    const event = new ColorPickerSetInterpolationActiveEvent(
      ActiveColorSide.RIGHT,
    );
    expect(event.active).toBe(ActiveColorSide.RIGHT);
  });

  it("has bubbles: true", () => {
    const event = new ColorPickerSetInterpolationActiveEvent(
      ActiveColorSide.LEFT,
    );
    expect(event.bubbles).toBe(true);
  });

  it("has composed: true", () => {
    const event = new ColorPickerSetInterpolationActiveEvent(
      ActiveColorSide.LEFT,
    );
    expect(event.composed).toBe(true);
  });

  it("accepts ActiveColorSide.NONE", () => {
    const event = new ColorPickerSetInterpolationActiveEvent(
      ActiveColorSide.NONE,
    );
    expect(event.active).toBe(ActiveColorSide.NONE);
  });
});

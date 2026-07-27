// @vitest-environment node
import { describe, it, expect } from "vitest";
import { InputType } from "../components/converter/ColorConverterInput";
import { ColorConverterInputEvent } from "./ColorConverterInputEvent";

describe("ColorConverterInputEvent", () => {
  it("has the correct eventName static property", () => {
    expect(ColorConverterInputEvent.eventName).toBe("color-converter-input");
  });

  it("creates an Event instance", () => {
    const event = new ColorConverterInputEvent(InputType.HEX, "#ff8000");
    expect(event instanceof Event).toBe(true);
  });

  it("sets the inputType property", () => {
    const event = new ColorConverterInputEvent(InputType.RGB255, "255,128,0");
    expect(event.inputType).toBe(InputType.RGB255);
  });

  it("sets the value property", () => {
    const event = new ColorConverterInputEvent(InputType.HSL, "0,100,50");
    expect(event.value).toBe("0,100,50");
  });

  it("has bubbles: true", () => {
    const event = new ColorConverterInputEvent(InputType.HEX, "#ff8000");
    expect(event.bubbles).toBe(true);
  });

  it("has composed: true", () => {
    const event = new ColorConverterInputEvent(InputType.HEX, "#ff8000");
    expect(event.composed).toBe(true);
  });

  it("works with all InputType values", () => {
    const hexEvent = new ColorConverterInputEvent(InputType.HEX, "#000000");
    const rgb255Event = new ColorConverterInputEvent(InputType.RGB255, "0,0,0");
    const rgb01Event = new ColorConverterInputEvent(InputType.RGB01, "0,0,0");
    const hsvEvent = new ColorConverterInputEvent(InputType.HSV, "0,0,0");
    const hslEvent = new ColorConverterInputEvent(InputType.HSL, "0,0,0");

    expect(hexEvent.inputType).toBe(InputType.HEX);
    expect(rgb255Event.inputType).toBe(InputType.RGB255);
    expect(rgb01Event.inputType).toBe(InputType.RGB01);
    expect(hsvEvent.inputType).toBe(InputType.HSV);
    expect(hslEvent.inputType).toBe(InputType.HSL);
  });
});

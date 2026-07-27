import { describe, it, expect } from "vitest";
import "./ColorConverterInput";
import {
  ColorConverterInput,
  InputType,
  inputTypeToInputValueKey,
} from "./ColorConverterInput";
import { ColorConverterInputEvent } from "../../events/ColorConverterInputEvent";

// ---------------------------------------------------------------------------
// ColorConverterInput (<color-converter-input>)
// ---------------------------------------------------------------------------
describe("ColorConverterInput", () => {
  // -----------------------------------------------------------------------
  // 1. Custom element registration
  // -----------------------------------------------------------------------
  describe("custom element", () => {
    it('is defined as "color-converter-input"', () => {
      const el = document.createElement("color-converter-input");
      expect(el).toBeInstanceOf(HTMLElement);
    });

    it("is registered in the custom elements registry", () => {
      expect(customElements.get("color-converter-input")).toBeDefined();
    });
  });

  // -----------------------------------------------------------------------
  // 2. Default property values
  // -----------------------------------------------------------------------
  describe("default properties", () => {
    it("has default type of HEX", async () => {
      const el = document.createElement(
        "color-converter-input",
      ) as ColorConverterInput;
      document.body.appendChild(el);
      await el.updateComplete;
      expect(el.type).toBe(InputType.HEX);
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 3. Label rendering for each InputType
  // -----------------------------------------------------------------------
  describe("label rendering", () => {
    const testCases: Array<{ type: InputType; expectedLabel: string }> = [
      { type: InputType.HEX, expectedLabel: "Hex" },
      { type: InputType.RGB255, expectedLabel: "RGB (0-255)" },
      { type: InputType.RGB01, expectedLabel: "RGB (0-1)" },
      { type: InputType.HSV, expectedLabel: "HSV" },
      { type: InputType.HSL, expectedLabel: "HSL" },
    ];

    testCases.forEach(({ type, expectedLabel }) => {
      it(`renders label "${expectedLabel}" for type ${type}`, async () => {
        const el = document.createElement(
          "color-converter-input",
        ) as ColorConverterInput;
        el.type = type;
        document.body.appendChild(el);
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector("label")!;
        expect(label.textContent).toBe(expectedLabel);
        document.body.removeChild(el);
      });
    });
  });

  // -----------------------------------------------------------------------
  // 4. Input value falls back to colorToString when inputValues is empty
  // -----------------------------------------------------------------------
  describe("input value fallback to colorToString", () => {
    const testCases: Array<{ type: InputType; expectedValue: string }> = [
      { type: InputType.HEX, expectedValue: "#000000" },
      { type: InputType.RGB255, expectedValue: "0,0,0" },
      { type: InputType.RGB01, expectedValue: "0.000,0.000,0.000" },
      { type: InputType.HSV, expectedValue: "0,0,0" },
      { type: InputType.HSL, expectedValue: "0,0,0" },
    ];

    testCases.forEach(({ type, expectedValue }) => {
      it(`uses colorToString for type ${type} when inputValues is empty`, async () => {
        const el = document.createElement(
          "color-converter-input",
        ) as ColorConverterInput;
        el.type = type;
        document.body.appendChild(el);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector("input") as HTMLInputElement;
        expect(input.value).toBe(expectedValue);
        document.body.removeChild(el);
      });
    });
  });

  // -----------------------------------------------------------------------
  // 5. Input value uses inputValues prop when provided
  // -----------------------------------------------------------------------
  describe("input value from inputValues prop", () => {
    it("uses inputValues for HEX type", async () => {
      const el = document.createElement(
        "color-converter-input",
      ) as ColorConverterInput;
      el.type = InputType.HEX;
      el.inputValues = { hexValue: "#ff8000" };
      document.body.appendChild(el);
      await el.updateComplete;
      const input = el.shadowRoot!.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe("#ff8000");
      document.body.removeChild(el);
    });

    it("uses inputValues for RGB255 type", async () => {
      const el = document.createElement(
        "color-converter-input",
      ) as ColorConverterInput;
      el.type = InputType.RGB255;
      el.inputValues = { rgb255Value: "128,128,128" };
      document.body.appendChild(el);
      await el.updateComplete;
      const input = el.shadowRoot!.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe("128,128,128");
      document.body.removeChild(el);
    });

    it("uses inputValues for RGB01 type", async () => {
      const el = document.createElement(
        "color-converter-input",
      ) as ColorConverterInput;
      el.type = InputType.RGB01;
      el.inputValues = { rgb01Value: "0.5,0.5,0.5" };
      document.body.appendChild(el);
      await el.updateComplete;
      const input = el.shadowRoot!.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe("0.5,0.5,0.5");
      document.body.removeChild(el);
    });

    it("uses inputValues for HSV type", async () => {
      const el = document.createElement(
        "color-converter-input",
      ) as ColorConverterInput;
      el.type = InputType.HSV;
      el.inputValues = { hsvValue: "180,50,75" };
      document.body.appendChild(el);
      await el.updateComplete;
      const input = el.shadowRoot!.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe("180,50,75");
      document.body.removeChild(el);
    });

    it("uses inputValues for HSL type", async () => {
      const el = document.createElement(
        "color-converter-input",
      ) as ColorConverterInput;
      el.type = InputType.HSL;
      el.inputValues = { hslValue: "200,100,50" };
      document.body.appendChild(el);
      await el.updateComplete;
      const input = el.shadowRoot!.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe("200,100,50");
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 6. Event dispatch on input change
  // -----------------------------------------------------------------------
  describe("event dispatch", () => {
    it("dispatches ColorConverterInputEvent with correct type and value on input", async () => {
      const el = document.createElement(
        "color-converter-input",
      ) as ColorConverterInput;
      el.type = InputType.HEX;
      document.body.appendChild(el);
      await el.updateComplete;

      const eventPromise = new Promise<ColorConverterInputEvent>((resolve) => {
        el.addEventListener(
          "color-converter-input",
          (e) => {
            resolve(e as ColorConverterInputEvent);
          },
          { once: true },
        );
      });

      const input = el.shadowRoot!.querySelector("input") as HTMLInputElement;
      input.value = "#ff8000";
      input.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );

      const event = await eventPromise;
      expect(event.inputType).toBe(InputType.HEX);
      expect(event.value).toBe("#ff8000");
      document.body.removeChild(el);
    });

    it("dispatches event with current type when type is not HEX", async () => {
      const el = document.createElement(
        "color-converter-input",
      ) as ColorConverterInput;
      el.type = InputType.RGB255;
      document.body.appendChild(el);
      await el.updateComplete;

      const eventPromise = new Promise<ColorConverterInputEvent>((resolve) => {
        el.addEventListener(
          "color-converter-input",
          (e) => {
            resolve(e as ColorConverterInputEvent);
          },
          { once: true },
        );
      });

      const input = el.shadowRoot!.querySelector("input") as HTMLInputElement;
      input.value = "255,128,0";
      input.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );

      const event = await eventPromise;
      expect(event.inputType).toBe(InputType.RGB255);
      expect(event.value).toBe("255,128,0");
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 7. sl-copy-button element exists in shadow DOM
  // -----------------------------------------------------------------------
  describe("copy button", () => {
    it("renders an sl-copy-button element", async () => {
      const el = document.createElement(
        "color-converter-input",
      ) as ColorConverterInput;
      document.body.appendChild(el);
      await el.updateComplete;
      const copyButton = el.shadowRoot!.querySelector("sl-copy-button");
      expect(copyButton).not.toBeNull();
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 8. inputTypeToInputValueKey mapping
  // -----------------------------------------------------------------------
  describe("inputTypeToInputValueKey", () => {
    it("maps HEX to hexValue", () => {
      expect(inputTypeToInputValueKey[InputType.HEX]).toBe("hexValue");
    });
    it("maps RGB255 to rgb255Value", () => {
      expect(inputTypeToInputValueKey[InputType.RGB255]).toBe("rgb255Value");
    });
    it("maps RGB01 to rgb01Value", () => {
      expect(inputTypeToInputValueKey[InputType.RGB01]).toBe("rgb01Value");
    });
    it("maps HSV to hsvValue", () => {
      expect(inputTypeToInputValueKey[InputType.HSV]).toBe("hsvValue");
    });
    it("maps HSL to hslValue", () => {
      expect(inputTypeToInputValueKey[InputType.HSL]).toBe("hslValue");
    });
  });
});

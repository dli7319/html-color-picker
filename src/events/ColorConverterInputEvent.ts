import { InputType } from "../components/converter/ColorConverterInput";

export class ColorConverterInputEvent extends Event {
  static readonly eventName = "color-converter-input";
  inputType: InputType;
  value: string;

  constructor(inputType: InputType, value: string) {
    super(ColorConverterInputEvent.eventName, { bubbles: true, composed: true });
    this.inputType = inputType;
    this.value = value;
  }
}

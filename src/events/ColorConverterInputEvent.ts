import { InputType } from "../ColorConverterInput";

export class ColorConverterInputEvent extends Event {
  static readonly type = "color-converter-input";
  inputType: InputType;
  value: string;

  constructor(inputType: InputType, value: string) {
    super(ColorConverterInputEvent.type, { bubbles: true, composed: true });
    this.inputType = inputType;
    this.value = value;
  }
}

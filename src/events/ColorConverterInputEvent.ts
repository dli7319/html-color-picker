import { InputType } from "../components/converter/ColorConverterInput";

export class ColorConverterInputEvent extends Event {
  static readonly eventName = "color-converter-input";
  inputType: InputType;
  value: string;
  /** True when the value settled (blur/Enter) and should commit to history. */
  commit: boolean;

  constructor(inputType: InputType, value: string, commit: boolean = false) {
    super(ColorConverterInputEvent.eventName, {
      bubbles: true,
      composed: true,
    });
    this.inputType = inputType;
    this.value = value;
    this.commit = commit;
  }
}

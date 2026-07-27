export class ColorPickerSetPaletteActiveEvent extends Event {
  static readonly eventName = "set-palette-active";
  index: number;

  constructor(index: number) {
    super(ColorPickerSetPaletteActiveEvent.eventName, {
      bubbles: true,
      composed: true,
    });
    this.index = index;
  }
}

import { LitElement } from "lit";
import { property } from "lit/decorators.js";

import { Color } from "../../lib/Color";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";

/**
 * Shared base class for selection components (HSL wheel/bar, HSV grad/bar).
 * Provides the common color property, setColor/commitColor event dispatch,
 * and the lastCommittedColor tracking field.
 */
export class ColorSelectionBase extends LitElement {
  @property({ attribute: false })
  color: Color = new Color();

  protected lastCommittedColor: Color = this.color;

  setColor(color: Color) {
    this.lastCommittedColor = color;
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  commitColor() {
    this.dispatchEvent(new ColorPickerCommitColorEvent(this.lastCommittedColor));
  }
}

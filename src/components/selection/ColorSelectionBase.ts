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

  private commitTimer: ReturnType<typeof setTimeout> | null = null;

  setColor(color: Color) {
    this.lastCommittedColor = color;
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  commitColor() {
    this.dispatchEvent(
      new ColorPickerCommitColorEvent(this.lastCommittedColor),
    );
  }

  /**
   * Debounced commit for keyboard nudges: one continuous arrow-key gesture
   * becomes one history entry instead of one per keypress.
   */
  protected commitColorSoon(delayMs: number = 500) {
    if (this.commitTimer) clearTimeout(this.commitTimer);
    this.commitTimer = setTimeout(() => this.commitColor(), delayMs);
  }
}

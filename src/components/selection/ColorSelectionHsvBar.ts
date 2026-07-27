import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { clamp } from "../../lib/utils/math";
import { Color, ColorInputType } from "../../lib/Color";
import { styles } from "../../styles/ColorSelectionTypeA.css";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";
import { DragController } from "../../controllers/DragController";
import "./ColorBarPointer";

@customElement("color-selection-hsv-bar")
export class ColorSelectionHsvBar extends LitElement {
  static styles = [styles];

  @property({ attribute: false })
  color: Color = new Color();

  @query("#color-bar")
  colorBar!: HTMLDivElement;

  private lastCommittedColor: Color = this.color;

  private drag = new DragController(this, {
    onDrag: (e: MouseEvent) => {
      const [, saturation, value] = this.color.getHSV();
      const rect = this.colorBar.getBoundingClientRect();
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const newHue = x * 360;
      this.setColor(
        new Color({
          type: ColorInputType.HSV,
          h: newHue,
          s: saturation,
          v: value,
        })
      );
    },
    onDragEnd: () => {
      this.commitColor();
    },
  });

  setColor(color: Color) {
    this.lastCommittedColor = color;
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  commitColor() {
    this.dispatchEvent(new ColorPickerCommitColorEvent(this.lastCommittedColor));
  }

  render() {
    const [hue] = this.color.getHSV();
    const hueColorHex =
      "#" +
      new Color({
        type: ColorInputType.HSV,
        h: hue,
        s: 100,
        v: 100,
      }).getHex();
    return html`
      <div class="color-bar" @mousedown=${this.drag.handleMouseDown} id="color-bar">
        <color-bar-pointer
          .position=${(hue / 360) * 100}
          .color=${hueColorHex}
        ></color-bar-pointer>
      </div>
    `;
  }
}


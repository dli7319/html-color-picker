import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { clamp } from "./lib/utils/math";
import { Color, ColorInputType } from "./lib/Color";
import { styles } from "./styles/ColorSelectionTypeA.css";
import { bootstrap } from "./styles/Bootstrap";
import { ColorPickerSetColorEvent } from "./events/ColorPickerSetColorEvent";
import "./ColorSelectionTypeABarPointer";

@customElement("color-selection-type-a-bar")
export class ColorSelectionTypeABar extends LitElement {
  static styles = [styles];

  @property({ attribute: false })
  color: Color = new Color();

  @query("#color-bar")
  colorBar!: HTMLDivElement;

  private onMouseMoveBound = this.onMouseMove.bind(this);
  private onMouseUpBound = this.onMouseUp.bind(this);

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  onMouseMove(e: MouseEvent) {
    const [, saturation, value] = this.color.getHSV();
    const mouseDown = e.buttons == 1;
    if (mouseDown) {
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
    }
  }

  onMouseDown() {
    document.addEventListener("mousemove", this.onMouseMoveBound);
    document.addEventListener("mouseup", this.onMouseUpBound);
  }

  onMouseUp() {
    document.removeEventListener("mousemove", this.onMouseMoveBound);
    document.removeEventListener("mouseup", this.onMouseUpBound);
  }

  render() {
    const [hue] = this.color.getHSV();
    return html`
      ${bootstrap}
      <div class="color-bar" @mousedown=${this.onMouseDown} id="color-bar">
        <color-selection-type-a-bar-pointer
          hue=${hue}
        ></color-selection-type-a-bar-pointer>
      </div>
    `;
  }
}

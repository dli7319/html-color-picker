import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { Color, ColorInputType } from "./lib/Color";
import { ColorPickerSetColorEvent } from "./events/ColorPickerSetColorEvent";
import "./ColorSelectionTypeBBarPointer";
import { clamp } from "./lib/utils/math";

@customElement("color-selection-type-b-bar")
export class ColorSelectionTypeBBar extends LitElement {
  static styles = css`
    .color-bar {
      position: relative;
      width: 100%;
      height: 1.5rem;
      margin-top: 0.5rem;
      border-radius: 0.25rem;
    }
  `;

  @property({ attribute: false })
  color: Color = new Color();

  @query("#color-bar")
  colorBar!: HTMLDivElement;

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  onMouseMove = (e: MouseEvent) => {
    const [hue, saturation] = this.color.getHSL();
    const rect = this.colorBar.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const newLightness = x * 100;
    this.setColor(
      new Color({
        type: ColorInputType.HSL,
        h: hue,
        s: saturation,
        l: newLightness,
      }),
    );
  };

  onMouseDown = () => {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  };

  onMouseUp = () => {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  };

  render() {
    const [hue, saturation] = this.color.getHSL();
    const backgroundStyleArray = ["background: linear-gradient(", "to right,"];
    for (let i = 0; i <= 100; i++) {
      const lightness = i;
      backgroundStyleArray.push(
        `hsl(${hue}deg, ${saturation}%, ${lightness}%) ${i}%` +
          (i < 100 ? "," : ""),
      );
    }
    backgroundStyleArray.push(");");
    const backgroundStyle = backgroundStyleArray.join("\n");
    return html`
      <div
        class="color-bar"
        @mousedown=${this.onMouseDown}
        id="color-bar"
        style=${backgroundStyle}
      >
        <color-selection-type-b-bar-pointer
          .color=${this.color}
        ></color-selection-type-b-bar-pointer>
      </div>
    `;
  }
}

import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { Color, ColorInputType } from "../../lib/Color";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";
import { clamp } from "../../lib/utils/math";
import { DragController } from "../../controllers/DragController";
import "./ColorBarPointer";

@customElement("color-selection-hsl-bar")
export class ColorSelectionHslBar extends LitElement {
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

  private lastCommittedColor: Color = this.color;

  private drag = new DragController(this, {
    onDrag: (e: MouseEvent) => {
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
    const [hue, saturation, lightness] = this.color.getHSL();
    const hueColorHex = "#" + this.color.getHex();
    const backgroundStyleArray = ["background: linear-gradient(", "to right,"];
    for (let i = 0; i <= 100; i++) {
      backgroundStyleArray.push(
        `hsl(${hue}deg, ${saturation}%, ${i}%) ${i}%` +
          (i < 100 ? "," : ""),
      );
    }
    backgroundStyleArray.push(");");
    const backgroundStyle = backgroundStyleArray.join("\n");
    return html`
      <div
        class="color-bar"
        @mousedown=${this.drag.handleMouseDown}
        id="color-bar"
        style=${backgroundStyle}
      >
        <color-bar-pointer
          .position=${lightness}
          .color=${hueColorHex}
        ></color-bar-pointer>
      </div>
    `;
  }
}


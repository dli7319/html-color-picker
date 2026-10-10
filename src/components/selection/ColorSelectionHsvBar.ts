import { html } from "lit";
import { customElement, query } from "lit/decorators.js";

import { clamp } from "../../lib/utils/math";
import { Color, ColorInputType } from "../../lib/Color";
import { styles } from "../../styles/ColorSelectionTypeA.css";
import { dragSurfaceStyles } from "../../styles/DragSurface";
import { reducedMotionStyles } from "../../styles/Motion";
import { ColorSelectionBase } from "./ColorSelectionBase";
import { DragController } from "../../controllers/DragController";
import "./ColorBarPointer";

@customElement("color-selection-hsv-bar")
export class ColorSelectionHsvBar extends ColorSelectionBase {
  static styles = [reducedMotionStyles, styles, dragSurfaceStyles];

  @query("#color-bar")
  colorBar!: HTMLDivElement;

  private handlePointer = (e: MouseEvent) => {
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
      }),
    );
  };

  /** Arrow keys nudge hue; Shift = fine steps (issue #75). */
  private handleKeydown = (e: KeyboardEvent) => {
    const [hue, saturation, value] = this.color.getHSV();
    const step = e.shiftKey ? 0.1 : 1;
    let h = hue;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        h = (hue - step + 360) % 360;
        break;
      case "ArrowRight":
      case "ArrowUp":
        h = (hue + step) % 360;
        break;
      default:
        return;
    }
    e.preventDefault();
    this.setColor(
      new Color({ type: ColorInputType.HSV, h, s: saturation, v: value }),
    );
    this.commitColorSoon();
  };

  private drag = new DragController(this, {
    onDragStart: this.handlePointer,
    onDrag: this.handlePointer,
    onDragEnd: () => {
      this.commitColor();
    },
  });

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
      <div
        class="color-bar drag-surface"
        @pointerdown=${this.drag.handlePointerDown}
        @keydown=${this.handleKeydown}
        id="color-bar"
        tabindex="0"
        role="slider"
        aria-label="Hue"
        aria-valuemin="0"
        aria-valuemax="360"
        aria-valuenow=${Math.round(hue)}
        aria-valuetext="${Math.round(hue)} degrees"
      >
        <color-bar-pointer
          .position=${(hue / 360) * 100}
          .color=${hueColorHex}
        ></color-bar-pointer>
      </div>
    `;
  }
}

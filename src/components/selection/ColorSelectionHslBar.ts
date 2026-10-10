import { css, html } from "lit";
import { customElement, query } from "lit/decorators.js";

import { Color, ColorInputType } from "../../lib/Color";
import { clamp } from "../../lib/utils/math";
import { ColorSelectionBase } from "./ColorSelectionBase";
import { DragController } from "../../controllers/DragController";
import { dragSurfaceStyles } from "../../styles/DragSurface";
import { reducedMotionStyles } from "../../styles/Motion";
import "./ColorBarPointer";

@customElement("color-selection-hsl-bar")
export class ColorSelectionHslBar extends ColorSelectionBase {
  static styles = [
    reducedMotionStyles,
    css`
      .color-bar {
        position: relative;
        width: 100%;
        height: 1.5rem;
        margin-top: 0.5rem;
        border-radius: 0.25rem;
      }
    `,
    dragSurfaceStyles,
  ];

  @query("#color-bar")
  colorBar!: HTMLDivElement;

  private handlePointer = (e: MouseEvent) => {
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

  /** Arrow keys nudge lightness; Shift = fine steps (issue #75). */
  private handleKeydown = (e: KeyboardEvent) => {
    const [hue, saturation, lightness] = this.color.getHSL();
    const step = e.shiftKey ? 0.1 : 1;
    let l = lightness;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        l = clamp(lightness - step, 0, 100);
        break;
      case "ArrowRight":
      case "ArrowUp":
        l = clamp(lightness + step, 0, 100);
        break;
      default:
        return;
    }
    e.preventDefault();
    this.setColor(
      new Color({ type: ColorInputType.HSL, h: hue, s: saturation, l }),
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
    const [hue, saturation, lightness] = this.color.getHSL();
    const hueColorHex = "#" + this.color.getHex();
    const backgroundStyleArray = ["background: linear-gradient(", "to right,"];
    for (let i = 0; i <= 100; i++) {
      backgroundStyleArray.push(
        `hsl(${hue}deg, ${saturation}%, ${i}%) ${i}%` + (i < 100 ? "," : ""),
      );
    }
    backgroundStyleArray.push(");");
    const backgroundStyle = backgroundStyleArray.join("\n");
    return html`
      <div
        class="color-bar drag-surface drag-surface-pan-y"
        @pointerdown=${this.drag.handlePointerDown}
        @keydown=${this.handleKeydown}
        id="color-bar"
        tabindex="0"
        role="slider"
        aria-label="Lightness"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${Math.round(lightness)}
        aria-valuetext="Lightness ${Math.round(lightness)} percent"
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

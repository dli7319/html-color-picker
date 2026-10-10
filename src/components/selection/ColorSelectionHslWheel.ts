import { css, html } from "lit";
import { customElement, query } from "lit/decorators.js";

import { Color, ColorInputType } from "../../lib/Color";
import { ColorSelectionBase } from "./ColorSelectionBase";
import { DragController } from "../../controllers/DragController";
import { dragSurfaceStyles } from "../../styles/DragSurface";
import { reducedMotionStyles } from "../../styles/Motion";

// This is an HSL color wheel with a middle-gray center (l=50%).
@customElement("color-selection-hsl-wheel")
export class ColorSelectionHslWheel extends ColorSelectionBase {
  static styles = [
    reducedMotionStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        aspect-ratio: 1;
      }

      .color-grad {
        aspect-ratio: 1;
        flex: 1;
        max-width: 100%;
        border-radius: 100%;
        position: relative;
      }

      .color-grad-circle {
        position: absolute;
        border-width: 0.1rem;
        border-style: solid;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        transform: translate(-50%, -50%);
        pointer-events: none;
        border-color: white;
      }
    `,
    dragSurfaceStyles,
  ];

  @query("#color-grad")
  private colorGrad!: HTMLDivElement;

  private handlePointer = (e: MouseEvent) => {
    const rect = this.colorGrad.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const radius = Math.sqrt(x * x + y * y) / (rect.width / 2);
    const clampedRadius = Math.min(radius, 1);
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    const clampedAngle = (angle + 360) % 360;

    const [, , lightness] = this.color.getHSL();
    this.setColor(
      new Color({
        type: ColorInputType.HSL,
        h: clampedAngle,
        s: 100.0 * clampedRadius,
        // Preserve the incoming lightness instead of hard-locking it to 50
        // (issue #89) — the wheel only owns hue/saturation.
        l: lightness,
      }),
    );
  };

  /** Arrow keys rotate hue; Shift = fine steps (issue #75). */
  private handleKeydown = (e: KeyboardEvent) => {
    const [hue, saturation, lightness] = this.color.getHSL();
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
      new Color({
        type: ColorInputType.HSL,
        h,
        s: saturation,
        l: lightness,
      }),
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
    const colorGradStyle = `
          background-image: radial-gradient(
            circle at center,
            hsl(0, 0%, 50%, 1) 0%,
            hsl(0, 100%, 0%, 0) 100%
          ),
          conic-gradient(
            in hsl shorter hue,
            hsl(0, 100%, 50%),
            /* Red */ hsl(60, 100%, 50%),
            /* Yellow */ hsl(120, 100%, 50%),
            /* Lime */ hsl(180, 100%, 50%),
            /* Cyan */ hsl(240, 100%, 50%),
            /* Blue */ hsl(300, 100%, 50%),
            /* Magenta */ hsl(360, 100%, 50%)
          );`;
    const radius = (0.5 * saturation) / 100;
    const angle = (3 * Math.PI) / 2 + hue * (Math.PI / 180);
    const positionX = Math.cos(angle) * radius;
    const positionY = Math.sin(angle) * radius;
    const colorCircleStyle = `
            top: ${50 + positionY * 100}%;
            left: ${50 + positionX * 100}%;
            background-color: #${new Color({
              type: ColorInputType.HSL,
              h: hue,
              s: saturation,
              l: lightness,
            }).getHex()};
        `;
    return html`
      <div
        class="color-grad drag-surface"
        id="color-grad"
        tabindex="0"
        role="application"
        aria-label="Hue and saturation wheel, arrow keys rotate hue"
        @keydown=${this.handleKeydown}
        style=${colorGradStyle}
        @pointerdown=${this.drag.handlePointerDown}
      >
        <div class="color-grad-circle" style=${colorCircleStyle}></div>
      </div>
    `;
  }
}

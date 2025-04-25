import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { Color, ColorInputType } from "./lib/Color";
import { bootstrap } from "./styles/Bootstrap";
import { ColorPickerSetColorEvent } from "./events/ColorPickerSetColorEvent";

// This is an HSL color wheel with a white center.
@customElement("color-selection-type-b-wheel")
export class ColorSelectionTypeBWheel extends LitElement {
  static styles = [
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
  ];

  @property({ attribute: false })
  color: Color = new Color();

  @query("#color-grad")
  private colorGrad!: HTMLDivElement;

  private onMouseMoveBound = this.onMouseMove.bind(this);
  private onMouseUpBound = this.onMouseUp.bind(this);

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  onMouseMove(event: MouseEvent) {
    const rect = this.colorGrad.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const radius = Math.sqrt(x * x + y * y) / (rect.width / 2);
    const clampedRadius = Math.min(radius, 1);
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    const clampedAngle = (angle + 360) % 360;

    this.setColor(
      new Color({
        type: ColorInputType.HSL,
        h: clampedAngle,
        s: 100.0 * clampedRadius,
        l: 50,
      })
    );
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
    const [hue, saturation] = this.color.getHSL();
    const colorGradStyle = `
          background-image: radial-gradient(
            circle at center,
            hsl(0, 0%, 50%, 1) 0%,
            hsl(0, 100%, 0%, 0) 70%
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
              l: 50,
            }).getHex()};
        `;
    return html`
      ${bootstrap}
      <div
        class="color-grad"
        id="color-grad"
        style=${colorGradStyle}
        @mousedown=${this.onMouseDown}
      >
        <div class="color-grad-circle" style=${colorCircleStyle}></div>
      </div>
    `;
  }
}

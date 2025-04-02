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
        flex: 1;
        flex-direction: column;
        width: 100%;
      }

      .color-grad {
        flex: 1;
        width: 100%;
        border-radius: 100%;
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

    console.log("angle", angle);
    console.log("clampedRadius", clampedRadius);
    this.setColor(
      new Color({
        type: ColorInputType.HSL,
        h: angle,
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
    const [, , lightness] = this.color.getHSL();
    const colorGradStyle = `
            background-image: radial-gradient(
            circle at center,
            hsl(0, 0%, ${lightness}%, 1) 0%,
            hsl(0, 100%, 0%, 0) 70%
          ),
          conic-gradient(
            hsl(0, 100%, 50%),
            /* Red */ hsl(60, 100%, 50%),
            /* Yellow */ hsl(120, 100%, 50%),
            /* Lime */ hsl(180, 100%, 50%),
            /* Cyan */ hsl(240, 100%, 50%),
            /* Blue */ hsl(300, 100%, 50%),
            /* Magenta */ hsl(360, 100%, 50%) /* Red (completes circle) */
          );`;
    return html`
      ${bootstrap}
      <div
        class="color-grad"
        id="color-grad"
        style=${colorGradStyle}
        @mousedown=${this.onMouseDown}
      ></div>
    `;
  }
}

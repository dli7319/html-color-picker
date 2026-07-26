import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("color-bar-pointer")
export class ColorBarPointer extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      height: 100%;
      width: 0;
      pointer-events: none;
      z-index: 10;
    }
    .color-bar-pointer-capsule {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%);
      width: 0.55rem;
      height: calc(100% + 0.3rem);
      border-radius: 9999px;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
      pointer-events: none;
      box-sizing: border-box;
    }
  `;

  @property({ type: Number })
  position: number = 0;

  @property({ type: String })
  color: string = "#ffffff";

  updated() {
    this.style.left = `${this.position}%`;
  }

  render() {
    return html`
      <div
        class="color-bar-pointer-capsule"
        style="background-color: ${this.color};"
      ></div>
    `;
  }
}

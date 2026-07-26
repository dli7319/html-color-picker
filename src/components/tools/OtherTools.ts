import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import { tailwindStyles } from "../../styles/Tailwind";

@customElement("other-tools")
export class OtherTools extends LitElement {
  static styles = [tailwindStyles];

  render() {
    return html`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Other Tools</h5>
      <ul class="list-disc list-inside text-left space-y-2 text-sm">
        ${Array.prototype.map.call(this.children, (child) => {
          if (child instanceof HTMLAnchorElement) {
            return html`<li>
              <a
                class="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                href="${child.href}"
                target="${child.target || '_blank'}"
              >${child.textContent}</a>
            </li>`;
          }
        })}
      </ul>
    `;
  }
}

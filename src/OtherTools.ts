import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import { tailwindStyles } from "./styles/Tailwind";
import "./OtherToolsEntry";
import { OtherToolsEntry } from "./OtherToolsEntry";

@customElement("other-tools")
export class OtherTools extends LitElement {
  static styles = [tailwindStyles];

  render() {
    return html`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Other Tools</h5>
      <ul class="list-disc list-inside text-left space-y-2 text-sm">
        ${Array.prototype.map.call(this.children, (child) => {
          if (child instanceof OtherToolsEntry) {
            return html`<li>
              <a class="text-blue-600 hover:text-blue-800 hover:underline font-medium" href="${child.href}" target="_blank">${child.name}</a>
            </li>`;
          }
        })}
      </ul>
    `;
  }
}

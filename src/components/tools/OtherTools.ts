import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import { tailwindStyles } from "../../styles/Tailwind";

@customElement("other-tools")
export class OtherTools extends LitElement {
  static styles = [tailwindStyles];

  render() {
    return html`
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Other Tools</h5>
      <ul class="list-none text-left space-y-2 text-sm">
        ${[...this.children].map((child) => {
          if (child instanceof HTMLAnchorElement) {
            return html`<li>
              <a
                class="text-blue-800 hover:text-blue-900 hover:underline font-medium inline-flex items-center gap-1"
                href="${child.href}"
                target="${child.target || "_blank"}"
                rel="noopener noreferrer"
                title="Opens in a new tab"
                >${child.textContent}<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                  ></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line></svg
              ></a>
            </li>`;
          }
        })}
      </ul>
    `;
  }
}

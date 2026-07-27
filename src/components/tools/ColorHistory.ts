import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

import { Color, ColorInputType } from "../../lib/Color";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";
import { styles } from "../../styles/ColorHistory.css";
import { tailwindStyles } from "../../styles/Tailwind";

const STORAGE_KEY = "color-history-store";
const LAST_COLOR_KEY = "last-active-color";
const MAX_ENTRIES = 50;

@customElement("color-history")
export class ColorHistory extends LitElement {
  static styles = [tailwindStyles, styles];

  @state()
  private history: Color[] = [];

  @state()
  private activeIndex: number = -1;

  constructor() {
    super();
    this.history = this.loadFromStorage();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      ColorPickerCommitColorEvent.eventName,
      this.handleCommit as EventListener,
    );
  }

  private saveLastColor(color: Color) {
    try {
      localStorage.setItem(LAST_COLOR_KEY, color.getHex());
    } catch {
      // localStorage unavailable — silently ignore
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      ColorPickerCommitColorEvent.eventName,
      this.handleCommit as EventListener,
    );
  }

  private handleCommit = (event: Event) => {
    if (!(event instanceof ColorPickerCommitColorEvent)) return;

    // Scope guard: only process events from within our <color-picker>
    const picker = this.closest("color-picker");
    if (!picker || !picker.contains(event.target as Node)) return;

    const incomingHex = event.color.getHex();

    // Deduplicate: skip if same hex as the most recent entry
    if (this.history.length > 0 && this.history[0].getHex() === incomingHex) {
      return;
    }

    // Prepend new color, cap at MAX_ENTRIES
    this.history = [event.color, ...this.history].slice(0, MAX_ENTRIES);
    this.activeIndex = -1;
    this.saveToStorage();
    this.saveLastColor(event.color);
  };

  private selectSwatch(index: number, color: Color) {
    this.activeIndex = index;
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
    this.saveLastColor(color);
  }

  private clearHistory() {
    this.history = [];
    this.activeIndex = -1;
    this.saveToStorage();
  }

  private saveToStorage() {
    try {
      const data = this.history.map((c) => ({ hex: c.getHex() }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage unavailable — silently ignore
    }
  }

  private loadFromStorage(): Color[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const data = JSON.parse(raw);
      if (!Array.isArray(data)) return [];
      return data.map(
        (d: { hex: string }) =>
          new Color({ type: ColorInputType.HEX, hex: d.hex }),
      );
    } catch {
      return [];
    }
  }

  render() {
    return html`
      <div class="history-root">
        <div class="history-header">
          <h5 class="text-lg font-semibold text-gray-800">Color History</h5>
        </div>
        ${
          this.history.length > 0
            ? html`
                <button
                  class="history-clear-btn"
                  @click=${this.clearHistory}
                  title="Clear history"
                >
                  Clear
                </button>
              `
            : ""
        }
        ${
          this.history.length === 0
            ? html`<p class="history-empty">No colors yet</p>`
            : html`
                <div class="history-swatches">
                  ${this.history.map(
                    (color, i) => html`
                      <div
                        class="history-swatch ${
                          this.activeIndex === i ? "active" : ""
                        }"
                        style="background: ${color.toCSS()}"
                        @click=${() => this.selectSwatch(i, color)}
                        title="#${color.getHex().toUpperCase()}"
                      ></div>
                    `,
                  )}
                </div>
              `
        }
      </div>
    `;
  }
}

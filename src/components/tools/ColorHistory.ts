import { html, LitElement } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { customElement, state } from "lit/decorators.js";

import { Color, ColorInputType } from "../../lib/Color";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";
import { styles } from "../../styles/ColorHistory.css";
import { tailwindStyles } from "../../styles/Tailwind";
import { reducedMotionStyles } from "../../styles/Motion";
import { storageGet, storageSet } from "../../lib/utils/storage";
import { parseHexColor } from "../../lib/ColorStringParsing";

const STORAGE_KEY = "color-history-store";
const LAST_COLOR_KEY = "last-active-color";
const MAX_ENTRIES = 50;

@customElement("color-history")
export class ColorHistory extends LitElement {
  static styles = [reducedMotionStyles, tailwindStyles, styles];

  @state()
  private history: Color[] = [];

  @state()
  private activeIndex: number = -1;

  /** Snapshot for the Clear undo affordance (issue #81). */
  @state()
  private clearedSnapshot: Color[] | null = null;

  private clearUndoTimer: ReturnType<typeof setTimeout> | null = null;

  /** True while re-rendering an undo restore (suppresses swatch entrances). */
  private restoring = false;

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
    storageSet(LAST_COLOR_KEY, color.getHex());
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
    this.clearedSnapshot = this.history;
    this.history = [];
    this.activeIndex = -1;
    // Persist the cleared state only when the undo window closes — a reload
    // during the window must not lose the history (round-2 review).
    this.startUndoTimer();
    void this.updateComplete.then(() => {
      const undo = this.shadowRoot?.querySelector(
        ".history-undo-btn",
      ) as HTMLElement | null;
      undo?.focus();
    });
  }

  private startUndoTimer() {
    if (this.clearUndoTimer) clearTimeout(this.clearUndoTimer);
    this.clearUndoTimer = setTimeout(() => {
      this.clearUndoTimer = null;
      this.clearedSnapshot = null;
      this.saveToStorage();
    }, 5000);
  }

  /** Keep the undo window alive while the user is interacting with it. */
  private pauseUndoTimer() {
    if (this.clearUndoTimer) {
      clearTimeout(this.clearUndoTimer);
      this.clearUndoTimer = null;
    }
  }

  private resumeUndoTimer() {
    if (this.clearedSnapshot) this.startUndoTimer();
  }

  private undoClear() {
    if (!this.clearedSnapshot) return;
    this.restoring = true;
    // Merge instead of overwrite: colors committed during the undo window
    // must survive the restore (round-2 review).
    const merged = [...this.history];
    for (const color of this.clearedSnapshot) {
      if (!merged.some((c) => c.getHex() === color.getHex())) {
        merged.push(color);
      }
    }
    this.history = merged;
    this.clearedSnapshot = null;
    this.pauseUndoTimer();
    this.saveToStorage();
    void this.updateComplete.then(() => {
      this.restoring = false;
    });
  }

  private saveToStorage() {
    storageSet(
      STORAGE_KEY,
      this.history.map((c) => ({ hex: c.getHex() })),
    );
  }

  private loadFromStorage(): Color[] {
    const data = storageGet<{ hex: string }[] | null>(STORAGE_KEY, null);
    if (!data || !Array.isArray(data)) return [];
    // Stored data is untrusted: drop corrupt entries instead of crashing
    // the panel at startup (round-2 review).
    return data
      .filter(
        (d) =>
          d != null &&
          typeof d.hex === "string" &&
          parseHexColor(d.hex) != null,
      )
      .map((d) => new Color({ type: ColorInputType.HEX, hex: d.hex }));
  }

  render() {
    return html`
      <div class="history-root">
        <div class="history-header">
          <h5 class="text-lg font-semibold text-gray-800">Color History</h5>
          ${
            this.history.length > 0
              ? html`
                  <button
                    class="history-clear-btn"
                    @click=${this.clearHistory}
                    title="Clear history"
                    aria-label="Clear history"
                  >
                    Clear
                  </button>
                `
              : ""
          }
        </div>
        ${
          this.history.length === 0 && !this.clearedSnapshot
            ? html`<p class="history-empty">No colors yet</p>`
            : html`
                <div
                  class="history-swatches ${this.restoring ? "restoring" : ""}"
                >
                  ${repeat(
                    this.history,
                    (color) => color,
                    (color, i) => html`
                      <button
                        type="button"
                        class="history-swatch ${
                          this.activeIndex === i ? "active" : ""
                        }"
                        style="background: ${color.toCSS()}"
                        @click=${() => this.selectSwatch(i, color)}
                        title="#${color.getHex().toUpperCase()}"
                        aria-label="Apply color #${color.getHex().toUpperCase()}, position ${i + 1} of ${this.history.length}"
                      ></button>
                    `,
                  )}
                </div>
              `
        }
        ${
          this.clearedSnapshot
            ? html`<div
                class="history-undo-toast"
                role="status"
                @mouseenter=${this.pauseUndoTimer}
                @mouseleave=${this.resumeUndoTimer}
                @focusin=${this.pauseUndoTimer}
                @focusout=${this.resumeUndoTimer}
              >
                History cleared
                <button
                  type="button"
                  class="history-undo-btn"
                  @click=${this.undoClear}
                >
                  Undo
                </button>
              </div>`
            : ""
        }
      </div>
    `;
  }
}

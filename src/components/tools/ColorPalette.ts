import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { Color, ColorInputType } from "../../lib/Color";
import { generatePalette, PaletteMode } from "../../lib/PaletteGenerator";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";
import { ColorPickerSetPaletteActiveEvent } from "../../events/ColorPickerSetPaletteActiveEvent";
import { styles } from "../../styles/ColorPalette.css";
import { tailwindStyles } from "../../styles/Tailwind";

const STORAGE_KEY = "color-palette-store";
const MIN_COUNT = 2;
const MAX_COUNT = 7;
const DEFAULT_COUNT = 5;
const NARROW_BREAKPOINT = 448;

interface StoredPalette {
  colors: { hex: string }[];
  locked: boolean[];
  mode: string;
  count: number;
}

@customElement("color-palette")
export class ColorPalette extends LitElement {
  static styles = [tailwindStyles, styles];

  @property({ attribute: false })
  activeEditingColor: Color = new Color();

  @state()
  private colors: Color[] = [];

  @state()
  private locked: boolean[] = Array(DEFAULT_COUNT).fill(false);

  @state()
  private activeIndex: number = -1;

  @state()
  private paletteMode: PaletteMode = PaletteMode.ANY;

  @state()
  private paletteCount: number = DEFAULT_COUNT;

  @state()
  private narrow: boolean = false;

  @state()
  private dragIndex: number = -1;
  @state()
  private dragOverIndex: number = -1;

  private prevEditingColor: Color | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    super();
    const stored = this.loadFromStorage();
    if (stored) {
      this.colors = stored.colors;
      this.locked = stored.locked;
      this.paletteMode = stored.mode;
      this.paletteCount = stored.count;
    } else {
      this.colors = generatePalette({ count: this.paletteCount });
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("keydown", this.handleSpacebar);
    this.resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      this.narrow = width < NARROW_BREAKPOINT;
    });
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this.handleSpacebar);
    this.resizeObserver?.disconnect();
  }

  updated() {
    if (
      this.activeIndex >= 0 &&
      this.activeEditingColor !== this.prevEditingColor &&
      this.colors[this.activeIndex] !== this.activeEditingColor
    ) {
      this.colors[this.activeIndex] = this.activeEditingColor;
      this.colors = [...this.colors];
      this.saveToStorage();
    }
    this.prevEditingColor = this.activeEditingColor;
  }

  private handleSpacebar = (e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (e.code === "Space" && tag !== "INPUT" && tag !== "TEXTAREA") {
      e.preventDefault();
      this.regenerate();
    }
  };

  private regenerate() {
    this.colors = generatePalette(
      { count: this.paletteCount, mode: this.paletteMode },
      this.locked,
      this.colors,
    );
    this.saveToStorage();
    if (this.activeIndex >= 0) {
      this.dispatchEvent(
        new ColorPickerSetColorEvent(this.colors[this.activeIndex]),
      );
    }
  }

  private copyColor(color: Color) {
    navigator.clipboard.writeText("#" + color.getHex()).catch(() => {});
  }

  private regenerateSwatch(index: number, e: Event) {
    e.stopPropagation();
    const newColor = generatePalette({ count: 1, mode: this.paletteMode })[0];
    this.colors[index] = newColor;
    this.colors = [...this.colors];
    this.dispatchEvent(new ColorPickerSetColorEvent(newColor));
    this.dispatchEvent(new ColorPickerCommitColorEvent(newColor));
    this.saveToStorage();
  }

  private selectSwatch(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = -1;
      this.dispatchEvent(new ColorPickerSetPaletteActiveEvent(-1));
      return;
    }
    this.activeIndex = index;
    this.dispatchEvent(new ColorPickerSetColorEvent(this.colors[index]));
    this.dispatchEvent(new ColorPickerSetPaletteActiveEvent(index));
    this.dispatchEvent(new ColorPickerCommitColorEvent(this.colors[index]));
  }

  private setMode(mode: PaletteMode) {
    this.paletteMode = mode;
    this.saveToStorage();
    this.regenerate();
  }

  private setCount(count: number) {
    if (count === this.paletteCount) return;
    this.paletteCount = count;
    if (count > this.colors.length) {
      const extra = generatePalette({
        count: count - this.colors.length,
        mode: this.paletteMode,
      });
      this.colors = [...this.colors, ...extra];
      this.locked = [
        ...this.locked,
        ...Array(count - this.locked.length).fill(false),
      ];
    } else {
      this.colors = this.colors.slice(0, count);
      this.locked = this.locked.slice(0, count);
      if (this.activeIndex >= count) {
        this.activeIndex = -1;
        this.dispatchEvent(new ColorPickerSetPaletteActiveEvent(-1));
      }
    }
    this.colors = [...this.colors];
    this.locked = [...this.locked];
    this.saveToStorage();
    this.regenerate();
  }

  private toggleLock(index: number, e: Event) {
    e.stopPropagation();
    this.locked[index] = !this.locked[index];
    this.locked = [...this.locked];
    this.saveToStorage();
  }

  private onDragStart(index: number, e: DragEvent) {
    this.dragIndex = index;
    e.dataTransfer!.effectAllowed = "move";
    e.dataTransfer!.setData("text/plain", String(index));
  }

  private onDragOver(index: number, e: DragEvent) {
    e.preventDefault();
    e.dataTransfer!.dropEffect = "move";
    this.dragOverIndex = index;
  }

  private onDragLeave() {
    this.dragOverIndex = -1;
  }

  private onDrop(index: number) {
    const from = this.dragIndex;
    if (from < 0 || from === index) return;
    const colors = [...this.colors];
    const locked = [...this.locked];
    const [movedColor] = colors.splice(from, 1);
    const [movedLock] = locked.splice(from, 1);
    colors.splice(index, 0, movedColor);
    locked.splice(index, 0, movedLock);
    this.colors = colors;
    this.locked = locked;
    if (this.activeIndex === from) {
      this.activeIndex = index;
    } else if (this.activeIndex >= 0) {
      this.activeIndex = colors.indexOf(this.colors[this.activeIndex]);
    }
    this.saveToStorage();
  }

  private onDragEnd() {
    this.dragIndex = -1;
    this.dragOverIndex = -1;
  }

  private saveToStorage() {
    try {
      const data: StoredPalette = {
        colors: this.colors.map((c) => ({ hex: c.getHex() })),
        locked: this.locked,
        mode: this.paletteMode,
        count: this.paletteCount,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage unavailable — silently ignore
    }
  }

  private loadFromStorage(): {
    colors: Color[];
    locked: boolean[];
    mode: PaletteMode;
    count: number;
  } | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw) as StoredPalette;
      if (!data.colors || !data.colors.length) return null;
      const count = data.count ?? data.colors.length;
      return {
        colors: data.colors.map(
          (c) => new Color({ type: ColorInputType.HEX, hex: c.hex }),
        ),
        locked: data.locked ?? Array(count).fill(false),
        mode: (data.mode as PaletteMode) ?? PaletteMode.ANY,
        count,
      };
    } catch {
      return null;
    }
  }

  render() {
    return html`
      <div class="palette-root ${this.narrow ? "narrow" : ""}">
        <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Palette</h5>
        <div class="palette-contrast mb-2">
          <span class="palette-contrast-label">Count</span>
          <div class="palette-contrast-group">
            ${Array.from(
              { length: MAX_COUNT - MIN_COUNT + 1 },
              (_, i) => i + MIN_COUNT,
            ).map(
              (n) => html`
                <button
                  class="palette-contrast-btn ${
                    this.paletteCount === n ? "active" : ""
                  }"
                  @click=${() => this.setCount(n)}
                >
                  ${n}
                </button>
              `,
            )}
          </div>
        </div>
        <div class="palette-contrast mb-2">
          <span class="palette-contrast-label">Mode</span>
          <div class="palette-contrast-group">
            <button
              class="palette-contrast-btn ${
                this.paletteMode === PaletteMode.ANY ? "active" : ""
              }"
              @click=${() => this.setMode(PaletteMode.ANY)}
            >
              Any
            </button>
            <button
              class="palette-contrast-btn ${
                this.paletteMode === PaletteMode.TONAL ? "active" : ""
              }"
              @click=${() => this.setMode(PaletteMode.TONAL)}
            >
              Tonal
            </button>
            <button
              class="palette-contrast-btn ${
                this.paletteMode === PaletteMode.ANALOGOUS ? "active" : ""
              }"
              @click=${() => this.setMode(PaletteMode.ANALOGOUS)}
            >
              Analogous
            </button>
            <button
              class="palette-contrast-btn ${
                this.paletteMode === PaletteMode.VIVID ? "active" : ""
              }"
              @click=${() => this.setMode(PaletteMode.VIVID)}
            >
              Vivid
            </button>
          </div>
        </div>
        <button
          class="palette-generate-btn"
          @click=${this.regenerate}
          title="Generate new palette (Space)"
        >
          Generate
        </button>
        <div class="palette-swatches">
          ${this.colors.map(
            (color, i) => html`
              <div
                class="palette-swatch ${
                  this.activeIndex === i ? "active" : ""
                } ${this.dragIndex === i ? "dragging" : ""} ${
                  this.dragOverIndex === i ? "drag-over" : ""
                }"
                style="background: ${color.toCSS()}"
                draggable="true"
                @click=${() => this.selectSwatch(i)}
                @dragstart=${(e: DragEvent) => this.onDragStart(i, e)}
                @dragover=${(e: DragEvent) => this.onDragOver(i, e)}
                @dragleave=${this.onDragLeave}
                @drop=${() => this.onDrop(i)}
                @dragend=${this.onDragEnd}
              >
                <div class="palette-swatch-actions">
                  <button
                    class="palette-action-btn"
                    @click=${(e: Event) => this.toggleLock(i, e)}
                    title=${this.locked[i] ? "Unlock color" : "Lock color"}
                  >
                    <span class="material-symbols-outlined"
                      >${this.locked[i] ? "lock" : "lock_open"}</span
                    >
                  </button>
                  ${
                    this.activeIndex === i
                      ? html`
                          <button
                            class="palette-action-btn"
                            @click=${(e: Event) => {
                              e.stopPropagation();
                              this.copyColor(color);
                            }}
                            title="Copy hex"
                          >
                            <span class="material-symbols-outlined"
                              >content_copy</span
                            >
                          </button>
                          <button
                            class="palette-action-btn"
                            @click=${(e: Event) => this.regenerateSwatch(i, e)}
                            title="Regenerate this color"
                          >
                            <span class="material-symbols-outlined"
                              >refresh</span
                            >
                          </button>
                        `
                      : ""
                  }
                </div>
                <div class="palette-swatch-hex">
                  #${color.getHex().toUpperCase()}
                </div>
              </div>
            `,
          )}
        </div>
      </div>
    `;
  }
}

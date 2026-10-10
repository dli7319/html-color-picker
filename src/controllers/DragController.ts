import { ReactiveController, ReactiveControllerHost } from "lit";

export interface DragControllerOptions {
  /** Called on pointerdown. Use for initial click processing. */
  onDragStart?: (e: PointerEvent) => void;
  /**
   * Called during a drag with the latest pointer position, coalesced to at
   * most one call per animation frame. The final position is always
   * delivered before onDragEnd.
   */
  onDrag: (e: PointerEvent) => void;
  /** Called on pointerup when the drag ends. */
  onDragEnd?: () => void;
}

/**
 * A reactive controller that manages drag interactions via Pointer Events.
 *
 * Covers mouse, touch and pen input: `pointerdown` on a target element, then
 * tracking `pointermove`/`pointerup` on the document until the drag ends
 * (with `setPointerCapture` so drags that leave the window still end
 * cleanly). Movement callbacks are coalesced to one per animation frame to
 * avoid flooding state updates on high-frequency input devices.
 *
 * Usage:
 * ```ts
 * private drag = new DragController(this, {
 *   onDrag: (e) => { ... },
 * });
 * // In template: @pointerdown=${this.drag.handlePointerDown}
 * ```
 */
export class DragController implements ReactiveController {
  private dragging = false;
  private latestEvent: PointerEvent | null = null;
  private frame: number | null = null;

  constructor(
    host: ReactiveControllerHost,
    private options: DragControllerOptions,
  ) {
    host.addController(this);
  }

  /** Bind this to the target element's @pointerdown event. */
  handlePointerDown = (e: PointerEvent) => {
    if (this.dragging) return;
    this.dragging = true;
    // Suppress animated transitions while dragging (handles and the body
    // background must track the pointer 1:1).
    document.body.classList.add("dragging");
    // Keep the browser from starting text selection or touch scrolling
    // during the drag (the surface also sets touch-action: none).
    e.preventDefault();
    const target = e.currentTarget as Element | null;
    try {
      target?.setPointerCapture(e.pointerId);
    } catch {
      // Pointer capture unsupported (e.g. jsdom) — the document listeners
      // below still track the drag.
    }
    this.options.onDragStart?.(e);
    document.addEventListener("pointermove", this.handlePointerMove);
    document.addEventListener("pointerup", this.handlePointerUp);
    document.addEventListener("pointercancel", this.handlePointerUp);
  };

  private handlePointerMove = (e: PointerEvent) => {
    this.latestEvent = e;
    if (this.frame !== null) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = null;
      const ev = this.latestEvent;
      if (ev && this.dragging) {
        this.latestEvent = null;
        this.options.onDrag(ev);
      }
    });
  };

  private handlePointerUp = () => {
    this.teardown();
    // Flush any coalesced movement first so the committed color matches the
    // final pointer position.
    if (this.frame !== null) {
      cancelAnimationFrame(this.frame);
      this.frame = null;
    }
    const ev = this.latestEvent;
    if (ev) {
      this.latestEvent = null;
      this.options.onDrag(ev);
    }
    this.options.onDragEnd?.();
  };

  private teardown() {
    this.dragging = false;
    document.body.classList.remove("dragging");
    document.removeEventListener("pointermove", this.handlePointerMove);
    document.removeEventListener("pointerup", this.handlePointerUp);
    document.removeEventListener("pointercancel", this.handlePointerUp);
  }

  hostDisconnected() {
    if (this.frame !== null) {
      cancelAnimationFrame(this.frame);
      this.frame = null;
    }
    this.teardown();
  }
}

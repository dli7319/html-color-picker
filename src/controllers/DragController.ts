import { ReactiveController, ReactiveControllerHost } from "lit";

export interface DragControllerOptions {
  /** Called on mousedown. Use for initial click processing. */
  onDragStart?: (e: MouseEvent) => void;
  /** Called on each mousemove during a drag. */
  onDrag: (e: MouseEvent) => void;
  /** Called on mouseup when the drag ends. */
  onDragEnd?: () => void;
}

/**
 * A reactive controller that manages mouse drag interactions.
 *
 * Encapsulates the pattern of listening for mousedown on a target element,
 * then tracking mousemove/mouseup on the document until the drag ends.
 *
 * Usage:
 * ```ts
 * private drag = new DragController(this, {
 *   onDrag: (e) => { ... },
 * });
 * // In template: @mousedown=${this.drag.handleMouseDown}
 * ```
 */
export class DragController implements ReactiveController {
  constructor(
    host: ReactiveControllerHost,
    private options: DragControllerOptions,
  ) {
    host.addController(this);
  }

  /** Bind this to the target element's @mousedown event. */
  handleMouseDown = (e: MouseEvent) => {
    this.options.onDragStart?.(e);
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  };

  private handleMouseMove = (e: MouseEvent) => {
    this.options.onDrag(e);
  };

  private handleMouseUp = () => {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
    this.options.onDragEnd?.();
  };

  hostDisconnected() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }
}

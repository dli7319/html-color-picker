import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { ReactiveControllerHost } from "lit";
import { DragController } from "./DragController";

/** jsdom lacks PointerEvent — build one from MouseEvent (issue #75). */
function pointerEvent(type: string, clientX = 0, clientY = 0): PointerEvent {
  const e = new MouseEvent(type, {
    clientX,
    clientY,
    bubbles: true,
    cancelable: true,
  });
  Object.defineProperty(e, "pointerId", { value: 1 });
  return e as unknown as PointerEvent;
}

const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(() => resolve(null)));

describe("DragController", () => {
  let mockHost: ReactiveControllerHost;
  let onDragStart: ReturnType<typeof vi.fn<(e: PointerEvent) => void>>;
  let onDrag: ReturnType<typeof vi.fn<(e: PointerEvent) => void>>;
  let onDragEnd: ReturnType<typeof vi.fn<() => void>>;
  let controller: DragController;

  beforeEach(() => {
    mockHost = {
      addController: vi.fn(),
      removeController: vi.fn(),
      requestUpdate: vi.fn(),
      updateComplete: Promise.resolve(true),
    } as unknown as ReactiveControllerHost;
    onDragStart = vi.fn<(e: PointerEvent) => void>();
    onDrag = vi.fn<(e: PointerEvent) => void>();
    onDragEnd = vi.fn<() => void>();
    controller = new DragController(mockHost, {
      onDragStart,
      onDrag,
      onDragEnd,
    });
  });

  afterEach(() => {
    // End any in-progress drag to prevent listener leaks between tests
    document.dispatchEvent(pointerEvent("pointerup"));
    vi.restoreAllMocks();
  });

  it("calls host.addController with the controller instance on construction", () => {
    expect(mockHost.addController).toHaveBeenCalledTimes(1);
    expect(mockHost.addController).toHaveBeenCalledWith(controller);
  });

  describe("handlePointerDown", () => {
    it("calls onDragStart with the event and adds document-level listeners", () => {
      const addSpy = vi.spyOn(document, "addEventListener");
      const event = pointerEvent("pointerdown", 100, 200);

      controller.handlePointerDown(event);

      expect(onDragStart).toHaveBeenCalledTimes(1);
      expect(onDragStart).toHaveBeenCalledWith(event);

      expect(addSpy).toHaveBeenCalledTimes(3);
      expect(addSpy).toHaveBeenCalledWith("pointermove", expect.any(Function));
      expect(addSpy).toHaveBeenCalledWith("pointerup", expect.any(Function));
      expect(addSpy).toHaveBeenCalledWith(
        "pointercancel",
        expect.any(Function),
      );
    });

    it("focuses the surface on pointerdown so arrow keys work after clicking", () => {
      const surface = document.createElement("div");
      surface.tabIndex = 0;
      document.body.appendChild(surface);
      surface.addEventListener("pointerdown", controller.handlePointerDown);

      surface.dispatchEvent(pointerEvent("pointerdown", 5, 5));
      expect(document.activeElement).toBe(surface);

      surface.dispatchEvent(pointerEvent("pointerup"));
      surface.remove();
    });

    it("ignores a second pointerdown while a drag is active", () => {
      controller.handlePointerDown(pointerEvent("pointerdown", 0, 0));
      controller.handlePointerDown(pointerEvent("pointerdown", 5, 5));
      expect(onDragStart).toHaveBeenCalledTimes(1);
    });
  });

  describe("drag lifecycle", () => {
    it("coalesces multiple pointermove events into one onDrag per frame", async () => {
      controller.handlePointerDown(pointerEvent("pointerdown"));

      document.dispatchEvent(pointerEvent("pointermove", 150, 250));
      document.dispatchEvent(pointerEvent("pointermove", 160, 260));
      expect(onDrag).not.toHaveBeenCalled();

      await nextFrame();
      expect(onDrag).toHaveBeenCalledTimes(1);
      expect(onDrag).toHaveBeenCalledWith(
        expect.objectContaining({ clientX: 160, clientY: 260 }),
      );
    });

    it("delivers the final position before onDragEnd on pointerup", async () => {
      controller.handlePointerDown(pointerEvent("pointerdown"));

      document.dispatchEvent(pointerEvent("pointermove", 300, 400));
      document.dispatchEvent(pointerEvent("pointerup"));

      // Flushed synchronously: the moved-to position and the commit order.
      expect(onDrag).toHaveBeenCalledTimes(1);
      expect(onDrag).toHaveBeenCalledWith(
        expect.objectContaining({ clientX: 300, clientY: 400 }),
      );
      expect(onDragEnd).toHaveBeenCalledTimes(1);
      expect(onDrag.mock.invocationCallOrder[0]).toBeLessThan(
        onDragEnd.mock.invocationCallOrder[0],
      );
    });

    it("removes listeners and stops drag callbacks after pointerup", () => {
      controller.handlePointerDown(pointerEvent("pointerdown"));
      document.dispatchEvent(pointerEvent("pointerup"));
      expect(onDragEnd).toHaveBeenCalledTimes(1);

      onDrag.mockClear();
      document.dispatchEvent(pointerEvent("pointermove", 999, 999));
      expect(onDrag).not.toHaveBeenCalled();
    });

    it("ends the drag on pointercancel", () => {
      controller.handlePointerDown(pointerEvent("pointerdown"));
      document.dispatchEvent(pointerEvent("pointercancel"));
      expect(onDragEnd).toHaveBeenCalledTimes(1);

      onDrag.mockClear();
      document.dispatchEvent(pointerEvent("pointermove", 10, 10));
      expect(onDrag).not.toHaveBeenCalled();
    });
  });

  it("does not throw when onDragStart is undefined", () => {
    const c = new DragController(mockHost, { onDrag, onDragEnd });
    expect(() =>
      c.handlePointerDown(pointerEvent("pointerdown")),
    ).not.toThrow();
  });

  it("does not throw when onDragEnd is undefined", () => {
    const c = new DragController(mockHost, { onDragStart, onDrag });
    c.handlePointerDown(pointerEvent("pointerdown"));
    expect(() =>
      document.dispatchEvent(pointerEvent("pointerup")),
    ).not.toThrow();
  });

  describe("hostDisconnected", () => {
    it("removes document event listeners and stops drag callbacks", () => {
      const removeSpy = vi.spyOn(document, "removeEventListener");

      controller.handlePointerDown(pointerEvent("pointerdown"));
      removeSpy.mockClear();

      controller.hostDisconnected();

      expect(removeSpy).toHaveBeenCalledTimes(3);
      expect(removeSpy).toHaveBeenCalledWith(
        "pointermove",
        expect.any(Function),
      );
      expect(removeSpy).toHaveBeenCalledWith("pointerup", expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith(
        "pointercancel",
        expect.any(Function),
      );

      document.dispatchEvent(pointerEvent("pointermove", 50, 50));
      expect(onDrag).not.toHaveBeenCalled();
      document.dispatchEvent(pointerEvent("pointerup"));
      expect(onDragEnd).not.toHaveBeenCalled();
    });

    it("is safe to call even when no drag is active", () => {
      expect(() => controller.hostDisconnected()).not.toThrow();
    });
  });

  it("supports multiple pointerdown-pointerup cycles", async () => {
    controller.handlePointerDown(pointerEvent("pointerdown"));
    document.dispatchEvent(pointerEvent("pointermove", 10, 10));
    await nextFrame();
    document.dispatchEvent(pointerEvent("pointerup"));
    expect(onDragEnd).toHaveBeenCalledTimes(1);

    onDrag.mockClear();
    onDragEnd.mockClear();

    controller.handlePointerDown(pointerEvent("pointerdown"));
    document.dispatchEvent(pointerEvent("pointermove", 20, 20));
    await nextFrame();
    document.dispatchEvent(pointerEvent("pointerup"));
    expect(onDrag).toHaveBeenCalledTimes(1);
    expect(onDrag).toHaveBeenCalledWith(
      expect.objectContaining({ clientX: 20, clientY: 20 }),
    );
    expect(onDragEnd).toHaveBeenCalledTimes(1);
  });
});

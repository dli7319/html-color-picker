import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DragController } from "./DragController";

describe("DragController", () => {
  let mockHost: { addController: ReturnType<typeof vi.fn> };
  let onDragStart: ReturnType<typeof vi.fn>;
  let onDrag: ReturnType<typeof vi.fn>;
  let onDragEnd: ReturnType<typeof vi.fn>;
  let controller: DragController;

  beforeEach(() => {
    mockHost = { addController: vi.fn() };
    onDragStart = vi.fn();
    onDrag = vi.fn();
    onDragEnd = vi.fn();
    controller = new DragController(mockHost, {
      onDragStart,
      onDrag,
      onDragEnd,
    });
  });

  afterEach(() => {
    // End any in-progress drag to prevent listener leaks between tests
    document.dispatchEvent(new MouseEvent("mouseup"));
    vi.restoreAllMocks();
  });

  // ---- Test 1 ----
  it("calls host.addController with the controller instance on construction", () => {
    expect(mockHost.addController).toHaveBeenCalledTimes(1);
    expect(mockHost.addController).toHaveBeenCalledWith(controller);
  });

  // ---- Test 2 ----
  describe("handleMouseDown", () => {
    it("calls onDragStart with the event and adds document-level listeners", () => {
      const addSpy = vi.spyOn(document, "addEventListener");
      const event = new MouseEvent("mousedown", { clientX: 100, clientY: 200 });

      controller.handleMouseDown(event);

      expect(onDragStart).toHaveBeenCalledTimes(1);
      expect(onDragStart).toHaveBeenCalledWith(event);

      expect(addSpy).toHaveBeenCalledTimes(2);
      expect(addSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
      expect(addSpy).toHaveBeenCalledWith("mouseup", expect.any(Function));
    });
  });

  // ---- Tests 3 & 4 ----
  describe("drag lifecycle", () => {
    it("calls onDrag on each mousemove after mousedown", () => {
      controller.handleMouseDown(new MouseEvent("mousedown"));

      const moveEvent = new MouseEvent("mousemove", {
        clientX: 150,
        clientY: 250,
      });
      document.dispatchEvent(moveEvent);

      expect(onDrag).toHaveBeenCalledTimes(1);
      expect(onDrag).toHaveBeenCalledWith(moveEvent);

      // A second mousemove should also call onDrag
      const moveEvent2 = new MouseEvent("mousemove", {
        clientX: 160,
        clientY: 260,
      });
      document.dispatchEvent(moveEvent2);

      expect(onDrag).toHaveBeenCalledTimes(2);
      expect(onDrag).toHaveBeenCalledWith(moveEvent2);
    });

    it("removes listeners and calls onDragEnd on mouseup", () => {
      const removeSpy = vi.spyOn(document, "removeEventListener");

      controller.handleMouseDown(new MouseEvent("mousedown"));

      document.dispatchEvent(new MouseEvent("mouseup"));

      expect(onDragEnd).toHaveBeenCalledTimes(1);

      expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith("mouseup", expect.any(Function));

      // After mouseup, subsequent mousemove must NOT trigger onDrag
      onDrag.mockClear();
      document.dispatchEvent(new MouseEvent("mousemove", { clientX: 999 }));
      expect(onDrag).not.toHaveBeenCalled();
    });
  });

  // ---- Test 5 ----
  it("does not throw when onDragStart is undefined", () => {
    const c = new DragController(mockHost, { onDrag, onDragEnd });
    expect(() => c.handleMouseDown(new MouseEvent("mousedown"))).not.toThrow();
    // Clean up listeners
    document.dispatchEvent(new MouseEvent("mouseup"));
  });

  // ---- Test 6 ----
  it("does not throw when onDragEnd is undefined", () => {
    const c = new DragController(mockHost, { onDragStart, onDrag });
    c.handleMouseDown(new MouseEvent("mousedown"));
    expect(() =>
      document.dispatchEvent(new MouseEvent("mouseup")),
    ).not.toThrow();
  });

  // ---- Test 7 ----
  describe("hostDisconnected", () => {
    it("removes document event listeners and stops drag callbacks", () => {
      const removeSpy = vi.spyOn(document, "removeEventListener");

      controller.handleMouseDown(new MouseEvent("mousedown"));
      // Clear the calls that happened during handleMouseDown setup
      removeSpy.mockClear();

      controller.hostDisconnected();

      expect(removeSpy).toHaveBeenCalledTimes(2);
      expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith("mouseup", expect.any(Function));

      // After hostDisconnected, no further callbacks should fire
      document.dispatchEvent(new MouseEvent("mousemove", { clientX: 50 }));
      expect(onDrag).not.toHaveBeenCalled();

      document.dispatchEvent(new MouseEvent("mouseup"));
      expect(onDragEnd).not.toHaveBeenCalled();
    });

    it("is safe to call even when no drag is active (no listeners registered)", () => {
      // hostDisconnected called without a preceding mousedown
      expect(() => controller.hostDisconnected()).not.toThrow();
    });
  });

  // ---- Test 8 ----
  it("supports multiple mousedown-mouseup cycles", () => {
    const addSpy = vi.spyOn(document, "addEventListener");
    const removeSpy = vi.spyOn(document, "removeEventListener");

    // ---- Cycle 1 ----
    controller.handleMouseDown(new MouseEvent("mousedown"));
    expect(addSpy).toHaveBeenCalledTimes(2);

    document.dispatchEvent(new MouseEvent("mousemove", { clientX: 10 }));
    expect(onDrag).toHaveBeenCalledTimes(1);
    expect(onDrag).toHaveBeenCalledWith(
      expect.objectContaining({ clientX: 10 }),
    );

    document.dispatchEvent(new MouseEvent("mouseup"));
    expect(onDragEnd).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledTimes(2);

    addSpy.mockClear();
    removeSpy.mockClear();
    onDrag.mockClear();
    onDragEnd.mockClear();

    // ---- Cycle 2 ----
    controller.handleMouseDown(new MouseEvent("mousedown"));
    expect(addSpy).toHaveBeenCalledTimes(2);

    document.dispatchEvent(new MouseEvent("mousemove", { clientX: 20 }));
    expect(onDrag).toHaveBeenCalledTimes(1);
    expect(onDrag).toHaveBeenCalledWith(
      expect.objectContaining({ clientX: 20 }),
    );

    document.dispatchEvent(new MouseEvent("mouseup"));
    expect(onDragEnd).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledTimes(2);
  });

  // ---- Test 9 ----
  describe("document listener management", () => {
    it("uses the exact same handler references for addEventListener and removeEventListener", () => {
      const addSpy = vi.spyOn(document, "addEventListener");

      controller.handleMouseDown(new MouseEvent("mousedown"));

      expect(addSpy).toHaveBeenCalledTimes(2);
      expect(addSpy).toHaveBeenNthCalledWith(
        1,
        "mousemove",
        expect.any(Function),
      );
      expect(addSpy).toHaveBeenNthCalledWith(
        2,
        "mouseup",
        expect.any(Function),
      );

      // Capture the exact handler references that were registered
      const mousemoveHandler = addSpy.mock.calls[0][1];
      const mouseupHandler = addSpy.mock.calls[1][1];

      const removeSpy = vi.spyOn(document, "removeEventListener");

      document.dispatchEvent(new MouseEvent("mouseup"));

      // The same references must be used for removal
      expect(removeSpy).toHaveBeenCalledTimes(2);
      expect(removeSpy).toHaveBeenNthCalledWith(
        1,
        "mousemove",
        mousemoveHandler,
      );
      expect(removeSpy).toHaveBeenNthCalledWith(2, "mouseup", mouseupHandler);
    });
  });
});

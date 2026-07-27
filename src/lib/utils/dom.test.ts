import { describe, it, expect, vi } from "vitest";
import { forEachMatchingChild } from "./dom";

describe("forEachMatchingChild", () => {
  it("calls fn for each matching child", () => {
    const parent = document.createElement("div");
    const child1 = document.createElement("div");
    const child2 = document.createElement("div");
    parent.append(child1, child2);

    const fn = vi.fn();
    forEachMatchingChild(parent, HTMLDivElement, fn);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith(child1);
    expect(fn).toHaveBeenCalledWith(child2);
  });

  it("skips children that do not match the type", () => {
    const parent = document.createElement("div");
    const div = document.createElement("div");
    const span = document.createElement("span");
    parent.append(div, span);

    const fn = vi.fn();
    forEachMatchingChild(parent, HTMLDivElement, fn);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(div);
    expect(fn).not.toHaveBeenCalledWith(span);
  });

  it("handles an empty parent with no children", () => {
    const parent = document.createElement("div");

    const fn = vi.fn();
    forEachMatchingChild(parent, HTMLDivElement, fn);

    expect(fn).not.toHaveBeenCalled();
  });

  it("only calls fn for matching children among mixed types", () => {
    const parent = document.createElement("div");
    const div1 = document.createElement("div");
    const span1 = document.createElement("span");
    const div2 = document.createElement("div");
    const span2 = document.createElement("span");
    parent.append(div1, span1, div2, span2);

    const fn = vi.fn();
    forEachMatchingChild(parent, HTMLDivElement, fn);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith(div1);
    expect(fn).toHaveBeenCalledWith(div2);
  });

  it("passes the correct element reference to fn", () => {
    const parent = document.createElement("div");
    const child = document.createElement("div");
    parent.append(child);

    const fn = vi.fn();
    forEachMatchingChild(parent, HTMLDivElement, fn);

    expect(fn.mock.calls[0][0]).toBe(child);
  });

  it("does not call fn when no children match the type", () => {
    const parent = document.createElement("div");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    parent.append(span1, span2);

    const fn = vi.fn();
    forEachMatchingChild(parent, HTMLDivElement, fn);

    expect(fn).not.toHaveBeenCalled();
  });
});

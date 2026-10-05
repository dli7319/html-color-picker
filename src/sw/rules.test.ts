// @vitest-environment node
import { describe, it, expect } from "vitest";
import {
  SW_CACHE_PREFIX,
  cacheNameFor,
  isNavigation,
  isStaleCache,
  normalizePrecacheList,
  shouldHandleRequest,
} from "./rules";

describe("cache naming", () => {
  it("embeds the version in the cache name", () => {
    expect(cacheNameFor("abc123")).toBe(`${SW_CACHE_PREFIX}-abc123`);
  });

  it("treats older or foreign caches as stale, current as fresh", () => {
    expect(isStaleCache(`${SW_CACHE_PREFIX}-oldhash`, "newhash")).toBe(true);
    expect(isStaleCache(`${SW_CACHE_PREFIX}-newhash`, "newhash")).toBe(false);
    expect(isStaleCache("unrelated-cache", "newhash")).toBe(false);
  });
});

describe("shouldHandleRequest", () => {
  const origin = "https://example.test";

  it("handles same-origin GET requests", () => {
    expect(
      shouldHandleRequest(
        { url: "https://example.test/main.js", method: "GET" },
        origin,
      ),
    ).toBe(true);
  });

  it("forwards cross-origin requests untouched", () => {
    expect(
      shouldHandleRequest(
        { url: "https://fonts.gstatic.com/font.woff2", method: "GET" },
        origin,
      ),
    ).toBe(false);
  });

  it("forwards non-GET requests untouched", () => {
    expect(
      shouldHandleRequest(
        { url: "https://example.test/main.js", method: "POST" },
        origin,
      ),
    ).toBe(false);
  });

  it("ignores the worker script itself", () => {
    expect(
      shouldHandleRequest(
        { url: "https://example.test/sw.js", method: "GET" },
        origin,
      ),
    ).toBe(false);
    expect(
      shouldHandleRequest(
        { url: "https://example.test/apps/colors/sw.js", method: "GET" },
        origin,
      ),
    ).toBe(false);
  });

  it("rejects malformed URLs instead of throwing", () => {
    expect(
      shouldHandleRequest({ url: "not a url", method: "GET" }, origin),
    ).toBe(false);
  });
});

describe("isNavigation", () => {
  it("is true only for navigate-mode requests", () => {
    expect(isNavigation({ url: "u", method: "GET", mode: "navigate" })).toBe(
      true,
    );
    expect(isNavigation({ url: "u", method: "GET", mode: "cors" })).toBe(false);
  });
});

describe("normalizePrecacheList", () => {
  it("makes every URL relative, dedupes, and sorts", () => {
    expect(
      normalizePrecacheList(["/index.html", "main.js", "./index.html"]),
    ).toEqual(["./index.html", "./main.js"]);
  });

  it("is order-insensitive (stable cache hash for identical bytes)", () => {
    const a = normalizePrecacheList(["b.js", "a.js"]);
    const b = normalizePrecacheList(["./a.js", "./b.js"]);
    expect(a).toEqual(b);
  });
});

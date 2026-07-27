// @vitest-environment node
import { describe, it, expect } from "vitest";
import { lerp, clamp } from "./math";

describe("lerp", () => {
  it("should return a when t is 0", () => {
    expect(lerp(5, 20, 0)).toBe(5);
  });

  it("should return b when t is 1", () => {
    expect(lerp(5, 20, 1)).toBe(20);
  });

  it("should return the midpoint when t is 0.5", () => {
    expect(lerp(5, 20, 0.5)).toBe(12.5);
  });

  it("should interpolate at t = 0.25", () => {
    expect(lerp(0, 100, 0.25)).toBe(25);
  });

  it("should interpolate at t = 0.75", () => {
    expect(lerp(0, 100, 0.75)).toBe(75);
  });

  it("should extrapolate forward when t > 1", () => {
    expect(lerp(10, 20, 2)).toBe(30);
  });

  it("should extrapolate backward when t < 0", () => {
    expect(lerp(10, 20, -1)).toBe(0);
  });

  it("should work with negative values", () => {
    expect(lerp(-10, 10, 0.5)).toBe(0);
    expect(lerp(-10, -30, 0.5)).toBe(-20);
    expect(lerp(-10, -30, 0)).toBe(-10);
    expect(lerp(-10, -30, 1)).toBe(-30);
  });

  it("should work when a and b are equal", () => {
    expect(lerp(7, 7, 0)).toBe(7);
    expect(lerp(7, 7, 0.5)).toBe(7);
    expect(lerp(7, 7, 1)).toBe(7);
    expect(lerp(7, 7, 42)).toBe(7);
  });

  it("should handle floating point precision at endpoints", () => {
    expect(lerp(0.1, 0.3, 0)).toBeCloseTo(0.1);
    expect(lerp(0.1, 0.3, 1)).toBeCloseTo(0.3);
    expect(lerp(0.1, 0.3, 0.5)).toBeCloseTo(0.2);
  });

  it("should work with decimals and large ranges", () => {
    expect(lerp(0, 1e6, 0.0001)).toBe(100);
  });

  it("should work when a > b (decreasing interpolation)", () => {
    expect(lerp(100, 0, 0)).toBe(100);
    expect(lerp(100, 0, 0.5)).toBe(50);
    expect(lerp(100, 0, 1)).toBe(0);
  });
});

describe("clamp", () => {
  it("should return the value when it is within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("should return min when value is below min", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("should return max when value is above max", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("should return value when equal to min", () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it("should return value when equal to max", () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it("should work with negative ranges", () => {
    expect(clamp(-20, -10, -5)).toBe(-10);
    expect(clamp(-7, -10, -5)).toBe(-7);
    expect(clamp(-3, -10, -5)).toBe(-5);
  });

  it("should work when min equals max", () => {
    expect(clamp(5, 3, 3)).toBe(3);
    expect(clamp(1, 3, 3)).toBe(3);
    expect(clamp(10, 3, 3)).toBe(3);
  });

  it("should work with floating point numbers", () => {
    expect(clamp(0.5, 0.1, 0.9)).toBeCloseTo(0.5);
    expect(clamp(0.05, 0.1, 0.9)).toBeCloseTo(0.1);
    expect(clamp(0.95, 0.1, 0.9)).toBeCloseTo(0.9);
  });

  it("should work with negative values", () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-15, -10, -1)).toBe(-10);
    expect(clamp(0, -10, -1)).toBe(-1);
  });

  it("should work with zero range", () => {
    expect(clamp(-100, 0, 0)).toBe(0);
    expect(clamp(100, 0, 0)).toBe(0);
    expect(clamp(0, 0, 0)).toBe(0);
  });

  it("should handle Infinity values", () => {
    expect(clamp(Infinity, 0, 100)).toBe(100);
    expect(clamp(-Infinity, 0, 100)).toBe(0);
  });
});

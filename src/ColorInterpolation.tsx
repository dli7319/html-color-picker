import React from "react";

import Color, { ColorLerpMode } from "./Color";
import { ColorGradient } from "./ColorGradient";
import styles from "./styles/ColorInterpolation.module.css";

export default function ColorInterpolation({
  className,
  leftColor,
  rightColor,
  activeColor = "none",
  setActiveColor,
  setColor,
}: {
  className?: string;
  leftColor: Color;
  rightColor: Color;
  activeColor?: string;
  setActiveColor: (activeColor: string) => void;
  setColor: (color: Color) => void;
}) {
  const colorGradient = new ColorGradient(leftColor, rightColor);
  const leftActive = activeColor == "left" ? styles.active : "";
  const rightActive = activeColor == "right" ? styles.active : "";

  function setActiveColorLeft() {
    setActiveColor(leftActive ? "none" : "left");
  }
  function setActiveColorRight() {
    setActiveColor(rightActive ? "none" : "right");
  }

  function onMouseMoveGradient(e: React.MouseEvent) {
    if (e.buttons == 1) {
      const mode = e.currentTarget.getAttribute("data-mode") || "";
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const newColor = colorGradient.getColorAt(x, ColorLerpMode[mode as keyof typeof ColorLerpMode]);
      setActiveColor("none");
      setColor(newColor);
    }
  }

  return (
    <div className={className}>
      <h5>Color Interpolation</h5>
      <table className="table mb-0">
        <tbody>
          <tr>
            <td>
              <div
                className={`${styles.colorSelection} ${styles} ${leftActive}`}
                onClick={setActiveColorLeft}
                style={{
                  background: "#" + leftColor.getHex(),
                }}
              ></div>
            </td>
            <td>
              <div
                className={`${styles.colorSelection} ${styles.rightColor} ${rightActive}`}
                onClick={setActiveColorRight}
                style={{
                  background: "#" + rightColor.getHex(),
                }}
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
      <table className={`table mb-0 ${styles.table}`}>
        <tbody>
          <tr>
            <th>RGB</th>
            <td>
              <div
                className={`${styles.gradient}`}
                style={{
                  background: colorGradient.getBackgroundImageStyle(ColorLerpMode.RGB),
                }}
                data-mode={ColorLerpMode.RGB}
                onMouseDown={onMouseMoveGradient}
                onMouseMove={onMouseMoveGradient}
              ></div>
            </td>
          </tr>
          <tr>
            <th>HSL</th>
            <td>
              <div
                className={`${styles.gradient}`}
                style={{
                  background: colorGradient.getBackgroundImageStyle(ColorLerpMode.HSL),
                }}
                data-mode={ColorLerpMode.HSL}
                onMouseDown={onMouseMoveGradient}
                onMouseMove={onMouseMoveGradient}
              ></div>
            </td>
          </tr>
          <tr>
            <th>HSL*</th>
            <td>
              <div
                className={`${styles.gradient}`}
                style={{
                  background: colorGradient.getBackgroundImageStyle(ColorLerpMode.HSL_FLIP),
                }}
                data-mode={ColorLerpMode.HSL_FLIP}
                onMouseDown={onMouseMoveGradient}
                onMouseMove={onMouseMoveGradient}
              ></div>
            </td>
          </tr>
          <tr>
            <th>LCH</th>
            <td>
              <div
                className={`${styles.gradient}`}
                style={{
                  background: colorGradient.getBackgroundImageStyle(ColorLerpMode.LCH),
                }}
                data-mode={ColorLerpMode.LCH}
                onMouseDown={onMouseMoveGradient}
                onMouseMove={onMouseMoveGradient}
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

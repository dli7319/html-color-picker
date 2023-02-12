import React from "react";

import Color from "./Color";
import { ColorGradient } from "./ColorGradient";
import styles from "./styles/ColorInterpolation.module.css";


export default function ColorInterpolation({
  className,
  leftColor,
  rightColor,
  activeColor = "none",
  setActiveColor
}: {
  className?: string;
  leftColor: Color;
  rightColor: Color;
  activeColor?: string;
  setActiveColor: (activeColor: string) => void;
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

  return (
    <div className={className}>
      <h5>Color Interpolation</h5>
      <table className="table mb-0">
        <tbody>
          <tr>
            <td>
              <div className={`${styles.colorSelection} ${styles} ${leftActive}`} onClick={setActiveColorLeft}>
              </div>
            </td>
            <td>
              <div className={`${styles.colorSelection} ${styles.rightColor} ${rightActive}`} onClick={setActiveColorRight}>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table className={`table mb-0 ${styles.table}`}>
        <tbody>
          <tr>
            <th>
              RGB
            </th>
            <td>
              <div className={`${styles.gradient}`} style={{
                background: colorGradient.getBackgroundImageStyle("rgb")
              }}></div>
            </td>
          </tr>
          <tr>
            <th>
              HSL
            </th>
            <td>
              <div className={`${styles.gradient}`} style={{
                background: colorGradient.getBackgroundImageStyle("hsl")
              }}></div>
            </td>
          </tr>
          <tr>
            <th>
              HSL*
            </th>
            <td>
              <div className={`${styles.gradient}`} style={{
                background: colorGradient.getBackgroundImageStyle("hsl_flip")
              }}></div>
            </td>
          </tr>
          <tr>
            <th>
              LCH
            </th>
            <td>
              <div className={`${styles.gradient}`} style={{
                background: colorGradient.getBackgroundImageStyle("lch")
              }}></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

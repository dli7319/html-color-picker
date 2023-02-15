import React, { useState } from "react";
import Color from "./Color";
import ColorSelection from "./ColorSelection";
import ColorConverter from "./ColorConverter";
import ImageSampling from "./ImageSampling";
import ColorInterpolation from "./ColorInterpolation";
import OtherTools from "./OtherTools";
import styles from "./styles/ColorPicker.module.css";

export default function ColorPicker() {
  const [color, setColor] = useState(new Color({
    type: "rgb255",
    r: 255,
    g: 255,
    b: 255
  }));
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, width: 1, height: 1 });
  const [interpolationLeft, setInterpolationLeft] = useState(new Color({
    type: "rgb255",
    r: 255,
    g: 0,
    b: 0
  }));
  const [interpolationRight, setInterpolationRight] = useState(new Color({
    type: "rgb255",
    r: 255,
    g: 255,
    b: 255
  }));
  const [interpolationActive, setInterpolationActive] = useState("none");

  function updateColor(newColor: Color) {
    setColor(newColor);
    if (interpolationActive == "left") {
      setInterpolationLeft(newColor);
    } else if (interpolationActive == "right") {
      setInterpolationRight(newColor);
    }
  }

  document.body.style.background = "#" + color.getHex();

  return <div className="d-flex flex-row flex-wrap">
    <ColorSelection className={styles.columnContainer} color={color} setColor={updateColor} />
    <ColorConverter className={styles.columnContainer} color={color} setColor={updateColor} coordinates={coordinates} />
    <ImageSampling className={styles.columnContainer} setColor={updateColor}
      coordinates={coordinates} setCoordinates={setCoordinates} />
    <ColorInterpolation className={styles.columnContainer} leftColor={interpolationLeft}
      rightColor={interpolationRight} activeColor={interpolationActive} setActiveColor={setInterpolationActive}
      setColor={setColor} />
    <OtherTools className={styles.columnContainer} />
  </div>;
}

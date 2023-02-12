import React from "react";
import Color from "./Color";
import ColorSelection from "./ColorSelection";
import ColorConverter from "./ColorConverter";
import ImageSampling from "./ImageSampling";
import ColorInterpolation from "./ColorInterpolation";
import OtherTools from "./OtherTools";
import styles from "./styles/ColorPicker.module.css";

export default function ColorPicker() {
  const [color, setColor] = React.useState(new Color({
    type: "rgb255",
    r: 255,
    g: 255,
    b: 255
  }));
  const [coordinates, setCoordinates] = React.useState({ x: 0, y: 0, width: 1, height: 1 });
  const [interpolationLeft, setInterpolationLeft] = React.useState(new Color({
    type: "rgb255",
    r: 255,
    g: 0,
    b: 0
  }));
  const [interpolationRight, setInterpolationRight] = React.useState(new Color({
    type: "rgb255",
    r: 255,
    g: 255,
    b: 255
  }));
  const [interpolationActive, setInterpolationActive] = React.useState("none");

  function updateColor(newColor: Color) {
    setColor(newColor);
  }

  document.body.style.background = "#" + color.getHex();

  return <div className="d-flex flex-row flex-wrap">
    <ColorSelection className={styles.columnContainer} color={color} setColor={updateColor}/>
    <ColorConverter className={styles.columnContainer} color={color} setColor={updateColor} coordinates={coordinates} />
    <ImageSampling className={styles.columnContainer} />
    <ColorInterpolation className={styles.columnContainer} leftColor={interpolationLeft}
      rightColor={interpolationRight} activeColor={interpolationActive} setActiveColor={setInterpolationActive} />
    <OtherTools className={styles.columnContainer} />
  </div>;
}

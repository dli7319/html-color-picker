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
  document.body.style.background = "#" + color.getHex();

  return <div className="d-flex flex-row flex-wrap">
    <ColorSelection className={styles.columnContainer} color={color} />
    <ColorConverter className={styles.columnContainer} color={color} setColor={setColor} />
    <ImageSampling className={styles.columnContainer} />
    <ColorInterpolation className={styles.columnContainer} />
    <OtherTools className={styles.columnContainer} />
  </div>;
}

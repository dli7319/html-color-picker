import React, { useState } from "react";
import {createComponent} from '@lit/react';

import Color, { ColorInputType } from "./Color";
import {ColorSelection} from "./ColorSelection";
import ColorConverter from "./ColorConverter";
import {Coordinates, ImageSampling} from "./ImageSampling";
import {ColorInterpolation, ActiveColorSide } from "./ColorInterpolation";
import styles from "./styles/ColorPicker.module.css";
import './OtherTools.ts';

const ColorSelectionReact = createComponent({
  tagName: 'color-selection',
  elementClass: ColorSelection,
  react: React,
});

const ImageSamplingReact = createComponent({
  tagName: 'image-sampling',
  elementClass: ImageSampling,
  react: React,
});

const ColorInterpolationReact = createComponent({
  tagName: 'color-interpolation',
  elementClass: ColorInterpolation,
  react: React,
});

export default function ColorPicker() {
  const [color, setColor] = useState(
    new Color({
      type: ColorInputType.RGB255,
      r: 255,
      g: 255,
      b: 255,
    })
  );
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  } as Coordinates);
  const [interpolationLeft, setInterpolationLeft] = useState(
    new Color({
      type: ColorInputType.RGB255,
      r: 255,
      g: 0,
      b: 0,
    })
  );
  const [interpolationRight, setInterpolationRight] = useState(
    new Color({
      type: ColorInputType.RGB255,
      r: 255,
      g: 255,
      b: 255,
    })
  );
  const [interpolationActive, setInterpolationActive] = useState(ActiveColorSide.NONE);

  function updateColor(newColor: Color) {
    setColor(newColor);
    if (interpolationActive === ActiveColorSide.LEFT) {
      setInterpolationLeft(newColor);
    } else if (interpolationActive == ActiveColorSide.RIGHT) {
      setInterpolationRight(newColor);
    }
  }

  document.body.style.background = "#" + color.getHex();

  return (
    <div className={`d-flex flex-row flex-wrap ${styles.mainContainer}`}>
      <ColorSelectionReact
        color={color}
        setColor={updateColor}
      />
      <ColorConverter
        className={styles.component}
        color={color}
        setColor={updateColor}
        coordinates={coordinates}
      />
      <ImageSamplingReact
        setColor={updateColor}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
      />
      <ColorInterpolationReact
        leftColor={interpolationLeft}
        rightColor={interpolationRight}
        activeColor={interpolationActive}
        setActiveColor={setInterpolationActive}
        setColor={setColor}
      />
      <other-tools/>
    </div>
  );
}

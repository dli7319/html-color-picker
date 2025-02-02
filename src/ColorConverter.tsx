import React, { useState } from "react";

import Color from "./Color";
import styles from "./styles/ColorConverter.module.css";
import {
  parseHexColor,
  parseHSVColor,
  parseRGB01Color,
  parseRGB255Color,
} from "./ColorStringParsing";
import { ColorConverterInput } from "./ColorConverterInput";

interface InputValues {
  color: Color; // Key for the color that was last updated
  hexValue?: string;
  rgb255Value?: string;
  rgb01Value?: string;
  hsvValue?: string;
}

interface ColorConverterProps {
  color: Color;
  setColor: (color: Color) => void;
  coordinates: { x: number; y: number; width: number; height: number };
  className?: string;
  verbose?: boolean;
  copiedTimeout?: number;
}

export default function ColorConverter({
  color,
  setColor,
  coordinates,
  className = "",
  verbose = true,
  copiedTimeout = 1000,
}: ColorConverterProps) {
  const [inputValues, setInputValues] = useState<InputValues>({
    color,
  });

  // If the color has changed, remove the input values.
  if (color != inputValues.color) {
    setInputValues({
      color,
    });
  }

  function updateFromHex(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const parsedColor = parseHexColor(value);
    if (parsedColor != null) {
      if (verbose) console.log(`Found Hex: #${parsedColor.getHex()}`);
      setColor(parsedColor);
      setInputValues({ color: parsedColor, hexValue: value });
      return;
    }
    setInputValues({
      ...inputValues,
      hexValue: value,
    });
  }

  function updateFromRGB255(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const parsedColor = parseRGB255Color(value);
    if (parsedColor != null) {
      if (verbose)
        console.log(
          `Found RGB255: ${parsedColor.getRGB255().splice(0, 3).toString()}`
        );
      setColor(parsedColor);
      setInputValues({ color: parsedColor, rgb255Value: value });
      return;
    }
    setInputValues({
      ...inputValues,
      rgb255Value: value,
    });
  }

  function updateFromRGB01(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const parsedColor = parseRGB01Color(value);
    if (parsedColor != null) {
      if (verbose)
        console.log(
          `Found RGB01: ${parsedColor.getRGB01().splice(0, 3).toString()}`
        );
      setColor(parsedColor);
      setInputValues({ color: parsedColor, rgb01Value: value });
      return;
    }
    setInputValues({
      ...inputValues,
      rgb01Value: value,
    });
  }

  function updateFromHSV(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const parsedColor = parseHSVColor(value);
    if (parsedColor != null) {
      if (verbose)
        console.log(
          `Found HSV: ${parsedColor.getHSV().splice(0, 3).toString()}`
        );
      setColor(parsedColor);
      setInputValues({ color: parsedColor, hsvValue: value });
      return;
    }
    setInputValues({
      ...inputValues,
      hsvValue: value,
    });
  }

  const hex =
    inputValues.hexValue != null ? inputValues.hexValue : "#" + color.getHex();
  const rgb255 =
    inputValues.rgb255Value != null
      ? inputValues.rgb255Value
      : color.getRGB255().splice(0, 3).toString();
  const rgb01 =
    inputValues.rgb01Value != null
      ? inputValues.rgb01Value
      : color
          .getRGB01()
          .splice(0, 3)
          .map((x) => x.toFixed(3))
          .toString();
  const hsv =
    inputValues.hsvValue != null
      ? inputValues.hsvValue
      : color.getHSV(false).splice(0, 3).toString();

  const floatCoordinates = {
    x: coordinates.x / coordinates.width,
    y: coordinates.y / coordinates.height,
  };
  const floatCoordinatesString = `(${floatCoordinates.x.toFixed(
    3
  )}, ${floatCoordinates.y.toFixed(3)})`;
  const intCoordinatesString = `(${Math.round(coordinates.x)}, ${Math.round(
    coordinates.y
  )})`;

  return (
    <div className={className}>
      <h5>Color Converter</h5>
      <table className="table mb-0 table-borderless ">
        <tbody>
          <tr>
            <th scope="row">Coordinates</th>
            <td>
              <p id="coordinates-container" className="mb-0">
                {floatCoordinatesString}
                <br />
                {intCoordinatesString}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={`d-flex flex-column ${styles.inputsContainer}`}>
        <ColorConverterInput
          label="Hex"
          value={hex}
          onChange={updateFromHex}
          copiedTimeout={copiedTimeout}
        />
        <ColorConverterInput
          label="RGB (0-255)"
          value={rgb255}
          onChange={updateFromRGB255}
          copiedTimeout={copiedTimeout}
        />
        <ColorConverterInput
          label="RGB (0-1)"
          value={rgb01}
          onChange={updateFromRGB01}
          copiedTimeout={copiedTimeout}
        />
        <ColorConverterInput
          label="HSV (°, %, %)"
          value={hsv}
          onChange={updateFromHSV}
          copiedTimeout={copiedTimeout}
        />
      </div>
    </div>
  );
}

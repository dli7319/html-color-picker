import React, { useState, useReducer } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import Color from "./Color";
import styles from "./styles/ColorConverter.module.css";

interface InputValues {
  color: Color; // Key for the color that was last updated
  hexValue?: string;
  rgb255Value?: string;
  rgb01Value?: string;
  hsvValue?: string;
}

interface CopiedState {
  hex: boolean;
  rgb255: boolean;
  rgb01: boolean;
  hsv: boolean;
}

const defaultCopiedState: CopiedState = Object.freeze({
  hex: false,
  rgb255: false,
  rgb01: false,
  hsv: false,
});

interface CopiedStateUpdate {
  hex?: boolean;
  rgb255?: boolean;
  rgb01?: boolean;
  hsv?: boolean;
}

function copiedStateReducer(state: CopiedState, newState: CopiedStateUpdate) {
  return { ...state, ...newState };
}

export default function ColorConverter({
  color,
  setColor,
  coordinates,
  className = "",
  verbose = true,
  copiedTimeout = 1000,
}: {
  color: Color;
  setColor: (color: Color) => void;
  coordinates: { x: number; y: number; width: number; height: number };
  className?: string;
  verbose?: boolean;
  copiedTimeout?: number;
}) {
  const [inputValues, setInputValues] = useState<InputValues>({
    color,
  });
  const [copied, setCopied] = useReducer(
    copiedStateReducer,
    defaultCopiedState
  );

  // If the color has changed, remove the input values.
  if (color != inputValues.color) {
    console.log("color != inputValues.color");
    setInputValues({
      color,
    });
  }

  function updateFromHex(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const hexRegex = /^#?([0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)$/;
    const match = hexRegex.exec(value);
    if (match && match.length == 2) {
      if (verbose) console.log(`Found Hex: #${match[1]}`);
      const newColor = new Color({
        type: "hex",
        hex: match[1],
      });
      setColor(newColor);
      setInputValues({ color: newColor, hexValue: value });
      return;
    }
    setInputValues({
      ...inputValues,
      hexValue: value,
    });
  }

  function updateFromRGB255(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const rgb255Regex = /^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/;
    const match = rgb255Regex.exec(value);
    if (match && match.length == 4) {
      if (verbose)
        console.log(`Found RGB255: ${match[1]}, ${match[2]}, ${match[3]}`);
      const newColor = new Color({
        type: "rgb255",
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
      });
      setColor(newColor);
      setInputValues({ color: newColor, rgb255Value: value });
      return;
    }
    setInputValues({
      ...inputValues,
      rgb255Value: value,
    });
  }

  function updateFromRGB01(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const rgb01Regex =
      /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;
    const match = rgb01Regex.exec(value);
    if (match && match.length == 4) {
      if (verbose)
        console.log(`Found RGB01: ${match[1]}, ${match[2]}, ${match[3]}`);
      const newColor = new Color({
        type: "rgb01",
        r: parseFloat(match[1]),
        g: parseFloat(match[2]),
        b: parseFloat(match[3]),
      });
      setColor(newColor);
      setInputValues({ color: newColor, rgb01Value: value });
      return;
    }
    setInputValues({
      ...inputValues,
      rgb01Value: value,
    });
  }

  function updateFromHSV(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const hsvRegex =
      /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+\s*([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;
    const match = hsvRegex.exec(value);
    if (match && match.length == 4) {
      const h = parseFloat(match[1]);
      const s = parseFloat(match[2]);
      const v = parseFloat(match[3]);
      if (0 <= h && h <= 360 && 0 <= s && s <= 100 && 0 <= v && v <= 100) {
        if (verbose)
          console.log(`Found HSV: ${match[1]}, ${match[2]}, ${match[3]}`);
        const newColor = new Color({
          type: "hsv",
          h: parseInt(match[1]),
          s: parseInt(match[2]),
          v: parseInt(match[3]),
        });
        setColor(newColor);
        setInputValues({ color: newColor, hsvValue: value });
        return;
      }
    }
    setInputValues({
      ...inputValues,
      hsvValue: value,
    });
  }

  function onCopy(key: keyof CopiedStateUpdate = "hex") {
    setCopied({ [key]: true });
    setTimeout(() => setCopied({ [key]: false }), copiedTimeout);
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
      : color
          .getHSV()
          .splice(0, 3)
          .map((x) => Math.round(x))
          .toString();

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
        <div className="d-flex">
          <InputGroup>
            <FloatingLabel label="Hex" className="flex-grow-1">
              <Form.Control type="text" value={hex} onChange={updateFromHex} />
            </FloatingLabel>
            <InputGroup.Text>
              <CopyToClipboard text={hex} onCopy={() => onCopy("hex")}>
                <i
                  className={`bi bi-clipboard2 ${styles.copyIcon}`}
                  hidden={copied.hex}
                ></i>
              </CopyToClipboard>
              <i
                className={`bi bi-check ${styles.copyIcon}`}
                hidden={!copied.hex}
              ></i>
            </InputGroup.Text>
          </InputGroup>
        </div>
        <div className="d-flex">
          <InputGroup>
            <FloatingLabel label="RGB (0-255)" className="flex-grow-1">
              <Form.Control
                type="text"
                value={rgb255}
                onChange={updateFromRGB255}
              />
            </FloatingLabel>
            <InputGroup.Text>
              <CopyToClipboard text={rgb255} onCopy={() => onCopy("rgb255")}>
                <i
                  className={`bi bi-clipboard2 ${styles.copyIcon}`}
                  hidden={copied.rgb255}
                ></i>
              </CopyToClipboard>
              <i
                className={`bi bi-check ${styles.copyIcon}`}
                hidden={!copied.rgb255}
              ></i>
            </InputGroup.Text>
          </InputGroup>
        </div>
        <div className="d-flex">
          <InputGroup>
            <FloatingLabel label="RGB (0-1)" className="flex-grow-1">
              <Form.Control
                type="text"
                value={rgb01}
                onChange={updateFromRGB01}
              />
            </FloatingLabel>
            <InputGroup.Text>
              <CopyToClipboard text={rgb01} onCopy={() => onCopy("rgb01")}>
                <i
                  className={`bi bi-clipboard2 ${styles.copyIcon}`}
                  hidden={copied.rgb01}
                ></i>
              </CopyToClipboard>
              <i
                className={`bi bi-check ${styles.copyIcon}`}
                hidden={!copied.rgb01}
              ></i>
            </InputGroup.Text>
          </InputGroup>
        </div>
        <div className="d-flex">
          <InputGroup>
            <FloatingLabel label="HSV (&#176;, %, %)" className="flex-grow-1">
              <Form.Control type="text" value={hsv} onChange={updateFromHSV} />
            </FloatingLabel>
            <InputGroup.Text>
              <CopyToClipboard text={hsv} onCopy={() => onCopy("hsv")}>
                <i
                  className={`bi bi-clipboard2 ${styles.copyIcon}`}
                  hidden={copied.hsv}
                ></i>
              </CopyToClipboard>
              <i
                className={`bi bi-check ${styles.copyIcon}`}
                hidden={!copied.hsv}
              ></i>
            </InputGroup.Text>
          </InputGroup>
        </div>
      </div>
    </div>
  );
}

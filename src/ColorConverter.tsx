import React from "react";

import Color from "./Color";
import styles from "./styles/ColorConverter.module.css"

export default function ColorConverter({
    className,
    color,
    setColor,
    coordinates,
    verbose = true,
}: {
    className?: string;
    color: Color;
    setColor: (color: Color) => void;
    coordinates: { x: number; y: number; width: number; height: number };
    verbose?: boolean;
}) {
    // The keys here are a hack to force the input to update when the color changes.
    const [inputValues, setInputValues] = React.useState<{
        hexValue?: string;
        rgb255Value?: string;
        rgb01Value?: string;
        hsvValue?: string;
    }>({});

    function updateFromHex(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const hexRegex = /^#?([0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)$/;
        const match = hexRegex.exec(value);
        if (match && match.length == 2) {
            if (verbose)
                console.log(`Found Hex: #${match[1]}`);
            setColor(new Color({
                type: "hex",
                hex: match[1],
            }));
            setInputValues({ hexValue: value });
        } else {
            setInputValues({
                ...inputValues,
                hexValue: value
            });
        }
    }

    function updateFromRGB255(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const rgb255Regex = /^(\d{1,3}),(\d{1,3}),(\d{1,3})$/;
        const match = rgb255Regex.exec(value);
        if (match && match.length == 4) {
            if (verbose)
                console.log(`Found RGB255: ${match[1]}, ${match[2]}, ${match[3]}`);
            setColor(new Color({
                type: "rgb255",
                r: parseInt(match[1]),
                g: parseInt(match[2]),
                b: parseInt(match[3]),
            }));
            setInputValues({ rgb255Value: value });
        } else {
            setInputValues({
                ...inputValues,
                rgb255Value: value
            });
        }
    }

    function updateFromRGB01(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const rgb01Regex = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;
        const match = rgb01Regex.exec(value);
        if (match && match.length == 4) {
            if (verbose)
                console.log(`Found RGB01: ${match[1]}, ${match[2]}, ${match[3]}`);
            setColor(new Color({
                type: "rgb01",
                r: parseFloat(match[1]),
                g: parseFloat(match[2]),
                b: parseFloat(match[3])
            }));
            setInputValues({ rgb01Value: value });
        } else {
            setInputValues({
                ...inputValues,
                rgb01Value: value
            });
        }
    }

    function updateFromHSV(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const hsvRegex = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;
        const match = hsvRegex.exec(value);
        if (match && match.length == 4) {
            if (verbose)
                console.log(`Found HSV: ${match[1]}, ${match[2]}, ${match[3]}`);
            setColor(new Color({
                type: "hsv",
                h: parseInt(match[1]),
                s: parseInt(match[2]),
                v: parseInt(match[3])
            }));
            setInputValues({ hsvValue: value });
        } else {
            setInputValues({
                ...inputValues,
                hsvValue: value
            });
        }
    }

    const hex = inputValues.hexValue != null ?
        inputValues.hexValue :
        ("#" + color.getHex());
    const rgb255 = inputValues.rgb255Value != null ?
        inputValues.rgb255Value :
        color.getRGB255()
            .splice(0, 3)
            .toString();
    const rgb01 = inputValues.rgb01Value != null ?
        inputValues.rgb01Value :
        color.getRGB01()
            .splice(0, 3)
            .map(x => x.toFixed(3))
            .toString();
    const hsv = inputValues.hsvValue != null ?
        inputValues.hsvValue :
        color.getHSV()
            .splice(0, 3)
            .map(x => Math.round(x))
            .toString();

    const floatCoordinates = {
        x: coordinates.x / coordinates.width,
        y: coordinates.y / coordinates.height
    }
    const floatCoordinatesString = `(${floatCoordinates.x.toFixed(3)}, ${floatCoordinates.y.toFixed(3)})`
    const intCoordinatesString = `(${Math.round(coordinates.x)}, ${Math.round(coordinates.y)})`

    return (
        <div className={className}>
            <h5>Color Converter</h5>
            <table className="table mb-0" id="colors-table">
                <tbody>
                    <tr>
                        <th scope="row">Coordinates</th>
                        <td>
                            <p id="coordinates-container" className="mb-0">{floatCoordinatesString}<br />{intCoordinatesString}</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Hex</th>
                        <td>
                            <input type="text" name="" value={hex} onChange={updateFromHex}
                                size={1} className={styles.inputField} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">RGB (0-255)</th>
                        <td>
                            <input type="text" name="" value={rgb255} onChange={updateFromRGB255}
                                size={1} className={styles.inputField} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">RGB (0-1)</th>
                        <td>
                            <input type="text" name="" value={rgb01} onChange={updateFromRGB01}
                                size={1} className={styles.inputField} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">HSV (&#176;, %, %)</th>
                        <td>
                            <input type="text" name="" value={hsv} onChange={updateFromHSV}
                                size={1} className={styles.inputField} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

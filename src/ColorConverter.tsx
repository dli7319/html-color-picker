import React from "react";

import Color from "./Color";

export default function ColorConverter({
    className,
    color,
    setColor,
    coordinates,
}: {
    className?: string;
    color: Color;
    setColor: (color: Color) => void;
    coordinates: { x: number; y: number; width: number; height: number };
}) {
    // The keys here are a hack to force the input to update when the color changes.

    function updateFromHex(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const hexRegex = /^#?([0-9a-zA-Z]{3}(?:[0-9a-zA-Z]{3})?)$/;
        const match = hexRegex.exec(value);
        if (match && match.length == 2) {
            console.log(`Found Hex: ${match[1]}`);
            setColor(new Color({
                type: "hex",
                hex: match[1],
                hexKey: e.target.getAttribute("data-key")
            }));
        }
    }

    function updateFromRGB255(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const rgb255Regex = /^(\d{1,3}),(\d{1,3}),(\d{1,3})$/;
        const match = rgb255Regex.exec(value);
        if (match && match.length == 4) {
            console.log(`Found RGB255: ${match[1]}, ${match[2]}, ${match[3]}`);
            setColor(new Color({
                type: "rgb255",
                r: parseInt(match[1]),
                g: parseInt(match[2]),
                b: parseInt(match[3]),
                rgb255Key: e.target.getAttribute("data-key")
            }));
        }
    }

    function updateFromRGB01(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const rgb01Regex = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;
        const match = rgb01Regex.exec(value);
        if (match && match.length == 4) {
            console.log(`Found RGB01: ${match[1]}, ${match[2]}, ${match[3]}`);
            setColor(new Color({
                type: "rgb01",
                r: parseFloat(match[1]),
                g: parseFloat(match[2]),
                b: parseFloat(match[3]),
                rgb01Key: e.target.getAttribute("data-key")
            }));
        }
    }

    function updateFromHSV(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const hsvRegex = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?),+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)$/;
        const match = hsvRegex.exec(value);
        if (match && match.length == 4) {
            console.log(`Found HSV: ${match[1]}, ${match[2]}, ${match[3]}`);
            setColor(new Color({
                type: "hsv",
                h: parseInt(match[1]),
                s: parseInt(match[2]),
                v: parseInt(match[3]),
                hsvKey: e.target.getAttribute("data-key")
            }));
        }
    }

    const hex = "#" + (color.input.hex || color.getHex());
    const hexKey = color.input.hexKey || hex;
    const rgb255 = color.getRGB255()
        .splice(0, 3)
        .toString();
    const rgb255Key = color.input.rgb255Key || rgb255;
    const rgb01 = color.getRGB01()
        .splice(0, 3)
        .map(x => x.toFixed(3))
        .toString();
    const rgb01Key = color.input.rgb01Key || rgb01;
    const hsv = color.getHSV()
        .splice(0, 3)
        .toString();
    const hsvKey = color.input.hsvKey || hsv;

    const floatCoordinates = {
        x: coordinates.x / coordinates.width,
        y: coordinates.y / coordinates.height
    }
    const floatCoordinatesString = `(${floatCoordinates.x.toFixed(3)}, ${floatCoordinates.y.toFixed(3)})`
    const intCoordinatesString = `(${coordinates.x}, ${coordinates.y})`

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
                            <input type="text" name="" key={hexKey} defaultValue={hex} onChange={updateFromHex} data-key={hexKey} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">RGB (0-255)</th>
                        <td>
                            <input type="text" name="" key={rgb255Key} defaultValue={rgb255} onChange={updateFromRGB255} data-key={rgb255Key} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">RGB (0-1)</th>
                        <td>
                            <input type="text" name="" key={rgb01Key} defaultValue={rgb01} onChange={updateFromRGB01} data-key={rgb01Key} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">HSV (&#176;, %, %)</th>
                        <td>
                            <input type="text" name="" key={hsvKey} defaultValue={hsv} onChange={updateFromHSV} data-key={hsvKey} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

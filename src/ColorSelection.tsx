import React from "react";
import clamp from "clamp";
import Color from "./Color";
import styles from "./styles/ColorSelection.module.css";

export default function ColorSelection({
    className,
    color,
    setColor
}: {
    className?: string;
    color: Color;
    setColor: (color: Color) => void;
}) {
    const [hue, saturation, value] = color.getHSV();

    function onMouseMoveColorGrad(e: React.MouseEvent<HTMLDivElement>) {
        const mouseDown = e.buttons == 1;
        if (mouseDown) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
            const y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
            // console.log(x, y);
            const newSaturation = x * 100;
            const newValue = (1 - y) * 100;
            setColor(new Color({
                type: "hsv",
                h: hue,
                s: newSaturation,
                v: newValue
            }));
        }
    }

    function onMouseMoveColorBar(e: React.MouseEvent<HTMLDivElement>) {
        const mouseDown = e.buttons == 1;
        if (mouseDown) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
            const newHue = x * 360;
            setColor(new Color({
                type: "hsv",
                h: newHue,
                s: saturation,
                v: value
            }));
        }
    }


    const hueColorHex = "#" + new Color({
        type: "hsv",
        h: hue,
        s: 100,
        v: 100
    }).getHex();
    const colorGradStyleBackground = `linear-gradient(to right, #FFF 0%, ${hueColorHex} 100%)`;

    const colorCircleStyle = {
        top: `calc(${(1.0 - value / 100) * 100}% - 0.5rem)`,
        left: `calc(${saturation / 100 * 100}% - 0.5rem)`,
        backgroundColor: `#${color.getHex()}`,
        borderColor: value < 50 ? "white" : "black"
    };
    const huePointerStyleLeft = `${hue / 360 * 100}%`;

    return (
        <div className={className}>
            <h5>Color Selection</h5>
            <div className={styles.colorGradContainer}>
                <div className={`${styles.colorGrad} ${styles.colorGrad1}`} style={{
                    background: colorGradStyleBackground
                }}></div>
                <div className={`${styles.colorGrad} ${styles.colorGrad2}`} onMouseMove={onMouseMoveColorGrad}
                    onMouseDown={onMouseMoveColorGrad}></div>
                <div className={styles.colorGradCircle} style={colorCircleStyle}></div>
            </div>
            <div className={styles.colorBar} onMouseMove={onMouseMoveColorBar} onMouseDown={onMouseMoveColorBar}>
                <div className={styles.colorBarPointer} style={{
                    left: huePointerStyleLeft,
                }}>
                    <div className={styles.colorBarPointer2}></div>
                    <div className={styles.colorBarPointer3} style={{
                        borderBottomColor: hueColorHex
                    }}></div>
                    <div className={styles.colorBarPointer4} style={{
                        borderColor: hueColorHex
                    }}></div>
                </div>
            </div>
        </div>
    );
}

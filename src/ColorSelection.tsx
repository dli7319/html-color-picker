import React from "react";

import Color from "./Color";
import styles from "./styles/ColorSelection.module.css";

export default function ColorSelection({
    className,
    color
}: {
    className?: string;
    color: Color;
}) {
    return (
        <div className={className}>
            <h5>Color Selection</h5>
            <div className={styles.colorGradContainer}>
                <div className={`${styles.colorGrad} ${styles.colorGrad1}`}></div>
                <div className={`${styles.colorGrad} ${styles.colorGrad2}`}></div>
                <div className={styles.colorGradCircle}></div>
            </div>
            <div className={styles.colorBar}>
                <div className={styles.colorBarPointer}>
                    <div className={styles.colorBarPointer2}></div>
                    <div className={styles.colorBarPointer3}></div>
                    <div className={styles.colorBarPointer4}></div>
                </div>
            </div>
        </div>
    );
}

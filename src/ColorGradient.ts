import Color from "./Color";

export class ColorGradient {
    colors: Color[] = [];
    positions: number[] = [];

    constructor(leftColor = new Color({
        type: "rgb01",
        r: 1,
        g: 0,
        b: 0
    }), rightColor = new Color({
        type: "rgb01",
        r: 1,
        g: 1,
        b: 1
    })) {
        this.addColorStop(0, leftColor);
        this.addColorStop(1, rightColor);
    }

    setColorStop(position: number, color: Color) {
        let index = this.positions.indexOf(position);
        if (index == -1) {
            this.addColorStop(position, color);
        } else {
            this.colors[index] = color;
        }
    }

    addColorStop(position: number, color: Color) {
        this.colors.push(color);
        this.positions.push(position);
    }

    getColorAt(position: number, mode: string): Color {
        if (this.colors.length === 0) {
            return new Color({});
        }
        if (this.colors.length === 1) {
            return this.colors[0];
        }

        let i = 0;
        while (i < this.positions.length && position > this.positions[i]) {
            i++;
        }

        if (i === 0) {
            return this.colors[0];
        }
        if (i === this.positions.length) {
            return this.colors[this.colors.length - 1];
        }

        const p0 = this.positions[i - 1];
        const p1 = this.positions[i];
        const c0 = this.colors[i - 1];
        const c1 = this.colors[i];

        const t = (position - p0) / (p1 - p0);

        return Color.lerp(c0, c1, t, mode = mode);
    }

    getBackgroundImageStyle(mode = "rgb") {
        let gradient = "linear-gradient(to right";
        for (let i = 0; i < 100; i++) {
            gradient += ", " + this.getColorAt(i / 100, mode).toCSS() + " " + i + "%";
        }
        gradient += ")";
        return gradient;
    }
}
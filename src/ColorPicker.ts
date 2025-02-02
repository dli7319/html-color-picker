import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

import Color, { ColorInputType } from "./Color";
import { Coordinates } from "./Coordinates";
import { ActiveColorSide } from "./ColorInterpolation";
import {styles} from "./styles/ColorPicker";
import { bootstrap } from "./styles/Bootstrap";
import "./ColorSelection";
import "./ColorConverter";
import "./ImageSampling";
import "./ColorInterpolation";
import "./OtherTools";

// const ColorConverterReact = createComponent({
//   tagName: 'color-converter',
//   elementClass: ColorConverter,
//   react: React,
// });

// const ColorSelectionReact = createComponent({
//   tagName: 'color-selection',
//   elementClass: ColorSelection,
//   react: React,
// });

// const ImageSamplingReact = createComponent({
//   tagName: 'image-sampling',
//   elementClass: ImageSampling,
//   react: React,
// });

// const ColorInterpolationReact = createComponent({
//   tagName: 'color-interpolation',
//   elementClass: ColorInterpolation,
//   react: React,
// });

@customElement("color-picker")
export class ColorPicker extends LitElement {
  static styles = [styles];

  @state()
  color: Color = new Color({
    type: ColorInputType.RGB255,
    r: 255,
    g: 255,
    b: 255,
  });
  @state()
  coordinates: Coordinates = {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  };
  @state()
  interpolationLeft: Color = new Color({
    type: ColorInputType.RGB255,
    r: 255,
    g: 0,
    b: 0,
  });
  @state()
  interpolationRight: Color = new Color({
    type: ColorInputType.RGB255,
    r: 255,
    g: 255,
    b: 255,
  });
  @state()
  interpolationActive: ActiveColorSide = ActiveColorSide.NONE;

  setColor(newColor: Color) {
    this.color = newColor;
    if (this.interpolationActive === ActiveColorSide.LEFT) {
      this.interpolationLeft = newColor;
    } else if (this.interpolationActive == ActiveColorSide.RIGHT) {
      this.interpolationRight = newColor;
    }
  }

  setCoordinates(newCoordinates: Coordinates) {
    this.coordinates = newCoordinates;
  }

  setInterpolationActive(newActive: ActiveColorSide) {
    this.interpolationActive = newActive;
  }

  render() {
    const background = "#" + this.color.getHex();
    this.style.background = background;
    return html` ${bootstrap}
      <div class="d-flex flex-row flex-wrap main-container">
        <color-selection
          class="component"
          .color=${this.color}
          .setColor=${this.setColor.bind(this)}
        ></color-selection>
        <color-converter
          class="component"
          .color=${this.color}
          .setColor=${this.setColor.bind(this)}
          .coordinates=${this.coordinates}
        ></color-converter>
        <image-sampling
          class="component"
          .setColor=${this.setColor.bind(this)}
          .coordinates=${this.coordinates}
          .setCoordinates=${this.setCoordinates}
        ></image-sampling>
        <color-interpolation
          class="component"
          .leftColor=${this.interpolationLeft}
          .rightColor=${this.interpolationRight}
          .activeColor=${this.interpolationActive}
          .setActiveColor=${this.setInterpolationActive.bind(this)}
          .setColor=${this.setColor.bind(this)}
        ></color-interpolation>
        <other-tools class="component"></other-tools>
      </div>`;
  }
}

// export default function ColorPicker() {
//   const [color, setColor] = useState(
//     new Color({
//       type: ColorInputType.RGB255,
//       r: 255,
//       g: 255,
//       b: 255,
//     })
//   );
//   const [coordinates, setCoordinates] = useState({
//     x: 0,
//     y: 0,
//     width: 1,
//     height: 1,
//   } as Coordinates);
//   const [interpolationLeft, setInterpolationLeft] = useState(
//     new Color({
//       type: ColorInputType.RGB255,
//       r: 255,
//       g: 0,
//       b: 0,
//     })
//   );
//   const [interpolationRight, setInterpolationRight] = useState(
//     new Color({
//       type: ColorInputType.RGB255,
//       r: 255,
//       g: 255,
//       b: 255,
//     })
//   );
//   const [interpolationActive, setInterpolationActive] = useState(ActiveColorSide.NONE);

//   function updateColor(newColor: Color) {
//     setColor(newColor);
//     if (interpolationActive === ActiveColorSide.LEFT) {
//       setInterpolationLeft(newColor);
//     } else if (interpolationActive == ActiveColorSide.RIGHT) {
//       setInterpolationRight(newColor);
//     }
//   }

//   document.body.style.background = "#" + color.getHex();

//   return (
//     <div className={`d-flex flex-row flex-wrap ${styles.mainContainer}`}>
//       <ColorSelectionReact
//         className={styles.component}
//         color={color}
//         setColor={updateColor}
//       />
//       <ColorConverterReact
//         className={styles.component}
//         color={color}
//         setColor={updateColor}
//         coordinates={coordinates}
//       />
//       <ImageSamplingReact
//         className={styles.component}
//         setColor={updateColor}
//         coordinates={coordinates}
//         setCoordinates={setCoordinates}
//       />
//       <ColorInterpolationReact
//         className={styles.component}
//         leftColor={interpolationLeft}
//         rightColor={interpolationRight}
//         activeColor={interpolationActive}
//         setActiveColor={setInterpolationActive}
//         setColor={setColor}
//       />
//       <other-tools class={styles.component}/>
//     </div>
//   );
// }

import ColorPicker from "./ColorPicker.js";

const colorConvert = require("color-convert");
window.colorConvert = colorConvert;

const myColorPicker = new ColorPicker();
myColorPicker.attachListeners();

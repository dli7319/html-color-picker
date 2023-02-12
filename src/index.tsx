import React from "react";
import { createRoot } from "react-dom/client";
import ColorPicker from "./ColorPicker";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<ColorPicker />);
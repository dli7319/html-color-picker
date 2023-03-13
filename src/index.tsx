import React from "react";
import { createRoot } from "react-dom/client";
import ColorPicker from "./ColorPicker";

const container = document.getElementById("root");
if (!container) throw new Error("No root element found");
const root = createRoot(container);
root.render(<ColorPicker />);

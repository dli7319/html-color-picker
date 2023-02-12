import React from "react";


export default function ImageSampling({
  className,
  overlayColor = "black"
}: {
  className?: string;
  overlayColor?: "transparent" | "black" | "white";
}) {
  return (
    <div className={className}>
      <h5>ImageSampling</h5>
      <input type="file" name="" id="image-input" value="" accept="image/*"
        onChange={console.log} />
      <div className="form-group">
        <label>Overlay</label>
        <div className="btn-group btn-group-toggle mt-1" data-toggle="buttons"
          id="image-preview-canvas-overlay-selector-div">
          <input type="radio" className="btn-check" name="image-preview-overlay-color"
            value="transparent" id="image-sampling-overlay-none" checked={overlayColor == "transparent"}
            onChange={console.log} />
          <label className="btn btn-secondary" htmlFor="image-sampling-overlay-none">None</label>
          <input type="radio" className="btn-check" name="image-preview-overlay-color"
            value="black" id="image-sampling-overlay-black" checked={overlayColor == "black"}
            onChange={console.log} />
          <label className="btn btn-secondary" htmlFor="image-sampling-overlay-black">Black</label>
          <input type="radio" className="btn-check" name="image-preview-overlay-color"
            value="white" id="image-sampling-overlay-white" checked={overlayColor == "white"}
            onChange={console.log} />
          <label className="btn btn-secondary" htmlFor="image-sampling-overlay-white">White</label>
        </div>
        <div id="image-preview-canvas-wrapper" className="mt-1">
          <canvas id="image-preview-canvas" width="0" height="0"></canvas>
          <canvas id="image-preview-overlay-canvas" width="0" height="0"></canvas>
        </div>
      </div>
    </div>
  );
}

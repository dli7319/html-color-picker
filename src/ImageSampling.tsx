import React, { useState, useRef } from "react";
import Color from "./Color";
import styles from "./styles/ImageSampling.module.css";

export default function ImageSampling({
  className,
  setColor,
  coordinates,
  setCoordinates,
  initialOverlayColor = "black"
}: {
  className?: string;
  setColor: (color: Color) => void;
  coordinates: { x: number, y: number, width: number, height: number };
  setCoordinates: (coordinates: { x: number, y: number, width: number, height: number }) => void;
  initialOverlayColor?: "transparent" | "black" | "white";
}) {
  const [overlayColor, setOverlayColor] = useState(initialOverlayColor);
  const [loadedImage, setLoadedImage] = useState(false);
  const imagePreviewCanvasRef = useRef(null);
  function updateOverlayColor(e: React.ChangeEvent<HTMLInputElement>) {
    setOverlayColor(e.currentTarget.value as "transparent" | "black" | "white");
  }
  function loadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = imagePreviewCanvasRef.current as unknown as HTMLCanvasElement;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
          }
          setLoadedImage(true);
        }
        img.src = e.target?.result as string;
      }
      reader.readAsDataURL(file);
    }
  }
  function sampleImage(e: React.MouseEvent) {
    if (e.buttons == 1) {

      const canvas = imagePreviewCanvasRef.current as unknown as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * canvas.width;
        const y = (e.clientY - rect.top) / rect.height * canvas.height;
        const imageData = ctx.getImageData(x, y, 1, 1);
        setColor(new Color({
          type: "rgb255",
          r: imageData.data[0],
          g: imageData.data[1],
          b: imageData.data[2]
        }));
        setCoordinates({
          x: x,
          y: y,
          width: canvas.width,
          height: canvas.height
        });
      }
    }
  }

  const xPercent = (coordinates.x / coordinates.width * 100);
  const yPercent = (coordinates.y / coordinates.height * 100);
  const overlayStyle = {
    borderColor: overlayColor,
    top: `calc(${yPercent}% - 0.5rem)`,
    left: `calc(${xPercent}% - 0.5rem)`,
  };

  return (
    <div className={className}>
      <h5>Image Sampling</h5>
      <input type="file" name="" defaultValue="" accept="image/*"
        onChange={loadImage} />
      <div className="form-group">
        <label className="m-1">Overlay</label>
        <div className="btn-group btn-group-toggle mt-1" data-toggle="buttons">
          <input type="radio" className="btn-check" name="image-preview-overlay-color" id="image-sampling-overlay-none"
            value="transparent" checked={overlayColor == "transparent"}
            onChange={updateOverlayColor} />
          <label className="btn btn-secondary" htmlFor="image-sampling-overlay-none">None</label>
          <input type="radio" className="btn-check" name="image-preview-overlay-color" id="image-sampling-overlay-black"
            value="black" checked={overlayColor == "black"}
            onChange={updateOverlayColor} />
          <label className="btn btn-secondary" htmlFor="image-sampling-overlay-black">Black</label>
          <input type="radio" className="btn-check" name="image-preview-overlay-color" id="image-sampling-overlay-white"
            value="white" checked={overlayColor == "white"}
            onChange={updateOverlayColor} />
          <label className="btn btn-secondary" htmlFor="image-sampling-overlay-white">White</label>
        </div>
        <div className={`mt-1 ${styles.imagePreviewCanvasWrapper}`}>
          <canvas className={styles.imagePreviewCanvas} width="0" height="0" ref={imagePreviewCanvasRef}
            onMouseDown={sampleImage} onMouseMove={sampleImage}></canvas>
          <div className={styles.imagePreviewOverlay} hidden={!Boolean(loadedImage)} style={overlayStyle}></div>
        </div>
      </div>
    </div>
  );
}

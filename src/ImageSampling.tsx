import React, { useState, useRef } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Color from "./Color";
import styles from "./styles/ImageSampling.module.css";

export enum OverlayColor {
  Transparent = "transparent",
  Black = "black",
  White = "white"
}

export enum OverlaySize {
  Small = "small",
  Medium = "medium",
  Large = "large"
}

const overlaySizeToRem = {
  [OverlaySize.Small]: "1rem",
  [OverlaySize.Medium]: "1.5rem",
  [OverlaySize.Large]: "3rem"
}

export default function ImageSampling({
  className,
  setColor,
  coordinates,
  setCoordinates,
  initialOverlayColor = OverlayColor.Black
}: {
  className?: string;
  setColor: (color: Color) => void;
  coordinates: { x: number, y: number, width: number, height: number };
  setCoordinates: (coordinates: { x: number, y: number, width: number, height: number }) => void;
  initialOverlayColor?: OverlayColor;
}) {
  const [overlayColor, setOverlayColor] = useState(initialOverlayColor);
  const [overlaySize, setOverlaySize] = useState(OverlaySize.Medium);
  const [loadedImage, setLoadedImage] = useState(false);
  const imagePreviewCanvasRef = useRef(null);
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
    top: `calc(${yPercent}% - var(--circle-diameter) / 2)`,
    left: `calc(${xPercent}% - var(--circle-diameter) / 2)`,
    "--circle-diameter": overlaySizeToRem[overlaySize]
  };

  return (
    <div className={`${className} ${styles.mainDiv}`}>
      <h5>Image Sampling</h5>
      <Form.Group controlId="formFile">
        {/* <Form.Label>Default file input example</Form.Label> */}
        <Form.Control type="file" onChange={loadImage} />
      </Form.Group>
      <div className="d-flex flex-row">
        <FloatingLabel
          label="Overlay Color"
          className="flex-grow-1"
        >
          <Form.Select aria-label="Select Overlay Color" onChange={e => setOverlayColor(e.currentTarget.value as OverlayColor)}>
            <option value={OverlayColor.Transparent}>None</option>
            <option value={OverlayColor.Black} selected>Black</option>
            <option value={OverlayColor.White}>White</option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          label="Overlay Size"
          className="flex-grow-1"
        >
          <Form.Select aria-label="Select Overlay Size" onChange={e => setOverlaySize(e.target.value as OverlaySize)}>
            <option value={OverlaySize.Small}>Small</option>
            <option value={OverlaySize.Medium} selected>Medium</option>
            <option value={OverlaySize.Large}>Large</option>
          </Form.Select>
        </FloatingLabel>
      </div>
      <div className={`mt-1 ${styles.imagePreviewCanvasWrapper}`}>
        <canvas className={styles.imagePreviewCanvas} width="0" height="0" ref={imagePreviewCanvasRef}
          onMouseDown={sampleImage} onMouseMove={sampleImage}></canvas>
        <div className={styles.imagePreviewOverlay} hidden={!Boolean(loadedImage)} style={overlayStyle}></div>
      </div>
    </div>
  );
}

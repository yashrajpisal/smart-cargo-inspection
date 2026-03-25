'use client';

import { useEffect, useRef } from 'react';

interface Detection {
  label: string;
  confidence: number;
  box: [number, number, number, number];
}

interface DetectionCanvasProps {
  image: string;
  detections: Detection[];
  showBoxes?: boolean;
}

export default function DetectionCanvas({
  image,
  detections,
  showBoxes = true,
}: DetectionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;

    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';
    baseImg.onload = () => {
      canvas.width = baseImg.width;
      canvas.height = baseImg.height;

      // Draw image
      ctx.drawImage(baseImg, 0, 0);

      // Draw detections if enabled
      if (showBoxes) {
        detections.forEach((detection, index) => {
          const [x, y, w, h] = detection.box;
          const colors = [
            '#ef4444', // red
            '#f59e0b', // amber
            '#10b981', // emerald
            '#3b82f6', // blue
          ];
          const color = colors[index % colors.length];

          // Draw bounding box
          ctx.strokeStyle = color;
          ctx.lineWidth = 3;
          ctx.strokeRect(x, y, w, h);

          // Draw label background
          ctx.fillStyle = color;
          ctx.font = 'bold 14px Arial';
          const textMetrics = ctx.measureText(
            `${detection.label} ${detection.confidence.toFixed(2)}`
          );
          ctx.fillRect(x, y - 30, textMetrics.width + 8, 25);

          // Draw label text
          ctx.fillStyle = '#ffffff';
          ctx.fillText(
            `${detection.label} ${detection.confidence.toFixed(2)}`,
            x + 4,
            y - 10
          );
        });
      }
    };

    baseImg.src = image;
  }, [image, detections, showBoxes]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-lg bg-muted"
    />
  );
}

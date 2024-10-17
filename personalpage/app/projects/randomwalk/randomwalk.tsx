'use client';
import { useEffect } from 'react';

interface RandomWalkProps {
  shape: string;
  lineWidth: number;
  distance: number;
  angleMode: string;
  speed: number;
  isRunning: boolean; // Prop to control start/stop
  canvasRef: React.RefObject<HTMLCanvasElement>; // Pass the canvas ref
  bgColor: string; // Background color
}

const RandomWalk: React.FC<RandomWalkProps> = ({
  shape,
  lineWidth,
  distance,
  angleMode,
  speed,
  isRunning,
  canvasRef,
  bgColor,
}) => {
  const randomColor = (): string => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  // New useEffect to initialize the canvas with the background color
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill the canvas with the background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [bgColor, canvasRef]);

  // Existing useEffect for the random walk animation
  useEffect(() => {
    if (!isRunning) return; // Only run when isRunning is true

    const canvas = canvasRef.current;
    if (!canvas) return; // Check if canvas is available
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let x = canvas.width / 2;
    let y = canvas.height / 2;

    ctx.lineWidth = lineWidth;

    const drawShape = (x: number, y: number) => {
      ctx.beginPath();
      if (shape === 'circle') {
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
      } else if (shape === 'square' || shape === 'rectangle') {
        const width = shape === 'square' ? 20 : 30;
        ctx.rect(x - width / 2, y - width / 2, width, 20);
      } else if (shape === 'triangle') {
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x - 15, y + 15);
        ctx.lineTo(x + 15, y + 15);
        ctx.closePath();
      }
      ctx.stroke();
    };

    const randomWalk = () => {
      const angle =
        angleMode === 'random'
          ? Math.random() * 2 * Math.PI
          : (Math.floor(Math.random() * 4) * Math.PI) / 2;
      x += Math.cos(angle) * distance;
      y += Math.sin(angle) * distance;

      ctx.strokeStyle = randomColor();
      drawShape(x, y);
    };

    const intervalId = setInterval(randomWalk, speed);

    return () => clearInterval(intervalId);
  }, [
    shape,
    lineWidth,
    distance,
    angleMode,
    speed,
    isRunning,
    canvasRef,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={800}
      style={{ border: '1px solid black' }}
    />
  );
};

export default RandomWalk;

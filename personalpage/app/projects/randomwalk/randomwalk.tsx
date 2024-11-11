'use client';
import { useEffect, useRef } from 'react';

interface RandomWalkProps {
  shape: string;
  lineWidth: number;
  distance: number;
  angleMode: string;
  speed: number;
  isRunning: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  reset: boolean; // New prop to trigger reset
}

const RandomWalk: React.FC<RandomWalkProps> = ({
  shape,
  lineWidth,
  distance,
  angleMode,
  speed,
  isRunning,
  canvasRef,
  reset,
}) => {
  const randomColor = (): string => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  const positionRef = useRef<{ x: number; y: number } | null>(null);
  const intervalIdRef = useRef<number | null>(null);

  // Initialize the canvas on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set the initial position to the center
    positionRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
  }, [canvasRef]);

  // Reset position when 'reset' prop changes
  useEffect(() => {
    if (!reset) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    positionRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
  }, [reset, canvasRef]);

  // Random walk animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!isRunning) {
      // Clear any existing interval
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      return;
    }

    if (!positionRef.current) {
      positionRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    }

    ctx.lineWidth = lineWidth;

    // Draw the first shape at the starting position
    drawShape(positionRef.current.x, positionRef.current.y);

    const randomWalk = () => {
      if (!positionRef.current) return;

      // Compute new position
      const angle =
        angleMode === 'random'
          ? Math.random() * 2 * Math.PI
          : (Math.floor(Math.random() * 4) * Math.PI) / 2;
      const x = positionRef.current.x + Math.cos(angle) * distance;
      const y = positionRef.current.y + Math.sin(angle) * distance;

      // Update position
      positionRef.current = { x, y };

      // Draw the shape at the new position
      drawShape(x, y);
    };

    // Start the random walk interval
    intervalIdRef.current = window.setInterval(randomWalk, speed);

    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [shape, lineWidth, distance, angleMode, speed, isRunning, canvasRef]);

  const drawShape = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.strokeStyle = randomColor();
    ctx.fillStyle = randomColor();

    if (shape === 'circle') {
      ctx.arc(x, y, lineWidth / 2, 0, 2 * Math.PI);
      ctx.fill();
    } else if (shape === 'square') {
      ctx.fillRect(x - lineWidth / 2, y - lineWidth / 2, lineWidth, lineWidth);
    } else if (shape === 'rectangle') {
      ctx.fillRect(
        x - lineWidth / 2,
        y - lineWidth / 4,
        lineWidth,
        lineWidth / 2
      );
    } else if (shape === 'triangle') {
      ctx.moveTo(x, y - lineWidth / 2);
      ctx.lineTo(x - lineWidth / 2, y + lineWidth / 2);
      ctx.lineTo(x + lineWidth / 2, y + lineWidth / 2);
      ctx.closePath();
      ctx.fill();
    }
    ctx.closePath();
  };

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={800}
      style={{ border: '1px solid black', backgroundColor: 'transparent' }}
    />
  );
};

export default RandomWalk;

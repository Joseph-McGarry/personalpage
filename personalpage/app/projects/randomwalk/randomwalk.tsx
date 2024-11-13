'use client';
import { useEffect, useRef } from 'react';

interface RandomWalkProps {
  shape: string;
  lineWidth: number;
  shapeSize: number;
  distance: number;
  angleMode: string;
  speed: number;
  isRunning: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  reset: boolean;
  fullness: string;
  bgColor: string; 
}

const RandomWalk: React.FC<RandomWalkProps> = ({
  shape,
  lineWidth,
  shapeSize,
  distance,
  angleMode,
  speed,
  isRunning,
  canvasRef,
  reset,
  fullness,
  bgColor,
}) => {
  const randomColor = (): string => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  const positionRef = useRef<{ x: number; y: number } | null>(null);
  const intervalIdRef = useRef<number | null>(null);
  const fullnessRef = useRef<string>(fullness);

  useEffect(() => {
    fullnessRef.current = fullness;
  }, [fullness]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set the initial position to the center
    positionRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
  }, [canvasRef]);

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
      // Reset position to center when stopped
      positionRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
      return;
    }

    if (!positionRef.current) {
      positionRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    }

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
  }, [shape, lineWidth, shapeSize, distance, angleMode, speed, isRunning, canvasRef]);

  const drawShape = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();

    if (fullnessRef.current === 'filled') {
      // "Filled" Mode: Fill the shape with a random color, no outline
      ctx.fillStyle = randomColor();
    } else {
      // "Outlined" Mode: Only draw the outline with a random color
      ctx.strokeStyle = randomColor();
      ctx.lineWidth = lineWidth;
    }

    // Define the shape path based on the selected shape
    switch (shape) {
      case 'circle':
        ctx.arc(x, y, shapeSize / 2, 0, 2 * Math.PI); // Circle
        break;
      case 'square':
        ctx.rect(x - shapeSize / 2, y - shapeSize / 2, shapeSize, shapeSize); // Square
        break;
      case 'rectangle':
        ctx.rect(x - shapeSize / 2, y - shapeSize / 4, shapeSize, shapeSize / 2); // Rectangle
        break;
      case 'triangle':
        ctx.moveTo(x, y - shapeSize / 2); // Triangle vertices
        ctx.lineTo(x - shapeSize / 2, y + shapeSize / 2);
        ctx.lineTo(x + shapeSize / 2, y + shapeSize / 2);
        ctx.closePath();
        break;
      default:
        break;
    }

    if (fullnessRef.current === 'filled') {
      // Fill the shape with the random color
      ctx.fill();
    } else {
      // Stroke the shape's outline
      ctx.stroke();
    }
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

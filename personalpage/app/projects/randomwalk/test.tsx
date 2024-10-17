import { useEffect } from 'react';

interface RandomWalkProps {
  shape: string | null;
  lineWidth: number;
  distance: number;
  angleMode: string;
  speed: number;
  isRunning: boolean;
  bgColor: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const RandomWalk: React.FC<RandomWalkProps> = ({
  shape,
  lineWidth,
  distance,
  angleMode,
  speed,
  isRunning,
  bgColor,
  canvasRef,
}) => {
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isRunning || !shape) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let x = canvas.width / 2;
    let y = canvas.height / 2;

    ctx.lineWidth = lineWidth;

    const drawShape = () => {
      ctx.beginPath();
      ctx.fillStyle = randomColor();
      ctx.strokeStyle = randomColor();

      switch (shape) {
        case 'circle':
          ctx.arc(x, y, lineWidth / 2, 0, 2 * Math.PI);
          ctx.fill();
          break;
        case 'square':
          ctx.rect(x - lineWidth / 2, y - lineWidth / 2, lineWidth, lineWidth);
          ctx.fill();
          break;
        case 'rectangle':
          ctx.rect(x - lineWidth / 2, y - lineWidth / 4, lineWidth, lineWidth / 2);
          ctx.fill();
          break;
        case 'triangle':
          ctx.moveTo(x, y - lineWidth / 2);
          ctx.lineTo(x - lineWidth / 2, y + lineWidth / 2);
          ctx.lineTo(x + lineWidth / 2, y + lineWidth / 2);
          ctx.closePath();
          ctx.fill();
          break;
        default:
          break;
      }

      ctx.stroke();
    };

    const randomWalk = () => {
      ctx.moveTo(x, y);

      let angle;
      if (angleMode === 'random') {
        angle = Math.random() * 2 * Math.PI; // Random angle in radians
      } else {
        const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]; // Right angles
        angle = angles[Math.floor(Math.random() * angles.length)];
      }

      x += Math.cos(angle) * distance;
      y += Math.sin(angle) * distance;

      drawShape();
    };

    // Animation loop
    const intervalId = setInterval(randomWalk, speed);

    return () => clearInterval(intervalId);
  }, [shape, lineWidth, distance, angleMode, speed, isRunning, bgColor, canvasRef]);

  return <canvas ref={canvasRef} width={1000} height={600} style={{ border: '1px solid black' }} />;
};

export default RandomWalk;

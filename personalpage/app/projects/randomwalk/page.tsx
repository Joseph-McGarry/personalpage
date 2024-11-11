'use client';
import { useState, useRef } from 'react';
import RandomWalk from './randomwalk';
import './random.css'; // Adjust path as necessary

const RandomWalkPage: React.FC = () => {
  const [shape, setShape] = useState<string>('circle'); // Default shape is 'circle'
  const [lineWidth, setLineWidth] = useState(20);
  const [distance, setDistance] = useState(30);
  const [angleMode, setAngleMode] = useState('random');
  const [speed, setSpeed] = useState(100);
  const [bgColor, setBgColor] = useState('#ffffff'); // Background color
  const [isRunning, setIsRunning] = useState(false); // Controls the random walk
  const [reset, setReset] = useState(false); // New state to trigger reset
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Medium gray for selected shapes
  const selectedColor = 'bg-gray-500';

  // White for unselected shapes
  const unselectedColor = 'bg-white';

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  const handleClear = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    // Trigger reset
    setReset(true);
    // Reset 'reset' state back to false after a short delay
    setTimeout(() => setReset(false), 0);
  };

  // Download canvas as image
  const handleDownload = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      // Create a temporary canvas
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // Fill the temporary canvas with the background color
      tempCtx.fillStyle = bgColor;
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      // Draw the original canvas onto the temporary canvas
      tempCtx.drawImage(canvas, 0, 0);

      // Create a link and download the temporary canvas
      const link = document.createElement('a');
      link.href = tempCanvas.toDataURL('image/png');
      link.download = 'random-walk.png';
      link.click();
    }
  };

  return (
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-center md:space-x-8 space-y-8 md:space-y-0 p-4 overflow-y-auto">
        {/* Canvas */}
        <div className="flex flex-col items-center w-full md:w-auto">
          <h1 className="text-3xl sm:text-5xl mb-4 text-center">
            <a href="/" className="hover:underline">
              Abstractify
            </a>
          </h1>
          <div
            className="canvas-container"
            style={{ backgroundColor: bgColor }}
          >
            <RandomWalk
              shape={shape}
              lineWidth={lineWidth}
              distance={distance}
              angleMode={angleMode}
              speed={speed}
              isRunning={isRunning}
              canvasRef={canvasRef} // Pass the canvas ref to RandomWalk
              reset={reset} // Pass the reset prop
            />
          </div>
        </div>


      {/* Toolbar */}
      <div className="p-4 border-2 rounded border-gray-300 flex flex-col space-y-4 w-full md:w-80">
        <h2 className="text-2xl sm:text-4xl text-center">Toolbar</h2>

        {/* Shape Selector */}
        <div>
          <h3 className="text-lg mb-2 text-center">Shape</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4">
            
            {/* Circle */}
            <div
              onClick={() => setShape('circle')}
              className={`w-9 h-9 rounded-full cursor-pointer ${
                shape === 'circle' ? selectedColor : unselectedColor
              }`}
              style={{
                // border: shape === 'circle' ? '1px solid transparent' : '1px solid transparent',
                border: 'none',
                filter: shape === 'circle' ? 'drop-shadow(0 0 8px rgb(255, 255, 255)) drop-shadow(0 0 1px rgb(255, 255, 255))'
                : 'none',
              }}
            ></div>

            {/* Square */}
              <div
                onClick={() => setShape('square')}
                className={`w-8 h-8 cursor-pointer ${
                  shape === 'square' ? selectedColor : unselectedColor
                }`}
                style={{
                  border: "none",
                  filter: shape === 'square' ? 'drop-shadow(0 0 8px rgb(255, 255, 255)) drop-shadow(0 0 1px rgb(255, 255, 255))'
                  : 'none',
                }}
              ></div>


            {/* Rectangle */}
            <div
              onClick={() => setShape('rectangle')}
              className={`w-12 h-8 cursor-pointer ${
                shape === 'rectangle' ? selectedColor : unselectedColor
              }`}
              style={{
                border: "none",
                filter: shape === 'rectangle' ? 'drop-shadow(0 0 8px rgb(255, 255, 255)) drop-shadow(0 0 1px rgb(255, 255, 255))'
                : 'none',
              }}
            ></div>

            {/* Triangle */}
            <div
              onClick={() => setShape('triangle')}
              className="cursor-pointer flex items-center justify-center"
              style={{
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderBottom:
                  shape === 'triangle' ? '30px solid #6b7280' : '30px solid white',
                filter: shape === 'triangle'
                  ? 'drop-shadow(0 0 8px rgb(255, 255, 255)) drop-shadow(0 0 1px rgb(255, 255, 255))'
                  : 'none',
              }}
            ></div>
          </div>
        </div>

        {/* Line Width Selector */}
        <div className="mb-4">
          <h3 className="text-lg mb-2 text-center">Line Width</h3>
          <input
            type="range"
            min="1"
            max="150"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="custom-slider line-width"
          />
          <span className="text-center block mt-2">{lineWidth}px</span>
        </div>

        {/* Movement Distance Selector */}
        <div className="mb-4">
          <h3 className="text-lg mb-2 text-center">Movement Distance</h3>
          <input
            type="range"
            min="1"
            max="200"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="custom-slider movement-distance"
          />
          <span className="text-center block mt-2">{distance}px</span>
        </div>

        {/* Speed Selector */}
        <div className="mb-4">
          <h3 className="text-lg mb-2 text-center">Speed</h3>
          <input
            type="range"
            min="0"
            max="100"
            value={100 - ((speed - 10) / (500 - 10)) * 100} // Calculate reversed value
            onChange={(e) =>
              setSpeed(500 - (Number(e.target.value) / 100) * (500 - 10))
            }
            className="custom-slider speed"
          />
          <span className="text-center block mt-2">{speed.toFixed(0)}ms</span>
        </div>


        {/* Angle Mode Selector */}
        <div>
          <h3 className="text-lg mb-2 text-center">Angle</h3>
          <div className="flex flex-row items-center justify-center md:space-x-4 space-x-2">
            <label className="flex items-center">
              <input
                id="angle-selector"
                type="radio"
                value="right-angles"
                checked={angleMode === 'right-angles'}
                onChange={() => setAngleMode('right-angles')}
                className="mr-2"
              />
              Right
            </label>
            <label className="flex items-center">
              <input
                id="angle-selector"
                type="radio"
                value="random"
                checked={angleMode === 'random'}
                onChange={() => setAngleMode('random')}
                className="mr-2"
              />
              Random
            </label>
          </div>
        </div>

        {/* Background Color Selector */}
        <div>
          <h3 className="text-lg mt-2 mb-2 text-center">Background Color</h3>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Start, Stop, Download Buttons */}
        {/* <div className="flex flex-wrap gap-2 justify-center"> */}
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 place-items-center  gap-4">
          <button
            onClick={handleStart}
            className="w-full md:flex-1  px-4 py-2 bg-green-200 text-black rounded hover:bg-green-300"
            style={{ minWidth: '45%' }}
          >
            Start
          </button>

          <button
            onClick={handleStop}
            className="w-full md:flex-1 px-4 py-2 bg-red-200 text-black rounded hover:bg-red-300"
            style={{ minWidth: '45%' }}
          >
            Stop
          </button>

          <button
            onClick={handleClear}
            className="w-full md:flex-1 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
            style={{ minWidth: '45%' }}
          >
            Clear
          </button>

          <button
            onClick={handleDownload}
            className="w-full md:flex-1 px-4 py-2 bg-blue-200 text-black rounded  hover:bg-blue-300"
            style={{ minWidth: '45%' }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomWalkPage;

'use client';

import { useState, useRef } from 'react';
import RandomWalk from './randomwalk';

const RandomWalkPage: React.FC = () => {
  const [shape, setShape] = useState<string>('circle'); // Default shape is 'circle'
  const [lineWidth, setLineWidth] = useState(20);
  const [distance, setDistance] = useState(30);
  const [angleMode, setAngleMode] = useState('random');
  const [speed, setSpeed] = useState(100);
  const [bgColor, setBgColor] = useState('#ffffff'); // Background color
  const [isRunning, setIsRunning] = useState(false); // Controls the random walk
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
        ctx.fillStyle = bgColor; // Use the current background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Download canvas as image
  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.href = canvasRef.current.toDataURL('image/png');
      link.download = 'random-walk.png';
      link.click();
    }
  };

  return (
    <div className="flex h-screen items-center justify-center space-x-8">
      {/* Canvas */}
      <div className="flex flex-col items-center">
        <h1 className="text-5xl mb-4 text-center">Abstractify</h1>
        <RandomWalk
          shape={shape}
          lineWidth={lineWidth}
          distance={distance}
          angleMode={angleMode}
          speed={speed}
          isRunning={isRunning}
          bgColor={bgColor}
          canvasRef={canvasRef} // Pass the canvas ref to RandomWalk
        />
      </div>

      {/* Toolbar */}
      <div className="p-4 border-2 rounded border-gray-300 flex flex-col space-y-4 w-64">
        <h2 className="text-4xl text-center">Toolbar</h2>

        {/* Shape Selector */}
        <div>
          <h3 className="text-lg mb-2 text-center">Shape</h3>
          <div className="flex justify-center items-center space-x-4">
            {/* Circle */}
            <div
              onClick={() => setShape('circle')}
              className={`w-9 h-9 rounded-full cursor-pointer ${
                shape === 'circle' ? selectedColor : unselectedColor
              }`}
              style={{
                border: shape === 'circle' ? '2px solid black' : '1px solid gray',
              }}
            ></div>

            {/* Square */}
            <div
              onClick={() => setShape('square')}
              className={`w-8 h-8 cursor-pointer ${
                shape === 'square' ? selectedColor : unselectedColor
              }`}
              style={{
                border: shape === 'square' ? '2px solid black' : '1px solid gray',
              }}
            ></div>

            {/* Rectangle */}
            <div
              onClick={() => setShape('rectangle')}
              className={`w-12 h-8 cursor-pointer ${
                shape === 'rectangle' ? selectedColor : unselectedColor
              }`}
              style={{
                border: shape === 'rectangle' ? '2px solid black' : '1px solid gray',
              }}
            ></div>

            {/* Triangle */}
            <div
              onClick={() => setShape('triangle')}
              className={`w-12 h-12 flex items-center justify-center cursor-pointer`}
              style={{
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderBottom:
                  shape === 'triangle'
                    ? '30px solid #6b7280'
                    : '30px solid white',
              }}
            ></div>
          </div>
        </div>

        {/* Line Width Selector */}
        <div>
          <h3 className="text-lg mb-2 text-center">Line Width</h3>
          <input
            type="range"
            min="1"
            max="150"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-full"
          />
          <span>{lineWidth}px</span>
        </div>

        {/* Movement Distance Selector */}
        <div>
          <h3 className="text-lg mb-2 text-center">Movement Distance</h3>
          <input
            type="range"
            min="1"
            max="150"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full"
          />
          <span>{distance}px</span>
        </div>

        {/* Speed Selector */}
        <div>
          <h3 className="text-lg mb-2 text-center">Speed</h3>
          <input
            type="range"
            min="10"
            max="500"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full"
          />
          <span>{speed}ms</span>
        </div>

         {/* Angle Mode Selector */}
         <div>
          <h3 className="text-lg mb-2 text-center">Angle</h3>
          <div className="text-center">
            <label className="mr-4">
              <input
                type="radio"
                value="right-angles"
                checked={angleMode === 'right-angles'}
                onChange={() => setAngleMode('right-angles')}
              />
              Right
            </label>
            <label>
              <input
                type="radio"
                value="random"
                checked={angleMode === 'random'}
                onChange={() => setAngleMode('random')}
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
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleStart}
            className="flex-1 px-4 py-2 bg-green-200 text-black rounded"
            style={{ minWidth: '45%' }}
          >
            Start
          </button>
          <button
            onClick={handleStop}
            className="flex-1 px-4 py-2 bg-red-200 text-black rounded"
            style={{ minWidth: '45%' }}
          >
            Stop
          </button>
          <button
            onClick={handleClear}
            className="flex-1 px-4 py-2 bg-white text-black rounded"
            style={{ minWidth: '45%' }}
          >
            Clear
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 px-4 py-2 bg-blue-300 text-black rounded"
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

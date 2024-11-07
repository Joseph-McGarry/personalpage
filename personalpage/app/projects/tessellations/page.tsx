'use client';

import './tessellator.css';
import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

const MAX_GRID_SIZE = 10; // Maximum grid size

const Tessellator: React.FC = () => {
  // Refs
  const mainTableRef = useRef<HTMLDivElement>(null);
  const tessellationTableRef = useRef<HTMLDivElement>(null);

  // State variables
  const [gridSize, setGridSize] = useState<number>(5);
  const [selectedColor, setSelectedColor] = useState<string>('#33FF33');
  const [mode, setMode] = useState<string>('draw');
  const [sameColor, setSameColor] = useState<boolean>(false);

  // Mouse state refs
  const isMouseDownRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const clickTimeoutRef = useRef<number | null>(null);

  // Initialize grid states with MAX_GRID_SIZE
  const [mainGridState, setMainGridState] = useState<string[][]>(() =>
    createInitialGridState(MAX_GRID_SIZE, 'white')
  );
  const [tessellationRotationState, setTessellationRotationState] = useState<number[][]>(() =>
    createInitialGridState(MAX_GRID_SIZE, 0)
  );

  // Utility function to create initial grid state
  function createInitialGridState<T>(size: number, initialValue: T): T[][] {
    const grid: T[][] = [];
    for (let row = 0; row < size; row++) {
      grid[row] = [];
      for (let col = 0; col < size; col++) {
        grid[row][col] = initialValue;
      }
    }
    return grid;
  }

  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  // Handle grid size change directly in the onChange handler
  const handleGridSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGridSize(Number(e.target.value));
    setMode('draw'); // Optionally reset mode when grid size changes
  };

  // Handle mode change
  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value);
  };

  // Handle same color toggle
  const handleSameColorToggle = () => {
    setSameColor(!sameColor);
  };

  // Handle clear button
  const handleClear = () => {
    setMainGridState(createInitialGridState(MAX_GRID_SIZE, 'white'));
    setTessellationRotationState(createInitialGridState(MAX_GRID_SIZE, 0));
    setMode('draw');
  };

  // Handle reset rotations
  const handleResetRotations = () => {
    setTessellationRotationState((prevState) =>
      prevState.map((row) => row.map(() => 0))
    );
  };

  // Handle download
  const handleDownload = () => {
    if (tessellationTableRef.current) {
      html2canvas(tessellationTableRef.current).then((canvas) => {
        // Create a link element
        let link = document.createElement('a');
        link.download = 'tessellation.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  // Handle painting boxes
  const paintBox = (row: number, col: number) => {
    if (row >= gridSize || col >= gridSize) return; // Avoid out-of-bounds
    setMainGridState((prevState) => {
      const newState = prevState.map((r) => r.slice());
      newState[row][col] = selectedColor;
      return newState;
    });
  };

  // Handle toggling boxes
  const toggleBox = (row: number, col: number) => {
    if (row >= gridSize || col >= gridSize) return; // Avoid out-of-bounds
    setMainGridState((prevState) => {
      const newState = prevState.map((r) => r.slice());
      newState[row][col] =
        prevState[row][col] === selectedColor ? 'white' : selectedColor;
      return newState;
    });
  };

  // Handle changing all boxes with the same color
  const changeSameColorBoxes = (targetColor: string, newColor: string) => {
    setMainGridState((prevState) => {
      const newState = prevState.map((row, rowIndex) =>
        row.map((color, colIndex) =>
          rowIndex < gridSize && colIndex < gridSize && color === targetColor ? newColor : color
        )
      );
      return newState;
    });
  };

  // Rotation functions
  const rotateSingleBox = (row: number, col: number) => {
    if (row >= gridSize || col >= gridSize) return; // Avoid out-of-bounds
    setTessellationRotationState((prevState) => {
      const newState = prevState.map((r) => r.slice());
      newState[row][col] = (prevState[row][col] + 90) % 360;
      return newState;
    });
  };

  const rotateColumn = (colIndex: number) => {
    if (colIndex >= gridSize) return; // Avoid out-of-bounds
    setTessellationRotationState((prevState) => {
      const newState = prevState.map((row, rowIndex) => {
        if (rowIndex < gridSize) {
          const newRow = row.slice();
          newRow[colIndex] = (prevState[rowIndex][colIndex] + 90) % 360;
          return newRow;
        }
        return row.slice();
      });
      return newState;
    });
  };

  const rotateRow = (rowIndex: number) => {
    if (rowIndex >= gridSize) return; // Avoid out-of-bounds
    setTessellationRotationState((prevState) => {
      const newState = prevState.map((row, index) => {
        if (index === rowIndex) {
          return row.map((rotation, colIndex) =>
            colIndex < gridSize ? (rotation + 90) % 360 : rotation
          );
        }
        return row.slice();
      });
      return newState;
    });
  };

  // Event handlers for the main grid
  const handleBoxMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => {
    if (mode === 'draw') {
      e.preventDefault();

      isMouseDownRef.current = true;
      isDraggingRef.current = false;

      const currentColor = mainGridState[row][col];

      if (sameColor) {
        changeSameColorBoxes(currentColor, selectedColor);
      } else {
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
        }
        clickTimeoutRef.current = window.setTimeout(() => {
          if (isMouseDownRef.current && !isDraggingRef.current) {
            toggleBox(row, col);
          }
        }, 0);
      }
    }
  };

  const handleBoxMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => {
    if (mode === 'draw' && isMouseDownRef.current && !sameColor) {
      e.preventDefault();
      isDraggingRef.current = true;
      paintBox(row, col);
    }
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    isDraggingRef.current = false;
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
  };

  // Touch events
  const handleBoxTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => {
    if (mode === 'draw') {
      e.preventDefault();

      isMouseDownRef.current = true;
      isDraggingRef.current = false;

      const currentColor = mainGridState[row][col];

      if (sameColor) {
        changeSameColorBoxes(currentColor, selectedColor);
      } else {
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
        }
        clickTimeoutRef.current = window.setTimeout(() => {
          if (isMouseDownRef.current && !isDraggingRef.current) {
            toggleBox(row, col);
          }
        }, 0);
      }
    }
  };

  const handleBoxTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (mode === 'draw' && isMouseDownRef.current && !sameColor) {
      e.preventDefault();
      isDraggingRef.current = true;
      const touch = e.touches[0];
      const element = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      ) as HTMLElement;
      if (element && element.dataset.row && element.dataset.col) {
        const row = parseInt(element.dataset.row);
        const col = parseInt(element.dataset.col);
        paintBox(row, col);
      }
    }
  };

  // Render the main grid
  const renderMainGrid = () => {
    const boxes = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        boxes.push(
          <div
            key={`main-${row}-${col}`}
            className="box"
            style={{ backgroundColor: mainGridState[row][col] }}
            data-row={row}
            data-col={col}
            onMouseDown={(e) => handleBoxMouseDown(e, row, col)}
            onMouseEnter={(e) => handleBoxMouseEnter(e, row, col)}
            onTouchStart={(e) => handleBoxTouchStart(e, row, col)}
            onTouchMove={handleBoxTouchMove}
          ></div>
        );
      }
    }
    return boxes;
  };

  // Render the tessellation grid
  const renderTessellationGrid = () => {
    const tessBoxes = [];
    const miniBoxSize = 50 / gridSize; // Adjust mini box size based on grid size
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const miniBoxes = [];
        for (let mRow = 0; mRow < gridSize; mRow++) {
          for (let mCol = 0; mCol < gridSize; mCol++) {
            miniBoxes.push(
              <div
                key={`mini-${row}-${col}-${mRow}-${mCol}`}
                className="mini-box"
                style={{
                  backgroundColor: mainGridState[mRow][mCol],
                  width: `${miniBoxSize}px`,
                  height: `${miniBoxSize}px`,
                }}
              ></div>
            );
          }
        }

        tessBoxes.push(
          <div
            key={`tess-${row}-${col}`}
            className="box2"
            data-row={row}
            data-col={col}
            onClick={() => {
              if (mode === 'rotateColumn') {
                rotateColumn(col);
              } else if (mode === 'rotateRow') {
                rotateRow(row);
              } else if (mode === 'rotateBox') {
                rotateSingleBox(row, col);
              }
            }}
          >
            <div
              className="mini-grid"
              style={{
                transform: `rotate(${tessellationRotationState[row][col]}deg)`,
                gridTemplateColumns: `repeat(${gridSize}, ${miniBoxSize}px)`,
                gridTemplateRows: `repeat(${gridSize}, ${miniBoxSize}px)`,
                width: '50px',
                height: '50px',
              }}
            >
              {miniBoxes}
            </div>
          </div>
        );
      }
    }
    return tessBoxes;
  };

  return (
    <div>
      <header id='tessheader'>
        <a href="/">
            Tessellator
        </a>  
      </header>
    <div className="tessellator-container">
      <div id="controls">
        <div id="colors">
          <label htmlFor="color-picker">Select Color:</label>
          <input
            type="color"
            id="color-picker"
            value={selectedColor}
            onChange={handleColorChange}
          />
        </div>

        <div id="same-color-toggle">
          <label className="flex items-center gap-2 ">
            <input
              type="checkbox"
              id="same-color-checkbox"
              checked={sameColor}
              onChange={handleSameColorToggle}
              className='order-1 transform translate-y-[4px]'
            />
            Change All Same Color
          </label>
        </div>

        <div id="grid-selector">
          <label htmlFor="grid-size">Grid Size:</label>
          <input
            type="range"
            id="grid-size"
            min="2"
            max={MAX_GRID_SIZE}
            value={gridSize}
            onChange={handleGridSizeChange}
          />
          <span>{gridSize}</span>
        </div>

        <div id="mode-selector">
            <label>Select Mode:</label>
          <label>
            <input
              type="radio"
              name="mode"
              value="draw"
              checked={mode === 'draw'}
              onChange={handleModeChange}
            />{' '}
            Draw
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="rotateBox"
              checked={mode === 'rotateBox'}
              onChange={handleModeChange}
            />{' '}
            Rotate Tess Box
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="rotateColumn"
              checked={mode === 'rotateColumn'}
              onChange={handleModeChange}
            />{' '}
            Rotate Tess Column
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="rotateRow"
              checked={mode === 'rotateRow'}
              onChange={handleModeChange}
            />{' '}
            Rotate Tess Row
          </label>
        </div>
      </div>

      <div id="tables-container">
        <div id="main-container">
          <h2 className='text-2xl mb-4'>Main</h2>
          <div
            id="main-table"
            ref={mainTableRef}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridSize}, 50px)`,
              gridTemplateRows: `repeat(${gridSize}, 50px)`,
            }}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchEnd={handleMouseUp}
          >
            {renderMainGrid()}
          </div>
        </div>

        <div id="tessellation-container">
          <h2 className='text-2xl mb-4'>Tessellation</h2>
          <div
            id="tessellation-table"
            ref={tessellationTableRef}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridSize}, 50px)`,
              gridTemplateRows: `repeat(${gridSize}, 50px)`,
            }}
          >
            {renderTessellationGrid()}
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="cursor-default rounded"
          id="tess-button"
          onClick={handleClear}>
            Clear
        </button>

        <button className="cursor-default rounded"
           id="tess-button" onClick={handleDownload}>
            Download
        </button>

        <button className="cursor-default rounded" 
          id="tess-button" 
          onClick={handleResetRotations}>
            Reset
        </button>
      </div>
    </div>
  </div>
  );
};

export default Tessellator;

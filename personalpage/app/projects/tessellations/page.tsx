'use client';

import './tessellator.css';
import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import Link from "next/link";
import {
  createInitialGridState,
  cellFromDataset,
  triangleAt,
  triangleClipPaths,
  triangleVertices,
  type Diagonal,
} from './grid';


const MAX_GRID_SIZE = 20;

const Tessellator: React.FC = () => {
  const mainTableRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State variables: separate rows/cols and triangle mode
  const [gridRows, setGridRows] = useState<number>(5);
  const [gridCols, setGridCols] = useState<number>(5);
  const [selectedColor, setSelectedColor] = useState<string>('#33FF33');
  const [mode, setMode] = useState<string>('rotateBox');
  const [sameColor, setSameColor] = useState<boolean>(false);
  const [triangleMode, setTriangleMode] = useState<boolean>(false);
  const [selectedDiagonal, setSelectedDiagonal] = useState<Diagonal>('/');

  // Mouse state refs
  const isMouseDownRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const clickTimeoutRef = useRef<number | null>(null);
  const lastTargetRef = useRef<string | null>(null);

  // Initialize grid states: each cell holds two triangle colors [tri0, tri1]
  const [mainGridState, setMainGridState] = useState<string[][][]>(() =>
    createInitialGridState<string[]>(MAX_GRID_SIZE, ['white', 'white'])
  );
  const [tessellationRotationState, setTessellationRotationState] = useState<number[][]>(() =>
    createInitialGridState<number>(MAX_GRID_SIZE, 0)
  );
  // Each cell remembers which way it's split in triangle mode
  const [diagonalState, setDiagonalState] = useState<Diagonal[][]>(() =>
    createInitialGridState<Diagonal>(MAX_GRID_SIZE, '/')
  );

  // Handlers
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };
  const handleGridRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGridRows(Number(e.target.value));
  };
  const handleGridColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGridCols(Number(e.target.value));
  };
  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value);
  };
  const handleSameColorToggle = () => {
    setSameColor(!sameColor);
  };
  const handleTriangleModeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTriangleMode(e.target.checked);
  };
  const handleClear = () => {
    setMainGridState(createInitialGridState<string[]>(MAX_GRID_SIZE, ['white', 'white']));
    setTessellationRotationState(createInitialGridState<number>(MAX_GRID_SIZE, 0));
    setDiagonalState(createInitialGridState<Diagonal>(MAX_GRID_SIZE, '/'));
  };
  const handleResetRotations = () => {
    setTessellationRotationState(prev =>
      prev.map(row => row.map(() => 0))
    );
  };
  const handleDownload = () => {
    if (canvasRef.current) {
      html2canvas(canvasRef.current).then(canvas => {
        const link = document.createElement('a');
        link.download = 'tessellation.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  // Paint & toggle functions
  const paintTriangle = (row: number, col: number, triIndex: 0 | 1) => {
    if (row >= gridRows || col >= gridCols) return;
    setMainGridState(prev => {
      const copy = prev.map(r => r.map(c => (c.slice() as [string, string])));
      copy[row][col][triIndex] = selectedColor;
      if (!triangleMode) {
        copy[row][col] = [selectedColor, selectedColor];
      }
      return copy;
    });
    if (triangleMode) {
      setDiagonalState(prev => {
        if (prev[row][col] === selectedDiagonal) return prev;
        const copy = prev.map(r => r.slice());
        copy[row][col] = selectedDiagonal;
        return copy;
      });
    }
  };
  const toggleTriangle = (row: number, col: number, triIndex: 0 | 1) => {
    if (row >= gridRows || col >= gridCols) return;
    // Clicking a cell that's split the other way re-splits and paints it instead of erasing
    if (triangleMode && diagonalState[row][col] !== selectedDiagonal) {
      paintTriangle(row, col, triIndex);
      return;
    }
    setMainGridState(prev => {
      const copy = prev.map(r => r.map(c => (c.slice() as [string, string])));
      const current = prev[row][col][triIndex];
      const newColor = current === selectedColor ? 'white' : selectedColor;
      copy[row][col][triIndex] = newColor;
      if (!triangleMode) {
        copy[row][col] = [newColor, newColor];
      }
      return copy;
    });
  };
  const changeSameColorTriangles = (targetColor: string, newColor: string) => {
    setMainGridState(prev =>
      prev.map((rowArr, r) =>
        rowArr.map((cell, c) => {
          let [t0, t1] = cell;
          if (r < gridRows && c < gridCols) {
            if (t0 === targetColor) t0 = newColor;
            if (t1 === targetColor) t1 = newColor;
            if (!triangleMode) t1 = t0;
          }
          return [t0, t1] as [string, string];
        })
      )
    );
  };

  // Rotation functions
  const rotateSingleBox = (row: number, col: number) => {
    if (row >= gridRows || col >= gridCols) return;
    setTessellationRotationState(prev => {
      const copy = prev.map(r => r.slice());
      copy[row][col] = (prev[row][col] + 90) % 360;
      return copy;
    });
  };
  const rotateColumn = (colIndex: number) => {
    if (colIndex >= gridCols) return;
    setTessellationRotationState(prev =>
      prev.map((rowArr, r) => {
        if (r < gridRows) {
          const newRow = rowArr.slice();
          newRow[colIndex] = (prev[r][colIndex] + 90) % 360;
          return newRow;
        }
        return rowArr.slice();
      })
    );
  };
  const rotateRow = (rowIndex: number) => {
    if (rowIndex >= gridRows) return;
    setTessellationRotationState(prev =>
      prev.map((rowArr, r) =>
        r === rowIndex
          ? rowArr.map((rot, c) => (c < gridCols ? (rot + 90) % 360 : rot))
          : rowArr.slice()
      )
    );
  };

  // Mouse/touch handlers
  // Resolves the cell and triangle under a screen point. In triangle mode the selected
  // diagonal decides which half was hit, since that's the shape that will be painted.
  const targetFromPoint = (clientX: number, clientY: number) => {
    const element = document.elementFromPoint(clientX, clientY);
    const cellElement = element?.closest<HTMLElement>('[data-row][data-col]');
    const cell = cellElement ? cellFromDataset(cellElement.dataset) : null;
    if (!cellElement || !cell) return null;
    if (!triangleMode) return { ...cell, tri: 0 as const };
    const rect = cellElement.getBoundingClientRect();
    const tri = triangleAt(
      clientX - rect.left,
      clientY - rect.top,
      rect.width,
      rect.height,
      selectedDiagonal
    );
    return { ...cell, tri };
  };
  const handlePress = (clientX: number, clientY: number) => {
    const target = targetFromPoint(clientX, clientY);
    if (!target) return;
    const { row, col, tri } = target;
    isMouseDownRef.current = true;
    isDraggingRef.current = false;
    lastTargetRef.current = `${row}-${col}-${tri}`;
    if (sameColor) {
      changeSameColorTriangles(mainGridState[row][col][tri], selectedColor);
    } else {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = window.setTimeout(() => {
        if (isMouseDownRef.current && !isDraggingRef.current) {
          toggleTriangle(row, col, tri);
        }
      }, 0);
    }
  };
  const handleDrag = (clientX: number, clientY: number) => {
    if (!isMouseDownRef.current || sameColor) return;
    const target = targetFromPoint(clientX, clientY);
    if (!target) return;
    // Only paint when the pointer reaches a new triangle, not on every pixel of movement
    const key = `${target.row}-${target.col}-${target.tri}`;
    if (key === lastTargetRef.current) return;
    lastTargetRef.current = key;
    isDraggingRef.current = true;
    paintTriangle(target.row, target.col, target.tri);
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handlePress(e.clientX, e.clientY);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleDrag(e.clientX, e.clientY);
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    handlePress(touch.clientX, touch.clientY);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    handleDrag(touch.clientX, touch.clientY);
  };
  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    isDraggingRef.current = false;
    lastTargetRef.current = null;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
  };

  // Render main grid: preserve border in both modes
  const renderMainGrid = () => {
    const boxes = [];
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const [color0, color1] = mainGridState[row][col];
        if (!triangleMode) {
          // Single square with border
          boxes.push(
            <div
              key={`main-${row}-${col}`}
              className="box"
              style={{
                backgroundColor: color0,
                width: 50,
                height: 50,
                border: '1px solid #ddd',
                boxSizing: 'border-box',
              }}
              data-row={row}
              data-col={col}
            />
          );
        } else {
          // Two triangles inside a bordered container, split along this cell's diagonal.
          // The triangles ignore the pointer; hits are resolved from the container's geometry.
          const [clip0, clip1] = triangleClipPaths(diagonalState[row][col]);
          const triangleStyle = {
            position: 'absolute' as const,
            inset: 0,
            pointerEvents: 'none' as const,
          };
          boxes.push(
            <div
              key={`cell-${row}-${col}`}
              data-row={row}
              data-col={col}
              data-diagonal={diagonalState[row][col]}
              style={{
                width: 50,
                height: 50,
                position: 'relative',
                border: '1px solid #ddd',
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            >
              <div
                className="triangle"
                style={{ ...triangleStyle, backgroundColor: color0, clipPath: clip0 }}
              />
              <div
                className="triangle"
                style={{ ...triangleStyle, backgroundColor: color1, clipPath: clip1 }}
              />
            </div>
          );
        }
      }
    }
    return boxes;
  };

  // Draw tessellation on single canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = 50;
    const miniWidth = cellSize / gridCols;
    const miniHeight = cellSize / gridRows;
    const totalWidth = gridCols * cellSize;
    const totalHeight = gridRows * cellSize;

    canvas.width = totalWidth;
    canvas.height = totalHeight;

    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    const offscreen = document.createElement('canvas');
    offscreen.width = cellSize;
    offscreen.height = cellSize;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;
    offCtx.imageSmoothingEnabled = false;
    offCtx.fillStyle = '#ffffff';
    offCtx.fillRect(0, 0, cellSize, cellSize);

    for (let mr = 0; mr < gridRows; mr++) {
      for (let mc = 0; mc < gridCols; mc++) {
        const x = Math.round(mc * miniWidth);
        const y = Math.round(mr * miniHeight);
        const w = Math.ceil((mc + 1) * miniWidth) - x;
        const h = Math.ceil((mr + 1) * miniHeight) - y;
        const [t0, t1] = mainGridState[mr][mc];

        if (!triangleMode) {
          offCtx.fillStyle = t0;
          offCtx.fillRect(x, y, w, h);
        } else {
          const triangles = triangleVertices(diagonalState[mr][mc], x, y, w, h);
          [t0, t1].forEach((color, i) => {
            const [first, ...rest] = triangles[i];
            offCtx.beginPath();
            offCtx.moveTo(...first);
            rest.forEach(point => offCtx.lineTo(...point));
            offCtx.closePath();
            offCtx.fillStyle = color;
            offCtx.fill();
          });
        }
      }
    }

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const rotation = (tessellationRotationState[r][c] * Math.PI) / 180;
        const centerX = c * cellSize + cellSize / 2;
        const centerY = r * cellSize + cellSize / 2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);
        ctx.drawImage(offscreen, -cellSize / 2, -cellSize / 2, cellSize, cellSize);
        ctx.restore();
      }
    }
  }, [
    mainGridState,
    tessellationRotationState,
    diagonalState,
    gridRows,
    gridCols,
    triangleMode,
  ]);

  // Handle tessellation clicks
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cellSize = 50;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (row < 0 || row >= gridRows || col < 0 || col >= gridCols) return;

    if (mode === 'rotateColumn') {
      rotateColumn(col);
    } else if (mode === 'rotateRow') {
      rotateRow(row);
    } else {
      rotateSingleBox(row, col);
    }
  };

  return (
    <div>
      <header id="tessheader">
        <Link href="/" className="hover:underline">
          Tessellator
        </Link>
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
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="same-color-checkbox"
                checked={sameColor}
                onChange={handleSameColorToggle}
                className="order-1 transform translate-y-[4px]"
              />
              Change All Same Color
            </label>
          </div>

          <div id="triangle-mode-toggle">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="triangle-mode-checkbox"
                checked={triangleMode}
                onChange={handleTriangleModeToggle}
                className="order-1 transform translate-y-[4px]"
              />
              Triangle Mode
            </label>
          </div>

          {triangleMode && (
            <div id="diagonal-selector">
              <label>Diagonal:</label>
              <label>
                <input
                  type="radio"
                  name="diagonal"
                  value="/"
                  aria-label="Split cells top-right to bottom-left"
                  checked={selectedDiagonal === '/'}
                  onChange={() => setSelectedDiagonal('/')}
                />{' '}
                ╱
              </label>
              <label>
                <input
                  type="radio"
                  name="diagonal"
                  value={'\\'}
                  aria-label="Split cells top-left to bottom-right"
                  checked={selectedDiagonal === '\\'}
                  onChange={() => setSelectedDiagonal('\\')}
                />{' '}
                ╲
              </label>
            </div>
          )}

          <div id="grid-rows">
            <label htmlFor="grid-rows-slider">Rows:</label>
            <input
              type="range"
              id="grid-rows-slider"
              min="2"
              max={MAX_GRID_SIZE}
              value={gridRows}
              onChange={handleGridRowsChange}
            />
            <span>{gridRows}</span>
          </div>

          <div id="grid-cols">
            <label htmlFor="grid-cols-slider">Columns:</label>
            <input
              type="range"
              id="grid-cols-slider"
              min="2"
              max={MAX_GRID_SIZE}
              value={gridCols}
              onChange={handleGridColsChange}
            />
            <span>{gridCols}</span>
          </div>

          <div id="mode-selector">
            <label>Tessellation Grid:</label>
            <label>
              <input
                type="radio"
                name="mode"
                value="rotateBox"
                checked={mode === 'rotateBox'}
                onChange={handleModeChange}
              />{' '}
              Rotate Box
            </label>
            <label>
              <input
                type="radio"
                name="mode"
                value="rotateColumn"
                checked={mode === 'rotateColumn'}
                onChange={handleModeChange}
              />{' '}
              Rotate Column
            </label>
            <label>
              <input
                type="radio"
                name="mode"
                value="rotateRow"
                checked={mode === 'rotateRow'}
                onChange={handleModeChange}
              />{' '}
              Rotate Row
            </label>
          </div>
        </div>

        <div id="tables-container">
          <div id="main-container">
            <h2 className="text-2xl mb-4">Main</h2>
            <div
              id="main-table"
              ref={mainTableRef}
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridCols}, 50px)`,
                gridTemplateRows: `repeat(${gridRows}, 50px)`,
                // React's touch listeners are passive, so preventDefault can't stop scrolling while painting
                touchAction: 'none',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              {renderMainGrid()}
            </div>
          </div>

          <div id="tessellation-container">
            <h2 className="text-2xl mb-4">Tessellation</h2>
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              style={{
                border: '1px solid #ddd',
                cursor: 'pointer',
                width: `${gridCols * 50}px`,
                height: `${gridRows * 50}px`,
              }}
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            className="cursor-default rounded"
            id="tess-button"
            onClick={handleClear}
          >
            Clear
          </button>

          <button
            className="cursor-default rounded"
            id="tess-button"
            onClick={handleDownload}
          >
            Download
          </button>

          <button
            className="cursor-default rounded"
            id="tess-button"
            onClick={handleResetRotations}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tessellator;







import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Tessellator from './page';

const CELL = 50;
const GREEN = 'rgb(51, 255, 51)'; // default picker color #33FF33

const cell = (row: number, col: number) =>
  document.querySelector<HTMLElement>(`[data-row="${row}"][data-col="${col}"]`)!;

const triangleColors = (row: number, col: number) =>
  Array.from(cell(row, col).querySelectorAll<HTMLElement>('.triangle')).map(
    (t) => t.style.backgroundColor
  );

// jsdom has no layout, so place cell (row, col) at (col * 50, row * 50) and hit-test by hand
const clickCellAt = (row: number, col: number, x: number, y: number) => {
  const target = cell(row, col);
  vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
    left: col * CELL, top: row * CELL, width: CELL, height: CELL,
  } as DOMRect);
  document.elementFromPoint = vi.fn(() => target);

  const point = { clientX: col * CELL + x, clientY: row * CELL + y };
  const grid = document.getElementById('main-table')!;
  fireEvent.mouseDown(grid, point);
  act(() => {
    vi.runAllTimers(); // the click toggle is deferred to tell clicks from drags
  });
  fireEvent.mouseUp(grid, point);
};

const enableTriangleMode = () => fireEvent.click(screen.getByLabelText('Triangle Mode'));

describe('<Tessellator /> diagonals', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // jsdom has no canvas; the tessellation preview just skips drawing
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('only shows the diagonal picker in triangle mode', () => {
    render(<Tessellator />);
    expect(screen.queryByText('Diagonal:')).not.toBeInTheDocument();

    enableTriangleMode();

    expect(screen.getByText('Diagonal:')).toBeInTheDocument();
    expect(screen.getByLabelText('Split cells top-right to bottom-left')).toBeChecked();
  });

  it("paints the top-left triangle of a '/' cell by default", () => {
    render(<Tessellator />);
    enableTriangleMode();

    clickCellAt(0, 0, 10, 10);

    expect(cell(0, 0).dataset.diagonal).toBe('/');
    expect(triangleColors(0, 0)).toEqual([GREEN, 'white']);
  });

  it("re-splits a cell along '\\' and paints the half that was clicked", () => {
    render(<Tessellator />);
    enableTriangleMode();
    fireEvent.click(screen.getByLabelText('Split cells top-left to bottom-right'));

    clickCellAt(1, 2, 10, 40); // bottom-left half

    expect(cell(1, 2).dataset.diagonal).toBe('\\');
    expect(triangleColors(1, 2)).toEqual(['white', GREEN]);
  });

  it('lets cells with different diagonals sit side by side', () => {
    render(<Tessellator />);
    enableTriangleMode();

    clickCellAt(0, 0, 10, 10);
    fireEvent.click(screen.getByLabelText('Split cells top-left to bottom-right'));
    clickCellAt(0, 1, 40, 10);

    expect(cell(0, 0).dataset.diagonal).toBe('/');
    expect(cell(0, 1).dataset.diagonal).toBe('\\');
  });

  it('paints instead of erasing when clicking a cell split the other way', () => {
    render(<Tessellator />);
    enableTriangleMode();
    clickCellAt(0, 0, 10, 10); // '/' top-left -> green

    fireEvent.click(screen.getByLabelText('Split cells top-left to bottom-right'));
    clickCellAt(0, 0, 40, 10); // '\' top-right

    expect(cell(0, 0).dataset.diagonal).toBe('\\');
    expect(triangleColors(0, 0)[0]).toBe(GREEN);
  });

  it('still toggles a triangle off when clicking it again with the same diagonal', () => {
    render(<Tessellator />);
    enableTriangleMode();

    clickCellAt(0, 0, 10, 10);
    clickCellAt(0, 0, 10, 10);

    expect(triangleColors(0, 0)).toEqual(['white', 'white']);
  });

  it('resets every cell to the default diagonal on Clear', () => {
    render(<Tessellator />);
    enableTriangleMode();
    fireEvent.click(screen.getByLabelText('Split cells top-left to bottom-right'));
    clickCellAt(0, 0, 40, 10);

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(cell(0, 0).dataset.diagonal).toBe('/');
    expect(triangleColors(0, 0)).toEqual(['white', 'white']);
  });
});

import { describe, it, expect } from 'vitest';
import {
  createInitialGridState,
  cellFromDataset,
  triangleAt,
  triangleClipPaths,
  triangleVertices,
} from './grid';

describe('createInitialGridState', () => {
  it('creates a size x size grid filled with the initial value', () => {
    const grid = createInitialGridState(3, 0);
    expect(grid).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it('gives every cell its own copy of an array value', () => {
    const grid = createInitialGridState<string[]>(2, ['white', 'white']);
    grid[0][0][0] = 'red';
    expect(grid[0][1]).toEqual(['white', 'white']);
    expect(grid[1][0]).toEqual(['white', 'white']);
  });
});

describe('cellFromDataset', () => {
  it('reads row and column', () => {
    expect(cellFromDataset({ row: '2', col: '3' })).toEqual({ row: 2, col: 3 });
  });

  it('returns null for elements outside the grid', () => {
    expect(cellFromDataset({})).toBeNull();
    expect(cellFromDataset({ row: '1' })).toBeNull();
  });
});

describe('triangleVertices', () => {
  it("splits '/' cells into top-left and bottom-right", () => {
    expect(triangleVertices('/', 0, 0, 10, 10)).toEqual([
      [[0, 0], [10, 0], [0, 10]],
      [[10, 0], [10, 10], [0, 10]],
    ]);
  });

  it("splits '\\' cells into top-right and bottom-left", () => {
    expect(triangleVertices('\\', 0, 0, 10, 10)).toEqual([
      [[0, 0], [10, 0], [10, 10]],
      [[0, 0], [10, 10], [0, 10]],
    ]);
  });

  it('offsets and scales to the cell position and size', () => {
    const [tri0] = triangleVertices('\\', 5, 20, 4, 2);
    expect(tri0).toEqual([[5, 20], [9, 20], [9, 22]]);
  });
});

describe('triangleClipPaths', () => {
  it("keeps the original '/' clip paths", () => {
    expect(triangleClipPaths('/')).toEqual([
      'polygon(0% 0%, 100% 0%, 0% 100%)',
      'polygon(100% 0%, 100% 100%, 0% 100%)',
    ]);
  });

  it("produces the mirrored '\\' clip paths", () => {
    expect(triangleClipPaths('\\')).toEqual([
      'polygon(0% 0%, 100% 0%, 100% 100%)',
      'polygon(0% 0%, 100% 100%, 0% 100%)',
    ]);
  });
});

describe('triangleAt', () => {
  const S = 50;

  it.each([
    ['near the top-left corner', 10, 10, 0],
    ['along the top edge', 30, 5, 0],
    ['along the left edge', 5, 30, 0],
    ['near the bottom-right corner', 40, 40, 1],
    ['along the right edge', 45, 30, 1],
  ] as const)("'/' cell: a point %s is triangle %i", (_label, x, y, expected) => {
    expect(triangleAt(x, y, S, S, '/')).toBe(expected);
  });

  it.each([
    ['near the top-right corner', 40, 10, 0],
    ['along the top edge', 10, 5, 0],
    ['near the bottom-left corner', 10, 40, 1],
    ['along the left edge', 5, 10, 1],
  ] as const)("'\\' cell: a point %s is triangle %i", (_label, x, y, expected) => {
    expect(triangleAt(x, y, S, S, '\\')).toBe(expected);
  });

  it('assigns the same point differently depending on the diagonal', () => {
    expect(triangleAt(40, 20, S, S, '/')).toBe(1); // below the '/' line
    expect(triangleAt(40, 20, S, S, '\\')).toBe(0); // above the '\' line
  });

  it('works for non-square cells', () => {
    expect(triangleAt(90, 10, 100, 20, '\\')).toBe(0);
    expect(triangleAt(10, 18, 100, 20, '\\')).toBe(1);
  });
});

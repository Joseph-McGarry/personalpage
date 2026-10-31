import { describe, it, expect } from 'vitest';
import { createInitialGridState, cellFromDataset } from './grid';

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
  it('reads row, column and triangle', () => {
    expect(cellFromDataset({ row: '2', col: '3', tri: '1' })).toEqual({ row: 2, col: 3, tri: 1 });
  });

  it('defaults to triangle 0 for square-mode cells without data-tri', () => {
    expect(cellFromDataset({ row: '0', col: '4' })).toEqual({ row: 0, col: 4, tri: 0 });
  });

  it('returns null for elements outside the grid', () => {
    expect(cellFromDataset({})).toBeNull();
    expect(cellFromDataset({ row: '1' })).toBeNull();
  });
});

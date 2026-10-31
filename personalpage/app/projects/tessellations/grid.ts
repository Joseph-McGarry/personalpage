// Creates a size x size grid; array values are copied per cell so cells never share state.
export function createInitialGridState<T>(size: number, initialValue: T): T[][] {
  const grid: T[][] = [];
  for (let row = 0; row < size; row++) {
    grid[row] = [];
    for (let col = 0; col < size; col++) {
      grid[row][col] = Array.isArray(initialValue)
        ? (initialValue.slice() as T)
        : initialValue;
    }
  }
  return grid;
}

// Reads the cell under a touch point. Square-mode cells have no data-tri, so they default to triangle 0.
export function cellFromDataset(
  dataset: DOMStringMap
): { row: number; col: number; tri: 0 | 1 } | null {
  if (dataset.row === undefined || dataset.col === undefined) return null;
  return {
    row: parseInt(dataset.row, 10),
    col: parseInt(dataset.col, 10),
    tri: dataset.tri === '1' ? 1 : 0,
  };
}

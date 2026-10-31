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

// Reads a cell's position from its data-row / data-col attributes.
export function cellFromDataset(dataset: DOMStringMap): { row: number; col: number } | null {
  if (dataset.row === undefined || dataset.col === undefined) return null;
  return {
    row: parseInt(dataset.row, 10),
    col: parseInt(dataset.col, 10),
  };
}

// Which way a cell is split in triangle mode.
//   '/'  : triangle 0 = top-left,  triangle 1 = bottom-right
//   '\\' : triangle 0 = top-right, triangle 1 = bottom-left
export type Diagonal = '/' | '\\';

type Point = [number, number];

// Corner points of both triangles for a cell at (x, y) of size w x h.
export function triangleVertices(
  diagonal: Diagonal,
  x: number,
  y: number,
  w: number,
  h: number
): [Point[], Point[]] {
  const tl: Point = [x, y];
  const tr: Point = [x + w, y];
  const br: Point = [x + w, y + h];
  const bl: Point = [x, y + h];
  return diagonal === '/'
    ? [[tl, tr, bl], [tr, br, bl]]
    : [[tl, tr, br], [tl, br, bl]];
}

// CSS clip-path polygons for both triangles of a cell.
export function triangleClipPaths(diagonal: Diagonal): [string, string] {
  const [t0, t1] = triangleVertices(diagonal, 0, 0, 100, 100);
  const toPolygon = (points: Point[]) =>
    `polygon(${points.map(([px, py]) => `${px}% ${py}%`).join(', ')})`;
  return [toPolygon(t0), toPolygon(t1)];
}

// Which triangle a point (relative to the cell's top-left corner) falls in.
export function triangleAt(
  x: number,
  y: number,
  w: number,
  h: number,
  diagonal: Diagonal
): 0 | 1 {
  const u = x / w;
  const v = y / h;
  if (diagonal === '/') return u + v < 1 ? 0 : 1;
  return u > v ? 0 : 1;
}

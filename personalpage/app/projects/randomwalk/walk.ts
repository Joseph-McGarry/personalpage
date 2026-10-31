export type Point = { x: number; y: number };

// Picks a step angle: any direction in 'random' mode, otherwise one of the four right angles.
export const randomAngle = (angleMode: string, rand: () => number = Math.random): number =>
  angleMode === 'random'
    ? rand() * 2 * Math.PI
    : (Math.floor(rand() * 4) * Math.PI) / 2;

const wrap = (value: number, max: number): number => ((value % max) + max) % max;

// Moves `distance` along `angle`, wrapping around the canvas edges so the walk never leaves the canvas.
export const nextPosition = (
  position: Point,
  angle: number,
  distance: number,
  width: number,
  height: number
): Point => ({
  x: wrap(position.x + Math.cos(angle) * distance, width),
  y: wrap(position.y + Math.sin(angle) * distance, height),
});

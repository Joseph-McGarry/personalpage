import { describe, it, expect } from 'vitest';
import { nextPosition, randomAngle } from './walk';

const W = 1000;
const H = 800;

describe('nextPosition', () => {
  it('moves the given distance along the angle', () => {
    const p = nextPosition({ x: 500, y: 400 }, 0, 30, W, H);
    expect(p.x).toBeCloseTo(530);
    expect(p.y).toBeCloseTo(400);
  });

  it('moves down for an angle of PI/2 (canvas y grows downward)', () => {
    const p = nextPosition({ x: 500, y: 400 }, Math.PI / 2, 30, W, H);
    expect(p.x).toBeCloseTo(500);
    expect(p.y).toBeCloseTo(430);
  });

  it('wraps past the right and bottom edges', () => {
    const p = nextPosition({ x: 990, y: 790 }, Math.PI / 4, Math.SQRT2 * 20, W, H);
    expect(p.x).toBeCloseTo(10);
    expect(p.y).toBeCloseTo(10);
  });

  it('wraps past the left and top edges', () => {
    const p = nextPosition({ x: 5, y: 5 }, (5 * Math.PI) / 4, Math.SQRT2 * 10, W, H);
    expect(p.x).toBeCloseTo(995);
    expect(p.y).toBeCloseTo(795);
  });

  it('stays on the canvas over a long walk', () => {
    let p = { x: W / 2, y: H / 2 };
    for (let i = 0; i < 10_000; i++) {
      p = nextPosition(p, randomAngle('random'), 200, W, H);
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThan(W);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThan(H);
    }
  });
});

describe('randomAngle', () => {
  it('returns only right angles in right-angles mode', () => {
    const allowed = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    for (const r of [0, 0.24, 0.25, 0.5, 0.75, 0.999]) {
      expect(allowed).toContainEqual(randomAngle('right-angles', () => r));
    }
  });

  it('spans the full circle in random mode', () => {
    expect(randomAngle('random', () => 0)).toBe(0);
    expect(randomAngle('random', () => 0.5)).toBeCloseTo(Math.PI);
  });
});

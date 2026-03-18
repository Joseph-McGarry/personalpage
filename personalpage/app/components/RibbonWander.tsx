'use client';

import { useEffect } from 'react';

type Vec = { x: number; y: number };

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const rand = (min: number, max: number) => min + Math.random() * (max - min);

export default function RibbonWander() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('.page-bg');
    if (!el) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduce) return;

    // bounds in % (tune if you want them to roam wider)
    const bounds = {
      r1: { x: [0, 70],  y: [0, 60] },
      r2: { x: [30, 100], y: [0, 70] },
      r3: { x: [0, 100], y: [30, 100] },

    } as const;

    const p1: Vec = { x: 20, y: 15 };
    const p2: Vec = { x: 80, y: 35 };
    const p3: Vec = { x: 35, y: 80 };

    const v1: Vec = { x: rand(-2, 2), y: rand(-2, 2) };
    const v2: Vec = { x: rand(-2, 2), y: rand(-2, 2) };
    const v3: Vec = { x: rand(-2, 2), y: rand(-2, 2) };

    let raf = 0;
    let last = performance.now();

    const step = (p: Vec, v: Vec, bx: readonly [number, number], by: readonly [number, number], dt: number) => {
      // gentle random accel
      v.x += rand(-2.0, 2.0) * dt;
      v.y += rand(-2.0, 2.0) * dt;


      // damping
      v.x *= 0.992;
      v.y *= 0.992;


      // integrate (speed factor)
      const speed = 12;
      p.x += v.x * dt * speed;
      p.y += v.y * dt * speed;

      // bounce
      if (p.x <= bx[0] || p.x >= bx[1]) v.x *= -1;
      if (p.y <= by[0] || p.y >= by[1]) v.y *= -1;

      p.x = clamp(p.x, bx[0], bx[1]);
      p.y = clamp(p.y, by[0], by[1]);
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      step(p1, v1, bounds.r1.x, bounds.r1.y, dt);
      step(p2, v2, bounds.r2.x, bounds.r2.y, dt);
      step(p3, v3, bounds.r3.x, bounds.r3.y, dt);

      el.style.setProperty('--r1x', `${p1.x.toFixed(2)}%`);
      el.style.setProperty('--r1y', `${p1.y.toFixed(2)}%`);
      el.style.setProperty('--r2x', `${p2.x.toFixed(2)}%`);
      el.style.setProperty('--r2y', `${p2.y.toFixed(2)}%`);
      el.style.setProperty('--r3x', `${p3.x.toFixed(2)}%`);
      el.style.setProperty('--r3y', `${p3.y.toFixed(2)}%`);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}

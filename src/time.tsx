import React, { createContext, useContext } from 'react';
import { useCurrentFrame } from 'remotion';
import { FPS } from './theme';

export const SceneStartCtx = createContext(0);
/** global time in seconds (audio timeline) */
export const useGT = () => {
  const f = useCurrentFrame();
  const s = useContext(SceneStartCtx);
  return (s + f) / FPS;
};
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** pop-in / pop-out window. s = scale, o = opacity */
export const win = (gt: number, from: number, to: number, inD = 0.3, outD = 0.22) => {
  if (gt < from || gt > to + outD) return { on: false, s: 0, o: 0, p: 0 };
  const pi = clamp((gt - from) / inD);
  const po = gt > to ? 1 - (gt - to) / outD : 1;
  return { on: true, s: easeOutBack(pi) * (0.6 + 0.4 * po), o: clamp(pi * 3) * po, p: pi };
};
/** keyframes: [[t,v],...] eased linear */
export const kf = (gt: number, pts: [number, number][], ease = true) => {
  if (gt <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (gt <= pts[i][0]) { const t = (gt - pts[i - 1][0]) / (pts[i][0] - pts[i - 1][0]); return lerp(pts[i - 1][1], pts[i][1], ease ? easeInOut(t) : t); }
  }
  return pts[pts.length - 1][1];
};
export const inAny = (gt: number, ws: [number, number][]) => ws.some(([a, b]) => gt >= a && gt <= b);

/** Show children only in [from,to] with soft fade */
export const Show: React.FC<{ from: number; to: number; fade?: number; children: React.ReactNode }> = ({ from, to, fade = 0.35, children }) => {
  const gt = useGT();
  if (gt < from - 0.01 || gt > to + fade) return null;
  const o = Math.min(clamp((gt - from) / fade), gt > to ? 1 - (gt - to) / fade : 1);
  return <g opacity={o}>{children}</g>;
};

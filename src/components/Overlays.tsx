import React from 'react';
import { fontFamily, OUTLINE, W, H } from '../theme';
import { useGT, win, kf, clamp } from '../time';
import { IconG, IconName } from './Icons';
import captions from '../data/captions.json';
import { useCurrentFrame } from 'remotion';

type Base = { from: number; to: number; sup?: boolean };
export type Item =
  | (Base & { k: 'say'; x: number; y: number; tx: number; ty: number; text: string; w?: number; fs?: number; bg?: string; color?: string })
  | (Base & { k: 'think'; x: number; y: number; tx: number; ty: number; text?: string; icon?: IconName; w?: number; h?: number; fs?: number; iconText?: string })
  | (Base & { k: 'note'; x: number; y: number; text: string; w?: number; fs?: number; rot?: number; bg?: string; pin?: boolean; hand?: boolean })
  | (Base & { k: 'stamp'; x: number; y: number; text: string; sub?: string; rot?: number; color?: string; fs?: number })
  | (Base & { k: 'pill'; x: number; y: number; text: string; color?: string; fs?: number })
  | (Base & { k: 'quote'; x: number; y: number; w?: number; h?: number; text: string; fs?: number; bg?: string; color?: string; icon?: IconName; label?: string })
  | (Base & { k: 'node'; node: React.ReactNode });

const isSup = (it: Item) => (it.sup !== undefined ? it.sup : it.k !== 'pill');
export const useSuppress = (items: Item[]) => {
  const gt = useGT();
  return items.some((it) => isSup(it) && gt >= it.from - 0.05 && gt <= it.to + 0.2);
};

const txt = (fs: number, color = OUTLINE): React.CSSProperties => ({ fontFamily, fontSize: fs, fontWeight: 600, color, lineHeight: 1.38, textAlign: 'center', whiteSpace: 'pre-line' });
const est = (text: string, w: number, fs: number) => { const cpl = Math.max(6, Math.floor((w - 60) / (fs * 0.5))); return Math.ceil([...text].length / cpl); };

const bubblePath = (x0: number, y0: number, w: number, h: number, tx: number, ty: number, r = 34) => {
  const x1 = x0 + w, y1 = y0 + h, below = ty > y0 + h / 2;
  const bx = Math.min(x1 - r - 34, Math.max(x0 + r + 34, tx));
  const top = `M ${x0 + r} ${y0} H ${x1 - r} Q ${x1} ${y0} ${x1} ${y0 + r} V ${y1 - r} Q ${x1} ${y1} ${x1 - r} ${y1}`;
  const bot = `H ${x0 + r} Q ${x0} ${y1} ${x0} ${y1 - r} V ${y0 + r} Q ${x0} ${y0} ${x0 + r} ${y0} Z`;
  if (below) return `${top} H ${bx + 28} L ${tx} ${ty} L ${bx - 28} ${y1} ${bot}`;
  return `M ${x0 + r} ${y0} H ${bx - 28} L ${tx} ${ty} L ${bx + 28} ${y0} H ${x1 - r} Q ${x1} ${y0} ${x1} ${y0 + r} V ${y1 - r} Q ${x1} ${y1} ${x1 - r} ${y1} ${bot}`;
};

const Wrap: React.FC<{ w: ReturnType<typeof win>; ox: number; oy: number; rot?: number; children: React.ReactNode }> = ({ w, ox, oy, rot = 0, children }) => (
  <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, opacity: w.o, transform: `rotate(${rot}deg) scale(${w.s})`, transformOrigin: `${ox}px ${oy}px` }}>{children}</div>
);
const Box: React.FC<{ x: number; y: number; w: number; h: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, w, h, children, style }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', boxSizing: 'border-box', ...style }}>{children}</div>
);

const OverlayItem: React.FC<{ it: Item }> = ({ it }) => {
  const gt = useGT();
  const w = win(gt, it.from, it.to);
  if (!w.on) return null;
  const sh = 'drop-shadow(0 8px 14px rgba(0,0,0,.25))';
  if (it.k === 'node') return <div style={{ position: 'absolute', inset: 0, opacity: w.o }}>{it.node}</div>;
  if (it.k === 'say') {
    const fs = it.fs ?? 44, bw = it.w ?? 600, bh = est(it.text, bw, fs) * fs * 1.38 + 44;
    const x0 = it.x - bw / 2, y0 = it.y - bh / 2;
    return (
      <Wrap w={w} ox={it.tx} oy={it.ty}>
        <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0, filter: sh }}>
          <path d={bubblePath(x0, y0, bw, bh, it.tx, it.ty)} fill={it.bg ?? '#fff'} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        </svg>
        <Box x={x0} y={y0} w={bw} h={bh}><div style={txt(fs, it.color)}>{it.text}</div></Box>
      </Wrap>
    );
  }
  if (it.k === 'think') {
    const bw = it.w ?? 520, fs = it.fs ?? 42;
    const bh = it.h ?? (it.text ? est(it.text, bw, fs) * fs * 1.38 + 70 : 200);
    const dx = it.tx - it.x, dy = it.ty - it.y, L = Math.hypot(dx, dy) || 1;
    const sx = it.x + (dx / L) * (bh / 2 + 8), sy = it.y + (dy / L) * (bh / 2 + 8);
    const dots = [0.25, 0.55, 0.85].map((f, i) => ({ x: sx + (it.tx - sx) * f, y: sy + (it.ty - sy) * f, r: 16 - i * 4 }));
    return (
      <Wrap w={w} ox={it.tx} oy={it.ty}>
        <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0, filter: sh }}>
          {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#fff" stroke={OUTLINE} strokeWidth={3.5} />)}
          <ellipse cx={it.x} cy={it.y} rx={bw / 2} ry={bh / 2} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          {it.icon && <g transform={`translate(${it.x},${it.y + Math.sin(gt * 3) * 5}) scale(${Math.min(bh * 0.7, 160) / 100}) translate(-50,-50)`}><IconG name={it.icon} text={it.iconText} /></g>}
        </svg>
        {it.text && <Box x={it.x - bw / 2} y={it.y - bh / 2} w={bw} h={bh}><div style={txt(fs)}>{it.text}</div></Box>}
      </Wrap>
    );
  }
  if (it.k === 'note') {
    const fs = it.fs ?? 40, bw = it.w ?? 420, bh = est(it.text, bw, fs) * fs * 1.38 + 56;
    return (
      <Wrap w={w} ox={it.x} oy={it.y} rot={it.rot ?? -3}>
        <div style={{ position: 'absolute', left: it.x - bw / 2, top: it.y - bh / 2, width: bw, height: bh, background: it.bg ?? '#FFF2A8', border: `4px solid ${OUTLINE}`, borderRadius: 10, boxShadow: '8px 10px 0 rgba(0,0,0,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', padding: '0 20px' }}>
          <div style={{ ...txt(fs), fontWeight: it.hand ? 400 : 700 }}>{it.text}</div>
          {(it.pin ?? true) && <div style={{ position: 'absolute', top: -16, left: bw / 2 - 14, width: 28, height: 28, borderRadius: 14, background: '#E4572E', border: `3px solid ${OUTLINE}` }} />}
        </div>
      </Wrap>
    );
  }
  if (it.k === 'stamp') {
    const fs = it.fs ?? 68, c = it.color ?? '#E4572E';
    return (
      <Wrap w={w} ox={it.x} oy={it.y} rot={it.rot ?? -8}>
        <div style={{ position: 'absolute', left: it.x, top: it.y, transform: 'translate(-50%,-50%)', border: `8px solid ${c}`, borderRadius: 18, padding: '8px 34px', background: 'rgba(255,255,255,.9)', textAlign: 'center', boxShadow: '0 0 0 4px #fff, 6px 8px 0 rgba(0,0,0,.2)', whiteSpace: 'nowrap' }}>
          <div style={{ ...txt(fs, c), fontWeight: 700, lineHeight: 1.2 }}>{it.text}</div>
          {it.sub && <div style={{ ...txt(fs * 0.5, OUTLINE), lineHeight: 1.2 }}>{it.sub}</div>}
        </div>
      </Wrap>
    );
  }
  if (it.k === 'pill') {
    return (
      <Wrap w={w} ox={it.x} oy={it.y}>
        <div style={{ position: 'absolute', left: it.x, top: it.y, transform: 'translate(-50%,-50%)', background: it.color ?? '#3A86FF', color: '#fff', border: `4px solid ${OUTLINE}`, borderRadius: 999, padding: '4px 28px', whiteSpace: 'nowrap', boxShadow: '0 6px 0 rgba(0,0,0,.22)' }}>
          <div style={{ ...txt(it.fs ?? 36, '#fff'), fontWeight: 700 }}>{it.text}</div>
        </div>
      </Wrap>
    );
  }
  if (it.k === 'quote') {
    const fs = it.fs ?? 54, bw = it.w ?? 1100, bh = it.h ?? est(it.text, bw, fs) * fs * 1.4 + 90;
    return (
      <Wrap w={w} ox={it.x} oy={it.y}>
        <div style={{ position: 'absolute', left: it.x - bw / 2, top: it.y - bh / 2, width: bw, height: bh, background: it.bg ?? '#FFF8E7', border: `6px solid ${OUTLINE}`, borderRadius: 36, boxShadow: '12px 14px 0 rgba(0,0,0,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, boxSizing: 'border-box', padding: '0 44px', filter: sh }}>
          {it.icon && <svg width={130} height={130} viewBox="0 0 100 100" style={{ flex: 'none' }}><IconG name={it.icon} /></svg>}
          <div style={{ ...txt(fs, it.color) }}>{it.label && <div style={{ fontSize: fs * 0.6, color: '#E4572E', fontWeight: 700 }}>{it.label}</div>}{it.text}</div>
        </div>
      </Wrap>
    );
  }
  return null;
};

export const Overlays: React.FC<{ items: Item[] }> = ({ items }) => (<>{items.map((it, i) => <OverlayItem key={i} it={it} />)}</>);

type Cap = { s: number; e: number; scene: number; t: string[]; h: number[] };
export const Captions: React.FC<{ items: Item[]; sceneId: number; hide?: boolean }> = ({ items, sceneId, hide }) => {
  const gt = useGT();
  const sup = useSuppress(items);
  if (sup || hide) return null;
  const c = (captions as Cap[]).find((x) => x.scene === sceneId && gt >= x.s && gt <= x.e);
  if (!c) return null;
  const p = clamp((gt - c.s) / 0.18);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 56, display: 'flex', justifyContent: 'center', opacity: p, transform: `translateY(${(1 - p) * 22}px)` }}>
      <div style={{ fontFamily, fontSize: 58, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', padding: '6px 34px', borderRadius: 24, background: 'rgba(20,24,40,.55)', textShadow: '0 3px 0 #222, 0 0 10px rgba(0,0,0,.6)' }}>
        {c.t.map((w, i) => (<span key={i} style={c.h.includes(i) ? { color: '#FFD23F', fontWeight: 700 } : undefined}>{w}{i < c.t.length - 1 ? ' ' : ''}</span>))}
      </div>
    </div>
  );
};

export interface Cam { t: number; s: number; x?: number; y?: number }
export const World: React.FC<{ cam?: Cam[]; shake?: [number, number, number][]; children: React.ReactNode }> = ({ cam, shake, children }) => {
  const gt = useGT();
  const f = useCurrentFrame();
  let s = 1, cx = W / 2, cy = H / 2;
  if (cam && cam.length) {
    s = kf(gt, cam.map((c) => [c.t, c.s]));
    cx = kf(gt, cam.map((c) => [c.t, c.x ?? W / 2]));
    cy = kf(gt, cam.map((c) => [c.t, c.y ?? H / 2]));
  }
  let sx = 0, sy = 0;
  (shake ?? []).forEach(([a, b, amp]) => { if (gt >= a && gt <= b) { const d = 1 - (gt - a) / (b - a) * 0.4; sx += Math.sin(f * 2.3) * amp * d; sy += Math.cos(f * 3.1) * amp * d; } });
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', left: 0, top: 0 }}>
      <g transform={`translate(${W / 2 + sx},${H / 2 + sy}) scale(${s}) translate(${-cx},${-cy})`}>{children}</g>
    </svg>
  );
};

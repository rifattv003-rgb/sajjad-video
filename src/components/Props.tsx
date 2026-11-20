import React from 'react';
import { IconG, IconName } from './Icons';
/** small prop attached to a hand (0,0 = hand centre) */
export const HI = (name: IconName, s = 0.6, dx = 0, dy = -28, rot = 0, text?: string) => (
  <g transform={`translate(${dx},${dy}) rotate(${rot}) scale(${s}) translate(-50,-50)`}><IconG name={name} text={text} /></g>
);
export const Bowl = (full: boolean) => (
  <g transform="translate(0,-14)"><path d="M -34 0 H 34 C 32 24 16 32 0 32 C -16 32 -32 24 -34 0 Z" fill="#fff" stroke="#222" strokeWidth={3} />{full && <path d="M -28 0 C -22 -18 22 -18 28 0 Z" fill="#F7E4B0" stroke="#222" strokeWidth={2.5} />}</g>
);
export const Tray = (
  <g transform="translate(0,-10)"><ellipse cx={0} cy={0} rx={56} ry={9} fill="#C9A26B" stroke="#222" strokeWidth={3} /><path d="M -34 -4 V -30 H -6 V -4 Z" fill="#fff" stroke="#222" strokeWidth={3} /><path d="M -6 -22 q 14 0 0 12" fill="none" stroke="#222" strokeWidth={3} /><path d="M 18 -4 V -26 H 42 V -4 Z" fill="#fff" stroke="#222" strokeWidth={3} /></g>
);
export const Notes = (
  <g transform="translate(0,-18)"><rect x={-26} y={-18} width={52} height={36} rx={4} fill="#7DCB6E" stroke="#222" strokeWidth={3} /><path d="M -14 0 H 14" stroke="#222" strokeWidth={3} /></g>
);

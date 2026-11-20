import React from 'react';
/** Two-panel phone-call layout: left/right halves clipped, thin divider */
export const Split: React.FC<{ left: React.ReactNode; right: React.ReactNode }> = ({ left, right }) => (
  <g>
    <defs><clipPath id="clipL"><rect x={0} y={0} width={950} height={1080} /></clipPath><clipPath id="clipR"><rect x={970} y={0} width={950} height={1080} /></clipPath></defs>
    <g clipPath="url(#clipL)">{left}</g>
    <g clipPath="url(#clipR)">{right}</g>
    <rect x={950} y={0} width={20} height={1080} fill="#FFF8E7" stroke="#222" strokeWidth={3} />
  </g>
);

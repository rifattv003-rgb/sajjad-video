import React from 'react';
import { fontFamily, OUTLINE } from '../theme';
import { useGT, win } from '../time';

const S = { stroke: OUTLINE, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
export type IconName = 'money' | 'bag' | 'needle' | 'question' | 'bulb' | 'heart' | 'warning' | 'clock' | 'calendar' | 'moon' | 'phone' | 'fish' | 'rice' | 'tin' | 'thumb' | 'check' | 'cross' | 'star' | 'envelope' | 'box' | 'chat' | 'eid' | 'chart' | 'tape' | 'broken' | 'zzz' | 'sparkle' | 'share' | 'weight' | 'knock' | 'pen' | 'book' | 'bell' | 'cloth' | 'shop' | 'comment' | 'stack';

/** icon drawn in a 100x100 box; props.text used by calendar/money */
export const IconG: React.FC<{ name: IconName; text?: string }> = ({ name, text }) => {
  switch (name) {
    case 'money': return (<g><rect x={8} y={26} width={84} height={48} rx={7} fill="#7DCB6E" {...S} /><circle cx={50} cy={50} r={15} fill="#E9F7DD" {...S} /><text x={50} y={58} textAnchor="middle" fontSize={22} fontWeight={700} fontFamily={fontFamily} fill={OUTLINE}>৳</text><circle cx={20} cy={38} r={3} fill={OUTLINE} /><circle cx={80} cy={62} r={3} fill={OUTLINE} /></g>);
    case 'bag': return (<g><path d="M 32 40 C 32 10 68 10 68 40" fill="none" {...S} strokeWidth={5} /><path d="M 18 36 H 82 L 86 90 H 14 Z" fill="#C9A26B" {...S} /><path d="M 20 52 H 80 M 18 70 H 82" stroke="#A67C45" strokeWidth={2} /><path d="M 16 80 l 6 -6 l 6 6 l 6 -6 l 6 6 l 6 -6 l 6 6 l 6 -6 l 6 6 l 6 -6 l 6 6 l 6 -6" fill="none" stroke="#C0392B" strokeWidth={3} /></g>);
    case 'needle': return (<g><path d="M 22 88 L 78 12" stroke="#cfd8dc" strokeWidth={6} strokeLinecap="round" /><path d="M 22 88 L 78 12" stroke={OUTLINE} strokeWidth={1.5} /><ellipse cx={74} cy={18} rx={3} ry={7} transform="rotate(36 74 18)" fill="#fff" stroke={OUTLINE} strokeWidth={2} /><path d="M 74 18 C 96 10 90 50 60 46 C 30 42 40 80 20 76" fill="none" stroke="#E4572E" strokeWidth={4} strokeLinecap="round" /></g>);
    case 'question': return (<g><circle cx={50} cy={50} r={40} fill="#FFB547" {...S} /><text x={50} y={72} textAnchor="middle" fontSize={64} fontWeight={700} fontFamily={fontFamily} fill={OUTLINE}>?</text></g>);
    case 'bulb': return (<g><path d="M 50 8 C 22 8 20 44 38 58 V 72 H 62 V 58 C 80 44 78 8 50 8 Z" fill="#FFE066" {...S} /><rect x={38} y={72} width={24} height={14} rx={4} fill="#bbb" {...S} /><path d="M 50 20 V 36 M 40 30 H 60" stroke="#E89B0C" strokeWidth={3} /></g>);
    case 'heart': return <path d="M 50 88 C 4 56 8 18 32 18 C 42 18 48 24 50 30 C 52 24 58 18 68 18 C 92 18 96 56 50 88 Z" fill="#FF5C7A" {...S} />;
    case 'broken': return (<g><path d="M 50 88 C 4 56 8 18 32 18 C 42 18 48 24 50 30 C 52 24 58 18 68 18 C 92 18 96 56 50 88 Z" fill="#B8566B" {...S} /><path d="M 52 22 L 44 42 L 58 54 L 46 88" fill="none" stroke="#FFF8E7" strokeWidth={5} strokeLinejoin="round" /></g>);
    case 'warning': return (<g><path d="M 50 10 L 92 86 H 8 Z" fill="#FFD23F" {...S} /><path d="M 50 36 V 62" stroke={OUTLINE} strokeWidth={7} strokeLinecap="round" /><circle cx={50} cy={74} r={4.5} fill={OUTLINE} /></g>);
    case 'clock': return (<g><circle cx={50} cy={50} r={40} fill="#fff" {...S} /><path d="M 50 22 V 50 L 68 60" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /><circle cx={50} cy={50} r={4} fill={OUTLINE} /></g>);
    case 'calendar': return (<g><rect x={10} y={16} width={80} height={74} rx={8} fill="#fff" {...S} /><path d="M 10 24 a 8 8 0 0 1 8 -8 H 82 a 8 8 0 0 1 8 8 V 40 H 10 Z" fill="#E4572E" {...S} /><rect x={28} y={6} width={6} height={18} rx={3} fill={OUTLINE} /><rect x={66} y={6} width={6} height={18} rx={3} fill={OUTLINE} /><text x={50} y={78} textAnchor="middle" fontSize={34} fontWeight={700} fontFamily={fontFamily} fill={OUTLINE}>{text ?? ''}</text></g>);
    case 'moon': return (<g><path d="M 70 12 A 40 40 0 1 0 90 66 A 32 32 0 0 1 70 12 Z" fill="#FFE9A8" {...S} /><path d="M 80 20 l 3 7 l 7 1 l -5 5 l 1 7 l -6 -4 l -6 4 l 1 -7 l -5 -5 l 7 -1 Z" fill="#FFD23F" stroke={OUTLINE} strokeWidth={1.5} /></g>);
    case 'phone': return (<g><rect x={26} y={6} width={48} height={88} rx={10} fill="#2b3a55" {...S} /><rect x={32} y={16} width={36} height={62} rx={3} fill="#BFE6FF" /><circle cx={50} cy={85} r={4} fill="#fff" /><path d="M 40 36 h 20 M 40 46 h 14 M 40 56 h 18" stroke="#3A86FF" strokeWidth={4} strokeLinecap="round" /></g>);
    case 'fish': return (<g><path d="M 10 50 C 30 20 62 20 76 50 C 62 80 30 80 10 50 Z" fill="#F29E6D" {...S} /><path d="M 76 50 L 94 32 V 68 Z" fill="#E5835A" {...S} /><circle cx={28} cy={46} r={4} fill={OUTLINE} /><path d="M 44 34 Q 50 50 44 66 M 56 34 Q 62 50 56 66" fill="none" stroke="#C86A3E" strokeWidth={2.5} /></g>);
    case 'rice': return (<g><path d="M 10 52 H 90 C 88 80 70 90 50 90 C 30 90 12 80 10 52 Z" fill="#fff" {...S} /><path d="M 18 52 C 20 22 80 22 82 52 Z" fill="#FFFDF5" {...S} /><path d="M 40 40 h 4 M 52 34 h 4 M 62 44 h 4 M 30 46 h 4" stroke="#bbb" strokeWidth={3} strokeLinecap="round" /></g>);
    case 'tin': return (<g><ellipse cx={50} cy={24} rx={32} ry={10} fill="#d7a64a" {...S} /><path d="M 18 24 V 78 C 18 90 82 90 82 78 V 24" fill="#C98F2E" {...S} /><ellipse cx={50} cy={24} rx={32} ry={10} fill="#E3B65F" {...S} /><path d="M 30 50 H 70" stroke="#8a5a14" strokeWidth={3} /></g>);
    case 'thumb': return (<g><path d="M 16 46 H 34 V 88 H 16 Z" fill="#3A86FF" {...S} /><path d="M 34 48 L 52 12 C 64 12 64 26 58 40 H 86 C 94 40 94 52 88 56 C 92 62 88 68 84 70 C 86 78 80 82 76 82 C 76 88 70 88 66 88 H 34 Z" fill="#FFD7A8" {...S} /></g>);
    case 'check': return (<g><circle cx={50} cy={50} r={40} fill="#3DAA5C" {...S} /><path d="M 28 52 L 44 68 L 74 34" fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" /></g>);
    case 'cross': return (<g><circle cx={50} cy={50} r={40} fill="#E4572E" {...S} /><path d="M 32 32 L 68 68 M 68 32 L 32 68" stroke="#fff" strokeWidth={9} strokeLinecap="round" /></g>);
    case 'star': return <path d="M 50 8 L 62 38 L 94 40 L 69 60 L 78 92 L 50 74 L 22 92 L 31 60 L 6 40 L 38 38 Z" fill="#FFD23F" {...S} />;
    case 'sparkle': return <path d="M 50 4 C 54 34 66 46 96 50 C 66 54 54 66 50 96 C 46 66 34 54 4 50 C 34 46 46 34 50 4 Z" fill="#FFE066" stroke="#E89B0C" strokeWidth={2.5} />;
    case 'envelope': return (<g><rect x={8} y={22} width={84} height={58} rx={6} fill="#fff" {...S} /><path d="M 8 26 L 50 56 L 92 26" fill="none" {...S} /></g>);
    case 'box': return (<g><path d="M 50 8 L 90 26 V 72 L 50 92 L 10 72 V 26 Z" fill="#D9A25F" {...S} /><path d="M 10 26 L 50 44 L 90 26 M 50 44 V 92" fill="none" {...S} /><path d="M 30 17 L 70 35 V 50" fill="none" stroke="#f3e2c6" strokeWidth={6} /></g>);
    case 'stack': return (<g><rect x={14} y={60} width={72} height={26} rx={4} fill="#fff" {...S} /><rect x={20} y={36} width={72} height={26} rx={4} fill="#fff" transform="rotate(-4 50 50)" {...S} /><rect x={10} y={14} width={72} height={26} rx={4} fill="#fff" transform="rotate(3 50 30)" {...S} /><path d="M 22 26 h 40 M 28 48 h 40 M 24 72 h 44" stroke="#9aa" strokeWidth={3} /></g>);
    case 'chat': return (<g><path d="M 12 14 H 88 a 6 6 0 0 1 6 6 V 62 a 6 6 0 0 1 -6 6 H 46 L 26 88 V 68 H 12 a 6 6 0 0 1 -6 -6 V 20 a 6 6 0 0 1 6 -6 Z" fill="#fff" {...S} /><path d="M 22 32 H 78 M 22 48 H 62" stroke="#3A86FF" strokeWidth={5} strokeLinecap="round" /></g>);
    case 'comment': return (<g><path d="M 10 12 H 90 V 66 H 42 L 22 86 V 66 H 10 Z" fill="#fff" {...S} /><circle cx={32} cy={39} r={5} fill={OUTLINE} /><circle cx={50} cy={39} r={5} fill={OUTLINE} /><circle cx={68} cy={39} r={5} fill={OUTLINE} /></g>);
    case 'eid': return (<g><path d="M 62 10 A 40 40 0 1 0 90 62 A 32 32 0 0 1 62 10 Z" fill="#FFE9A8" {...S} /><path d="M 78 26 l 4 9 l 10 1 l -7 7 l 2 10 l -9 -5 l -9 5 l 2 -10 l -7 -7 l 10 -1 Z" fill="#FFD23F" stroke={OUTLINE} strokeWidth={2} /></g>);
    case 'chart': return (<g><rect x={10} y={56} width={18} height={34} fill="#3A86FF" {...S} /><rect x={40} y={36} width={18} height={54} fill="#FFB547" {...S} /><rect x={70} y={12} width={18} height={78} fill="#3DAA5C" {...S} /></g>);
    case 'tape': return (<g><path d="M 6 38 H 94 V 62 H 6 Z" fill="#FFD23F" {...S} />{[16, 28, 40, 52, 64, 76, 88].map((x, i) => <path key={x} d={`M ${x} 38 v ${i % 2 ? 8 : 14}`} stroke={OUTLINE} strokeWidth={2.5} />)}</g>);
    case 'zzz': return (<g fontFamily={fontFamily} fontWeight={700} fill="#fff" stroke={OUTLINE} strokeWidth={2}><text x={10} y={90} fontSize={36}>z</text><text x={36} y={60} fontSize={46}>Z</text><text x={62} y={30} fontSize={58}>Z</text></g>);
    case 'share': return (<g><circle cx={24} cy={50} r={12} fill="#3A86FF" {...S} /><circle cx={74} cy={22} r={12} fill="#3A86FF" {...S} /><circle cx={74} cy={78} r={12} fill="#3A86FF" {...S} /><path d="M 34 44 L 64 26 M 34 56 L 64 74" stroke={OUTLINE} strokeWidth={4} /></g>);
    case 'weight': return (<g><path d="M 26 30 H 74 L 90 88 H 10 Z" fill="#6c7a89" {...S} /><circle cx={50} cy={20} r={10} fill="none" {...S} strokeWidth={6} /><text x={50} y={74} textAnchor="middle" fontSize={26} fontWeight={700} fontFamily={fontFamily} fill="#fff">ভারী</text></g>);
    case 'knock': return (<g stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" fill="none"><path d="M 22 40 Q 12 50 22 60" /><path d="M 38 28 Q 20 50 38 72" /><path d="M 56 16 Q 28 50 56 84" /></g>);
    case 'pen': return (<g><path d="M 20 80 L 70 14 L 86 26 L 36 92 Z" fill="#FFD23F" {...S} /><path d="M 20 80 L 14 96 L 36 92 Z" fill="#f2d0b0" {...S} /></g>);
    case 'book': return (<g><path d="M 8 22 Q 30 14 50 24 Q 70 14 92 22 V 84 Q 70 76 50 86 Q 30 76 8 84 Z" fill="#fff" {...S} /><path d="M 50 24 V 86" stroke={OUTLINE} strokeWidth={3} /><path d="M 18 40 h 24 M 18 54 h 24 M 58 40 h 24 M 58 54 h 24" stroke="#8aa" strokeWidth={3} /></g>);
    case 'bell': return (<g><path d="M 50 10 C 26 10 26 44 22 62 H 78 C 74 44 74 10 50 10 Z" fill="#FFD23F" {...S} /><rect x={16} y={62} width={68} height={10} rx={5} fill="#E89B0C" {...S} /><circle cx={50} cy={84} r={7} fill="#E89B0C" {...S} /></g>);
    case 'cloth': return (<g><rect x={14} y={20} width={72} height={64} rx={10} fill="#C9A26B" {...S} /><ellipse cx={14} cy={52} rx={9} ry={32} fill="#B88B52" {...S} /><path d="M 28 36 H 80 M 28 52 H 80 M 28 68 H 80" stroke="#A67C45" strokeWidth={2.5} /></g>);
    case 'shop': return (<g><rect x={12} y={40} width={76} height={50} fill="#fff" {...S} /><path d="M 8 40 L 16 14 H 84 L 92 40 Z" fill="#E4572E" {...S} /><rect x={40} y={58} width={20} height={32} fill="#C9A26B" {...S} /></g>);
    default: return null;
  }
};

export const Icon: React.FC<{ name: IconName; x: number; y: number; size?: number; from: number; to: number; anim?: 'pop' | 'float' | 'pulse' | 'wobble'; text?: string; rot?: number; delay?: number }> = ({ name, x, y, size = 120, from, to, anim = 'pop', text, rot = 0 }) => {
  const gt = useGT();
  const w = win(gt, from, to);
  if (!w.on) return null;
  const dy = anim === 'float' ? Math.sin((gt - from) * 3) * 10 : 0;
  const ps = anim === 'pulse' ? 1 + Math.sin((gt - from) * 7) * 0.07 : 1;
  const wr = anim === 'wobble' ? Math.sin((gt - from) * 9) * 8 : 0;
  const k = size / 100;
  return (
    <g opacity={w.o} transform={`translate(${x},${y + dy}) rotate(${rot + wr}) scale(${w.s * ps * k}) translate(-50,-50)`}>
      <IconG name={name} text={text} />
    </g>
  );
};

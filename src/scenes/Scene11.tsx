import React from 'react';
import { Scene } from '../components/Scene';
import { Character, SPEC } from '../components/Character';
import { CleanBG } from '../components/Backgrounds';
import { Icon, IconG } from '../components/Icons';
import { Item } from '../components/Overlays';
import { fontFamily, OUTLINE } from '../theme';
import { Show, useGT, kf, win } from '../time';

const Buttons: React.FC = () => {
  const gt = useGT();
  const bs = [{ n: 'thumb' as const, l: 'লাইক', c: '#3A86FF', t: 456.6 }, { n: 'share' as const, l: 'শেয়ার', c: '#3DAA5C', t: 457.4 }, { n: 'bell' as const, l: 'সাবস্ক্রাইব', c: '#E4572E', t: 458.2 }];
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
      {bs.map((b, i) => { const w = win(gt, b.t, 460.75); const x = 360 + i * 480; return w.on ? (
        <g key={i} opacity={w.o} transform={`translate(${x + 120},560) scale(${w.s}) translate(-120,-130)`}>
          <rect width={240} height={260} rx={40} fill={b.c} stroke={OUTLINE} strokeWidth={6} />
          <g transform="translate(60,24) scale(1.2)"><IconG name={b.n} /></g>
          <text x={120} y={226} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={44} fill="#fff">{b.l}</text>
        </g>) : null; })}
    </svg>
  );
};
const items: Item[] = [
  { k: 'quote', from: 437.08, to: 441.9, x: 960, y: 540, w: 1500, fs: 62, icon: 'question', text: 'তোমার পরিবারে কি এমন কেউ আছে, যাকে তুমি অন্য কারও সঙ্গে মিলিয়ে ছোট করেছ?' },
  { k: 'quote', from: 442.02, to: 446.6, x: 960, y: 540, w: 1500, fs: 62, icon: 'heart', text: 'আর তোমার জীবনে কি এমন কেউ ছিল, যে সবার বিপক্ষে গিয়ে তোমার পাশে দাঁড়িয়েছে?', bg: '#FFE9EF' },
  { k: 'quote', from: 446.8, to: 450.3, x: 960, y: 540, w: 1400, fs: 66, icon: 'comment', text: 'নিচে কমেন্টে তার কথা লিখে জানাও', bg: '#E5EEFF' },
  { k: 'quote', from: 450.4, to: 452.0, x: 960, y: 540, w: 1100, fs: 76, icon: 'phone', text: 'আজই একটা ফোন করো', bg: '#E3F6E8' },
  { k: 'quote', from: 452.1, to: 456.4, x: 960, y: 540, w: 1400, h: 440, fs: 60, icon: 'star', label: 'Sajjad Animation', text: 'এমন আরও মন ছোঁয়া গল্পের জন্য আমাদের সঙ্গেই থাকুন', bg: '#FFF3C4' },
  { k: 'node', from: 456.5, to: 460.8, node: <Buttons /> },
];
export const Scene11: React.FC = () => {
  const gt = useGT();
  const sc = kf(gt, [[428.3, 1.05], [433, 1.4]]);
  return (
    <Scene id={11} items={items}>
      <CleanBG />
      <Show from={428.2} to={437.3}>
        <Character spec={SPEC.tanvirAdult} x={960} y={1010} scale={sc} emo={[{ t: 428, e: 'neutral' }, { t: 433.5, e: 'proud' }]} pose={[{ t: 428, l: [20, 20], r: [20, 20] }, { t: 433.5, l: [40, 30], r: [40, 30] }]} />
        <g transform="translate(560,820) rotate(-25)"><Icon name="tape" x={0} y={0} size={420} from={429.4} to={433.3} /></g>
        <Icon name="cross" x={560} y={620} size={130} from={430.2} to={433.3} anim="wobble" />
        <g transform="translate(960,520)"><Icon name="tape" x={0} y={0} size={520} from={433.46} to={437.2} /></g>
        <Icon name="check" x={1400} y={520} size={140} from={434.4} to={437.2} anim="pulse" />
        <Icon name="sparkle" x={520} y={260} size={100} from={434.8} to={437.2} anim="pulse" />
        <Icon name="sparkle" x={1400} y={280} size={100} from={435.2} to={437.2} anim="pulse" />
      </Show>
    </Scene>
  );
};

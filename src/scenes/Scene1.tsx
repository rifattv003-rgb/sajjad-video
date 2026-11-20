import React from 'react';
import { Scene } from '../components/Scene';
import { Character, SPEC, extra, EmoKF, PoseKF } from '../components/Character';
import { DiningBG, DiningTable } from '../components/Backgrounds';
import { Icon, IconG } from '../components/Icons';
import { Item } from '../components/Overlays';
import { useGT, kf } from '../time';

const WOMAN = extra('woman', '#2E9C8F', '#555', '#D9A072');
const MAN = extra('man', '#E0873A', '#33415c', '#C68B5E', '#2b2b2b');
const Y = 830, SC = 1.2;

const items: Item[] = [
  { k: 'say', from: 0.14, to: 6.2, x: 780, y: 140, tx: 320, ty: 292, w: 840, fs: 40, text: 'তোকে দিয়ে কিছু হবে না। সাকিবের অর্ধেকও যদি হতিস, আজ আমি মাথা উঁচু করে চলতে পারতাম।', bg: '#FFE3DC' },
  { k: 'pill', from: 8.0, to: 11.0, x: 300, y: 235, text: 'বাবা', color: '#B5533C' },
  { k: 'pill', from: 10.4, to: 14.0, x: 960, y: 60, text: '🌙 রাতের খাবারের টেবিল', color: '#1B2A4A' },
  { k: 'pill', from: 14.0, to: 17.5, x: 960, y: 175, text: 'তানভীর', color: '#3A86FF' },
  { k: 'quote', from: 23.1, to: 29.6, x: 960, y: 122, w: 1560, fs: 42, icon: 'question', text: 'তোমরা কি কখনো এমন কারও সামনে ভাত খেয়েছ, যার একটা কথায় পুরো থালাটাই ভারী হয়ে যায়?' },
  { k: 'pill', from: 29.4, to: 32.6, x: 1330, y: 235, text: 'রাশেদ · বড়ভাই', color: '#2E7D5B' },
];
const gtFish = (gt: number) => {
  if (gt < 33.7) return { x: 1330, y: 670, on: true, show: true };
  if (gt < 37.9) { const t = (gt - 33.7) / 4.2; return { x: 1330 + (980 - 1330) * t, y: 670 - Math.sin(t * Math.PI) * 90, on: true, show: true }; }
  return { x: 980, y: 668, on: true, show: true };
};
const Fish: React.FC = () => { const gt = useGT(); const f = gtFish(gt); return <g transform={`translate(${f.x - 42},${f.y - 42}) scale(.84)`}><IconG name="fish" /></g>; };
const Lokma = <circle cx={0} cy={4} r={13} fill="#fff" stroke="#222" strokeWidth={2.5} />;

export const Scene1: React.FC = () => {
  const baba: { emo: EmoKF[]; pose: PoseKF[] } = { emo: [{ t: 0, e: 'angry' }, { t: 6.8, e: 'neutral' }], pose: [{ t: 0, r: [70, 50] }, { t: 2.6, r: [95, 30] }, { t: 6.4, r: [4, 6] }] };
  return (
    <Scene id={1} items={items} shake={[[0.14, 1.1, 12], [4.4, 5.2, 6]]}
      cam={[{ t: 0, s: 1 }, { t: 13.2, s: 1 }, { t: 14.4, s: 1.45, x: 980, y: 480 }, { t: 22.4, s: 1.45, x: 980, y: 480 }, { t: 23.1, s: 1 }, { t: 32.8, s: 1 }, { t: 33.8, s: 1.4, x: 1150, y: 520 }, { t: 42, s: 1.4, x: 1150, y: 520 }]}>
      <DiningBG />
      <Character spec={SPEC.baba} x={300} y={Y} scale={SC} emo={baba.emo} pose={baba.pose} speak={[[0.14, 6.0]]} />
      <Character spec={WOMAN} x={620} y={Y} scale={SC} offset={2} emo={[{ t: 0, e: 'surprised' }, { t: 3, e: 'worried' }, { t: 12, e: 'neutral' }]} flip />
      <Character spec={SPEC.tanvir} x={980} y={Y} scale={SC} offset={1}
        emo={[{ t: 0, e: 'neutral' }, { t: 0.4, e: 'sad' }]} tremble={[[0.14, 5.5]]} look={0} lookY={0.8}
        pose={[{ t: 0, l: [8, 10], r: [12, 165] }]} propR={0 < 41.5 ? Lokma : null} />
      <Character spec={SPEC.rashed} x={1330} y={Y} scale={SC} offset={3} flip
        emo={[{ t: 0, e: 'worried' }, { t: 33.7, e: 'warm' }, { t: 39.4, e: 'happy' }]}
        pose={[{ t: 0, l: [6, 8], r: [6, 8] }, { t: 33.4, r: [20, 60] }, { t: 36.6, r: [6, 8] }, { t: 38.3, l: [-30, 20] }]} />
      <Character spec={MAN} x={1650} y={Y} scale={SC} offset={4} flip emo={[{ t: 0, e: 'surprised' }, { t: 3, e: 'worried' }, { t: 12, e: 'neutral' }]} />
      <DiningTable plates={[{ x: 300 }, { x: 620 }, { x: 980 }, { x: 1330, empty: false }, { x: 1650 }]} />
      <Fish />
      <Icon name="rice" x={1130} y={600} size={120} from={19.2} to={22.8} anim="float" />
      <Icon name="weight" x={980} y={560} size={140} from={26.2} to={29.6} anim="pulse" />
      <Icon name="heart" x={1165} y={640} size={90} from={39.4} to={42.1} anim="float" />
    </Scene>
  );
};

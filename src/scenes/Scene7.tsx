import React from 'react';
import { Scene } from '../components/Scene';
import { Character, SPEC } from '../components/Character';
import { RoomBG } from '../components/Backgrounds';
import { Icon } from '../components/Icons';
import { HI } from '../components/Props';
import { GIRL_A, GIRL_B } from '../components/Cast';
import { Item } from '../components/Overlays';
import { Show, useGT, kf } from '../time';

const items: Item[] = [
  { k: 'stamp', from: 243.2, to: 246.8, x: 960, y: 230, text: 'দেনা ১,২০,০০০ ৳', color: '#D61F3A', fs: 88, rot: -4 },
  { k: 'note', from: 246.8, to: 249.4, x: 960, y: 230, w: 620, text: 'ভাইয়ার ৪০,০০০ ৳ সহ', bg: '#FFF2A8', rot: 2, fs: 48 },
  { k: 'say', from: 251.5, to: 253.8, x: 1230, y: 200, tx: 1180, ty: 380, w: 600, fs: 42, text: 'মজুরিটা এই মাসে…', bg: '#fff' },
  { k: 'say', from: 258.5, to: 261.2, x: 1500, y: 190, tx: 1560, ty: 340, w: 300, fs: 64, text: '…', bg: '#fff' },
  { k: 'stamp', from: 268.5, to: 271.4, x: 960, y: 230, text: 'এক সপ্তাহ', sub: 'ঘর থেকে বের হয়নি', color: '#5A6B8C', fs: 86, rot: -3 },
];
const Y = 930, SC = 1.25;
export const Scene7: React.FC = () => {
  const gt = useGT();
  const babaX = kf(gt, [[258.0, 1980], [259.2, 1580], [266.6, 1580], [268.2, 1990]]);
  const needleX = kf(gt, [[271.5, 700], [273.6, 300]]), needleY = kf(gt, [[271.5, 740], [273.6, 810]]);
  const dark = kf(gt, [[270, 0], [276, 0.82]]);
  return (
    <Scene id={7} items={items} cam={[{ t: 239, s: 1 }, { t: 262, s: 1 }, { t: 264, s: 1.25, x: 800, y: 560 }, { t: 268, s: 1.25, x: 800, y: 560 }, { t: 269, s: 1 }]}>
      <RoomBG bed desk />
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (r + c < 4 ? <Icon key={`${r}${c}`} name="box" x={1300 + c * 120 + r * 20} y={760 - r * 90} size={110} from={239.4 + (r * 3 + c) * 0.15} to={278.3} /> : null)))}
      <Character spec={SPEC.tanvir} x={760} y={Y} scale={SC}
        emo={[{ t: 239.2, e: 'sad' }, { t: 243.2, e: 'cry' }, { t: 249.5, e: 'worried' }, { t: 254.4, e: 'sad' }, { t: 262, e: 'cry' }, { t: 268.5, e: 'tired' }]} tremble={[[243.2, 246.5], [262, 267]]}
        pose={[{ t: 239, l: [8, 10], r: [8, 10] }, { t: 254.0, r: [75, 25] }, { t: 257.4, r: [8, 10] }]} lean={gt > 262 && gt < 268 ? 6 : 0} propR={gt > 254.0 && gt < 257.3 ? HI('money', 0.6, 0, -24) : null} />
      <Character spec={GIRL_A} x={1130} y={Y} scale={SC} flip opacity={gt > 249.4 && gt < 258.2 ? 1 : 0} emo={[{ t: 249, e: 'sad' }]} speak={[[251.5, 253.6]]} lean={-6} />
      <Character spec={GIRL_B} x={1380} y={Y} scale={SC} flip offset={2} opacity={gt > 249.4 && gt < 258.2 ? 1 : 0} emo={[{ t: 249, e: 'sad' }]} lean={-6} />
      <Character spec={SPEC.baba} x={babaX} y={Y} scale={SC} flip walk={[[258.0, 259.2], [266.6, 268.2]]} emo={[{ t: 258, e: 'neutral' }, { t: 264.8, e: 'sad' }]} />
      <Icon name="broken" x={980} y={560} size={120} from={262.4} to={267.2} anim="pulse" />
      <Icon name="calendar" x={1500} y={380} size={170} from={268.5} to={271.4} text="৭" anim="wobble" />
      <g opacity={dark}><rect width={1920} height={1080} fill="#04060F" /></g>
      <Icon name="needle" x={needleX} y={needleY} size={80} from={271.4} to={274.4} />
    </Scene>
  );
};

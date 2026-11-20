import React from 'react';
import { Scene } from '../components/Scene';
import { Character, SPEC } from '../components/Character';
import { RoomBG } from '../components/Backgrounds';
import { Icon } from '../components/Icons';
import { HI } from '../components/Props';
import { Item } from '../components/Overlays';
import { Show, useGT, kf } from '../time';

const B = { bg: '#FFF3E0' };
const items: Item[] = [
  { k: 'say', from: 290.94, to: 299.6, x: 1180, y: 150, tx: 1290, ty: 330, w: 960, fs: 40, text: 'তোর মা আমাকে বলল, ছেলেটা তিন দিন ধরে ঠিকমতো খায়নি। আমি তখন বুঝলাম, আমি একটা জিনিস ভুল করেছি।', ...B },
  { k: 'say', from: 301.39, to: 306.5, x: 1180, y: 150, tx: 1290, ty: 330, w: 940, fs: 42, text: 'আমি ভাবতাম খোঁচা দিলে তুই দৌড়াবি। কিন্তু তুই তো খোঁচা খেয়েও থামিসনি।', ...B },
  { k: 'say', from: 306.59, to: 309.7, x: 1180, y: 150, tx: 1290, ty: 330, w: 900, fs: 44, text: 'আমি যা কখনো করিনি, তুই তা করে দেখালি।', ...B },
  { k: 'say', from: 309.76, to: 313.5, x: 1180, y: 150, tx: 1290, ty: 330, w: 900, fs: 44, text: 'ঝুঁকি নিয়েছিস। হেরেছিস, কিন্তু চেষ্টা করেছিস।', ...B },
  { k: 'say', from: 321.32, to: 327.3, x: 1180, y: 150, tx: 1290, ty: 330, w: 940, fs: 42, text: 'এটা দিয়ে নতুন করে শুরু কর। আর এবার আমাকে বল তুই কী করছিস। আমি শুনব।', ...B },
];
const Y = 930, SC = 1.25;
export const Scene8: React.FC = () => {
  const gt = useGT();
  const babaX = kf(gt, [[280.9, 2000], [282.7, 1290]]);
  const babaWalk: [number, number][] = [[280.9, 282.7]];
  return (
    <Scene id={8} items={items}
      cam={[{ t: 278, s: 1 }, { t: 289, s: 1 }, { t: 291, s: 1.12, x: 1000, y: 540 }, { t: 327, s: 1.12, x: 1000, y: 540 }, { t: 329, s: 1 }]}>
      <Show from={278.3} to={330.8}>
        <RoomBG night bed desk lamp />
        <Character spec={SPEC.tanvir} x={820} y={Y} scale={SC}
          emo={[{ t: 278.3, e: 'tired' }, { t: 282.7, e: 'worried' }, { t: 295.1, e: 'sad' }, { t: 303, e: 'sad' }, { t: 309.8, e: 'cry' }, { t: 316.8, e: 'sad' }, { t: 321.4, e: 'warm' }]}
          look={0.5} tremble={[[309.8, 314]]} pose={[{ t: 278, l: [8, 10], r: [8, 10] }, { t: 316.6, l: [-20, 100], r: [-20, 100] }]}
          propR={gt > 317 ? HI('tin', 0.5, -10, -20) : null} tearsOn={[[310, 330]]} />
        <Character spec={SPEC.baba} x={babaX} y={Y} scale={SC} flip walk={babaWalk} offset={2} opacity={gt > 280.8 ? 1 : 0}
          emo={[{ t: 282, e: 'neutral' }, { t: 290.9, e: 'sad' }, { t: 301.4, e: 'warm' }, { t: 309.8, e: 'warm' }, { t: 321.3, e: 'warm' }]}
          speak={[[290.94, 299.5], [301.39, 306.4], [306.59, 309.6], [309.76, 313.3], [321.32, 327.2]]}
          pose={[{ t: 282, l: [-15, 90], r: [4, 6] }, { t: 316.4, l: [-30, 60] }, { t: 317.4, l: [6, 10] }]}
          propL={gt > 282.7 && gt < 317.0 ? HI('tin', 0.5, 10, -20) : null} />
        <Icon name="knock" x={1700} y={540} size={140} from={279.5} to={281.8} anim="wobble" />
        <Icon name="money" x={1050} y={560} size={110} from={316.9} to={321.2} anim="float" />
        <Icon name="heart" x={1060} y={430} size={90} from={322} to={330} anim="pulse" />
        {/* ma behind the door */}
        <Show from={326.5} to={330.8}>
          <Character spec={SPEC.ma} x={1730} y={Y} scale={SC} flip emo={[{ t: 326, e: 'cry' }]} pose={[{ t: 326, r: [20, 150] }]} />
          <rect x={1790} y={360} width={140} height={480} fill="#8B5A2B" stroke="#222" strokeWidth={4} />
        </Show>
      </Show>
      <Show from={330.8} to={337.2}>
        <RoomBG desk bed />
        <Character spec={SPEC.tanvir} x={820} y={Y} scale={SC} emo={[{ t: 331, e: 'warm' }]} nod={[[332.5, 334]]} tearsOn={[[331, 336]]} look={0.6} />
        <Icon name="rice" x={1000} y={690} size={110} from={331.9} to={337.1} />
        <Icon name="fish" x={1130} y={690} size={110} from={332.3} to={337.1} />
        <Icon name="needle" x={1260} y={680} size={110} from={335.6} to={337.1} anim="pulse" />
      </Show>
    </Scene>
  );
};

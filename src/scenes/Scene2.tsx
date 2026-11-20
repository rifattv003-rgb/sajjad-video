import React from 'react';
import { Scene } from '../components/Scene';
import { Character, SPEC, extra } from '../components/Character';
import { RoomBG, StreetBG } from '../components/Backgrounds';
import { Icon } from '../components/Icons';
import { Bowl, Tray, HI } from '../components/Props';
import { Item } from '../components/Overlays';
import { Show, useGT, kf } from '../time';

const UNCLE = extra('man', '#8C6BB1', '#444', '#C68B5E', '#2b2b2b');
const items: Item[] = [
  { k: 'pill', from: 42.3, to: 46.2, x: 760, y: 330, text: 'তানভীর · ২২ বছর', color: '#3A86FF' },
  { k: 'stamp', from: 46.1, to: 50.4, x: 1230, y: 330, text: '২ বছর · ০ উত্তর', color: '#E4572E', fs: 60 },
  { k: 'pill', from: 50.9, to: 53.2, x: 1500, y: 290, text: 'সাকিব', color: '#2E7D5B' },
  { k: 'note', from: 51.3, to: 53.3, x: 1440, y: 160, w: 560, text: 'ব্যাংকে চাকরি পেয়েছে ✔', bg: '#DFF5E1', rot: 3 },
  { k: 'stamp', from: 53.3, to: 56.6, x: 960, y: 200, text: 'প্রতি শুক্রবার · পায়েস', color: '#B5533C', fs: 54, rot: -4 },
  { k: 'pill', from: 57.0, to: 59.5, x: 600, y: 375, text: 'মা', color: '#C2477A' },
  { k: 'pill', from: 64.3, to: 68.0, x: 1250, y: 330, text: 'বাবা · অবসরপ্রাপ্ত শিক্ষক', color: '#B5533C' },
  { k: 'stamp', from: 68.6, to: 72.5, x: 800, y: 300, text: '৪০ / ১০০', sub: 'খাতার নম্বরের মতো হিসাব', color: '#D61F3A', fs: 78 },
  { k: 'say', from: 75.0, to: 77.4, x: 1250, y: 200, tx: 1250, ty: 340, w: 520, fs: 52, text: 'সাকিব… সাকিব…', bg: '#FFE3DC' },
];
const Y = 930, SC = 1.25;
export const Scene2: React.FC = () => {
  const gt = useGT();
  const smaX = kf(gt, [[53.2, 1350], [56.3, 960]]);
  const tanX = kf(gt, [[75.6, -140], [77.3, 860], [79.0, 860], [81.0, -160]]);
  return (
    <Scene id={2} items={items} cam={[{ t: 42, s: 1 }, { t: 57, s: 1 }, { t: 59, s: 1.25, x: 800, y: 560 }, { t: 63.2, s: 1.25, x: 800, y: 560 }, { t: 63.9, s: 1 }]}>
      <Show from={42} to={50.4}>
        <RoomBG bed desk lamp />
        <Character spec={SPEC.tanvir} x={760} y={Y} scale={SC} emo={[{ t: 42, e: 'sad' }]} look={0.6} pose={[{ t: 42, l: [10, 10], r: [-20, 70] }]} />
        <Icon name="stack" x={1130} y={670} size={120} from={42.2} to={50.3} />
        <Icon name="envelope" x={980} y={520} size={80} from={44.4} to={46.4} anim="float" />
        <Icon name="envelope" x={1070} y={440} size={80} from={45.4} to={47.6} anim="float" />
        <Icon name="envelope" x={1170} y={370} size={80} from={46.4} to={48.8} anim="float" />
        <Icon name="clock" x={1560} y={600} size={110} from={46} to={50.3} anim="wobble" />
      </Show>
      <Show from={50.4} to={63.9}>
        <StreetBG />
        <Character spec={SPEC.tanvir} x={400} y={800} scale={0.8} emo={[{ t: 50, e: 'sad' }]} look={0.5} />
        <Character spec={SPEC.ma} x={600} y={Y} scale={SC} emo={[{ t: 50, e: 'neutral' }, { t: 57.2, e: 'shy' }]} pose={[{ t: 50, r: [4, 6] }, { t: 56.4, r: [30, 100] }]} propR={gt > 56.4 ? Bowl(false) : null} look={0.4} />
        <Character spec={SPEC.sakib} x={1560} y={Y} scale={SC} offset={2} flip emo={[{ t: 50, e: 'proud' }]} />
        <Character spec={SPEC.sakibMa} x={smaX} y={Y} scale={SC} offset={1} flip={gt < 56.4} emo={[{ t: 50, e: 'happy' }]} walk={[[53.3, 56.3]]}
          pose={[{ t: 50, l: [4, 6], r: [30, 100] }]} propR={gt > 53.2 && gt < 56.5 ? Bowl(true) : null} />
        <Icon name="rice" x={1010} y={300} size={110} from={53.4} to={56.5} anim="float" />
      </Show>
      <Show from={63.9} to={81.7}>
        <RoomBG sofa frame />
        <Character spec={SPEC.baba} x={1250} y={Y} scale={SC} emo={[{ t: 64, e: 'neutral' }, { t: 74.8, e: 'proud' }]} speak={[[75.2, 77.2]]}
          pose={[{ t: 64, r: [20, 100] }, { t: 69, r: [30, 70] }]} propR={gt > 64 && gt < 73 ? HI('book', 0.5, 0, -24) : null} />
        <Character spec={UNCLE} x={1650} y={Y} scale={SC} offset={2} flip opacity={gt > 72.4 ? 1 : 0} emo={[{ t: 72, e: 'happy' }]} />
        <Character spec={SPEC.tanvir} x={tanX} y={Y} scale={SC} offset={1} walk={[[79.4, 81.3]]} emo={[{ t: 76, e: 'sad' }]} pose={[{ t: 76.4, l: [20, 80], r: [20, 80] }]} propL={gt > 76.4 ? Tray : null} />
      </Show>
    </Scene>
  );
};

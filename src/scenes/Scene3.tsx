import React from 'react';
import { Scene } from '../components/Scene';
import { Character, SPEC } from '../components/Character';
import { RoomBG } from '../components/Backgrounds';
import { Icon } from '../components/Icons';
import { HI } from '../components/Props';
import { Item } from '../components/Overlays';
import { Show, useGT, kf } from '../time';

const items: Item[] = [
  { k: 'pill', from: 81.7, to: 85.5, x: 960, y: 60, text: '🌙 গভীর রাত', color: '#1B2A4A' },
  { k: 'say', from: 97.27, to: 100.3, x: 1230, y: 190, tx: 1170, ty: 335, w: 760, fs: 44, text: 'সারাদিন বেকার বসে থেকে এখন দর্জির কাজ ধরেছিস?', bg: '#FFE3DC' },
  { k: 'pill', from: 104.2, to: 107.2, x: 1100, y: 300, text: 'রাশেদ ভাইয়া', color: '#2E7D5B' },
  { k: 'say', from: 116.15, to: 121.6, x: 1210, y: 175, tx: 1150, ty: 340, w: 860, fs: 40, text: 'এটা তুই বানিয়েছিস? আমার অফিসের কলিগরা এটার জন্য পাঁচশো টাকা দিতেও দুবার ভাববে না।', bg: '#E3F6E8' },
  { k: 'say', from: 121.7, to: 122.95, x: 620, y: 220, tx: 700, ty: 360, w: 470, fs: 44, text: 'ভাইয়া, ঠাট্টা করছ?', bg: '#E5EEFF' },
  { k: 'say', from: 123.0, to: 130.3, x: 1250, y: 175, tx: 1150, ty: 340, w: 880, fs: 40, text: 'আমি ঠাট্টা করলে তোর হাসি পেত। তোর মুখ দেখে মনে হচ্ছে তুই কেঁদে ফেলবি।', bg: '#E3F6E8' },
];
const Y = 930, SC = 1.25;
export const Scene3: React.FC = () => {
  const gt = useGT();
  const babaX = kf(gt, [[94.8, 1950], [96.4, 1240]]);
  const rashX = kf(gt, [[103.6, 1950], [105.4, 1240]]);
  const bagShown = gt > 91 && gt < 116;
  return (
    <Scene id={3} items={items}
      cam={[{ t: 81, s: 1 }, { t: 81.8, s: 1.2, x: 830, y: 600 }, { t: 94, s: 1.2, x: 800, y: 600 }, { t: 94.9, s: 1 }, { t: 116, s: 1 }, { t: 117, s: 1.2, x: 1000, y: 560 }, { t: 130, s: 1.2, x: 1000, y: 560 }]}
      shake={[[97.3, 97.9, 8]]}>
      <RoomBG night bed desk lamp />
      <Character spec={SPEC.tanvir} x={700} y={Y} scale={SC}
        emo={[{ t: 81.6, e: 'neutral' }, { t: 87.4, e: 'happy' }, { t: 95, e: 'worried' }, { t: 97.3, e: 'sad' }, { t: 103.5, e: 'worried' }, { t: 110, e: 'shy' }, { t: 121.7, e: 'shy' }, { t: 126.4, e: 'cry' }, { t: 129.2, e: 'warm' }]}
        speak={[[121.7, 122.95]]} tremble={[[97.4, 99.5], [126.4, 130]]} look={0.5}
        pose={[{ t: 81.6, l: [-20, 100], r: [-30, 90] }, { t: 91.2, l: [-25, 95], r: [-35, 85] }, { t: 100.9, l: [-20, 100], r: [-10, 60] }, { t: 101.6, l: [8, 10], r: [8, 10] }]}
        propR={gt < 100.9 ? HI('needle', 0.5, 0, -20, 20) : null} />
      <Character spec={SPEC.baba} x={babaX} y={Y} scale={SC} flip opacity={gt > 94.7 && gt < 103.2 ? 1 : 0}
        walk={[[94.8, 96.4], [101.6, 103.2]]} emo={[{ t: 94, e: 'angry' }]} speak={[[97.27, 100.2]]} pose={[{ t: 94, l: [4, 6], r: [40, 40] }]} />
      <Character spec={SPEC.rashed} x={rashX} y={Y} scale={SC} flip opacity={gt > 103.5 ? 1 : 0} walk={[[103.6, 105.4]]}
        emo={[{ t: 104, e: 'neutral' }, { t: 109, e: 'thinking' }, { t: 116.15, e: 'happy' }, { t: 121, e: 'worried' }, { t: 123, e: 'laugh' }, { t: 126, e: 'warm' }]}
        speak={[[116.15, 121.5], [123.0, 129.8]]}
        pose={[{ t: 103, l: [4, 6], r: [4, 6] }, { t: 109.4, r: [-10, 110] }]} propR={gt > 109.4 && gt < 130.5 ? HI('bag', 0.7, 0, -34) : null} />
      {bagShown && gt < 109.4 && <Icon name="bag" x={940} y={650} size={90} from={91.2} to={109.4} />}
      <Icon name="needle" x={560} y={540} size={90} from={82} to={86.6} anim="wobble" />
      <Icon name="bag" x={560} y={520} size={110} from={88} to={94.6} anim="float" />
      <Icon name="sparkle" x={640} y={460} size={70} from={89.2} to={94.6} anim="pulse" />
      <Icon name="zzz" x={1580} y={330} size={140} from={104} to={116} anim="float" />
      <Icon name="money" x={1150} y={560} size={110} from={119.2} to={122.8} anim="float" />
    </Scene>
  );
};

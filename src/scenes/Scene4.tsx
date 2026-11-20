import React from 'react';
import { Scene } from '../components/Scene';
import { Character, SPEC } from '../components/Character';
import { RoomBG } from '../components/Backgrounds';
import { Icon } from '../components/Icons';
import { HI } from '../components/Props';
import { Item } from '../components/Overlays';
import { useGT } from '../time';

const items: Item[] = [
  { k: 'pill', from: 130.4, to: 133.5, x: 960, y: 60, text: '☀️ পরদিন সকাল', color: '#E8913A' },
  { k: 'stamp', from: 135.5, to: 139.4, x: 960, y: 190, text: '৳ ৪০,০০০', color: '#2E7D32', fs: 90, rot: -5 },
  { k: 'note', from: 139.0, to: 141.0, x: 1500, y: 150, w: 520, text: '৩ বছরের জমানো টাকার বড় অংশ', bg: '#FFF2A8', rot: 3, fs: 38 },
  { k: 'say', from: 144.45, to: 150.2, x: 1060, y: 150, tx: 1240, ty: 330, w: 860, fs: 42, text: 'টাকাটা আমি তোকে দিচ্ছি না। বিনিয়োগ করছি। আমি তোর ওপর বাজি ধরেছি।', bg: '#E3F6E8' },
];
const Y = 930, SC = 1.3;
export const Scene4: React.FC = () => {
  const gt = useGT();
  return (
    <Scene id={4} items={items} cam={[{ t: 130, s: 1 }, { t: 131, s: 1.1, x: 940, y: 560 }, { t: 150, s: 1.15, x: 940, y: 560 }, { t: 153, s: 1.35, x: 760, y: 520 }]}>
      <RoomBG desk bed />
      <Character spec={SPEC.tanvir} x={760} y={Y} scale={SC} emo={[{ t: 130, e: 'worried' }, { t: 135.4, e: 'surprised' }, { t: 140, e: 'shy' }, { t: 143.9, e: 'sad' }, { t: 150, e: 'cry' }, { t: 152, e: 'warm' }]}
        look={0.7} pose={[{ t: 130, l: [8, 10], r: [8, 10] }, { t: 139.6, r: [-10, 100] }, { t: 141.2, r: [-10, 100] }, { t: 143.0, r: [-15, 60] }]} nod={[[150.4, 154.9]]}
        propR={gt > 133 && gt < 144.5 ? HI('envelope', 0.7, 0, -26, -10) : null} tearsOn={[[150.2, 154.9]]} />
      <Character spec={SPEC.rashed} x={1240} y={Y} scale={SC} flip offset={2}
        emo={[{ t: 130, e: 'warm' }, { t: 144.4, e: 'proud' }]} speak={[[144.45, 150.1]]}
        pose={[{ t: 130, l: [4, 6], r: [4, 6] }, { t: 131.4, l: [-10, 110] }, { t: 133.3, l: [-35, 75] }, { t: 143.0, l: [-35, 75] }, { t: 144, l: [-30, 100] }, { t: 150.5, l: [6, 8] }]}
        propL={gt > 131.3 && gt < 133.4 ? HI('envelope', 0.7, 0, -26, 10) : null} />
      <Icon name="envelope" x={1000} y={600} size={90} from={133.4} to={135.4} anim="float" />
      <Icon name="heart" x={940} y={420} size={100} from={150.6} to={154.9} anim="pulse" />
      <Icon name="sparkle" x={1060} y={500} size={70} from={151.6} to={154.9} anim="pulse" />
    </Scene>
  );
};

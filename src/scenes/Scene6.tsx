import React from 'react';
import { Scene } from '../components/Scene';
import { Character, SPEC } from '../components/Character';
import { RoomBG, CleanBG, ShopBG } from '../components/Backgrounds';
import { Split } from '../components/Split';
import { Icon } from '../components/Icons';
import { HI } from '../components/Props';
import { GIRLS } from '../components/Cast';
import { Item } from '../components/Overlays';
import { Show, useGT } from '../time';

const items: Item[] = [
  { k: 'stamp', from: 197.9, to: 199.9, x: 960, y: 230, text: 'বড় সুযোগ!', color: '#E4572E', fs: 90, rot: -5 },
  { k: 'pill', from: 200.0, to: 203.2, x: 1440, y: 330, text: 'কাকা জামাল · ব্যবসায়ী', color: '#8A5A2B' },
  { k: 'note', from: 203.4, to: 206.2, x: 960, y: 140, w: 700, text: '৫০০ ব্যাগ · ঈদের আগেই', bg: '#FFF2A8', rot: -2, fs: 52 },
  { k: 'think', from: 208.3, to: 211.8, x: 560, y: 170, tx: 520, ty: 340, icon: 'money', w: 300, h: 190, sup: false },
  { k: 'stamp', from: 214.6, to: 217.2, x: 960, y: 190, text: '+৪ জন কারিগর', color: '#3A86FF', fs: 72, rot: -4 },
  { k: 'say', from: 219.3, to: 221.3, x: 1440, y: 190, tx: 1440, ty: 350, w: 620, fs: 46, text: 'অগ্রিম নিয়েছিস তো?', bg: '#E3F6E8' },
  { k: 'say', from: 221.4, to: 224.5, x: 560, y: 160, tx: 520, ty: 350, w: 780, fs: 42, text: 'কাকা মুখে কথা দিয়েছেন ভাইয়া, বিশ্বাস করতে হয়।', bg: '#E5EEFF' },
  { k: 'stamp', from: 229.0, to: 232.1, x: 960, y: 200, text: '৫০০ / ৫০০ ✔', sub: 'সব ব্যাগ প্রস্তুত', color: '#2E7D32', fs: 80, rot: -3 },
  { k: 'say', from: 232.28, to: 239.0, x: 1440, y: 160, tx: 1440, ty: 350, w: 860, fs: 40, text: 'আরে বাবা, আমার দোকানে এখন নতুন সরবরাহকারী এসেছে, দামও কম। তোমার মাল আর লাগবে না।', bg: '#FFE3DC' },
];
const Y = 930, SC = 1.25;
export const Scene6: React.FC = () => {
  const gt = useGT();
  const phoneT = HI('phone', 0.55, 0, -34);
  const tanEmo = [{ t: 195.7, e: 'happy' as const }, { t: 206.0, e: 'surprised' as const }, { t: 208.3, e: 'proud' as const }, { t: 212, e: 'worried' as const }, { t: 216.5, e: 'tired' as const }, { t: 219.3, e: 'worried' as const }, { t: 221.4, e: 'warm' as const }, { t: 224.8, e: 'happy' as const }, { t: 232.3, e: 'surprised' as const }, { t: 235.5, e: 'sad' as const }];
  const boxes = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <Scene id={6} items={items} shake={[[237.6, 238.3, 9]]}>
      <Show from={195.6} to={200.0}>
        <CleanBG />
        <Icon name="calendar" x={960} y={560} size={420} from={195.8} to={199.9} text="৪" anim="wobble" />
        <Icon name="sparkle" x={600} y={420} size={90} from={197} to={199.9} anim="pulse" />
        <Icon name="sparkle" x={1340} y={420} size={90} from={197.5} to={199.9} anim="pulse" />
      </Show>
      <Show from={199.9} to={212.0}>
        <Split left={<RoomBG bed />} right={<ShopBG />} />
        <Character spec={SPEC.tanvir} x={520} y={Y} scale={SC} emo={tanEmo} tremble={[[206.9, 209.6]]} pose={[{ t: 200, l: [-5, 130] }]} propL={phoneT} look={0.4} />
        <Character spec={SPEC.jamal} x={1440} y={Y} scale={SC} flip emo={[{ t: 200, e: 'happy' }, { t: 232, e: 'neutral' }]} pose={[{ t: 200, r: [-5, 130] }]} propR={phoneT} speak={[[203.3, 206.1]]} />
        <Icon name="money" x={760} y={560} size={120} from={206.3} to={208.2} anim="pulse" />
      </Show>
      <Show from={211.9} to={219.4}>
        <RoomBG bed desk night={gt > 216} lamp />
        <Character spec={SPEC.tanvir} x={560} y={Y} scale={SC} emo={tanEmo} pose={[{ t: 212, l: [-10, 110], r: [-10, 110] }]} />
        {GIRLS.map((g, i) => <Character key={i} spec={g} x={900 + i * 250} y={Y} scale={SC} offset={i} flip={i % 2 === 1} opacity={gt > 214.4 + (i === 0 ? -3 : i * 0.3) ? 1 : 0} emo={[{ t: 212, e: 'happy' }]} pose={[{ t: 212, l: [-10, 100], r: [-25, 85] }]} propR={HI('needle', 0.45, 0, -20, 20)} />)}
        <Icon name="cloth" x={760} y={560} size={110} from={212.2} to={214.4} anim="float" />
        <Icon name="warning" x={1000} y={480} size={100} from={213.4} to={215.2} anim="wobble" />
        <Icon name="moon" x={1700} y={300} size={120} from={216.2} to={219.3} anim="float" />
        <Icon name="clock" x={1450} y={330} size={100} from={217} to={219.3} anim="wobble" />
      </Show>
      <Show from={219.3} to={224.7}>
        <Split left={<RoomBG bed night lamp />} right={<CleanBG c1="#EAF2FF" c2="#BBD3F5" />} />
        <Character spec={SPEC.tanvir} x={520} y={Y} scale={SC} emo={tanEmo} speak={[[221.4, 224.4]]} pose={[{ t: 219, l: [-5, 130] }]} propL={phoneT} look={0.4} />
        <Character spec={SPEC.rashed} x={1440} y={Y} scale={SC} flip emo={[{ t: 219, e: 'worried' }]} speak={[[219.3, 221.2]]} pose={[{ t: 219, r: [-5, 130] }]} propR={phoneT} />
      </Show>
      <Show from={224.6} to={232.3}>
        <RoomBG bed desk />
        <Character spec={SPEC.tanvir} x={620} y={Y} scale={SC} emo={tanEmo} pose={[{ t: 224.6, r: [40, 60] }, { t: 228.4, r: [-5, 130] }]} propR={gt > 229.2 ? phoneT : null} />
        {boxes.map((b) => <Icon key={b} name="box" x={900 + b * 100} y={700} size={90} from={227.6 + b * 0.35} to={232.2} />)}
        <Icon name="calendar" x={1500} y={330} size={140} from={224.7} to={228} text="৭" anim="wobble" />
        <Icon name="eid" x={1700} y={330} size={140} from={225.2} to={228} anim="float" />
      </Show>
      <Show from={232.3} to={239.4}>
        <Split left={<RoomBG bed />} right={<ShopBG />} />
        <Character spec={SPEC.tanvir} x={520} y={Y} scale={SC} emo={tanEmo} pose={[{ t: 232, l: [-5, 130] }]} propL={phoneT} tremble={[[236.8, 239.2]]} />
        <Character spec={SPEC.jamal} x={1440} y={Y} scale={SC} flip emo={[{ t: 232, e: 'happy' }]} pose={[{ t: 232, r: [-5, 130] }]} propR={phoneT} speak={[[232.3, 238.9]]} />
      </Show>
    </Scene>
  );
};

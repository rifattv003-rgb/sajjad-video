import React from 'react';
import { Scene } from '../components/Scene';
import { Character, SPEC, extra } from '../components/Character';
import { ShopBG, RoomBG, Ribbon } from '../components/Backgrounds';
import { Icon } from '../components/Icons';
import { GIRLS, UNCLE1, UNCLE2, AUNT1, AUNT2 } from '../components/Cast';
import { Item } from '../components/Overlays';
import { Show, useGT, kf } from '../time';

const items: Item[] = [
  { k: 'pill', from: 376.6, to: 379.6, x: 960, y: 60, text: '⏳ তিন বছর পর', color: '#1F5F3A' },
  { k: 'stamp', from: 383.5, to: 386.5, x: 960, y: 560, text: '১২ জন কারিগর', color: '#E4572E', fs: 84, rot: -4 },
  { k: 'say', from: 392.77, to: 399.2, x: 600, y: 150, tx: 470, ty: 330, w: 920, fs: 40, text: 'ভাইপো, আমার ছেলেটার চাকরিতে এখন বেতন বাড়ছে না। ও বলছিল, তোমার ব্যবসায় কি কোনো কাজ হবে?', bg: '#F1E6FF' },
  { k: 'say', from: 402.8, to: 407.0, x: 1330, y: 150, tx: 1180, ty: 330, w: 900, fs: 42, text: 'কাকিমা, সাকিব ভাইয়াকে একদিন আসতে বলবেন। আমরা একসাথে বসে ভাবব।', bg: '#E5EEFF' },
  { k: 'say', from: 412.9, to: 417.4, x: 960, y: 140, tx: 950, ty: 330, w: 1000, fs: 42, text: 'এই যে আমার ছোট ছেলে, ওর কথা আর কখনো কারও সঙ্গে মেলাতে যেয়ো না।', bg: '#FFF3E0' },
];
const Y = 930, SC = 1.25;
export const Scene10: React.FC = () => {
  const gt = useGT();
  const smaX = kf(gt, [[389.9, -160], [392.7, 440]]);
  const cut = kf(gt, [[388.2, 0], [389.2, 1]]);
  const workers = Array.from({ length: 12 }).map((_, i) => ({ x: 150 + i * 150, spec: GIRLS[i % 4], on: gt > 383.6 + i * 0.22 }));
  return (
    <Scene id={10} items={items}
      cam={[{ t: 376, s: 1 }, { t: 417.5, s: 1 }, { t: 420.5, s: 1.3, x: 1150, y: 560 }, { t: 428, s: 1.3, x: 1150, y: 560 }]}>
      <Show from={376.4} to={386.8}>
        <ShopBG />
        <Character spec={SPEC.tanvirAdult} x={960} y={920} scale={1.0} emo={[{ t: 376, e: 'proud' }]} pose={[{ t: 376, r: [40, 60] }]} />
        {workers.map((w, i) => <Character key={i} spec={w.spec} x={w.x} y={1050} scale={0.6} offset={i} opacity={w.on ? 1 : 0} emo={[{ t: 376, e: 'happy' }]} />)}
      </Show>
      <Show from={386.7} to={407.4}>
        <ShopBG />
        <Ribbon cut={cut} />
        <Character spec={SPEC.baba} x={780} y={920} scale={1.1} emo={[{ t: 386.7, e: 'proud' }]} pose={[{ t: 386.7, r: [-5, 6] }, { t: 387.9, r: [-30, 60] }, { t: 389.4, r: [6, 8] }]} />
        <Character spec={SPEC.tanvirAdult} x={1150} y={920} scale={1.1} flip emo={[{ t: 386.7, e: 'proud' }, { t: 399.8, e: 'warm' }]} speak={[[402.8, 406.9]]} />
        <Character spec={SPEC.sakibMa} x={smaX} y={920} scale={1.1} walk={[[389.9, 392.7]]} emo={[{ t: 389.9, e: 'shy' }]} speak={[[392.77, 399.1]]} lean={gt > 392.7 ? 3 : 0} look={0.6} />
        <Icon name="sparkle" x={960} y={790} size={110} from={388.9} to={391} anim="pulse" />
        <Icon name="star" x={1450} y={400} size={90} from={387} to={390} anim="float" />
      </Show>
      <Show from={407.3} to={428.4}>
        <RoomBG sofa frame />
        <Character spec={UNCLE1} x={420} y={Y} scale={SC} offset={1} emo={[{ t: 407, e: 'happy' }]} />
        <Character spec={AUNT1} x={650} y={Y} scale={SC} offset={2} emo={[{ t: 407, e: 'happy' }]} />
        <Character spec={SPEC.baba} x={960} y={Y} scale={SC} offset={3} emo={[{ t: 407, e: 'proud' }]} speak={[[412.9, 417.3]]} pose={[{ t: 412.5, r: [40, 70] }]} />
        <Character spec={UNCLE2} x={1230} y={Y} scale={SC} flip offset={4} emo={[{ t: 407, e: 'happy' }]} />
        <Character spec={SPEC.rashed} x={1500} y={Y} scale={SC} flip offset={5} emo={[{ t: 407, e: 'warm' }, { t: 421.8, e: 'proud' }]} />
        <Character spec={SPEC.tanvirAdult} x={1760} y={Y} scale={SC} flip offset={6} emo={[{ t: 407, e: 'shy' }, { t: 418.5, e: 'warm' }]} look={-0.8} />
        <Icon name="heart" x={1630} y={500} size={100} from={422.3} to={428.2} anim="pulse" />
      </Show>
    </Scene>
  );
};

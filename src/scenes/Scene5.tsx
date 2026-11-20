import React from 'react';
import { Scene } from '../components/Scene';
import { Character, SPEC } from '../components/Character';
import { RoomBG, MarketBG, CleanBG, DiningBG, DiningTable } from '../components/Backgrounds';
import { Icon, IconG } from '../components/Icons';
import { HI } from '../components/Props';
import { VENDOR, GIRL_A, GIRL_B } from '../components/Cast';
import { Item } from '../components/Overlays';
import { fontFamily, OUTLINE } from '../theme';
import { Show, useGT, kf, clamp, easeOutBack } from '../time';

const Chart: React.FC = () => {
  const gt = useGT();
  const bars = [{ t: 166.5, v: 3, l: '১ম মাস', c: '#3A86FF', n: '৩' }, { t: 168.9, v: 11, l: '২য় মাস', c: '#FFB547', n: '১১' }, { t: 170.4, v: 17, l: '৩য় মাস', c: '#3DAA5C', n: '↑' }];
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
      <text x={960} y={120} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={64} fill={OUTLINE}>অর্ডারের যাত্রা</text>
      <path d="M 680 880 H 1560" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      {bars.map((b, i) => {
        const p = clamp((gt - b.t) / 0.9); const h = b.v * 36 * easeOutBack(p);
        const x = 750 + i * 270;
        return p > 0 ? (<g key={i}>
          <rect x={x} y={880 - h} width={180} height={h} rx={14} fill={b.c} stroke={OUTLINE} strokeWidth={5} />
          <text x={x + 90} y={880 - h - 20} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={80} fill={OUTLINE}>{b.n}</text>
          <text x={x + 90} y={940} textAnchor="middle" fontFamily={fontFamily} fontWeight={600} fontSize={44} fill={OUTLINE}>{b.l}</text>
        </g>) : null;
      })}
    </svg>
  );
};
const items: Item[] = [
  { k: 'pill', from: 155.2, to: 158.4, x: 960, y: 60, text: '🛒 বাজার', color: '#E8913A' },
  { k: 'node', from: 166.3, to: 173.4, node: <Chart /> },
  { k: 'quote', from: 173.5, to: 176.0, x: 960, y: 520, w: 1300, fs: 64, icon: 'chat', label: 'ঢাকার একজন ক্রেতা', text: '“এমন কাজ আমি আগে দেখিনি”' },
  { k: 'say', from: 184.12, to: 190.0, x: 1330, y: 150, tx: 1250, ty: 330, w: 920, fs: 42, text: 'ব্যাগ বেচে কয় টাকা হয়? সাকিব এক মাসে যা পায়, তুই এক বছরেও তা পাবি না।', bg: '#FFE3DC' },
];
const Y = 930, SC = 1.25;
export const Scene5: React.FC = () => {
  const gt = useGT();
  const tanX = kf(gt, [[190.0, 980], [191.8, -200]]);
  const bookX = kf(gt, [[192.6, 560], [194.2, 170]]), bookY = kf(gt, [[192.6, 640], [194.2, 690]]);
  return (
    <Scene id={5} items={items} shake={[[184.1, 184.7, 8]]}>
      <Show from={154.9} to={158.7}>
        <MarketBG />
        <Character spec={SPEC.tanvir} x={820} y={Y} scale={SC} emo={[{ t: 155, e: 'happy' }]} walk={[[155, 156.6]]} pose={[{ t: 157.0, r: [40, 70] }]} propR={gt > 157 ? HI('money', 0.6, 0, -24) : null} />
        <Character spec={VENDOR} x={1380} y={Y} scale={SC} flip offset={2} emo={[{ t: 155, e: 'happy' }]} />
        <Icon name="cloth" x={1330} y={600} size={110} from={156.8} to={158.6} />
        <Icon name="cloth" x={1480} y={600} size={110} from={157.1} to={158.6} />
      </Show>
      <Show from={158.7} to={163.8}>
        <RoomBG bed />
        <Character spec={SPEC.tanvir} x={820} y={Y} scale={SC} emo={[{ t: 159, e: 'warm' }]} speak={[]} pose={[{ t: 159, r: [60, 60] }]} />
        <Character spec={GIRL_A} x={1150} y={Y} scale={SC} offset={1} flip emo={[{ t: 159, e: 'happy' }]} pose={[{ t: 159, l: [-10, 100], r: [-10, 100] }, { t: 161.4, l: [-30, 80], r: [-5, 110] }]} propL={HI('needle', 0.5, 0, -20, 30)} />
        <Character spec={GIRL_B} x={1450} y={Y} scale={SC} offset={2} flip emo={[{ t: 159, e: 'happy' }]} pose={[{ t: 159, l: [-10, 100], r: [-30, 80] }]} propR={HI('bag', 0.5, 0, -24)} />
        <Icon name="needle" x={1000} y={520} size={80} from={160} to={163.7} anim="wobble" />
        <Icon name="sparkle" x={1300} y={480} size={70} from={161} to={163.7} anim="pulse" />
      </Show>
      <Show from={163.8} to={166.4}>
        <CleanBG c1="#EAF2FF" c2="#BBD3F5" />
        <g transform="translate(960,560)">
          <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1f2a44" stroke={OUTLINE} strokeWidth={6} />
          <rect x={-165} y={-330} width={330} height={640} rx={20} fill="#fff" />
          <rect x={-165} y={-330} width={330} height={80} rx={20} fill="#3A86FF" />
          {[[-150, -230], [10, -230], [-150, -70], [10, -70]].map(([x, y], i) => <g key={i} transform={`translate(${x},${y}) scale(1.4)`}><rect width={100} height={100} rx={10} fill="#FFF6E0" stroke="#ddd" /><g transform="scale(.9) translate(6,6)"><IconG name="bag" /></g></g>)}
          <g transform="translate(-60,150) scale(1.2)"><IconG name="thumb" /></g>
        </g>
        <Icon name="heart" x={1250} y={380} size={110} from={164.3} to={166.3} anim="float" />
        <Icon name="thumb" x={680} y={420} size={110} from={164.8} to={166.3} anim="float" />
      </Show>
      <Show from={166.3} to={176.05}><CleanBG c1="#FFF9E5" c2="#F6D58E" /></Show>
      <Show from={176.0} to={180.5}>
        <RoomBG bed />
        <Character spec={SPEC.tanvir} x={960} y={Y} scale={SC} emo={[{ t: 176, e: 'surprised' }, { t: 177.5, e: 'happy' }]} look={0} pose={[{ t: 176, r: [-5, 130] }]} propR={HI('phone', 0.55, 0, -34)} tearsOn={[[178, 180.4]]} />
        <Icon name="heart" x={1180} y={440} size={90} from={176.8} to={180.4} anim="float" />
        <Icon name="star" x={760} y={420} size={80} from={177.4} to={180.4} anim="pulse" />
      </Show>
      <Show from={180.5} to={190.4}>
        <DiningBG />
        <Character spec={SPEC.baba} x={1250} y={830} scale={SC} flip emo={[{ t: 180.4, e: 'neutral' }, { t: 184, e: 'angry' }]} speak={[[184.12, 189.8]]} pose={[{ t: 184, l: [50, 60] }]} />
        <Character spec={SPEC.tanvir} x={tanX} y={830} scale={SC} walk={[[190.1, 191.7]]} emo={[{ t: 180.4, e: 'neutral' }, { t: 184.5, e: 'sad' }]} look={0.5} />
        <DiningTable plates={[{ x: 980 }, { x: 1250 }]} />
      </Show>
      <Show from={190.4} to={195.8}>
        <RoomBG bed />
        <Character spec={SPEC.tanvir} x={560} y={Y} scale={SC} emo={[{ t: 190, e: 'sad' }, { t: 194.4, e: 'neutral' }]} pose={[{ t: 190, r: [-10, 90] }, { t: 193.6, r: [-30, 50] }]} look={-0.8} />
        <Icon name="book" x={bookX} y={bookY} size={90} from={192.4} to={194.6} />
      </Show>
    </Scene>
  );
};

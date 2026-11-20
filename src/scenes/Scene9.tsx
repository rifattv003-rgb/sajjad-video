import React from 'react';
import { Scene } from '../components/Scene';
import { Character, SPEC } from '../components/Character';
import { RoomBG, MarketBG, CleanBG } from '../components/Backgrounds';
import { Icon, IconG } from '../components/Icons';
import { HI } from '../components/Props';
import { Item } from '../components/Overlays';
import { fontFamily, OUTLINE } from '../theme';
import { Show, useGT, clamp, easeOutBack } from '../time';

const Checklist: React.FC = () => {
  const gt = useGT();
  const rows = [{ t: 362.6, s: 'অর্ধেক টাকা আগে নেওয়া' }, { t: 364.2, s: 'লিখিত চুক্তি করা' }, { t: 365.8, s: 'একজন ক্রেতার ওপর সব ভরসা না রাখা' }];
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
      <rect x={300} y={150} width={1320} height={780} rx={44} fill="#FFFDF2" stroke={OUTLINE} strokeWidth={6} />
      <text x={960} y={270} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={72} fill="#E4572E">এবার সে শিখেছিল</text>
      {rows.map((r, i) => { const p = clamp((gt - r.t) / 0.5); const y = 410 + i * 160;
        return p > 0 ? (<g key={i} opacity={p} transform={`translate(${(1 - p) * -60},0)`}>
          <g transform={`translate(380,${y - 50}) scale(1)`}><IconG name="check" /></g>
          <text x={520} y={y + 22} fontFamily={fontFamily} fontWeight={600} fontSize={60} fill={OUTLINE}>{r.s}</text>
        </g>) : null; })}
    </svg>
  );
};
const items: Item[] = [
  { k: 'pill', from: 340.6, to: 343.2, x: 960, y: 60, text: '🎪 স্থানীয় মেলা', color: '#E8913A' },
  { k: 'note', from: 344.2, to: 350.4, x: 1230, y: 450, w: 1080, fs: 54, rot: -2, hand: true, text: '“এই ব্যাগটা একজন হেরে যাওয়া ছেলের হাতে সেলাই করা, যে আবার উঠে দাঁড়াচ্ছে।”', bg: '#FFF7CF' },
  { k: 'say', from: 357.14, to: 359.7, x: 1280, y: 140, tx: 1300, ty: 330, w: 900, fs: 42, text: 'লাভের অংশ থেকে দিস, আগে ব্যবসা দাঁড় করা।', bg: '#E3F6E8' },
  { k: 'node', from: 359.9, to: 368.6, node: <Checklist /> },
];
const Y = 930, SC = 1.25;
export const Scene9: React.FC = () => {
  const gt = useGT();
  return (
    <Scene id={9} items={items} cam={[{ t: 368.6, s: 1 }, { t: 370, s: 1.12, x: 960, y: 560 }, { t: 376.4, s: 1.12, x: 960, y: 560 }]}>
      <Show from={337.0} to={343.4}>
        <MarketBG fair />
        <rect x={640} y={690} width={640} height={30} fill="#9C6B3C" stroke="#222" strokeWidth={3} />
        <Character spec={SPEC.tanvir} x={960} y={Y - 40} scale={SC} emo={[{ t: 337, e: 'proud' }]} pose={[{ t: 337, l: [30, 90], r: [30, 90] }]} />
        <rect x={600} y={760} width={720} height={320} fill="#F8EBD0" stroke="#222" strokeWidth={3} />
        {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="bag" x={700 + i * 130} y={700} size={110} from={338.4 + i * 0.5} to={343.3} />)}
        <Icon name="thumb" x={1500} y={460} size={120} from={341.8} to={343.3} anim="float" />
      </Show>
      <Show from={343.4} to={352.9}>
        <CleanBG c1="#FFF9E5" c2="#F9D9A0" />
        <Character spec={SPEC.tanvir} x={420} y={Y} scale={1.3} emo={[{ t: 343.4, e: 'warm' }]} pose={[{ t: 343.4, r: [10, 110] }]} propR={HI('pen', 0.5, 0, -24)} />
        <Icon name="bag" x={1230} y={780} size={190} from={346.5} to={350.4} anim="float" />
        <Icon name="share" x={900} y={400} size={130} from={350.5} to={352.8} anim="pulse" />
        <Icon name="heart" x={1200} y={330} size={120} from={350.8} to={352.8} anim="float" />
        <Icon name="thumb" x={1500} y={420} size={130} from={351.2} to={352.8} anim="float" />
        <Icon name="share" x={1650} y={720} size={110} from={351.4} to={352.8} anim="pulse" />
      </Show>
      <Show from={352.8} to={359.9}>
        <RoomBG desk bed />
        <Character spec={SPEC.tanvir} x={850} y={Y} scale={SC} emo={[{ t: 352.8, e: 'proud' }]} pose={[{ t: 352.8, r: [-5, 130] }, { t: 354.2, r: [60, 50] }]} propR={gt > 352.8 && gt < 356.4 ? HI('money', 0.6, 0, -24) : null} />
        <Character spec={SPEC.rashed} x={1300} y={Y} scale={SC} flip offset={2} emo={[{ t: 352.8, e: 'warm' }, { t: 357.1, e: 'laugh' }]} speak={[[357.14, 359.6]]} pose={[{ t: 356.2, l: [-20, 90] }]} />
        <Icon name="money" x={1075} y={560} size={110} from={355.8} to={357.1} anim="float" />
      </Show>
      <Show from={359.8} to={368.8}><CleanBG c1="#EAF7EA" c2="#BFE3C0" /></Show>
      <Show from={368.6} to={376.6}>
        <RoomBG night desk bed lamp />
        <Character spec={SPEC.tanvir} x={760} y={Y} scale={SC} emo={[{ t: 368.6, e: 'warm' }]} look={0.6} pose={[{ t: 368.6, r: [-10, 100] }]} propR={HI('book', 0.5, 0, -24)} />
        <Character spec={SPEC.baba} x={1160} y={Y} scale={SC} flip offset={2} emo={[{ t: 368.6, e: 'warm' }]} pose={[{ t: 368.6, l: [-10, 100] }, { t: 372, l: [-25, 80] }]} propL={HI('pen', 0.5, 0, -24, 20)} />
        <Icon name="check" x={960} y={500} size={90} from={372} to={376.5} anim="pulse" />
        <Icon name="heart" x={960} y={400} size={80} from={374} to={376.5} anim="float" />
      </Show>
    </Scene>
  );
};

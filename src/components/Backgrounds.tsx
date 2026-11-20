import React from 'react';
import { fontFamily, OUTLINE, W, H } from '../theme';
import { IconG } from './Icons';

const L = { stroke: OUTLINE, strokeWidth: 3, strokeLinejoin: 'round' as const };

export const CleanBG: React.FC<{ c1?: string; c2?: string; dots?: string }> = ({ c1 = '#FFF4D6', c2 = '#F6D58E', dots = 'rgba(255,255,255,.35)' }) => (
  <g>
    <defs><radialGradient id="cleanG" cx="50%" cy="45%" r="75%"><stop offset="0%" stopColor={c1} /><stop offset="100%" stopColor={c2} /></radialGradient></defs>
    <rect width={W} height={H} fill="url(#cleanG)" />
    {[[140, 160, 70], [1760, 200, 90], [1620, 900, 60], [260, 880, 80], [980, 90, 40]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={dots} />)}
    {[[420, 120], [1500, 600], [100, 560]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 26 46 h -52 Z`} fill={dots} />)}
  </g>
);

export const RoomBG: React.FC<{ night?: boolean; bed?: boolean; desk?: boolean; sofa?: boolean; frame?: boolean; lamp?: boolean; bedX?: number }> = ({ night, bed, desk, sofa, frame, lamp, bedX = 70 }) => {
  const wall = night ? '#323F6B' : '#DCEAF3', wall2 = night ? '#27325A' : '#BDD3E3', floor = night ? '#5A4331' : '#CC9E6C', floor2 = night ? '#4a3626' : '#B98A5A';
  return (
    <g>
      <rect width={W} height={H} fill={wall} />
      <rect y={700} width={W} height={130} fill={wall2} />
      <rect y={820} width={W} height={260} fill={floor} />
      {[880, 950, 1020].map((y) => <path key={y} d={`M 0 ${y} H ${W}`} stroke={floor2} strokeWidth={3} />)}
      <rect y={812} width={W} height={12} fill={night ? '#3b2d21' : '#8d6a45'} />
      {/* window */}
      <g>
        <rect x={1400} y={130} width={360} height={380} fill={night ? '#0E1838' : '#A9DDFB'} {...L} strokeWidth={8} />
        {night ? (<g><circle cx={1640} cy={230} r={36} fill="#FFF1B8" /><circle cx={1630} cy={222} r={30} fill="#0E1838" opacity={0} />{[[1460, 200], [1520, 290], [1700, 380], [1480, 420]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4} fill="#fff" />)}</g>) : (<g><circle cx={1660} cy={220} r={42} fill="#FFE27A" /><ellipse cx={1500} cy={330} rx={70} ry={24} fill="#fff" /><ellipse cx={1540} cy={316} rx={46} ry={22} fill="#fff" /></g>)}
        <path d="M 1580 130 V 510 M 1400 320 H 1760" stroke={OUTLINE} strokeWidth={8} />
        <path d="M 1380 110 Q 1420 300 1380 520 H 1330 V 110 Z" fill={night ? '#9B5069' : '#E88CA5'} {...L} />
        <path d="M 1780 110 Q 1740 300 1780 520 H 1830 V 110 Z" fill={night ? '#9B5069' : '#E88CA5'} {...L} />
      </g>
      {bed && (
        <g>
          <rect x={bedX + 10} y={560} width={34} height={270} rx={8} fill="#8B5A2B" {...L} />
          <rect x={bedX + 20} y={790} width={540} height={42} rx={6} fill="#8B5A2B" {...L} />
          <rect x={bedX + 44} y={700} width={500} height={92} rx={14} fill="#fff" {...L} />
          <rect x={bedX + 120} y={728} width={424} height={66} rx={12} fill="#6FA0D8" {...L} />
          <path d={`M ${bedX + 160} 728 V 794 M ${bedX + 240} 728 V 794 M ${bedX + 320} 728 V 794`} stroke="rgba(255,255,255,.35)" strokeWidth={4} />
          <ellipse cx={bedX + 100} cy={696} rx={64} ry={30} fill="#fff" {...L} />
        </g>
      )}
      {desk && (
        <g>
          <rect x={880} y={730} width={520} height={26} rx={6} fill="#A06E3D" {...L} />
          <rect x={900} y={756} width={26} height={110} fill="#8B5A2B" {...L} /><rect x={1354} y={756} width={26} height={110} fill="#8B5A2B" {...L} />
          <rect x={1100} y={756} width={230} height={90} rx={6} fill="#B07C48" {...L} /><circle cx={1215} cy={800} r={8} fill="#E3B65F" {...L} />
          <rect x={1250} y={704} width={78} height={26} rx={3} fill="#E4572E" {...L} /><rect x={1256} y={680} width={68} height={24} rx={3} fill="#3A86FF" {...L} />
          {lamp && (<g><rect x={940} y={716} width={50} height={14} rx={4} fill="#444" {...L} /><path d="M 965 716 L 985 660 L 1030 640" fill="none" stroke="#555" strokeWidth={8} strokeLinecap="round" /><path d="M 1010 630 L 1060 650 L 1040 676 Z" fill="#FFD23F" {...L} /></g>)}
        </g>
      )}
      {sofa && (
        <g>
          <rect x={120} y={600} width={600} height={170} rx={30} fill="#BF6A5A" {...L} />
          <rect x={100} y={700} width={640} height={120} rx={26} fill="#D17C6B" {...L} />
          <rect x={90} y={650} width={60} height={170} rx={24} fill="#BF6A5A" {...L} /><rect x={690} y={650} width={60} height={170} rx={24} fill="#BF6A5A" {...L} />
          <path d="M 420 705 V 810" stroke="rgba(0,0,0,.25)" strokeWidth={3} />
        </g>
      )}
      {frame && (
        <g>
          <rect x={800} y={150} width={300} height={220} fill="#8B5A2B" {...L} strokeWidth={5} />
          <rect x={816} y={166} width={268} height={188} fill="#BFE6FF" />
          <path d="M 816 330 L 900 250 L 960 310 L 1020 240 L 1084 330 V 354 H 816 Z" fill="#5FAE6B" /><circle cx={1030} cy={206} r={22} fill="#FFE27A" />
        </g>
      )}
      {night && lamp && <ellipse cx={1030} cy={680} rx={420} ry={300} fill="#FFC857" opacity={0.2} />}
    </g>
  );
};

export const DiningBG: React.FC = () => (
  <g>
    <rect width={W} height={H} fill="#E3C79C" />
    <rect y={760} width={W} height={320} fill="#A5764B" />
    {[820, 890, 960, 1030].map((y) => <path key={y} d={`M 0 ${y} H ${W}`} stroke="#8d6139" strokeWidth={3} />)}
    <rect x={150} y={110} width={380} height={380} fill="#101B3C" {...L} strokeWidth={8} />
    <circle cx={400} cy={220} r={38} fill="#FFF1B8" />{[[200, 170], [260, 300], [470, 420], [220, 430]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4} fill="#fff" />)}
    <path d="M 340 110 V 490 M 150 300 H 530" stroke={OUTLINE} strokeWidth={8} />
    <path d="M 130 90 Q 170 300 130 510 H 80 V 90 Z" fill="#B8625A" {...L} /><path d="M 550 90 Q 510 300 550 510 H 600 V 90 Z" fill="#B8625A" {...L} />
    <g>
      <rect x={1480} y={140} width={300} height={230} fill="#8B5A2B" {...L} strokeWidth={5} /><rect x={1496} y={156} width={268} height={198} fill="#FDE6B2" />
      <circle cx={1640} cy={230} r={36} fill="#F29E4C" /><path d="M 1496 330 Q 1580 260 1640 320 T 1764 300 V 354 H 1496 Z" fill="#6AA84F" />
    </g>
    <ellipse cx={960} cy={420} rx={520} ry={330} fill="#FFD27A" opacity={0.12} />
    <path d="M 960 0 V 120" stroke={OUTLINE} strokeWidth={4} />
    <path d="M 900 190 L 925 120 H 995 L 1020 190 Z" fill="#F4B942" {...L} /><ellipse cx={960} cy={192} rx={64} ry={10} fill="#FFF1B8" {...L} />
  </g>
);

export const DiningTable: React.FC<{ plates: { x: number; fish?: boolean; empty?: boolean }[]; extraNode?: React.ReactNode }> = ({ plates, extraNode }) => (
  <g>
    <rect x={90} y={720} width={1740} height={360} fill="#F5EBD3" {...L} />
    <path d="M 90 790 H 1830" stroke="#E4572E" strokeWidth={8} /><path d="M 90 812 H 1830" stroke="#E4572E" strokeWidth={3} />
    <rect x={60} y={650} width={1800} height={74} rx={10} fill="#B9803E" {...L} />
    {plates.map((p, i) => (
      <g key={i} transform={`translate(${p.x},688)`}>
        <ellipse cx={0} cy={6} rx={112} ry={22} fill="#fff" {...L} strokeWidth={2.5} />
        {!p.empty && <path d="M -56 2 C -50 -26 30 -26 36 2 Z" fill="#FFFDF5" stroke={OUTLINE} strokeWidth={2} />}
        {!p.empty && <ellipse cx={72} cy={4} rx={26} ry={9} fill="#E0B44C" stroke={OUTLINE} strokeWidth={2} />}
      </g>
    ))}
    {extraNode}
  </g>
);

export const StreetBG: React.FC = () => (
  <g>
    <defs><linearGradient id="skyS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8FD3F4" /><stop offset="1" stopColor="#E4F6FF" /></linearGradient></defs>
    <rect width={W} height={H} fill="url(#skyS)" />
    <circle cx={1500} cy={150} r={70} fill="#FFE27A" />
    <ellipse cx={360} cy={170} rx={110} ry={34} fill="#fff" /><ellipse cx={440} cy={150} rx={70} ry={30} fill="#fff" />
    <path d="M 0 620 Q 300 520 640 620 T 1300 600 T 1920 620 V 800 H 0 Z" fill="#9CCB78" />
    <rect y={780} width={W} height={300} fill="#8CC15F" />
    <path d="M 760 1080 L 880 780 H 1040 L 1160 1080 Z" fill="#D9C7A3" />
    <g>
      <rect x={80} y={330} width={640} height={470} fill="#7FB2E5" {...L} />
      <path d="M 50 340 L 400 170 L 750 340 Z" fill="#B5533C" {...L} />
      <rect x={330} y={540} width={140} height={260} rx={6} fill="#8B5A2B" {...L} /><circle cx={448} cy={680} r={7} fill="#FFD23F" />
      <rect x={140} y={430} width={130} height={120} fill="#FFF5CC" {...L} /><rect x={530} y={430} width={130} height={120} fill="#FFF5CC" {...L} />
    </g>
    <g>
      <rect x={1200} y={330} width={640} height={470} fill="#F2A7C3" {...L} />
      <path d="M 1170 340 L 1520 170 L 1870 340 Z" fill="#6C5B7B" {...L} />
      <rect x={1450} y={540} width={140} height={260} rx={6} fill="#8B5A2B" {...L} /><circle cx={1470} cy={680} r={7} fill="#FFD23F" />
      <rect x={1260} y={430} width={130} height={120} fill="#FFF5CC" {...L} /><rect x={1650} y={430} width={130} height={120} fill="#FFF5CC" {...L} />
    </g>
    <g>
      <rect x={936} y={560} width={48} height={240} fill="#8B5A2B" {...L} /><circle cx={960} cy={510} r={110} fill="#4FA05A" {...L} /><circle cx={880} cy={570} r={70} fill="#5DB168" {...L} /><circle cx={1040} cy={570} r={70} fill="#5DB168" {...L} />
    </g>
  </g>
);

const Bunting: React.FC = () => (
  <g>
    <path d="M 0 60 Q 480 150 960 60 T 1920 60" fill="none" stroke={OUTLINE} strokeWidth={3} />
    {Array.from({ length: 18 }).map((_, i) => { const x = 50 + i * 105; const y = 60 + Math.sin((x / 960) * Math.PI) * 40 + (x > 960 ? -0 : 0); return <path key={i} d={`M ${x - 24} ${y + 10} L ${x + 24} ${y + 10} L ${x} ${y + 70} Z`} fill={['#E4572E', '#FFD23F', '#3DAA5C', '#3A86FF', '#FF8FAB'][i % 5]} {...L} strokeWidth={2} />; })}
  </g>
);
export const MarketBG: React.FC<{ fair?: boolean }> = ({ fair }) => (
  <g>
    <rect width={W} height={H} fill={fair ? '#BFE6FA' : '#F5D9A8'} />
    <rect y={820} width={W} height={260} fill="#CBA878" />{[880, 960, 1040].map((y) => <path key={y} d={`M 0 ${y} H ${W}`} stroke="#b8935f" strokeWidth={3} />)}
    {fair && <Bunting />}
    {[[80, '#E4572E'], [1180, '#3A86FF']].map(([x, c], i) => (
      <g key={i} transform={`translate(${x},0)`}>
        <rect x={20} y={430} width={600} height={390} fill="#F8EBD0" {...L} />
        <path d="M 0 430 H 640 L 620 330 H 20 Z" fill={c as string} {...L} />
        {[0, 1, 2, 3, 4, 5].map((k) => <path key={k} d={`M ${20 + k * 100} 330 L ${40 + k * 107} 430 L ${100 + k * 107} 430 L ${120 + k * 100} 330 Z`} fill={k % 2 ? '#fff' : (c as string)} stroke={OUTLINE} strokeWidth={2} />)}
        <rect x={20} y={640} width={600} height={30} fill="#9C6B3C" {...L} />
      </g>
    ))}
  </g>
);

export const ShopBG: React.FC = () => (
  <g>
    <defs><linearGradient id="skyShop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A9DDFB" /><stop offset="1" stopColor="#E8F7FF" /></linearGradient></defs>
    <rect width={W} height={H} fill="url(#skyShop)" />
    <rect x={-20} y={300} width={560} height={560} fill="#E7B59A" {...L} /><rect x={1400} y={260} width={560} height={600} fill="#B7C9A8" {...L} />
    {[100, 280].map((x) => <rect key={x} x={x} y={400} width={110} height={120} fill="#FFF5CC" {...L} />)}{[1500, 1700].map((x) => <rect key={x} x={x} y={380} width={110} height={120} fill="#FFF5CC" {...L} />)}
    <rect x={560} y={230} width={800} height={630} fill="#FFF3D6" {...L} strokeWidth={4} />
    <rect x={640} y={110} width={640} height={130} rx={14} fill="#1F5F3A" {...L} strokeWidth={5} />
    <text x={960} y={196} textAnchor="middle" fontFamily={fontFamily} fontWeight={700} fontSize={80} fill="#FFE9A8">তানভীর ক্রাফটস</text>
    <path d="M 540 360 H 1380 L 1350 270 H 570 Z" fill="#E4572E" {...L} />
    {Array.from({ length: 8 }).map((_, i) => <path key={i} d={`M ${560 + i * 105} 360 q 52 40 105 0 L ${560 + i * 105 + 52} 270 H ${560 + i * 105 - 0} Z`} fill={i % 2 ? '#fff' : '#E4572E'} stroke={OUTLINE} strokeWidth={2} />)}
    <rect x={620} y={440} width={300} height={300} fill="#CFEFFF" {...L} /><rect x={1000} y={440} width={300} height={300} fill="#CFEFFF" {...L} />
    <rect x={850} y={500} width={220} height={360} fill="#8B5A2B" {...L} />
    {[[700, 520], [790, 520], [1060, 520], [1150, 520], [1240, 520]].map(([x, y], i) => <g key={i} transform={`translate(${x - 36},${y - 36}) scale(.72)`}><IconG name="bag" /></g>)}
    <rect y={840} width={W} height={240} fill="#8E9AA3" />
    <rect y={840} width={W} height={50} fill="#C9CFD4" {...L} />
  </g>
);

export const Ribbon: React.FC<{ cut: number }> = ({ cut }) => (
  <g>
    <path d={`M 760 800 L ${1000 - cut * 140} ${790 + cut * 30}`} stroke="#E4572E" strokeWidth={14} strokeLinecap="round" />
    <path d={`M 1160 800 L ${1000 + cut * 140} ${790 + cut * 30}`} stroke="#E4572E" strokeWidth={14} strokeLinecap="round" />
    <circle cx={760} cy={800} r={12} fill="#E4572E" {...L} /><circle cx={1160} cy={800} r={12} fill="#E4572E" {...L} />
  </g>
);

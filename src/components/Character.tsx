import React, { useId } from 'react';
import { useCurrentFrame } from 'remotion';
import { useGT, clamp, easeInOut, lerp, inAny } from '../time';
import { FPS, OUTLINE, SW } from '../theme';

export type Emotion = 'neutral' | 'happy' | 'warm' | 'proud' | 'sad' | 'cry' | 'angry' | 'surprised' | 'worried' | 'thinking' | 'shy' | 'tired' | 'laugh';
type HairStyle = 'messy' | 'short' | 'neat' | 'none';
export interface Spec {
  skin: string; hair?: HairStyle; hairColor?: string; top: string; topKind: 'shirt' | 'panjabi' | 'saree'; sleeve?: 'full' | 'short';
  bottom?: 'pants' | 'lungi' | 'saree'; bottomColor?: string; shoe?: string; glasses?: string; mustache?: string; tie?: string;
  bindi?: boolean; headCover?: string; bangles?: boolean; wf?: number; h?: number; pen?: boolean; watch?: boolean; idCard?: boolean; trim?: string; belly?: boolean;
}
const SK = '#EDBE94', SK2 = '#D9A072', SK3 = '#C68B5E';
export const SPEC: Record<string, Spec> = {
  tanvir: { skin: SK, hair: 'messy', hairColor: '#1b1b1b', top: '#A9D1F0', topKind: 'shirt', sleeve: 'full', bottom: 'pants', bottomColor: '#8A8F98', wf: 0.85, h: 1 },
  tanvirAdult: { skin: SK, hair: 'messy', hairColor: '#1b1b1b', top: '#1F5F3A', topKind: 'shirt', sleeve: 'full', bottom: 'pants', bottomColor: '#8A8F98', wf: 0.88, h: 1.02, idCard: true },
  rashed: { skin: SK2, hair: 'short', hairColor: '#1b1b1b', top: '#FFFFFF', topKind: 'shirt', sleeve: 'full', bottom: 'pants', bottomColor: '#1f1f1f', glasses: '#1b1b1b', wf: 1, h: 1.08, watch: true },
  baba: { skin: SK3, hair: 'short', hairColor: '#C9C9C9', top: '#FFFFFF', topKind: 'panjabi', sleeve: 'full', bottom: 'lungi', bottomColor: '#6A7F9A', glasses: '#D4A72C', mustache: '#6b6b6b', wf: 1.05, h: 0.98 },
  ma: { skin: SK2, hair: 'none', top: '#F4A6BC', topKind: 'saree', sleeve: 'short', bottom: 'saree', bottomColor: '#F4A6BC', headCover: '#F4A6BC', bindi: true, wf: 0.95, h: 0.93, trim: '#C2477A' },
  sakib: { skin: SK, hair: 'neat', hairColor: '#1b1b1b', top: '#CFE6F7', topKind: 'shirt', sleeve: 'full', bottom: 'pants', bottomColor: '#2b2b33', shoe: '#0e0e0e', tie: '#B3261E', wf: 0.95, h: 1.03 },
  sakibMa: { skin: SK, hair: 'none', top: '#6D3FA0', topKind: 'saree', sleeve: 'short', bottom: 'saree', bottomColor: '#6D3FA0', headCover: '#6D3FA0', bangles: true, wf: 0.97, h: 0.93, trim: '#E9C46A' },
  jamal: { skin: SK3, hair: 'short', hairColor: '#1b1b1b', top: '#F3E6C4', topKind: 'panjabi', sleeve: 'full', bottom: 'pants', bottomColor: '#4a4a4a', mustache: '#1b1b1b', pen: true, wf: 1.38, h: 0.97, belly: true },
};
export const extra = (kind: 'man' | 'woman' | 'girl' | 'boy', top: string, bottomColor = '#555', skin = SK2, hairColor = '#1b1b1b'): Spec => {
  if (kind === 'woman') return { skin, hair: 'none', top, topKind: 'saree', sleeve: 'short', bottom: 'saree', bottomColor: top, headCover: top, wf: 0.95, h: 0.93, trim: '#fff' };
  if (kind === 'girl') return { skin, hair: 'short', hairColor, top, topKind: 'saree', sleeve: 'short', bottom: 'saree', bottomColor: top, headCover: top, wf: 0.88, h: 0.9, trim: '#ffe9a8' };
  if (kind === 'boy') return { skin, hair: 'short', hairColor, top, topKind: 'shirt', sleeve: 'short', bottom: 'pants', bottomColor, wf: 0.85, h: 0.85 };
  return { skin, hair: 'short', hairColor, top, topKind: 'shirt', sleeve: 'full', bottom: 'pants', bottomColor, wf: 1, h: 1 };
};

type EmoDef = { bi: number; bo: number; bl: number; eye: 'open' | 'big' | 'arc' | 'half' | 'up'; mouth: string; tears?: boolean; blush?: boolean };
const EMO: Record<Emotion, EmoDef> = {
  neutral: { bi: 0, bo: 0, bl: 0, eye: 'open', mouth: 'flat' },
  happy: { bi: 0, bo: 0, bl: -3, eye: 'open', mouth: 'smile', blush: true },
  warm: { bi: -3, bo: 1, bl: -1, eye: 'open', mouth: 'smile', blush: true },
  proud: { bi: 0, bo: 0, bl: -5, eye: 'open', mouth: 'grin', blush: true },
  sad: { bi: -9, bo: 3, bl: 2, eye: 'open', mouth: 'frown' },
  cry: { bi: -11, bo: 4, bl: 2, eye: 'half', mouth: 'cry', tears: true },
  angry: { bi: 11, bo: -5, bl: 2, eye: 'open', mouth: 'angry' },
  surprised: { bi: 0, bo: 0, bl: -14, eye: 'big', mouth: 'o' },
  worried: { bi: -7, bo: 1, bl: -2, eye: 'open', mouth: 'wavy' },
  thinking: { bi: 0, bo: -2, bl: -3, eye: 'up', mouth: 'side' },
  shy: { bi: -5, bo: 1, bl: -1, eye: 'open', mouth: 'small', blush: true },
  tired: { bi: -4, bo: 2, bl: 3, eye: 'half', mouth: 'flat' },
  laugh: { bi: 0, bo: 0, bl: -6, eye: 'arc', mouth: 'grin', blush: true },
};
export interface PoseKF { t: number; l?: [number, number]; r?: [number, number] }
export interface EmoKF { t: number; e: Emotion }
export interface CharProps {
  spec: Spec; x: number; y: number; scale?: number; flip?: boolean;
  emo?: EmoKF[] | Emotion; speak?: [number, number][]; pose?: PoseKF[];
  propL?: React.ReactNode; propR?: React.ReactNode;
  tremble?: [number, number][]; walk?: [number, number][]; look?: number; lookY?: number; nod?: [number, number][];
  opacity?: number; offset?: number; still?: boolean; lean?: number; tearsOn?: [number, number][];
}
const dark = (c: string) => c;

const Arm: React.FC<{ side: 1 | -1; a: number; b: number; sx: number; spec: Spec; prop?: React.ReactNode }> = ({ side, a, b, sx, spec, prop }) => {
  const full = spec.sleeve !== 'short';
  const col = spec.top;
  const sk = spec.skin;
  return (
    <g transform={`translate(${sx},-293) rotate(${side * a})`}>
      <rect x={-15} y={-15} width={30} height={78} rx={15} fill={col} stroke={OUTLINE} strokeWidth={SW} />
      {!full && <rect x={-14} y={30} width={28} height={33} rx={14} fill={sk} />}
      <g transform={`translate(0,60) rotate(${-side * b})`}>
        <rect x={-14} y={-14} width={28} height={78} rx={14} fill={full ? col : sk} stroke={OUTLINE} strokeWidth={SW} />
        {spec.bangles && [34, 42, 50].map((y) => <rect key={y} x={-15} y={y} width={30} height={4} rx={2} fill="#9fd8ee" stroke={OUTLINE} strokeWidth={1.2} />)}
        {spec.watch && side === 1 && <rect x={-15} y={44} width={30} height={10} rx={3} fill="#444" stroke={OUTLINE} strokeWidth={1.5} />}
        <circle cx={0} cy={70} r={17} fill={sk} stroke={OUTLINE} strokeWidth={SW} />
        <g transform="translate(0,72)">{prop}</g>
      </g>
    </g>
  );
};

const poseAt = (kfs: PoseKF[] | undefined, gt: number) => {
  const base = { l: [4, 6] as [number, number], r: [4, 6] as [number, number] };
  if (!kfs || !kfs.length) return base;
  let idx = -1; kfs.forEach((k, i) => { if (k.t <= gt) idx = i; });
  const pick = (i: number) => {
    let l = base.l, r = base.r;
    for (let j = 0; j <= i; j++) { if (kfs[j].l) l = kfs[j].l!; if (kfs[j].r) r = kfs[j].r!; }
    return { l, r };
  };
  if (idx < 0) return base;
  const cur = pick(idx), prev = idx > 0 ? pick(idx - 1) : base;
  const t = easeInOut(clamp((gt - kfs[idx].t) / 0.22));
  return { l: [lerp(prev.l[0], cur.l[0], t), lerp(prev.l[1], cur.l[1], t)] as [number, number], r: [lerp(prev.r[0], cur.r[0], t), lerp(prev.r[1], cur.r[1], t)] as [number, number] };
};

export const Character: React.FC<CharProps> = (p) => {
  const gt = useGT();
  const frame = useCurrentFrame();
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const s = p.spec;
  const wf = s.wf ?? 1;
  const tw = 58 * wf;
  const sc = (p.scale ?? 1.3) * (s.h ?? 1);
  // emotion
  let emoName: Emotion = 'neutral';
  if (typeof p.emo === 'string') emoName = p.emo; else if (p.emo) p.emo.forEach((k) => { if (k.t <= gt) emoName = k.e; });
  const em = EMO[emoName];
  // speaking mouth
  const speaking = p.speak ? inAny(gt, p.speak) : false;
  const mseq = [1, 2, 1, 0, 2, 1, 2, 1, 0, 2];
  const mshape = speaking ? mseq[Math.floor((frame + (p.offset ?? 0)) / 4) % mseq.length] : 0;
  // blink
  const blink = ((frame + (p.offset ?? 0) * 7) % 110) < 4 && em.eye !== 'arc';
  // motion
  const t0 = (p.offset ?? 0);
  const idle = p.still ? 0 : Math.sin((gt + t0) * 2.1) * 4;
  const trem = p.tremble && inAny(gt, p.tremble);
  const tx = trem ? Math.sin(frame * 2.9) * 3.2 : 0;
  const tr = trem ? Math.sin(frame * 3.7) * 1.2 : 0;
  const walking = p.walk && inAny(gt, p.walk);
  const wl = walking ? Math.sin(gt * 9) * 24 : 0;
  const nod = p.nod && inAny(gt, p.nod) ? Math.sin(gt * 8) * 5 : 0;
  const pose = poseAt(p.pose, gt);
  const aL = walking ? 4 + wl * 0.8 : pose.l[0], aR = walking ? 4 - wl * 0.8 : pose.r[0];
  const tearsOn = em.tears || (p.tearsOn && inAny(gt, p.tearsOn));
  const eyeOff = (p.look ?? 0) * 4;
  const eyeOffY = em.eye === 'up' ? -5 : (p.lookY ?? 0) * 4;
  const hc = s.hairColor ?? '#1b1b1b';
  const browC = s.hair === 'short' && hc === '#C9C9C9' ? '#8a8a8a' : hc === '#C9C9C9' ? '#8a8a8a' : (s.hair === 'none' ? '#2a2a2a' : hc);
  const yb = -428 + em.bl;
  const eyeY = -392;
  const mouthEl = (() => {
    if (mshape === 1) return <ellipse cx={0} cy={-350} rx={11} ry={7} fill="#8B2E2E" stroke={OUTLINE} strokeWidth={3} />;
    if (mshape === 2) return (<g><ellipse cx={0} cy={-348} rx={15} ry={14} fill="#8B2E2E" stroke={OUTLINE} strokeWidth={3} /><ellipse cx={0} cy={-341} rx={8} ry={5} fill="#E0707A" /></g>);
    const st = { fill: 'none', stroke: OUTLINE, strokeWidth: 4, strokeLinecap: 'round' as const };
    switch (em.mouth) {
      case 'smile': return <path d="M -17 -354 Q 0 -336 17 -354" {...st} />;
      case 'grin': return <path d="M -22 -356 Q 0 -326 22 -356 Z" fill="#8B2E2E" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />;
      case 'frown': return <path d="M -14 -344 Q 0 -358 14 -344" {...st} />;
      case 'cry': return <path d="M -15 -342 Q 0 -362 15 -342 Z" fill="#8B2E2E" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />;
      case 'angry': return <path d="M -15 -347 L -5 -351 L 5 -347 L 15 -351" {...st} />;
      case 'o': return <ellipse cx={0} cy={-348} rx={8} ry={11} fill="#8B2E2E" stroke={OUTLINE} strokeWidth={3} />;
      case 'wavy': return <path d="M -16 -349 Q -8 -356 0 -349 T 16 -349" {...st} />;
      case 'side': return <path d="M -10 -349 L 12 -354" {...st} />;
      case 'small': return <path d="M -9 -351 Q 0 -344 9 -351" {...st} />;
      default: return <path d="M -12 -350 L 12 -350" {...st} />;
    }
  })();
  const eye = (cx: number) => {
    if (em.eye === 'arc' || (blink && em.eye !== 'half')) return <path d={`M ${cx - 13} ${eyeY} Q ${cx} ${eyeY - (em.eye === 'arc' ? 14 : -2)} ${cx + 13} ${eyeY}`} fill="none" stroke={OUTLINE} strokeWidth={3.5} strokeLinecap="round" />;
    const big = em.eye === 'big';
    return (
      <g>
        <ellipse cx={cx} cy={eyeY} rx={big ? 15 : 13} ry={big ? 19 : 15} fill="#fff" stroke={OUTLINE} strokeWidth={SW} />
        <circle cx={cx + eyeOff} cy={eyeY + eyeOffY + 1} r={big ? 5.5 : 7} fill="#222" />
        <circle cx={cx + eyeOff + 2} cy={eyeY + eyeOffY - 2} r={2} fill="#fff" />
        {em.eye === 'half' && <path d={`M ${cx - 14} ${eyeY - 16} H ${cx + 14} V ${eyeY - 3} Q ${cx} ${eyeY - 8} ${cx - 14} ${eyeY - 3} Z`} fill={s.skin} stroke={OUTLINE} strokeWidth={2} />}
      </g>
    );
  };
  const browL = `M -45 ${yb + em.bo} L -9 ${yb + em.bi}`, browR = `M 9 ${yb + em.bi} L 45 ${yb + em.bo}`;
  const hairPath: Record<string, string> = {
    short: 'M -69 -398 C -76 -478 76 -478 69 -398 C 62 -428 42 -444 0 -444 C -42 -444 -62 -428 -69 -398 Z',
    neat: 'M -69 -398 C -76 -480 76 -480 69 -398 C 64 -430 30 -446 -6 -442 C -34 -440 -58 -428 -69 -398 Z M -6 -442 C 10 -458 40 -452 52 -440',
    messy: 'M -70 -392 L -74 -452 L -52 -442 L -50 -482 L -28 -456 L -12 -490 L 6 -460 L 26 -488 L 38 -456 L 60 -476 L 58 -442 L 76 -444 L 70 -392 C 64 -424 40 -438 0 -438 C -40 -438 -64 -424 -70 -392 Z',
  };
  const isSaree = s.topKind === 'saree';
  const longTop = s.topKind === 'panjabi';
  const torsoBottom = longTop ? -96 : -140;
  const torsoW = tw;
  return (
    <g opacity={p.opacity ?? 1} transform={`translate(${p.x + tx},${p.y + idle}) rotate(${tr + (p.lean ?? 0)}) scale(${p.flip ? -sc : sc},${sc})`}>
      <defs>
        <pattern id={`chk${id}`} width="22" height="22" patternUnits="userSpaceOnUse">
          <rect width="22" height="22" fill={s.bottomColor ?? '#6A7F9A'} />
          <rect width="11" height="11" fill="rgba(255,255,255,.28)" /><rect x="11" y="11" width="11" height="11" fill="rgba(255,255,255,.28)" />
        </pattern>
      </defs>
      <ellipse cx={0} cy={4} rx={80 * wf} ry={12} fill="rgba(0,0,0,.18)" />
      {/* legs / bottoms */}
      {s.bottom === 'pants' && [-1, 1].map((sd) => (
        <g key={sd} transform={`translate(${sd * 24 * wf},-150) rotate(${sd * wl})`}>
          <rect x={-17} y={-6} width={34} height={146} rx={12} fill={s.bottomColor} stroke={OUTLINE} strokeWidth={SW} />
          <ellipse cx={sd * 4} cy={139} rx={26} ry={12} fill={s.shoe ?? '#3a2f2a'} stroke={OUTLINE} strokeWidth={SW} />
        </g>
      ))}
      {(s.bottom === 'lungi' || s.bottom === 'saree') && [-1, 1].map((sd) => (
        <g key={sd} transform={`translate(${sd * 24 * wf},-150) rotate(${sd * wl * 0.6})`}>
          <rect x={-14} y={60} width={28} height={80} rx={10} fill={s.skin} stroke={OUTLINE} strokeWidth={SW} />
          <ellipse cx={sd * 4} cy={139} rx={25} ry={11} fill="#7a5a3a" stroke={OUTLINE} strokeWidth={SW} />
        </g>
      ))}
      {s.bottom === 'lungi' && <path d={`M ${-tw + 6} -160 L ${tw - 6} -160 L ${tw + 12} -24 L ${-tw - 12} -24 Z`} fill={`url(#chk${id})`} stroke={OUTLINE} strokeWidth={SW} strokeLinejoin="round" />}
      {s.bottom === 'saree' && (
        <g>
          <path d={`M ${-tw + 4} -170 L ${tw - 4} -170 L ${tw + 20} -20 Q 0 -4 ${-tw - 20} -20 Z`} fill={s.bottomColor} stroke={OUTLINE} strokeWidth={SW} strokeLinejoin="round" />
          {[-30, -8, 14, 36].map((x) => <path key={x} d={`M ${x} -165 Q ${x + 6} -90 ${x + 12} -22`} stroke="rgba(0,0,0,.18)" strokeWidth={3} fill="none" />)}
          <path d={`M ${-tw - 20} -26 Q 0 -10 ${tw + 20} -26`} stroke={s.trim ?? '#fff'} strokeWidth={8} fill="none" />
        </g>
      )}
      {/* torso */}
      <rect x={-torsoW} y={-322} width={torsoW * 2} height={torsoBottom + 322} rx={s.belly ? 54 : 34} fill={s.top} stroke={OUTLINE} strokeWidth={SW} />
      {isSaree && (<g>
        <path d={`M ${-torsoW + 4} -312 L ${torsoW - 4} -190 L ${torsoW - 4} -150 L ${torsoW - 30} -150 L ${-torsoW + 4} -250 Z`} fill={s.trim ?? '#fff'} opacity={0.55} />
        <path d={`M ${-torsoW + 6} -316 L ${torsoW - 6} -184`} stroke={s.trim ?? '#fff'} strokeWidth={9} fill="none" strokeLinecap="round" />
      </g>)}
      {s.topKind === 'shirt' && (<g>
        <path d="M -24 -326 L 0 -298 L -38 -296 Z" fill="#fff" stroke={OUTLINE} strokeWidth={2} strokeLinejoin="round" />
        <path d="M 24 -326 L 0 -298 L 38 -296 Z" fill="#fff" stroke={OUTLINE} strokeWidth={2} strokeLinejoin="round" />
        <path d="M 0 -298 V -146" stroke="rgba(0,0,0,.35)" strokeWidth={2} />
        {[-270, -230, -190].map((y) => <circle key={y} cx={5} cy={y} r={3} fill="rgba(0,0,0,.45)" />)}
      </g>)}
      {s.tie && <path d="M -7 -300 L 7 -300 L 11 -216 L 0 -202 L -11 -216 Z" fill={s.tie} stroke={OUTLINE} strokeWidth={2} strokeLinejoin="round" />}
      {longTop && (<g>
        <rect x={-6} y={-322} width={12} height={226} fill="rgba(0,0,0,.1)" stroke={OUTLINE} strokeWidth={1.5} />
        {[-290, -250, -210].map((y) => <circle key={y} cx={0} cy={y} r={3.5} fill="#8a6d2a" />)}
        <path d={`M ${-tw + 2} -96 L ${-tw + 2} -78 M ${tw - 2} -96 L ${tw - 2} -78`} stroke={OUTLINE} strokeWidth={2} />
      </g>)}
      {s.pen && <g><rect x={-torsoW + 20} y={-262} width={26} height={30} rx={3} fill="rgba(0,0,0,.08)" stroke={OUTLINE} strokeWidth={1.5} /><rect x={-torsoW + 30} y={-272} width={4} height={22} fill="#1a4fd8" /></g>}
      {s.idCard && (<g>
        <path d="M -16 -318 L 0 -226 L 16 -318" stroke="#E4572E" strokeWidth={4} fill="none" />
        <rect x={-18} y={-228} width={36} height={46} rx={5} fill="#fff" stroke={OUTLINE} strokeWidth={2} />
        <rect x={-10} y={-220} width={20} height={14} rx={2} fill="#F4C6A0" /><rect x={-11} y={-198} width={22} height={4} fill="#3A86FF" /><rect x={-11} y={-190} width={14} height={3} fill="#999" />
      </g>)}
      {/* neck + head */}
      <rect x={-16} y={-340} width={32} height={34} fill={s.skin} stroke={OUTLINE} strokeWidth={SW} />
      <g transform={`translate(0,${nod}) rotate(${nod * 0.4},0,-330)`}>
        {s.headCover && <path d="M -78 -372 C -86 -492 86 -492 78 -372 L 70 -316 L -70 -316 Z" fill={s.headCover} stroke={OUTLINE} strokeWidth={SW} />}
        <ellipse cx={-66} cy={-392} rx={10} ry={15} fill={s.skin} stroke={OUTLINE} strokeWidth={SW} />
        <ellipse cx={66} cy={-392} rx={10} ry={15} fill={s.skin} stroke={OUTLINE} strokeWidth={SW} />
        <ellipse cx={0} cy={-395} rx={66} ry={72} fill={s.skin} stroke={OUTLINE} strokeWidth={SW} />
        {s.hair && s.hair !== 'none' && <path d={hairPath[s.hair]} fill={hc} stroke={OUTLINE} strokeWidth={SW} strokeLinejoin="round" />}
        {s.headCover && <path d="M -64 -420 C -52 -456 52 -456 64 -420 C 42 -436 -42 -436 -64 -420 Z" fill={s.headCover} stroke={OUTLINE} strokeWidth={SW} />}
        {s.bindi && <circle cx={0} cy={-432} r={5} fill="#D61F3A" />}
        {em.blush && [-1, 1].map((sd) => <ellipse key={sd} cx={sd * 42} cy={-362} rx={13} ry={8} fill="#F08A8A" opacity={0.4} />)}
        {eye(-26)}{eye(26)}
        <path d={browL} stroke={browC} strokeWidth={7} strokeLinecap="round" />
        <path d={browR} stroke={browC} strokeWidth={7} strokeLinecap="round" />
        {s.glasses && <g fill="rgba(180,220,255,.18)" stroke={s.glasses} strokeWidth={3.5}><circle cx={-26} cy={-392} r={23} /><circle cx={26} cy={-392} r={23} /><path d="M -3 -394 H 3" fill="none" /></g>}
        <path d="M -3 -378 Q 0 -368 6 -371" fill="none" stroke={OUTLINE} strokeWidth={2.2} strokeLinecap="round" />
        {mouthEl}
        {s.mustache && <path d="M -27 -362 C -16 -378 -4 -370 0 -370 C 4 -370 16 -378 27 -362 C 16 -358 4 -363 0 -363 C -4 -363 -16 -358 -27 -362 Z" fill={s.mustache} stroke={OUTLINE} strokeWidth={2} />}
        {tearsOn && [-1, 1].map((sd) => { const ph = ((frame + (sd > 0 ? 8 : 0)) % 28) / 28; return <ellipse key={sd} cx={sd * 28} cy={-372 + ph * 46} rx={5} ry={8} fill="#6EC6FF" stroke={OUTLINE} strokeWidth={1.5} opacity={1 - ph * 0.6} />; })}
      </g>
      {/* arms */}
      <Arm side={1} sx={-(tw + 8)} a={aL} b={walking ? 10 : pose.l[1]} spec={s} prop={p.propL} />
      <Arm side={-1} sx={tw + 8} a={aR} b={walking ? 10 : pose.r[1]} spec={s} prop={p.propR} />
    </g>
  );
};

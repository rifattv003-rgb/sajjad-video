// স্ক্রিপ্টের শব্দ <-> SRT টাইমিং অ্যালাইনমেন্ট। ব্যবহার: node tools/align.mjs
import fs from 'node:fs';
const AUDIO_END = 460.74775;
const tc = (s) => { const [h, m, r] = s.split(':'); const [sec, ms] = r.split(','); return +h * 3600 + +m * 60 + +sec + +ms / 1000; };
const norm = (w) => w.normalize('NFD').replace(/য়/g, 'য়').normalize('NFC').replace(/[‌‍]/g, '').replace(/[।,?!.:;"'“”‘’…—\-–()]/g, '').toLowerCase();

// SRT
const srt = fs.readFileSync('input/voice.srt', 'utf8').replace(/\r/g, '').split(/\n\s*\n/);
const B = [];
for (const blk of srt) {
  const lines = blk.trim().split('\n'); if (lines.length < 3) continue;
  const m = lines[1].match(/(\S+) --> (\S+)/); if (!m) continue;
  const s = tc(m[1]), e = tc(m[2]);
  const words = lines.slice(2).join(' ').replace(/\[[^\]]*\]/g, ' ').split(/\s+/).filter(Boolean);
  const tot = words.reduce((a, w) => a + w.length, 0) || 1; let c = s;
  for (const w of words) { const d = (e - s) * w.length / tot; B.push({ w, n: norm(w), s: c, e: c + d }); c += d; }
}
// Script
const raw = fs.readFileSync('input/script.txt', 'utf8').replace(/\r/g, '').split('\n');
const A = []; let scene = -1, speaker = 'ন্যারেটর', line = 0;
for (const L of raw) {
  if (L.startsWith('চূড়ান্ত ক্যারেক্টার')) break;
  const sm = L.match(/^\[দৃশ্য\s*(\S+)\]/); if (sm) { scene++; continue; }
  const lm = L.match(/^\[([^\]]+)\]:\s*$/); if (lm) { speaker = lm[1]; continue; }
  if (!L.trim() || scene < 0) continue;
  line++;
  let inQ = false;
  const text = L.replace(/\[[a-z ]+\]/gi, ' ');
  for (const tok of text.split(/\s+/).filter(Boolean)) {
    const parts = tok.replace(/[-–]/g, ' ').split(' ').filter(Boolean);
    const open = /["“]/.test(tok[0] ?? ''); if (open) inQ = true;
    for (const p of parts) {
      const disp = p.replace(/["“”]/g, ''); const n = norm(disp); if (!n) continue;
      A.push({ w: disp, n, scene, speaker, line, q: inQ });
    }
    if (/["”]$/.test(tok) || /["”][।,?!]*$/.test(tok)) inQ = false;
  }
}
// DP alignment
const lev = (a, b) => { const m = a.length, n = b.length; let p = Array.from({ length: n + 1 }, (_, i) => i); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; };
const sc = (a, b) => { if (a === b) return 3; const r = 1 - lev(a, b) / Math.max(a.length, b.length); return r >= 0.5 ? 1 : -1; };
const n = A.length, m = B.length, G = -1;
const D = Array.from({ length: n + 1 }, () => new Float32Array(m + 1)), T = Array.from({ length: n + 1 }, () => new Uint8Array(m + 1));
for (let i = 1; i <= n; i++) { D[i][0] = i * G; T[i][0] = 1; } for (let j = 1; j <= m; j++) { D[0][j] = j * G; T[0][j] = 2; }
for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) {
  const d = D[i - 1][j - 1] + sc(A[i - 1].n, B[j - 1].n), u = D[i - 1][j] + G, l = D[i][j - 1] + G;
  if (d >= u && d >= l) { D[i][j] = d; T[i][j] = 0; } else if (u >= l) { D[i][j] = u; T[i][j] = 1; } else { D[i][j] = l; T[i][j] = 2; }
}
let i = n, j = m; const map = new Array(n).fill(-1);
while (i > 0 || j > 0) { const t = T[i][j]; if (i > 0 && j > 0 && t === 0) { map[i - 1] = j - 1; i--; j--; } else if (i > 0 && (t === 1 || j === 0)) i--; else j--; }
// times
for (let k = 0; k < n; k++) if (map[k] >= 0) { A[k].s = B[map[k]].s; A[k].e = B[map[k]].e; }
let k = 0; while (k < n) { if (A[k].s !== undefined) { k++; continue; } let a = k; while (k < n && A[k].s === undefined) k++; const t0 = a > 0 ? A[a - 1].e : 0, t1 = k < n ? A[k].s : AUDIO_END; const cnt = k - a; for (let x = 0; x < cnt; x++) { A[a + x].s = t0 + (t1 - t0) * x / cnt; A[a + x].e = t0 + (t1 - t0) * (x + 1) / cnt; } }
const unmatched = A.filter((_, x) => map[x] < 0).length;
console.log(`script words=${n}, srt words=${m}, unmatched script=${unmatched}`);
fs.writeFileSync('tools/words.json', JSON.stringify(A));
// scenes
const starts = []; for (let s = 0; s <= scene; s++) starts.push(A.find((w) => w.scene === s).s);
starts[0] = 0;
const scenes = starts.map((s, x) => ({ id: x + 1, start: +s.toFixed(3), end: +((starts[x + 1] ?? AUDIO_END)).toFixed(3) }));
console.log(scenes.map((s) => `S${s.id}: ${s.start.toFixed(2)}-${s.end.toFixed(2)}`).join('\n'));
// captions
const KEY = ['তানভীর','তানভীরের','রাশেদ','ভাইয়া','ভাইয়ার','বাবা','সাকিব','সাকিবের','টাকা','টাকাটা','ব্যবসা','ব্যবসায়','ব্যাগ','ব্যাগের','দেনা','ঈদ','ঈদের','দোকান','বিনিয়োগ','বাজি','অর্ডার','অর্ডারে','কারিগর','হেরে','চেষ্টা','জামাল','বাক্স','ঝুঁকি','সুই','সুইটা','চিরকুট','চুক্তি','অগ্রিম','লাখ','হাজার','তিনটা','এগারোটা','পাঁচশো','পাঁচশ','কিছু','মাপে','মাপেই','ফিতেটা','ফোন','ফেসবুক','Facebook'];
const caps = [];
for (let sc_ = 0; sc_ <= scene; sc_++) {
  const ws = A.filter((w) => w.scene === sc_); let cur = [];
  const flush = () => { if (!cur.length) return; caps.push({ s: cur[0].s, e: cur[cur.length - 1].e, scene: sc_ + 1, words: cur.map((w) => w.w) }); cur = []; };
  for (const w of ws) { cur.push(w); const end = /[।?!,]$/.test(w.w); if (cur.length >= 6 || (cur.length >= 4 && end) || (cur.length >= 2 && /[।?!]$/.test(w.w))) flush(); }
  flush();
}
for (let x = 0; x < caps.length; x++) { const nx = caps[x + 1]; caps[x].e = Math.min(caps[x].e + 0.15, nx ? nx.s : AUDIO_END); }
const captions = caps.map((c) => {
  const clean = c.words.map((w) => w.replace(/[।,?!.:;"'“”]/g, ''));
  let hi = clean.findIndex((w) => KEY.includes(w) || /\d/.test(w));
  if (hi < 0) { let best = 0; clean.forEach((w, q) => { if ([...w].length > [...clean[best]].length) best = q; }); hi = best; }
  return { s: +c.s.toFixed(2), e: +c.e.toFixed(2), scene: c.scene, t: c.words, h: [hi] };
});
fs.writeFileSync('src/data/captions.json', JSON.stringify(captions));
fs.writeFileSync('src/data/timeline.json', JSON.stringify({ audioEnd: AUDIO_END, scenes }));
console.log('captions:', captions.length, ' max words/chunk:', Math.max(...captions.map((c) => c.t.length)));

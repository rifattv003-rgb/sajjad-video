// usage: npx tsx tools/preview.tsx <scene#> <t1,t2,...>   -> /tmp/.../shots/sN_t.png
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { FrameCtx } from './shim/remotion';
import { SceneStartCtx } from '../src/time';
import timeline from '../src/data/timeline.json';

(async () => {
const [, , sceneArg, timesArg, outDir = 'tools/shots'] = process.argv;
const n = +sceneArg;
const mod = await import(`../src/scenes/Scene${n}.tsx`);
const Comp = mod[`Scene${n}`];
const sc = timeline.scenes[n - 1];
const startF = Math.round(sc.start * 30);
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
for (const t of timesArg.split(',').map(Number)) {
  const lf = Math.round(t * 30) - startF;
  const html = renderToStaticMarkup(<FrameCtx.Provider value={lf}><SceneStartCtx.Provider value={startF}><div style={{ position: 'relative', width: 1920, height: 1080, overflow: 'hidden' }}><Comp /></div></SceneStartCtx.Provider></FrameCtx.Provider>);
  await page.setContent(`<html><head><style>body{margin:0;font-family:"Hind Siliguri","Noto Sans Bengali",sans-serif}</style></head><body>${html}</body></html>`);
  await page.screenshot({ path: `${outDir}/s${n}_${t}.png` });
  console.log('shot', n, t);
}
await browser.close();

})();

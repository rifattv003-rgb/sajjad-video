import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { FrameCtx } from './shim/remotion';
import { Story } from '../src/Story';
(async () => {
  const times = process.argv[2].split(',').map(Number);
  fs.mkdirSync('tools/shots', { recursive: true });
  const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  for (const t of times) {
    const html = renderToStaticMarkup(<FrameCtx.Provider value={Math.round(t * 30)}><div style={{ position: 'relative', width: 1920, height: 1080, overflow: 'hidden' }}><Story /></div></FrameCtx.Provider>);
    await page.setContent(`<html><body style="margin:0">${html}</body></html>`);
    await page.screenshot({ path: `tools/shots/story_${t}.png` });
    const px = await page.evaluate(() => 1); console.log('ok', t);
  }
  await b.close();
})();

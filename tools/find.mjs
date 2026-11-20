import fs from 'node:fs';
const W = JSON.parse(fs.readFileSync('tools/words.json','utf8'));
const norm=(w)=>w.replace(/[।,?!.:;"'“”\-]/g,'');
for (const ph of process.argv.slice(2)) {
  const p = ph.split(' ').map(norm); let found=false;
  for (let i=0;i+p.length<=W.length;i++) { if (p.every((x,k)=>norm(W[i+k].w)===x)) { console.log(`${ph.padEnd(28)} S${W[i].scene+1} ${W[i].s.toFixed(2)} -> ${W[i+p.length-1].e.toFixed(2)}`); found=true; } }
  if(!found) console.log(ph,'NOT FOUND');
}

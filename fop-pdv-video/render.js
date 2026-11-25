const {chromium}=require('/opt/node-tools/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const out=process.argv[2], fps=30, dur=25;
 fs.mkdirSync(out,{recursive:true});
 const b=await chromium.launch();
 const p=await b.newPage({viewport:{width:1080,height:1920}});
 await p.goto('file://'+process.cwd()+'/index.html'); await p.evaluate(()=>document.fonts.ready);
 const only=process.argv[3]?process.argv[3].split(',').map(Number):null;
 const frames=only?only.map(t=>[Math.round(t*fps),t]):Array.from({length:fps*dur},(_,i)=>[i,i/fps]);
 for(const [i,t] of frames){await p.evaluate(t=>setT(t),t);
  await p.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.png`});}
 await b.close();
})();

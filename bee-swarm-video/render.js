const {chromium}=require('/opt/node-tools/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const fmt=process.argv[2],out=process.argv[3],fps=+process.argv[4];
 const only=process.argv[5]?process.argv[5].split(',').map(Number):null;
 fs.mkdirSync(out,{recursive:true});
 const b=await chromium.launch();
 const [w,h]=fmt==='tall'?[1080,1920]:[1280,720];
 const p=await b.newPage({viewport:{width:w,height:h}});
 p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('file://'+process.cwd()+'/index.html?fmt='+fmt);await p.evaluate(()=>document.fonts.ready);
 const total=await p.evaluate(()=>window.TOTAL);
 const frames=only?only.map(t=>[Math.round(t*fps),t]):Array.from({length:Math.round(total*fps)},(_,i)=>[i,i/fps]);
 for(const [i,t] of frames){await p.evaluate(t=>setT(t),t);await p.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.png`})}
 console.log('frames',frames.length,'total',total);await b.close();
})();

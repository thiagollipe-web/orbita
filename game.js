import {MAPS,ADVENTURE_KEY,canStand,movePlayer,nearestTarget,cleanAdventure,collectNearby} from './game-core.js';
import {motionAllowed,celebrate} from './motion.js';
let dispose=()=>{},progress=cleanAdventure(null),positions={},wide=false;
try{progress=cleanAdventure(JSON.parse(localStorage.getItem(ADVENTURE_KEY)));}catch{}
export function resetAdventure(){dispose();dispose=()=>{};progress=cleanAdventure(null);positions={};try{localStorage.removeItem(ADVENTURE_KEY);}catch{}}
export function gameControls(){return `<section class="game-console" aria-label="Controles da aventura"><div class="game-toolbar"><button id="game-start" class="primary">Jogar / continuar</button><button id="game-wide" class="secondary" aria-pressed="false">Ampliar jogo</button></div><p id="game-quest">Encontre os 3 fragmentos e converse com o guia.</p><div class="game-controls"><div class="dpad" role="group" aria-label="Mover personagem"><button data-dir="up" aria-label="Andar para cima">↑</button><button data-dir="left" aria-label="Andar para esquerda">←</button><button data-dir="down" aria-label="Andar para baixo">↓</button><button data-dir="right" aria-label="Andar para direita">→</button></div><div class="game-actions"><button id="game-interact" class="primary" disabled>Interagir (E)</button><button id="game-run" class="secondary" aria-pressed="false">Correr: não</button></div></div><p class="game-help">Clique em Jogar. Use WASD ou setas; Shift corre e E conversa. No celular, segure os botões de direção. Esc pausa. As lições também estão disponíveis logo abaixo.</p><p id="game-status" role="status">Explore, encontre fragmentos e fale com os personagens.</p></section>`;}
export function mountGame(world,{onMission,onRewards,onPortal,notify}){
 dispose();const scene=document.querySelector('.scene'),consoleEl=document.querySelector('.game-console');if(!scene||!consoleEl)return;
 const abort=new AbortController(),signal=abort.signal;const listen=(el,type,fn,options={})=>el.addEventListener(type,fn,{...options,signal});
 const map=MAPS[world];let pos=positions[world]&&canStand(world,positions[world].x,positions[world].y)?{...positions[world]}:{...map.spawn};
 let active=false,run=false,facing='down',keys=new Set(),touch=new Map(),last=0,frame=0,phase=0,near=null,dead=false,visible=true,walk=0;
 const canvas=document.createElement('canvas');canvas.width=384;canvas.height=240;canvas.className='game-canvas';canvas.tabIndex=0;canvas.setAttribute('aria-label','Área do jogo: use setas ou WASD para andar, E para interagir e Escape para pausar.');canvas.setAttribute('aria-describedby','game-quest game-status');scene.append(canvas);scene.classList.add('has-game');
 const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;
 const $=id=>document.getElementById(id);const status=$('game-status'),start=$('game-start'),interaction=$('game-interact'),runButton=$('game-run');
 const dialog=document.createElement('dialog');dialog.className='npc-dialog';dialog.setAttribute('aria-labelledby','npc-title');document.body.append(dialog);
 function say(text){status.textContent=text;}
 function save(){try{localStorage.setItem(ADVENTURE_KEY,JSON.stringify(progress));}catch{notify('Exploração guardada apenas nesta sessão: armazenamento indisponível.');}}
 function updateQuest(){const p=progress[world];$('game-quest').textContent=p.delivered?'★ Explorador de Órbita: missão de exploração concluída!':`Fragmentos do mapa: ${p.found.length}/3. ${p.found.length===3?'Volte ao guia para entregar!':`Encontre os três e converse com ${world==='escolar'?'Lia':'Byte'}.`}`;}
 function stop(){active=false;keys.clear();touch.clear();scene.classList.remove('game-playing');start.textContent='Jogar / continuar';positions[world]={...pos};cancelAnimationFrame(frame);last=0;draw();}
 function begin(){if(document.querySelector('dialog[open]'))return;scene.scrollIntoView({block:'nearest',behavior:'auto'});const bounds=scene.getBoundingClientRect();visible=bounds.bottom>0&&bounds.top<innerHeight;active=true;keys.clear();scene.classList.add('game-playing');start.textContent='Pausar jogo';canvas.focus({preventScroll:true});say('Aventura em andamento. Aproxime-se de um personagem, da porta ou do portal.');last=0;cancelAnimationFrame(frame);frame=requestAnimationFrame(tick);}
 function showDialogue(target){
  stop();const p=progress[world];let title,body,action,label;
  if(target.id==='mission'){title=world==='escolar'?'A biblioteca está aberta!':'Seu laboratório de descobertas';body='Entre para uma missão de aprendizagem. Sua primeira conclusão vale 50 XP e 20 Atlas Coin. Depois, volte à aventura.';action=onMission;label='Começar missão';}
  if(target.id==='shop'){title='Seu baú de conquistas';body='Use as Atlas Coin das missões para escolher uma insígnia. Explorar é grátis e não gasta moedas.';action=onRewards;label='Ver minhas recompensas';}
  if(target.id==='portal'){title='Um novo mundo espera';body=world==='escolar'?'O portal leva à estação tecnológica. Seu XP, moedas e insígnias viajam com você.':'O portal leva à ilha do conhecimento. Você pode voltar quando quiser.';action=onPortal;label='Atravessar o portal';}
  if(target.id==='guide'){
   title=map.npc.name;
   body=p.delivered?'Você encontrou todos os fragmentos! Sua estrela de exploração está registrada neste mundo. Entre na biblioteca ou no laboratório para continuar aprendendo.':p.found.length===3?'Você encontrou os três fragmentos! Vamos montar nosso mapa? Ao entregar, você recebe a conquista Explorador de Órbita.':`Preciso recuperar três fragmentos brilhantes do mapa. Você já encontrou ${p.found.length}. ${world==='escolar'?'Um deles está do outro lado da ponte. Cuidado: a água só pode ser atravessada pela ponte!':'Procure ao redor dos terminais. Não dá para atravessar as bancadas!'} Aproxime-se dos fragmentos para pegá-los.`;
   if(p.found.length===3&&!p.delivered){label='Entregar os 3 fragmentos';action=()=>{progress[world].delivered=true;save();updateQuest();celebrate();say('Conquista recebida: Explorador de Órbita! As Atlas Coin continuam sendo ganhas nas missões.');draw();};}
  }
  dialog.innerHTML=`<span class="eyebrow">CONVERSA NA AVENTURA</span><h2 id="npc-title">${title}</h2><p>${body}</p>${action?'<button class="primary" id="npc-action">'+label+'</button>':''}<button class="secondary" id="npc-close">Voltar à aventura</button>`;
  dialog.querySelector('#npc-close').onclick=()=>{dialog.close();begin();};if(action)dialog.querySelector('#npc-action').onclick=()=>{dialog.close();action();};dialog.showModal();
 }
 function interact(){if(document.querySelector('dialog[open]'))return;near=nearestTarget(world,pos);if(near)showDialogue(near);else say('Chegue mais perto de uma porta, personagem, baú ou portal.');}
 function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h);}
 function person(x,y,coat,isPlayer=false){
  const x0=Math.round(x)-7,y0=Math.round(y)-28,bob=isPlayer&&walk&&motionAllowed()?Math.floor(phase/100)%2:0;
  ctx.save();ctx.translate(x0,y0-bob);if(isPlayer&&facing==='left'){ctx.translate(14,0);ctx.scale(-1,1);}
  rect(1,28,13,2,'#043d4970');rect(3,0,8,3,'#302b42');rect(1,3,12,5,'#302b42');rect(4,7,7,7,'#e9b78a');rect(9,8,2,2,'#302b42');rect(3,14,9,10,coat);rect(3,14,9,3,progress[world].delivered&&isPlayer?'#fff169':'#e9c766');rect(0,15,3,8,'#e9b78a');rect(12,15,3,8,'#e9b78a');rect(3,24,4,4+bob,'#302b42');rect(9,24,4,5-bob,'#302b42');
  if(isPlayer){rect(5,-5,5,2,'#fff4ad');rect(7,-3,1,2,'#fff4ad');}
  ctx.restore();
 }
 function draw(){
  if(dead)return;ctx.clearRect(0,0,384,240);
  const portal=map.targets.find(t=>t.id==='portal'),pulse=motionAllowed()?Math.sin(phase/300)*2:0;
  rect(portal.x-9,portal.y-27,18,27,'#093b63');rect(portal.x-8,portal.y-26,3,25,'#d78aff');rect(portal.x+6,portal.y-26,3,25,'#d78aff');rect(portal.x-5,portal.y-29,11,3,'#efd1ff');rect(portal.x-4,portal.y-20+pulse,8,15,'#5cebd4');
  for(const gem of map.gems){if(progress[world].found.includes(gem.id))continue;const bob=motionAllowed()?Math.sin(phase/400+gem.x)*2:0;ctx.fillStyle='#ffec75';ctx.beginPath();ctx.moveTo(gem.x,gem.y-14+bob);ctx.lineTo(gem.x+5,gem.y-8+bob);ctx.lineTo(gem.x,gem.y-2+bob);ctx.lineTo(gem.x-5,gem.y-8+bob);ctx.fill();rect(gem.x-1,gem.y-11+bob,2,5,'#fffde1');}
  const sprites=[{...map.npc,coat:'#3de6c0'},{...pos,coat:'#bf75fa',player:true}].sort((a,b)=>a.y-b.y);for(const s of sprites)person(s.x,s.y,s.coat,s.player);
  near=nearestTarget(world,pos);interaction.disabled=!near;interaction.textContent=near?`${near.label} (E)`:'Aproxime-se para interagir';
  if(near){ctx.strokeStyle='#fff49a';ctx.lineWidth=1;ctx.strokeRect(Math.round(pos.x)-9,Math.round(pos.y)-1,18,3);}
  canvas.dataset.x=pos.x.toFixed(2);canvas.dataset.y=pos.y.toFixed(2);canvas.dataset.active=String(active);
 }
 function tick(time){
  if(dead||!active)return;const dt=last?Math.min((time-last)/1000,.05):0;last=time;phase=time;
  if(!visible||document.hidden||document.querySelector('dialog[open]')){stop();return;}
  const all=new Set([...keys,...touch.values()]);const dx=Number(all.has('right'))-Number(all.has('left')),dy=Number(all.has('down'))-Number(all.has('up'));
  if(dx)facing=dx<0?'left':'right';else if(dy)facing=dy<0?'up':'down';
  const next=movePlayer(world,pos,dx,dy,dt,run||all.has('run'));walk=Math.hypot(next.x-pos.x,next.y-pos.y)>0;pos=next;positions[world]={...pos};
  const count=progress[world].found.length;progress=collectNearby(world,pos,progress);
  if(progress[world].found.length>count){save();updateQuest();say(`Fragmento encontrado! ${progress[world].found.length} de 3.${progress[world].found.length===3?' Volte ao guia para entregar.':''}`);}
  draw();frame=requestAnimationFrame(tick);
 }
 const mapping={ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right',Shift:'run'};
 listen(canvas,'keydown',e=>{if(e.key==='Tab'){keys.clear();return;}if(e.key==='Escape'){stop();start.focus();e.preventDefault();return;}if(e.key==='e'||e.key==='E'||e.key==='Enter'){e.preventDefault();if(!e.repeat)interact();return;}if(mapping[e.key]){e.preventDefault();if(!active)begin();keys.add(mapping[e.key]);}});
 listen(window,'keyup',e=>{if(e.key===' '||e.key==='Enter')keys.clear();else keys.delete(mapping[e.key]);});listen(canvas,'blur',()=>{keys.clear();});listen(window,'blur',stop);listen(document,'visibilitychange',()=>{if(document.hidden)stop();});
 listen(start,'click',()=>active?stop():begin());listen(interaction,'click',interact);
 listen(runButton,'click',()=>{run=!run;runButton.setAttribute('aria-pressed',String(run));runButton.textContent=`Correr: ${run?'sim':'não'}`;});
 for(const button of consoleEl.querySelectorAll('[data-dir]')){
  listen(button,'pointerdown',e=>{e.preventDefault();if(!active)begin();button.setPointerCapture(e.pointerId);touch.set(e.pointerId,button.dataset.dir);});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])listen(button,event,e=>touch.delete(e.pointerId));
  listen(button,'keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();if(!active)begin();keys.add(button.dataset.dir);}});
  listen(button,'keyup',e=>{if(e.key===' '||e.key==='Enter')keys.delete(button.dataset.dir);});listen(button,'blur',()=>keys.delete(button.dataset.dir));
 }
 const wideButton=$('game-wide');function applyWide(){document.querySelector('.hero').classList.toggle('playing-layout',wide);wideButton.setAttribute('aria-pressed',String(wide));wideButton.textContent=wide?'Reduzir jogo':'Ampliar jogo';}
 listen(wideButton,'click',()=>{wide=!wide;applyWide();scene.scrollIntoView({block:'start',behavior:'auto'});});applyWide();
 listen(window,'storage',e=>{if(e.key===ADVENTURE_KEY||e.key===null){try{progress=cleanAdventure(JSON.parse(localStorage.getItem(ADVENTURE_KEY)));updateQuest();draw();}catch{}}});
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible)stop();},{threshold:.1});observer.observe(scene);
 listen(dialog,'close',()=>{if(!dead&&!document.querySelector('dialog[open]'))start.focus({preventScroll:true});});
 updateQuest();draw();
 dispose=()=>{positions[world]={...pos};dead=true;cancelAnimationFrame(frame);abort.abort();observer.disconnect();dialog.remove();};
}

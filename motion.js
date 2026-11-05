const preferenceKey='orbita-motion-paused';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=false,clearCelebration;
try{paused=localStorage.getItem(preferenceKey)==='true';}catch{}
export function motionAllowed(){return !paused&&!reduced.matches;}
function sync(){
 document.body.classList.toggle('motion-paused',paused);
 const button=document.querySelector('#motion-toggle');
 if(button){button.disabled=reduced.matches;button.setAttribute('aria-pressed',String(paused||reduced.matches));button.textContent=reduced.matches?'Movimento reduzido pelo sistema':paused?'Retomar animações':'Pausar animações';}
 if(!motionAllowed())stopCelebration();
}
function stopCelebration(){clearTimeout(clearCelebration);const layer=document.querySelector('#celebration');if(layer){layer.replaceChildren();layer.dataset.active='false';}}
export function bindMotion(){sync();const button=document.querySelector('#motion-toggle');if(button)button.onclick=()=>{paused=!paused;try{localStorage.setItem(preferenceKey,String(paused));}catch{}sync();};}
reduced.addEventListener('change',sync);
window.addEventListener('storage',e=>{if(e.key===preferenceKey||e.key===null){try{paused=localStorage.getItem(preferenceKey)==='true';sync();}catch{}}});
export function celebrate(){
 stopCelebration();if(!motionAllowed())return;
 const layer=document.querySelector('#celebration');layer.dataset.active='true';
 for(let i=0;i<18;i++){const pixel=document.createElement('i');pixel.style.setProperty('--x',`${(i*37)%100}%`);pixel.style.setProperty('--delay',`${(i%5)*70}ms`);pixel.style.setProperty('--drift',`${i%2?60:-60}px`);pixel.style.setProperty('--color',['#ffda45','#56eed7','#b28aff'][i%3]);layer.append(pixel);}
 clearCelebration=setTimeout(stopCelebration,1900);
}
const explorer=`<svg viewBox="0 0 16 32" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><path fill="#302b42" d="M4 1h8v3h3v5H1V4h3z"/><path fill="#e9b78a" d="M4 8h8v8H4zM1 17h3v9H1zm11 0h3v9h-3z"/><path fill="#302b42" d="M10 9h2v2h-2zM3 26h4v5H1v-3h2zm6 0h4v5H9z"/><path fill="#bf75fa" d="M4 16h8v11H4z"/><path fill="#ffe66e" d="M4 16h8v3H4z"/></svg>`;
export function sceneMarkup(tech){return `<div class="scene" data-scene="${tech?'tech':'school'}"><img class="world-art" src="assets/world-${tech?'tech':'school'}-rich.svg" width="384" height="240" alt="${tech?'Estação tecnológica em pixel art com laboratório, terminais e robô.':'Vila em pixel art com biblioteca, árvores e ponte sobre o rio.'}"><div class="scene-decor" aria-hidden="true"><span class="scene-cloud cloud-one"></span><span class="scene-cloud cloud-two"></span><span class="scene-water"></span><span class="scene-explorer">${explorer}</span><span class="scene-friend">${explorer}</span><span class="scene-firefly firefly-one"></span><span class="scene-firefly firefly-two"></span><span class="scene-firefly firefly-three"></span><span class="scene-signal"></span></div><button class="scene-action scene-mission" data-scene-action="mission" aria-label="${tech?'Laboratório':'Biblioteca'}: iniciar próxima missão"><span aria-hidden="true">!</span><span class="scene-tooltip">${tech?'Laboratório':'Biblioteca'}</span></button><button class="scene-action scene-treasure" data-scene-action="rewards" aria-label="${tech?'Robô':'Baú'}: abrir recompensas"><span aria-hidden="true">A</span><span class="scene-tooltip">Recompensas</span></button></div><div class="scene-guide"><span class="guide-face" aria-hidden="true">${explorer}</span><p>${tech?'“Ideias prontas? Entre no laboratório e vamos construir!”':'“A biblioteca tem uma missão esperando por você!”'}<small>Toque no ! para estudar ou no A para ver suas recompensas.</small></p></div><div class="scene-controls"><span>Explore no seu ritmo</span><button id="motion-toggle" type="button" aria-pressed="false">Pausar animações</button></div>`;}

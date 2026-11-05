export const ADVENTURE_KEY='orbita-adventure-v1';
export const MAPS={
 escolar:{spawn:{x:181,y:187},npc:{x:252,y:180,name:'Lia, guardiã da biblioteca'},
  obstacles:[[126,115,240,153],[24,127,32,145],[66,141,74,159],[295,128,303,146],[341,153,349,171],[108,177,116,195]],
  targets:[{id:'mission',x:186,y:155,label:'Entrar na biblioteca'},{id:'guide',x:252,y:180,label:'Conversar com Lia'},{id:'shop',x:322,y:186,label:'Abrir o baú de insígnias'},{id:'portal',x:363,y:182,label:'Viajar para o universo tech'}],
  gems:[{id:'a',x:80,y:182},{id:'b',x:273,y:143},{id:'c',x:180,y:220}]},
 tecnologia:{spawn:{x:194,y:187},npc:{x:118,y:210,name:'Byte, guia das invenções'},
  obstacles:[[132,120,260,150],[40,155,88,202],[285,159,336,206]],
  targets:[{id:'mission',x:222,y:153,label:'Entrar no laboratório'},{id:'guide',x:118,y:210,label:'Conversar com Byte'},{id:'shop',x:273,y:220,label:'Ver insígnias com o robô'},{id:'portal',x:363,y:218,label:'Viajar para o universo escolar'}],
  gems:[{id:'a',x:101,y:145},{id:'b',x:250,y:220},{id:'c',x:353,y:140}]}
};
export function canStand(world,x,y){
 if(x<6||x>378||y<123||y>232)return false;
 if(world==='escolar'&&y>197&&(x<160||x>198||y>228))return false;
 return !MAPS[world].obstacles.some(([l,t,r,b])=>x+4>l&&x-4<r&&y>t&&y-3<b);
}
export function movePlayer(world,pos,dx,dy,dt,running){
 const length=Math.hypot(dx,dy);if(!length)return {...pos};
 const distance=(running?102:64)*Math.min(Math.max(dt,0),.05);
 const steps=Math.max(1,Math.ceil(distance/2));let {x,y}=pos;
 for(let i=0;i<steps;i++){
  const nx=x+dx/length*distance/steps,ny=y+dy/length*distance/steps;
  if(canStand(world,nx,y))x=nx;if(canStand(world,x,ny))y=ny;
 }
 return {x,y};
}
export function nearestTarget(world,pos){return MAPS[world].targets.map(t=>({...t,distance:Math.hypot(t.x-pos.x,t.y-pos.y)})).filter(t=>t.distance<=24).sort((a,b)=>a.distance-b.distance)[0]||null;}
export function cleanAdventure(raw){
 const result={};for(const world of Object.keys(MAPS)){
  const found=Array.isArray(raw?.[world]?.found)?[...new Set(raw[world].found.filter(id=>MAPS[world].gems.some(g=>g.id===id)))]:[];
  result[world]={found,delivered:found.length===3&&raw?.[world]?.delivered===true};
 }return result;
}
export function collectNearby(world,pos,progress){
 const next=cleanAdventure(progress);for(const g of MAPS[world].gems)if(Math.hypot(g.x-pos.x,g.y-pos.y)<11&&!next[world].found.includes(g.id))next[world].found.push(g.id);
 return next;
}

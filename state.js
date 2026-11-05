export const STORAGE_KEY = 'orbita-progress-v1';
export const COINS_PER_MISSION = 20;
export const REWARDS = Object.freeze([
 {id:'gota',name:'Gota exploradora',price:20,asset:'agua',description:'Uma insígnia ciano para quem segue a curiosidade.'},
 {id:'escudo',name:'Guardião das ideias',price:40,asset:'seguranca',description:'Um escudo verde para acompanhar suas descobertas.'},
 {id:'terminal',name:'Inventor de mundos',price:60,asset:'html',description:'Um terminal retrô para vestir suas próximas ideias.'}
]);
// Legacy records only contain completed. Earned coins are derived, so migration
// credits earlier completions once without adding a mutable balance counter.
export function cleanProgress(raw, ids) {
 const completed = Array.isArray(raw?.completed) ? [...new Set(raw.completed.filter(id=>ids.includes(id)))] : [];
 let remaining=completed.length*COINS_PER_MISSION;
 const owned=[];
 for(const id of Array.isArray(raw?.owned)?raw.owned:[]){
  const item=REWARDS.find(r=>r.id===id);
  if(item&&!owned.includes(id)&&remaining>=item.price){owned.push(id);remaining-=item.price;}
 }
 const equipped=owned.includes(raw?.equipped)?raw.equipped:null;
 return {completed,owned,equipped};
}
export function award(progress,id,ids) {return cleanProgress({...progress,completed:[...progress.completed,id]},ids);}
export function stats(progress){const xp=progress.completed.length*50;return {xp,level:Math.floor(xp/150)+1};}
export function wallet(progress){const earned=progress.completed.length*COINS_PER_MISSION;const spent=REWARDS.filter(r=>(progress.owned||[]).includes(r.id)).reduce((n,r)=>n+r.price,0);return {earned,spent,balance:earned-spent};}
export function purchase(progress,id,ids){
 const current=cleanProgress(progress,ids),item=REWARDS.find(r=>r.id===id);
 if(!item)return {progress:current,error:'unknown'};
 if(current.owned.includes(id))return {progress:current,error:'owned'};
 if(wallet(current).balance<item.price)return {progress:current,error:'insufficient'};
 return {progress:{...current,owned:[...current.owned,id],equipped:id},error:null};
}
export function equip(progress,id,ids){const current=cleanProgress(progress,ids);return {...current,equipped:current.owned.includes(id)?id:null};}

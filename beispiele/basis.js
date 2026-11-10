// Gemeinsame Effekte aller Beispiel-Seiten
// Laufband: <div class="band"><div data-woerter="A|B|C"></div></div>
document.querySelectorAll('[data-woerter]').forEach(el=>{
  const w=el.dataset.woerter.split('|');
  el.innerHTML=[...w,...w,...w,...w].map(x=>`<span>${x}</span>`).join('');
});
// Reiter mit Liste und optional wechselndem Bild
// daten = {Reitername: [[Titel, Beschreibung, Wert, neu?], ...]}
function reiter(chipsId, listeId, daten, bildId){
  const chips=document.getElementById(chipsId), liste=document.getElementById(listeId);
  function zeige(k){
    [...chips.children].forEach(b=>b.setAttribute('aria-selected',b.textContent===k));
    if(bildId) document.querySelectorAll('#'+bildId+' img').forEach(i=>i.classList.toggle('an',i.dataset.k===k));
    liste.innerHTML=daten[k].map(([n,d,p,neu],i)=>`<div class="zeile" style="animation-delay:${i*.05}s"><div><b>${n}${neu?'<span class="neu">NEU</span>':''}</b><small>${d}</small></div><span class="fill"></span><span class="wert">${p}</span></div>`).join('');
  }
  Object.keys(daten).forEach(k=>{const b=document.createElement('button');b.className='chip';b.role='tab';b.textContent=k;b.onclick=()=>zeige(k);chips.appendChild(b)});
  zeige(Object.keys(daten)[0]);
}
// Sanftes Einblenden + Hochzählen bei data-n
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting) return;
  e.target.classList.add('on'); io.unobserve(e.target);
  e.target.querySelectorAll('[data-n]').forEach(b=>{const n=+b.dataset.n,st=performance.now();(function up(t){const p=Math.min(1,(t-st)/1200);b.textContent=Math.round(n*(1-Math.pow(1-p,3))).toLocaleString('de-DE')+(b.dataset.s||'');if(p<1)requestAnimationFrame(up)})(st)});
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%4)*.07+'s';io.observe(el)});

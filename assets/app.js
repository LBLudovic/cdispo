function setActiveNav(){
  const page = document.body.getAttribute('data-page');
  document.querySelectorAll('nav.bottom a').forEach(a=>{
    a.classList.toggle('active', a.dataset.page === page);
  });
}

function showToast(message){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = message;
  t.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>t.classList.remove('show'), 1400);
}

function toggleFav(btn){
  btn.classList.toggle('on');
  const icon = btn.querySelector('i');
  if(icon){
    icon.classList.toggle('fa-regular');
    icon.classList.toggle('fa-solid');
  }
}

function openSheet(id){
  document.getElementById(id+'-backdrop')?.classList.add('open');
  document.getElementById(id)?.classList.add('open');
}
function closeSheet(id){
  document.getElementById(id+'-backdrop')?.classList.remove('open');
  document.getElementById(id)?.classList.remove('open');
}
function wireSheet(id){
  document.getElementById(id+'-backdrop')?.addEventListener('click', ()=>closeSheet(id));
  document.querySelectorAll('[data-close-sheet="'+id+'"]').forEach(b=>b.addEventListener('click', ()=>closeSheet(id)));
}

function getEstById(id){
  const ests = window.APP_DATA?.establishments || [];
  return ests.find(e => String(e.id) === String(id)) || ests[0];
}
function waitInfo(est){
  if(est.spots > 0) return { label: `✅ ${est.spots} places dispo`, color: '#22c55e' };
  const w = est.waitMin || 0;
  if(w <= 10) return { label: `⏳ ${w} min`, color: '#f59e0b' };
  if(w <= 25) return { label: `⏳ ${w} min`, color: '#fb923c' };
  return { label: `⏳ ${w} min`, color: '#ef4444' };
}
function estImageUrl(est){
  return `assets/images/${est.img}`;
}

document.addEventListener('DOMContentLoaded', ()=>{
  setActiveNav();

  document.querySelectorAll('[data-toast]').forEach(el=>{
    el.addEventListener('click', (e)=>{
      e.preventDefault();
      showToast(el.getAttribute('data-toast') || 'Action');
    });
  });

  document.querySelectorAll('[data-fav]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      e.stopPropagation();
      toggleFav(btn);
    });
  });
});

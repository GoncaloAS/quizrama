/**
 * Filtro por tópico — constrói a lista lateral e aplica filtros.
 *
 * Os tópicos exibem-se por ordem fixa (TOPIC_ORDER); separadores
 * "🎯 Treino" e "📝 Exames" são inseridos antes da primeira ocorrência
 * de cada grupo.
 */
const TOPIC_ORDER=['Linguagem C','Conceitos Básicos','I/O e Interrupções','System Calls','Processos','IPC','Escalonamento','Sincronização','Deadlocks','Treino · fork()','Treino · Pipes','Treino · Scheduling','Treino · Sinais','Exame · Parte I','Exame · Parte II','Exame · Parte III','Exame · Parte IV','Exame · Parte V','Exame · Parte VI'];

function buildTopicFilter(){
  const topics={};
  ALL.forEach(q=>{topics[q[0]]=(topics[q[0]]||0)+1;});
  const list=document.getElementById("topicList");
  list.innerHTML="";
  const allBtn=mkTBtn("All Topics",ALL.length,null,"#5b8af0");
  allBtn.classList.add("active");
  list.appendChild(allBtn);
  const ordered=Object.keys(topics).sort((a,b)=>{
    const ia=TOPIC_ORDER.indexOf(a),ib=TOPIC_ORDER.indexOf(b);
    return (ia<0?999:ia)-(ib<0?999:ib);
  });
  let firstTreino=true,firstExam=true;
  ordered.forEach(t=>{
    if(t.startsWith("Treino ·") && firstTreino){
      const sep=document.createElement("div");
      sep.style.cssText="margin:10px 8px 6px;font-size:.7rem;letter-spacing:2px;color:#888;text-transform:uppercase;border-top:1px solid rgba(255,255,255,.08);padding-top:10px;";
      sep.textContent="🎯 Treino estilo exame";
      list.appendChild(sep);
      firstTreino=false;
    }
    if(t.startsWith("Exame ·") && firstExam){
      const sep=document.createElement("div");
      sep.style.cssText="margin:10px 8px 6px;font-size:.7rem;letter-spacing:2px;color:#888;text-transform:uppercase;border-top:1px solid rgba(255,255,255,.08);padding-top:10px;";
      sep.textContent="📝 Exames anteriores";
      list.appendChild(sep);
      firstExam=false;
    }
    list.appendChild(mkTBtn(t,topics[t],t,tc(t)));
  });
}

function mkTBtn(label,count,filter,color){
  const btn=document.createElement("button");
  btn.className="tbtn";
  btn.dataset.f=filter||"";
  btn.innerHTML=`<div class="tleft"><div class="tdot" style="background:${color}"></div><span>${label}</span></div><span class="tcount" style="color:${color}">${count}</span>`;
  btn.onclick=()=>setFilter(filter,btn);
  return btn;
}

function setFilter(filter,btn){
  state.filter=filter;
  document.querySelectorAll(".tbtn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  if(!filter){
    state.filteredOrder=[...Array(ALL.length).keys()];
  } else {
    state.filteredOrder=[];
    state.questionOrder.forEach((qIdx,pos)=>{
      if(ALL[qIdx][0]===filter) state.filteredOrder.push(pos);
    });
  }
  // find nearest position
  let fp=state.filteredOrder.findIndex(p=>p>=state.index);
  state.index=state.filteredOrder[fp>=0?fp:0]??0;
  document.getElementById("tFilter").textContent=filter?`Showing: ${filter}`:"";
  render();
}

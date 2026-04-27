/**
 * Stats e heatmap — actualizam contadores, score ring,
 * lista de erradas, top-tópicos com mais erros, e o mini-mapa.
 */

function updateStats(){
  const answered=state.results.filter(r=>r).length;
  const correct=state.results.filter(r=>r?.correct).length;
  const wrong=answered-correct;
  const pct=answered?Math.round((correct/answered)*100):0;

  document.getElementById("tScore").textContent=pct+"%";
  document.getElementById("tCorrect").textContent=correct;
  document.getElementById("tWrong").textContent=wrong;

  // ring (r=16, circ=~100.5)
  const circ=Math.PI*2*16;
  document.getElementById("ringFill").setAttribute("stroke-dasharray",`${(pct/100)*circ} ${circ}`);

  // wrong list — iterate by position (questionOrder) so jumpTo gets a valid pos
  let wHTML="";
  for(let pos=0;pos<state.questionOrder.length;pos++){
    const qIdx=state.questionOrder[pos];
    const r=state.results[qIdx];
    if(r&&!r.correct){
      wHTML+=`<div class="wrong-item" onclick="jumpTo(${pos})">
        <div><span class="wtag">${ALL[qIdx][0]}</span></div>
        ${ALL[qIdx][2].substring(0,75)}${ALL[qIdx][2].length>75?"…":""}
      </div>`;
    }
  }
  document.getElementById("wrongList").innerHTML=wHTML||`<span style="color:var(--muted);font-size:.75rem">None yet 🎉</span>`;

  // weak topics
  const errors=Object.entries(state.topicErrors).sort((a,b)=>b[1]-a[1]);
  const maxErr=errors[0]?.[1]||1;
  document.getElementById("weakTopics").innerHTML=errors.length?
    errors.map(([t,n])=>`
      <div class="terr-row">
        <div style="flex:1">
          <div style="font-weight:600;font-size:.75rem;color:${tc(t)}">${t}</div>
          <div class="terr-bar" style="width:${n/maxErr*100}%;background:${tc(t)}"></div>
        </div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:.72rem;color:var(--bad);margin-left:8px">${n}✗</div>
      </div>`).join(""):
    `<span style="color:var(--muted);font-size:.75rem">None yet 🎉</span>`;
}

function updateHeatmap(){
  const c=document.getElementById("heatmap");
  c.innerHTML="";
  state.filteredOrder.forEach(pos=>{
    const qIdx=state.questionOrder[pos];
    const r=state.results[qIdx];
    const d=document.createElement("div");
    d.className="cell"+(r?(r.correct?" good":" bad"):"")+(pos===state.index?" curr":"");
    d.title=`Q${ALL[qIdx][1]}: ${ALL[qIdx][2].substring(0,55)}…`;
    d.onclick=()=>jumpTo(pos);
    c.appendChild(d);
  });
}

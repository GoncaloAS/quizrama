/**
 * Casos de uso do quiz — orquestra estado, render e UI.
 * Funções aqui são chamadas por handlers do HTML (`onclick`) e por boot.js.
 */

function init(){
  state.questionOrder = shuffle([...Array(ALL.length).keys()]);
  state.optionOrder   = ALL.map(()=>[0,1,2,3]); // not shuffled — explanations reference (A)/(B)/(C)/(D) by original order
  state.results       = Array(ALL.length).fill(null);
  state.index=0; state.topicErrors={}; state.streak=0;
  state.filter=null;
  state.filteredOrder = [...Array(ALL.length).keys()];
  buildTopicFilter();
  render();
}

function select(i){
  const qIdx=state.questionOrder[state.index];
  if(state.results[qIdx]) return;
  const q=ALL[qIdx];
  const order=state.optionOrder[qIdx];
  const correct=parseInt(q[4]);
  const newCorrect=order.indexOf(correct);
  const isCorrect=i===newCorrect;
  state.results[qIdx]={selected:i,correct:isCorrect};
  if(isCorrect){
    state.streak++;
    if(state.streak===3) showToast("🔥 3 in a row!");
    if(state.streak===5) showToast("⚡ 5 streak!");
    if(state.streak===10) showToast("🏆 10 streak! You're unstoppable!");
  } else {
    state.streak=0;
    const t=q[0]||"Other";
    state.topicErrors[t]=(state.topicErrors[t]||0)+1;
  }
  render();
  if(state.results.every(r=>r!==null)) setTimeout(showResult,700);
}

function jumpTo(pos){
  state.index=pos;
  render();
}
function next(){
  const fp=currFP();
  if(fp<state.filteredOrder.length-1){state.index=state.filteredOrder[fp+1];render();}
}
function prev(){
  const fp=currFP();
  if(fp>0){state.index=state.filteredOrder[fp-1];render();}
}
function skip(){next();}

function retryWrong(){
  // Clear ALL answers within the current filter (right or wrong) and let the user redo
  if(!state.filteredOrder.length){showToast("Nada para refazer!");return;}
  const label=state.filter||"All Topics";
  if(!confirm(`Limpar todas as respostas de "${label}" (${state.filteredOrder.length} perguntas)?`)) return;
  // Null out results within the filter
  state.filteredOrder.forEach(pos=>{state.results[state.questionOrder[pos]]=null;});
  // Recompute topicErrors from scratch (since some may now be null)
  state.topicErrors={};
  for(let qIdx=0;qIdx<ALL.length;qIdx++){
    const r=state.results[qIdx];
    if(r&&!r.correct){
      const t=ALL[qIdx][0];
      state.topicErrors[t]=(state.topicErrors[t]||0)+1;
    }
  }
  state.index=state.filteredOrder[0];
  state.streak=0;
  saveState();
  showToast(`Limpo — refazer ${state.filteredOrder.length} perguntas`);
  render();
}

function confirmReset(){
  if(confirm("Reset COMPLETO? Limpa todas as respostas e re-baralha as perguntas.")) restartQuiz();
}

/**
 * Persistência do progresso em localStorage.
 *
 * Chave: "osQuizState".
 * Robustez: try/catch silencioso — falha no localStorage não bloqueia a app.
 */
const STORAGE_KEY = "osQuizState";

function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY,JSON.stringify({
      questionOrder:state.questionOrder,
      optionOrder:state.optionOrder,
      results:state.results,
      index:state.index,
      topicErrors:state.topicErrors,
      streak:state.streak,
    }));
  }catch(e){}
}

function loadState(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY);
    if(!raw) return false;
    const s=JSON.parse(raw);
    if(s.questionOrder.length!==ALL.length) return false;
    Object.assign(state,s,{filter:null,filteredOrder:[...Array(ALL.length).keys()]});
    // Force unshuffled option order — explanations reference (A)/(B)/(C)/(D) by source order
    state.optionOrder = ALL.map(()=>[0,1,2,3]);
    return true;
  }catch(e){return false;}
}

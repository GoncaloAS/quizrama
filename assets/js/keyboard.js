/**
 * Atalhos de teclado.
 *  1/2/3/4 — selecciona opção A/B/C/D (se ainda não respondida)
 *  ←/→     — navegar entre perguntas (dentro do filtro actual)
 *  S       — skip (igual a →)
 *  T       — retry — limpa só a pergunta actual
 *  R       — retry — limpa respostas do filtro actual e baralha
 *
 * Ignora eventos enquanto o utilizador está num INPUT/TEXTAREA.
 */
document.addEventListener("keydown",e=>{
  if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA") return;
  const map={"1":0,"2":1,"3":2,"4":3};
  if(map[e.key]!==undefined){
    const qIdx=state.questionOrder[state.index];
    if(!state.results[qIdx]) select(map[e.key]);
  }
  if(e.key==="ArrowRight") next();
  if(e.key==="ArrowLeft")  prev();
  if(e.key==="s"||e.key==="S") skip();
  if(e.key==="t"||e.key==="T") retryCurrent();
  if(e.key==="r"||e.key==="R") retryWrong();
});

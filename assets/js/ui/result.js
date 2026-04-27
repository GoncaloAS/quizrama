/**
 * Overlay de resultado final — mostra-se ao acertar/errar todas as perguntas.
 * `restartQuiz` limpa localStorage e re-baralha tudo via init().
 */
const GRADES=[
  [90,"A+","Outstanding! OS master."],
  [80,"A","Excellent work."],
  [70,"B","Good job!"],
  [60,"C","Decent — review weak areas."],
  [50,"D","Keep studying."],
  [0,"F","Don't give up!"],
];

function showResult(){
  const correct=state.results.filter(r=>r?.correct).length;
  const pct=Math.round((correct/ALL.length)*100);
  const [,grade,msg]=GRADES.find(([min])=>pct>=min);
  document.getElementById("rscore").textContent=pct+"%";
  document.getElementById("rgrade").textContent=grade;
  document.getElementById("rsub").textContent=`${correct} / ${ALL.length} correct — ${msg}`;
  document.getElementById("roverlay").classList.add("show");
}

function restartQuiz(){
  document.getElementById("roverlay").classList.remove("show");
  localStorage.removeItem(STORAGE_KEY);
  init();
}

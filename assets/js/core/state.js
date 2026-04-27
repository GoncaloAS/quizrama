/**
 * Estado da sessão de quiz. Mutável.
 * Nenhum DOM aqui — só dados.
 *
 * Campos:
 *   questionOrder  — ordem aleatória dos índices originais de ALL
 *   optionOrder    — para cada pergunta, a ordem das 4 opções (sempre [0,1,2,3]:
 *                    explicações referem (A)/(B)/(C)/(D) pela ordem fonte)
 *   results        — para cada pergunta, {selected, correct} ou null
 *   index          — posição actual em questionOrder
 *   topicErrors    — contador de erros por tópico
 *   streak         — sequência actual de respostas certas
 *   filter         — tópico filtrado, ou null para todos
 *   filteredOrder  — posições em questionOrder que passam o filtro actual
 */
let state = {
  questionOrder:[],optionOrder:[],results:[],
  index:0,topicErrors:{},streak:0,
  filter:null,filteredOrder:[],
};

/** Fisher–Yates shuffle, devolve cópia baralhada do array. */
function shuffle(arr){
  let a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
